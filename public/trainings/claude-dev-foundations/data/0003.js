/* Claude Dev Foundations — quiz dataset for lesson 0003 (D2: Claude Platform & API).
   Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0003'] = {
  passMark: 0.7,
  questions: [
    { tag:"D2",
      q:"Claude Platform 101 frames choosing between Opus, Sonnet, and Haiku primarily as:",
      options:["A cost-and-latency trade-off, not simply picking the 'smartest' model","A one-time account setting that can never be changed","A choice that only affects context window size","A decision that has no effect on pricing"],
      answer:0,
      why:"The course explicitly frames model choice as a <b>cost-and-latency trade-off</b> — bigger isn't always the right call for a given task." },

    { tag:"D2", type:"order",
      q:"Put the three steps of the agent loop in the order Claude Platform 101 teaches them.",
      items:["Act (call a tool or respond)","Observe the result","Decide what to do next"],
      why:"The agent loop is <b>act → observe → decide</b>, repeating until the task is complete." },

    { tag:"D2",
      q:"What does 'tool use' let Claude do, per Claude Platform 101?",
      options:["Interact with external systems and real-world data beyond its own text generation","Automatically switch to a cheaper model when idle","Replace the need for an API key","Store conversation history permanently across sessions"],
      answer:0,
      why:"<b>Tool use</b> is how Claude reaches outside plain text generation to call external systems/data — a core piece of the agent loop's 'act' step." },

    { tag:"D2",
      q:"In Building with the Claude API's RAG module, what is the purpose of chunking and embeddings before retrieval?",
      options:["Break content into retrievable pieces and represent them so relevant ones can be found for a query","Compress the model weights to reduce API cost","Encrypt documents before they reach the API","Replace the need for a context window entirely"],
      answer:0,
      why:"Chunking splits source content into retrievable units; embeddings let you find the ones <b>relevant to a given query</b> — the foundation of a RAG pipeline." },

    { tag:"D2",
      q:"Why does RAG exist, given that Claude already has a context window (working memory)?",
      options:["Working memory is finite and costly to fill, so retrieval brings in only the relevant slice instead of everything","RAG makes the context window unlimited","RAG replaces the need for prompt caching entirely","RAG is required before any tool use is possible"],
      answer:0,
      why:"RAG retrieves only what's relevant instead of stuffing the whole corpus into a finite, costly context window." },

    { tag:"D2",
      q:"What is prompt caching, per Building with the Claude API?",
      options:["Reusing previously-processed prompt content to reduce cost/latency on repeated large context","A way to permanently store a user's chat history","A method for compressing images before analysis","A setting that disables extended thinking"],
      answer:0,
      why:"<b>Prompt caching</b> reuses previously-processed context (e.g. a long system prompt or document) so repeated calls don't re-pay the full cost." },

    { tag:"D2", type:"match",
      q:"Match each agent-workflow pattern to its description.",
      items:["Running multiple sub-tasks at once and combining results","Passing output from one step directly into the next, in sequence","Directing a request to different handling based on its content"],
      categories:["Parallelization","Chaining","Routing"],
      answer:[0,1,2],
      why:"<b>Parallelization</b> runs sub-tasks concurrently; <b>chaining</b> is sequential step-to-step; <b>routing</b> picks a path based on the input." },

    { tag:"D2",
      q:"Per Building with the Claude API, what distinguishes a fixed 'workflow' (chaining/routing/parallelization) from an 'agent'?",
      options:["A workflow's steps are predefined; an agent decides its own next step via the agent loop","A workflow can only be used with the Haiku model","An agent cannot call tools, only workflows can","There is no meaningful distinction — the terms are interchangeable"],
      answer:0,
      why:"A <b>workflow</b> follows a known, fixed sequence. An <b>agent</b> decides its next step dynamically through the agent loop when the path isn't known in advance." },

    { tag:"D2",
      q:"Which built-in extension, covered in Claude Platform 101's 'Extending your agent' module, lets Claude connect to third-party tool/data integrations via a standard protocol?",
      options:["MCP servers","Prompt caching","The Files API","Extended thinking"],
      answer:0,
      why:"<b>MCP servers</b> are the standardized way to plug in third-party tools/data — covered in both Claude Platform 101 and, in depth, in Lesson 05 of this course." },

    { tag:"D2",
      q:"What does Building with the Claude API's coverage of citations, image analysis, and PDF support have in common?",
      options:["They are all features that extend what kinds of input Claude can ground answers on directly","They are all deprecated in favor of MCP","They all require a separate Anthropic account from the API key","They only work when extended thinking is disabled"],
      answer:0,
      why:"Citations, image analysis, and PDF support all extend the <b>kinds of input</b> Claude can directly reason over and ground responses in — distinct from RAG's external-retrieval approach." }
  ]
};
