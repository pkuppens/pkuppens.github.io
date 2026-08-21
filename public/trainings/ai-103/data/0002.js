/* AI-103 — quiz dataset for lesson 0002 (render target: q-plan). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0002'] = {
  passMark: 0.7,
  questions: [
    { tag:"D1",
      q:"A scenario needs a fast, cheap response for a narrow, well-defined task. Which model class best fits?",
      options:["A small language model (SLM)","A large language model (LLM)","A multimodal model","A Foundry Tool"],
      answer:0,
      why:"Cost/latency-sensitive, narrow-scope tasks favor a <b>small language model</b>. LLMs are for broader reasoning; multimodal models add modalities you don't need here; Foundry Tools are prebuilt capabilities, not general models." },

    { tag:"D1",
      q:"An app must never invent facts about your company's current internal policy. What's the right approach?",
      options:["Retrieval-augmented generation (RAG) grounded in the policy documents","A higher temperature setting","A larger context window with no retrieval","Fine-tuning on last year's policy PDF only"],
      answer:0,
      why:"Grounding answers in retrieved, current documents is <b>RAG</b> — it prevents fabrication about content the model wasn't trained on. Temperature doesn't add facts; a stale fine-tune goes out of date." },

    { tag:"D1", type:"multi",
      q:"Select the TWO items that belong under 'Manage, monitor, and secure AI systems' rather than 'Implement responsible AI'.",
      options:["Quotas, scaling, and rate limits","Search index health and relevance performance","Safety filters and content moderation","Approval workflows for risky actions","Trace logging and provenance metadata"],
      answers:[0,1],
      why:"<b>Quotas/scaling</b> and <b>index health/relevance</b> are operational management concerns. Safety filters, approval workflows, and trace logging are responsible-AI governance controls." },

    { tag:"D1",
      q:"You need your app to call a deployed model without ever hard-coding a secret. Which control provides this?",
      options:["Managed identity / keyless credentials","A higher rate limit","Private networking alone","A larger deployment quota"],
      answer:0,
      why:"<b>Managed identity</b> (keyless credentials) authenticates without embedded secrets. Private networking hides traffic from the internet but doesn't remove the need for credentials; rate limits and quotas are capacity controls." },

    { tag:"D1",
      q:"Model answers were accurate at launch but have gradually gotten worse as real-world inputs shifted. What should your monitoring have caught?",
      options:["Drift","A one-time evaluation failure","A rate-limit breach","An index health issue"],
      answer:0,
      why:"Gradual degradation as input distribution shifts is <b>drift</b> — it requires ongoing monitoring, not a single pre-launch evaluation." },

    { tag:"D1",
      q:"Which practice gives you an auditable record of what an agent did and where its answer's content came from?",
      options:["Trace logging and provenance metadata","A safety filter","A private endpoint","A deployment quota"],
      answer:0,
      why:"<b>Trace logging with provenance metadata</b> is the auditable record. Safety filters block content but don't log lineage; private endpoints and quotas are unrelated to audit trails." },

    { tag:"D1",
      q:"An agent should not be allowed to send an email autonomously without a person confirming first. Which control implements this?",
      options:["An approval workflow","A safety filter","A vector index","A deployment quota"],
      answer:0,
      why:"A required human checkpoint before an action executes is an <b>approval workflow</b>. Safety filters classify content, not gate actions; indexes and quotas are unrelated." },

    { tag:"D1",
      q:"To make deployments repeatable instead of manual portal clicks each time, you should:",
      options:["Integrate the Foundry project with CI/CD pipelines","Increase the model's temperature","Add more safety evaluators","Switch to a smaller model"],
      answer:0,
      why:"Repeatable, automated releases come from <b>CI/CD integration</b>. The other options don't address deployment repeatability." }
  ]
};
