/* AI-103 — quiz dataset for lesson 0003 (render target: q-genai). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0003'] = {
  passMark: 0.7,
  questions: [
    { tag:"D2",
      q:"In the Foundry SDK client shape, what does the value passed as `model=` actually reference?",
      options:["Your model deployment name","The raw model checkpoint file","The Azure region","The system prompt id"],
      answer:0,
      why:"You call a model by its <b>deployment name</b>, not a raw file, region, or prompt id — same rule as D1's deployment planning." },

    { tag:"D2",
      q:"An app must answer questions using your company's current internal documents, not the model's training data. What do you implement?",
      options:["Retrieval-augmented generation (RAG)","A longer system prompt only","A lower top-p value","Fine-tuning on last quarter's docs"],
      answer:0,
      why:"Grounding on retrieved, current documents at inference time is <b>RAG</b>. Prompt length and sampling don't add facts; a stale fine-tune goes out of date immediately." },

    { tag:"D2", type:"multi",
      q:"Select the TWO things a generative-AI evaluation step should specifically detect before an app ships.",
      options:["Fabrication (made-up facts)","Safety issues","The exact GPU used to train the base model","Relevance to the user's question","The model's training cutoff date"],
      answers:[0,1],
      why:"Evaluation targets <b>fabrication</b> and <b>safety</b> (plus relevance/quality — pick the two flagged here: fabrication and safety are the named risk categories). GPU hardware and training cutoff aren't evaluation outputs." },

    { tag:"D2",
      q:"Which building block of a Foundry agent defines the functions/APIs it's allowed to call and their contracts?",
      options:["Tool schema","Conversation-tracking approach","Role and goal","Knowledge integration"],
      answer:0,
      why:"The <b>tool schema</b> defines callable functions/APIs and their contracts. Conversation-tracking is memory; role/goal defines purpose; knowledge integration is retrieval/grounding sources." },

    { tag:"D2",
      q:"A task needs three specialized assistants — a researcher, a writer, and a fact-checker — handing work to each other. Which pattern do you build?",
      options:["An orchestrated multi-agent solution","A single-agent solution","A one-shot model call","A pure RAG pipeline with no agent"],
      answer:0,
      why:"Multiple specialized roles collaborating is an <b>orchestrated multi-agent</b> solution. A single agent or one-shot call can't represent distinct collaborating roles." },

    { tag:"D2",
      q:"An agent should be allowed to draft a refund but a human must approve it before it's issued. Which control implements this?",
      options:["An approval-flow safeguard for a semiautonomous workflow","A higher temperature setting","A larger tool schema","Chain-of-thought self-critique"],
      answer:0,
      why:"A required human checkpoint before an autonomous action executes is an <b>approval-flow safeguard</b>. The other options tune generation or reasoning, not human gating." },

    { tag:"D2", type:"match",
      q:"Match each optimization technique to what it primarily improves.",
      items:["Adjusting temperature and top-p","Implementing tracing, token analytics, and latency breakdowns","Chain-of-thought self-critique loops"],
      categories:["Generation behavior","Observability","Reasoning quality"],
      answer:[0,1,2],
      why:"Prompt/parameter tuning shapes <b>generation behavior</b>; tracing/analytics/latency give <b>observability</b>; self-critique loops improve <b>reasoning quality</b>." },

    { tag:"D2", type:"order",
      q:"Put the generative-app build loop in the correct order.",
      items:["Deploy an LLM or multimodal model to a Foundry project","Configure the app to connect to the Foundry project","Implement RAG so answers are grounded","Evaluate for fabrication, relevance, quality, and safety"],
      why:"You deploy the model, connect the app to the project, ground it with RAG, then evaluate before shipping — in that order." }
  ]
};
