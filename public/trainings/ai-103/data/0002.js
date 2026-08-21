/* AI-103 — quiz dataset for lesson 0002 (render target: q-plan). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0002'] = {
  passMark: 0.7,
  questions: [
    { tag:"D1",
      q:"A field-service app must classify incoming maintenance tickets into one of six fixed categories, running on a low-power edge device with unreliable cloud connectivity. Which model class best fits, and why not just deploy a general-purpose LLM there instead?",
      options:["A small language model (SLM) — its lower compute footprint fits the edge constraint, and the task is narrow enough not to need broader reasoning","A large language model (LLM) — broader reasoning capability always outperforms a narrower model on any task","A multimodal model — the ticket text might one day reference a photo","A Foundry Tool such as Content Understanding — it removes the need for a model entirely"],
      answer:0,
      why:"Fixed-category classification is narrow enough that an <b>SLM</b>'s smaller footprint (fits edge hardware, works offline) loses nothing versus an LLM's broader reasoning, which the task doesn't need. An LLM would be oversized and likely infeasible on the device; the multimodal option assumes an image input that isn't part of the stated scenario; classification still needs a model, a Foundry Tool doesn't remove that. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/foundry-models-overview' target='_blank' rel='noopener'>Foundry model catalog</a>." },

    { tag:"D1",
      q:"An app must never invent facts about your company's current internal policy. What's the right approach?",
      options:["Retrieval-augmented generation (RAG) grounded in the policy documents","A higher temperature setting","A larger context window with no retrieval","Fine-tuning on last year's policy PDF only"],
      answer:0,
      why:"Grounding answers in retrieved, current documents is <b>RAG</b> — it prevents fabrication about content the model wasn't trained on. Temperature doesn't add facts; a stale fine-tune goes out of date. <a href='https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103' target='_blank' rel='noopener'>AI-103 Study Guide — Plan and manage</a>." },

    { tag:"D1", type:"multi",
      q:"Select the TWO items that belong under 'Manage, monitor, and secure AI systems' rather than 'Implement responsible AI'.",
      options:["Quotas, scaling, and rate limits","Search index health and relevance performance","Safety filters and content moderation","Approval workflows for risky actions","Trace logging and provenance metadata"],
      answers:[0,1],
      why:"<b>Quotas/scaling</b> and <b>index health/relevance</b> are operational management concerns. Safety filters, approval workflows, and trace logging are responsible-AI governance controls. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/quotas-limits' target='_blank' rel='noopener'>Foundry quotas and limits</a>." },

    { tag:"D1",
      q:"You need your app to call a deployed model without ever hard-coding a secret. Which control provides this?",
      options:["Managed identity / keyless credentials","A higher rate limit","Private networking alone","A larger deployment quota"],
      answer:0,
      why:"<b>Managed identity</b> (keyless credentials) authenticates without embedded secrets. Private networking hides traffic from the internet but doesn't remove the need for credentials; rate limits and quotas are capacity controls. <a href='https://learn.microsoft.com/en-us/azure/ai-services/authentication' target='_blank' rel='noopener'>Foundry Tools authentication</a>." },

    { tag:"D1",
      q:"Model answers were accurate at launch but have gradually gotten worse as real-world inputs shifted. What should your monitoring have caught?",
      options:["Drift","A one-time evaluation failure","A rate-limit breach","An index health issue"],
      answer:0,
      why:"Gradual degradation as input distribution shifts is <b>drift</b> — it requires ongoing monitoring, not a single pre-launch evaluation. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/observability' target='_blank' rel='noopener'>Foundry observability</a>." },

    { tag:"D1",
      q:"Which practice gives you an auditable record of what an agent did and where its answer's content came from?",
      options:["Trace logging and provenance metadata","A safety filter","A private endpoint","A deployment quota"],
      answer:0,
      why:"<b>Trace logging with provenance metadata</b> is the auditable record. Safety filters block content but don't log lineage; private endpoints and quotas are unrelated to audit trails. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-use-of-ai-overview' target='_blank' rel='noopener'>Responsible AI in Microsoft Foundry</a>." },

    { tag:"D1",
      q:"An agent should not be allowed to send an email autonomously without a person confirming first. Which control implements this?",
      options:["An approval workflow","A safety filter","A vector index","A deployment quota"],
      answer:0,
      why:"A required human checkpoint before an action executes is an <b>approval workflow</b>. Safety filters classify content, not gate actions; indexes and quotas are unrelated. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/quotas-limits' target='_blank' rel='noopener'>Foundry quotas and limits</a>." },

    { tag:"D1",
      q:"Your team wants every change to a Foundry deployment — prompt template edits, content-filter tweaks, capacity changes — to go through code review and automated validation before reaching production, instead of being edited ad hoc in the portal. Which practice addresses this?",
      options:["CI/CD integration for the Foundry project","Switching the deployment to provisioned throughput","Increasing the model's temperature","Adding more safety evaluators"],
      answer:0,
      why:"Review-gated, automated releases come from <b>CI/CD integration</b>. Provisioned throughput is also a deployment-configuration decision, but it changes capacity/latency guarantees, not how changes get reviewed and shipped; temperature and safety evaluators don't touch the release process at all. <a href='https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/set-up-ci-cd-cli' target='_blank' rel='noopener'>Foundry CI/CD with GitHub Actions</a>." }
  ]
};
