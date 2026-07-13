/* ===========================================================================
   AI-901 Course — quiz & mock-exam engine (v2)
   Supports the real AI-901 question formats:
     - "single"  : one best answer (radio / buttons)
     - "multi"   : multiple-response, select N (checkboxes, all-or-nothing)
     - "match"   : drag-into-boxes / dropdown — assign each item to a category
     - "order"   : build-list — put items in the correct sequence

   Two modes:
     - mode:"practice" (default) : instant per-question feedback. Used in lessons.
     - mode:"exam"               : answer all, Submit, then score + review + readiness.
                                   Used in mock exams.

   Scoring: each question = 1 point, all-or-nothing (mirrors Microsoft grading).
   Displays raw %, an estimated scaled score (~/1000, pass = 700 ≈ 70%),
   a readiness band, and a per-domain (D1/D2) breakdown.

   Backward compatible: a question with {options, answer} and no `type`
   is treated as "single".
   =========================================================================== */
(function (global) {
  function shuffle(a) {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function el(tag, cls, html) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (html != null) e.innerHTML = html;
    return e;
  }
  function sameSet(a, b) {
    if (a.length !== b.length) return false;
    const s = new Set(a);
    return b.every(x => s.has(x));
  }

  const READINESS = [
    { min: 90, label: "Confident pass — book the exam", cls: "good" },
    { min: 80, label: "Solid pass expected — light review of misses", cls: "good" },
    { min: 70, label: "Passing zone, thin margin — drill weak domain", cls: "warn" },
    { min: 60, label: "Not ready — close, but target your misses", cls: "bad" },
    { min: 0,  label: "Not ready — more study needed", cls: "bad" }
  ];
  function readiness(pct) { return READINESS.find(r => pct >= r.min); }

  /* ---- Build one question's UI + a grader ------------------------------- */
  function buildQuestion(item, idx, mode) {
    const type = item.type || "single";
    const card = el("div", "quiz-q");
    const tag = item.tag ? '<span class="badge ' + item.tag.toLowerCase() + '">' + item.tag + '</span> ' : "";
    const hint = type === "multi" ? ' <span class="qhint">(select ' + item.answers.length + ')</span>'
               : type === "match" ? ' <span class="qhint">(assign each)</span>'
               : type === "order" ? ' <span class="qhint">(set the order)</span>' : '';
    card.appendChild(el("p", "qtext", tag + "<b>Q" + (idx + 1) + ".</b> " + item.q + hint));

    let getSelection; // () => current answer in a comparable form
    let inputs = [];

    if (type === "single" || type === "multi") {
      const opts = shuffle(item.options.map((t, i) => ({ t, i })));
      const list = el("div", "opts");
      opts.forEach(o => {
        const row = el("label", "opt-row");
        const input = document.createElement("input");
        input.type = type === "multi" ? "checkbox" : "radio";
        input.name = "q" + idx;
        input.value = o.i;
        row.appendChild(input);
        row.appendChild(el("span", "opt-txt", o.t));
        list.appendChild(row);
        inputs.push({ input, orig: o.i, row });
      });
      card.appendChild(list);
      getSelection = () => inputs.filter(x => x.input.checked).map(x => x.orig);

    } else if (type === "match") {
      const table = el("div", "match-grid");
      const rows = shuffle(item.items.map((t, i) => ({ t, i })));
      rows.forEach(r => {
        const row = el("div", "match-row");
        row.appendChild(el("span", "match-item", r.t));
        const sel = document.createElement("select");
        sel.className = "match-sel";
        const placeholder = el("option", null, "— choose —"); placeholder.value = ""; sel.appendChild(placeholder);
        item.categories.forEach((c, ci) => {
          const op = el("option", null, c); op.value = ci; sel.appendChild(op);
        });
        row.appendChild(sel);
        table.appendChild(row);
        inputs.push({ sel, orig: r.i, row });
      });
      card.appendChild(table);
      // selection = array where selection[originalItemIndex] = chosen category index (-1 = unassigned)
      getSelection = () => {
        const out = [];
        inputs.forEach(x => { const v = parseInt(x.sel.value, 10); out[x.orig] = (x.sel.value === "" || isNaN(v)) ? -1 : v; });
        return out;
      };

    } else if (type === "order") {
      const n = item.items.length;
      const table = el("div", "match-grid");
      const rows = shuffle(item.items.map((t, i) => ({ t, i })));
      rows.forEach(r => {
        const row = el("div", "match-row");
        row.appendChild(el("span", "match-item", r.t));
        const sel = document.createElement("select");
        sel.className = "match-sel order-sel";
        const placeholder = el("option", null, "—"); placeholder.value = ""; sel.appendChild(placeholder);
        for (let p = 1; p <= n; p++) { const op = el("option", null, String(p)); op.value = p - 1; sel.appendChild(op); }
        row.appendChild(sel);
        table.appendChild(row);
        inputs.push({ sel, orig: r.i, row });
      });
      card.appendChild(table);
      // selection[originalItemIndex] = chosen position (0-based, -1 = unset)
      getSelection = () => {
        const out = [];
        inputs.forEach(x => { const v = parseInt(x.sel.value, 10); out[x.orig] = (x.sel.value === "" || isNaN(v)) ? -1 : v; });
        return out;
      };
    }

    function isAnswered() {
      const s = getSelection();
      if (type === "single") return s.length === 1;
      // "select N": only answered once N options are chosen, so we don't grade
      // (and mark wrong) a correct-so-far answer after the first checkbox.
      if (type === "multi") return s.length === item.answers.length;
      return s.length === item.items.length && s.every(v => v != null && v !== -1);
    }

    function isCorrect() {
      const s = getSelection();
      if (type === "single") return s.length === 1 && s[0] === item.answer;
      if (type === "multi") return sameSet(s, item.answers);
      if (type === "match") return item.answer.every((a, i) => s[i] === a);
      if (type === "order") return item.items.every((_, i) => s[i] === i); // correct pos == index
      return false;
    }

    function lockAndReveal() {
      inputs.forEach(x => {
        if (x.input) x.input.disabled = true;
        if (x.sel) x.sel.disabled = true;
      });
      // mark correctness
      if (type === "single" || type === "multi") {
        const correctSet = new Set(type === "single" ? [item.answer] : item.answers);
        inputs.forEach(x => {
          if (correctSet.has(x.orig)) x.row.classList.add("correct");
          else if (x.input.checked) x.row.classList.add("wrong");
        });
      } else {
        inputs.forEach(x => {
          const want = type === "order" ? x.orig : item.answer[x.orig];
          const got = x.sel.value === "" ? -1 : parseInt(x.sel.value, 10);
          x.row.classList.add(got === want ? "correct" : "wrong");
          // annotate expected
          const exp = type === "order" ? ("#" + (want + 1)) : item.categories[want];
          x.sel.insertAdjacentElement("afterend", el("span", "match-ans", "✓ " + exp));
        });
      }
      const ok = isCorrect();
      const why = el("div", "why " + (ok ? "ok" : "no"),
        (ok ? "<b>Correct.</b> " : "<b>Not quite.</b> ") + item.why);
      card.appendChild(why);
    }

    return { card, isAnswered, isCorrect, lockAndReveal, getSelection, type,
             tag: item.tag || "", locked: false, qid: item._qid };
  }

  /* ---- Renderer --------------------------------------------------------- */
  // `meta` is optional: { courseId, datasetId }. When present and window.Progress
  // is loaded, each graded question is recorded for weak-area tracking — see
  // shared/progress.js. Omit meta (or don't load progress.js) and nothing changes.
  function render(elId, cfg, meta) {
    const root = document.getElementById(elId);
    if (!root) return;
    const mode = cfg.mode || "practice";
    const passPct = Math.round((cfg.passMark ?? 0.7) * 100);
    const questions = cfg.questions.map((it, i) => buildQuestion(it, i, mode));

    function recordResult(q, idx) {
      if (!window.Progress || !meta || !meta.courseId) return;
      const qid = q.qid || ((meta.datasetId || "?") + ":" + (q.tag || "-") + ":" + idx);
      window.Progress.record(meta.courseId, qid, q.tag || "", q.isCorrect());
    }

    // Header
    const head = el("div", "quiz-head");
    head.innerHTML =
      '<div class="quiz-score"><span class="qs-label">' +
      (mode === "exam" ? 'Answered: <b class="qs-a">0</b> / ' + questions.length
                       : 'Score: <b class="qs-c">0</b> / ' + questions.length +
                         ' &nbsp;·&nbsp; <span class="qs-pct">0%</span>') +
      '</span></div><div class="meter"><span></span></div>' +
      '<div class="qs-results"></div>';
    root.appendChild(head);
    const bar = head.querySelector(".meter > span");
    const results = head.querySelector(".qs-results");

    let correct = 0, answered = 0, submitted = false;

    function tallyPractice() {
      correct = questions.filter(q => q.locked && q.isCorrect()).length;
      answered = questions.filter(q => q.locked).length;
      const pct = Math.round(correct / questions.length * 100);
      head.querySelector(".qs-c").textContent = correct;
      head.querySelector(".qs-pct").textContent = pct + "%";
      bar.style.width = (answered / questions.length * 100) + "%";
      bar.style.background = pct >= passPct ? "var(--good)"
                            : answered === questions.length ? "var(--bad)" : "var(--accent)";
    }

    function domainBreakdown() {
      const tags = {};
      questions.forEach(q => {
        const t = q.tag || "—";
        tags[t] = tags[t] || { c: 0, n: 0 };
        tags[t].n++;
        if (q.isCorrect()) tags[t].c++;
      });
      return Object.keys(tags).sort().map(t => {
        const { c, n } = tags[t];
        const p = Math.round(c / n * 100);
        return '<div class="dom-row"><span class="dom-name">' + t + '</span>' +
               '<div class="meter sm"><span style="width:' + p + '%;background:' +
               (p >= passPct ? 'var(--good)' : 'var(--bad)') + '"></span></div>' +
               '<span class="dom-num">' + c + '/' + n + ' · ' + p + '%</span></div>';
      }).join("");
    }

    function submitExam() {
      if (submitted) return;
      submitted = true;
      questions.forEach((q, idx) => { q.locked = true; q.lockAndReveal(); recordResult(q, idx); });
      correct = questions.filter(q => q.isCorrect()).length;
      const pct = Math.round(correct / questions.length * 100);
      const scaled = Math.round(pct * 10); // rough /1000 estimate
      const pass = pct >= passPct;
      const r = readiness(pct);
      bar.style.width = "100%";
      bar.style.background = pass ? "var(--good)" : "var(--bad)";
      results.innerHTML =
        '<div class="exam-result ' + (pass ? "pass" : "fail") + '">' +
          '<div class="big">' + pct + '%</div>' +
          '<div class="res-meta">' +
            '<div><b>' + correct + ' / ' + questions.length + '</b> correct</div>' +
            '<div>Est. scaled <b>~' + scaled + '/1000</b> <span class="small">(pass = 700)</span></div>' +
            '<div class="verdict ' + r.cls + '">' + (pass ? "✓ PASS" : "✗ BELOW PASS") + ' — ' + r.label + '</div>' +
          '</div>' +
        '</div>' +
        '<div class="dom-breakdown"><div class="dom-title">By domain</div>' + domainBreakdown() + '</div>' +
        '<button type="button" class="retry-btn no-print">Reset exam</button>';
      results.querySelector(".retry-btn").addEventListener("click", () => location.reload());
      head.querySelector(".qs-label").innerHTML = 'Submitted · <b>' + pct + '%</b>';
      submitBtn.disabled = true;
      results.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    // Wire up per-question interaction
    questions.forEach((q, idx) => {
      root.appendChild(q.card);
      if (mode === "practice") {
        // lock+reveal on first complete answer
        const handler = () => {
          if (q.locked || !q.isAnswered()) return;
          q.locked = true;
          q.lockAndReveal();
          recordResult(q, idx);
          tallyPractice();
          if (answered === questions.length) {
            const pct = Math.round(correct / questions.length * 100);
            const r = readiness(pct);
            results.innerHTML = '<p class="qs-verdict small ' + r.cls + '">' +
              (pct >= passPct ? "✓ " : "△ ") + "<b>" + pct + "%</b> — " + r.label + "</p>";
          }
        };
        q.card.addEventListener("change", handler);
        q.card.addEventListener("click", e => { if (e.target.closest(".opt-row")) setTimeout(handler, 0); });
      } else {
        // exam mode: track answered count
        q.card.addEventListener("change", () => {
          answered = questions.filter(x => x.isAnswered()).length;
          head.querySelector(".qs-a").textContent = answered;
          bar.style.width = (answered / questions.length * 100) + "%";
        });
      }
    });

    let submitBtn;
    if (mode === "exam") {
      submitBtn = el("button", "submit-btn no-print", "Submit exam &amp; see score");
      submitBtn.type = "button";
      submitBtn.addEventListener("click", () => {
        const unanswered = questions.filter(q => !q.isAnswered()).length;
        if (unanswered > 0 && !confirm(unanswered + " question(s) unanswered — submit anyway?")) return;
        submitExam();
      });
      root.appendChild(submitBtn);
    }
  }

  global.Quiz = { render };
})(window);
