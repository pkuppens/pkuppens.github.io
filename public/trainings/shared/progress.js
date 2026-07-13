/* ===========================================================================
   Trainings — shared weak-area progress tracker (v1)
   Optional companion to shared/quiz.js. Load it BEFORE quiz.js on any page
   that should record attempts:

     <script src="../shared/progress.js"></script>
     <script src="../shared/quiz.js"></script>
     <script src="../data/0002.js"></script>
     <script>Quiz.render('q-core', window.TRAINING_DATA['0002'], { courseId: 'ai-901', datasetId: '0002' });</script>

   quiz.js calls window.Progress.record(...) itself when a `meta.courseId` is
   passed to Quiz.render — this file has no dependency on quiz.js and works
   standalone. Everything lives in localStorage, per-browser, no accounts.
   =========================================================================== */
(function (global) {
  var KEY = "trainings_progress_v1";
  var MAX_ATTEMPTS = 500;
  var MIN_SAMPLE = 3; // don't flag a tag as "weak" until it has this many attempts

  function load() {
    try {
      var raw = localStorage.getItem(KEY);
      if (!raw) return { version: 1, attempts: [] };
      var data = JSON.parse(raw);
      if (!data || !Array.isArray(data.attempts)) return { version: 1, attempts: [] };
      return data;
    } catch (e) {
      return { version: 1, attempts: [] };
    }
  }

  function save(data) {
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {
      /* storage may be unavailable (private mode / quota) */
    }
  }

  /** Record one graded attempt. Safe to call from quiz.js on every question reveal/submit. */
  function record(courseId, qid, tag, correct) {
    if (!courseId || !qid) return;
    var data = load();
    data.attempts.push({ course: courseId, qid: qid, tag: tag || "", correct: !!correct, ts: Date.now() });
    if (data.attempts.length > MAX_ATTEMPTS) {
      data.attempts = data.attempts.slice(data.attempts.length - MAX_ATTEMPTS);
    }
    save(data);
  }

  /** Per-tag rolling accuracy for a course, most-recent attempt per qid wins (so retries update, not double-count). */
  function tagStats(courseId) {
    var data = load();
    var latestByQid = {};
    data.attempts
      .filter(function (a) { return a.course === courseId; })
      .forEach(function (a) { latestByQid[a.qid] = a; }); // later entries overwrite earlier ones

    var tags = {};
    Object.keys(latestByQid).forEach(function (qid) {
      var a = latestByQid[qid];
      var t = a.tag || "—";
      tags[t] = tags[t] || { correct: 0, attempts: 0 };
      tags[t].attempts++;
      if (a.correct) tags[t].correct++;
    });
    return tags;
  }

  /** Tags sorted weakest-first: { tag, accuracy (0-1), attempts }. Excludes tags below MIN_SAMPLE. */
  function weakTags(courseId) {
    var tags = tagStats(courseId);
    return Object.keys(tags)
      .map(function (t) {
        var s = tags[t];
        return { tag: t, accuracy: s.correct / s.attempts, attempts: s.attempts };
      })
      .filter(function (s) { return s.attempts >= MIN_SAMPLE; })
      .sort(function (a, b) { return a.accuracy - b.accuracy; });
  }

  /**
   * Given a flat pool of question objects (each with a `.tag`), return a shuffled
   * subset of `count` questions biased toward weak tags. Falls back to a plain
   * shuffle when there isn't enough attempt history yet to know what's weak.
   */
  function filterWeighted(questions, courseId, count) {
    count = count || questions.length;
    var weak = weakTags(courseId);
    var weight = {};
    weak.forEach(function (w) {
      // Weakest tags get up to 3x sampling weight; solid tags (>=85%) get 1x.
      weight[w.tag] = w.accuracy >= 0.85 ? 1 : 1 + (1 - w.accuracy) * 2;
    });

    var pool = [];
    questions.forEach(function (q) {
      var w = weight[q.tag || "—"] || 1;
      var copies = Math.max(1, Math.round(w));
      for (var i = 0; i < copies; i++) pool.push(q);
    });

    // Fisher-Yates shuffle, then dedupe back down to `count` distinct questions.
    for (var i = pool.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
    }
    var seen = new Set();
    var out = [];
    for (var k = 0; k < pool.length && out.length < count; k++) {
      if (seen.has(pool[k])) continue;
      seen.add(pool[k]);
      out.push(pool[k]);
    }
    return out;
  }

  function reset(courseId) {
    if (!courseId) {
      save({ version: 1, attempts: [] });
      return;
    }
    var data = load();
    data.attempts = data.attempts.filter(function (a) { return a.course !== courseId; });
    save(data);
  }

  global.Progress = { record: record, weakTags: weakTags, filterWeighted: filterWeighted, reset: reset };
})(window);
