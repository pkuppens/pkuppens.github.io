/* Claude Dev Foundations — quiz dataset for lesson 0002 (D1: Claude & AI Fluency Foundations).
   Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0002'] = {
  passMark: 0.7,
  questions: [
    { tag:"D1",
      q:"In Claude 101's vocabulary, what is a 'project'?",
      options:["Persistent, reusable context for a body of ongoing work","A single generated document or piece of code you can iterate on","A packaged, reusable instruction set","A connected third-party tool"],
      answer:0,
      why:"A <b>project</b> holds persistent context across a body of work. An <b>artifact</b> is the standalone generated output (doc/code/UI); a <b>skill</b> is packaged reusable instructions." },

    { tag:"D1",
      q:"What is an 'artifact' in Claude 101's terms?",
      options:["A standalone generated document, piece of code, or UI you can iterate on","A saved conversation history","A connected enterprise search index","A model version label (Opus/Sonnet/Haiku)"],
      answer:0,
      why:"An <b>artifact</b> is the standalone generated output you keep refining — distinct from a project (the surrounding persistent context)." },

    { tag:"D1", type:"match",
      q:"Match each 4D Framework competency to the question it answers.",
      items:["Which parts of this task should go to the AI at all?","How do I state the task so the AI can actually do it?","Is this output actually good, and by what standard?","Whose responsibility is the outcome, and did I verify it?"],
      categories:["Delegation","Description","Discernment","Diligence"],
      answer:[0,1,2,3],
      why:"<b>Delegation</b> decides what to hand off; <b>Description</b> is how you state it; <b>Discernment</b> judges the output; <b>Diligence</b> is owning and verifying the result." },

    { tag:"D1",
      q:"The AI Fluency course describes a 'Description–Discernment loop.' What does it capture?",
      options:["You describe, evaluate the result, then re-describe to close the gap — repeating until it's good enough","A one-shot rule: write one perfect prompt, then never revise it","A technical setting that controls model temperature","A checklist for choosing which model size to use"],
      answer:0,
      why:"It's an iterative cycle — description, evaluation (discernment), re-description — not a single-shot template." },

    { tag:"D1",
      q:"In the AI Capabilities and Limitations course, which property explains the base mechanism by which Claude generates text?",
      options:["Next-token prediction","Working memory","Steerability","Knowledge"],
      answer:0,
      why:"Claude generates one likely <b>next token</b> at a time — it isn't retrieving a stored, pre-written answer. The other three properties (knowledge, working memory, steerability) build on top of this mechanism." },

    { tag:"D1",
      q:"Which of the four capability/limitation properties is bounded by the context window, limiting how much a single turn can reason over?",
      options:["Working memory","Next-token prediction","Steerability","Knowledge"],
      answer:0,
      why:"<b>Working memory</b> is what fits in context for a given turn. Knowledge is about what the model learned during training; steerability is about how much instructions can redirect behavior." },

    { tag:"D1",
      q:"Which property describes how much your instructions can actually redirect Claude's behavior — and that this leverage has limits?",
      options:["Steerability","Next-token prediction","Working memory","Knowledge"],
      answer:0,
      why:"<b>Steerability</b> is specifically about how far instructions can move behavior, and where that influence runs out." },

    { tag:"D1",
      q:"According to the course framing, why is the AI Capabilities and Limitations course described as a 'companion' to the 4D Framework?",
      options:["It teaches the machine-side properties that the human competency of Discernment is responding to","It replaces the 4D Framework with a simpler 2-step process","It is a prerequisite you must pass before Claude 101","It only applies to enterprise deployments, not individuals"],
      answer:0,
      why:"The 4D Framework teaches human competencies (including Discernment); this course teaches the underlying <b>machine properties</b> those competencies are judging against." },

    { tag:"D1",
      q:"Claude 101's 'Expanding Claude's reach' section covers which capability?",
      options:["Connecting your own tools and enterprise search for deeper answers","Writing MCP servers from scratch in Python","Configuring hooks for deterministic command blocking","Choosing between the Opus, Sonnet, and Haiku models"],
      answer:0,
      why:"That section is about extending Claude with your own connected tools and enterprise search/research — not about MCP server implementation (that's Lesson 05) or model selection (that's Lesson 03)." },

    { tag:"D1",
      q:"A user gets a surprising, wrong answer to a question about a very recent event. Using the four capability/limitation properties, which is the most direct explanation?",
      options:["Knowledge — training data has a cutoff and may be stale for recent events","Steerability — the user's instructions weren't clear enough","Working memory — the context window was too small","Next-token prediction — the sampling temperature was too high"],
      answer:0,
      why:"A gap on very recent events is best explained by the <b>knowledge</b> property (training-data recency/coverage), not by steerability, memory, or the base generation mechanism." }
  ]
};
