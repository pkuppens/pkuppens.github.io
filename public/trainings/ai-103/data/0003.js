/* AI-103 — quiz dataset for lesson 0003 (render target: q-genai). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0003'] = {
  passMark: 0.7,
  questions: [
    { tag:"D2",
      q:"In the Foundry SDK client shape, what does the value passed as `model=` actually reference?",
      options:["Your model deployment name","The raw model checkpoint file","The Azure region","The system prompt id"],
      answer:0,
      why:"You call a model by its <b>deployment name</b>, not a raw file, region, or prompt id — same rule as D1's deployment planning. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/quickstarts/get-started-code' target='_blank' rel='noopener'>Foundry SDK quickstart</a>." },

    { tag:"D2",
      q:"Your support bot must always reflect this week's return-policy changes with no retrain cycle each time policy changes. A colleague proposes fine-tuning the model on the current policy doc instead. Why is RAG the better fit here?",
      options:["RAG retrieves the current policy at query time, so answers stay current without retraining; a fine-tune bakes in a snapshot that goes stale the moment policy changes again","Fine-tuning and RAG produce identical results, so either approach works equally well","Fine-tuning is inherently faster to keep current than RAG","RAG needs no data at all, while fine-tuning requires a curated dataset"],
      answer:0,
      why:"<b>RAG</b> grounds answers in a live, retrievable index, so updates to the source documents are reflected immediately. Fine-tuning captures a point-in-time snapshot in the model's weights — retraining is required every time policy changes, which is slower and costlier, not faster; RAG still needs an index built from the policy documents, so it isn't data-free either. <a href='https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview' target='_blank' rel='noopener'>RAG overview</a>." },

    { tag:"D2", type:"multi",
      q:"A code-review copilot's evaluation pipeline flags answers that cite API method names the model invented (they don't exist in the SDK), and separately flags answers that could enable data exfiltration if a developer followed them. Select the TWO evaluation dimensions this pipeline is scoring.",
      options:["Fabrication and safety","Relevance and quality","Latency and cost","Model size and training cutoff date"],
      answers:[0,1],
      why:"Inventing facts not grounded in reality (nonexistent API methods) is exactly <b>fabrication</b>; flagging output that could enable harmful real-world action is <b>safety</b>. Relevance/quality are also real evaluation dimensions, but this scenario's symptoms are specifically fabrication and safety, not off-topic or low-quality answers; latency/cost and model metadata aren't evaluation-quality signals at all. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-approach-gen-ai' target='_blank' rel='noopener'>Evaluation approach for generative AI apps</a>." },

    { tag:"D2",
      q:"Which building block of a Foundry agent defines the functions/APIs it's allowed to call and their contracts?",
      options:["Tool schema","Conversation-tracking approach","Role and goal","Knowledge integration"],
      answer:0,
      why:"The <b>tool schema</b> defines callable functions/APIs and their contracts. Conversation-tracking is memory; role/goal defines purpose; knowledge integration is retrieval/grounding sources. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/tools/function-calling' target='_blank' rel='noopener'>Function calling with Foundry agents</a>." },

    { tag:"D2",
      q:"A task needs three specialized assistants — a researcher, a writer, and a fact-checker — handing work to each other. Which pattern do you build?",
      options:["An orchestrated multi-agent solution","A single-agent solution","A one-shot model call","A pure RAG pipeline with no agent"],
      answer:0,
      why:"Multiple specialized roles collaborating is an <b>orchestrated multi-agent</b> solution. A single agent or one-shot call can't represent distinct collaborating roles. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/connected-agents' target='_blank' rel='noopener'>Multi-agent orchestration in Foundry</a>." },

    { tag:"D2",
      q:"An agent should be allowed to draft a refund but a human must approve it before it's issued. Which control implements this?",
      options:["An approval-flow safeguard for a semiautonomous workflow","A higher temperature setting","A larger tool schema","Chain-of-thought self-critique"],
      answer:0,
      why:"A required human checkpoint before an autonomous action executes is an <b>approval-flow safeguard</b>. The other options tune generation or reasoning, not human gating. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-use-of-ai-overview' target='_blank' rel='noopener'>Responsible AI in Microsoft Foundry</a>." },

    { tag:"D2", type:"match",
      q:"Match each optimization technique to what it primarily improves.",
      items:["Adjusting temperature and top-p","Implementing tracing, token analytics, and latency breakdowns","Chain-of-thought self-critique loops"],
      categories:["Generation behavior","Observability","Reasoning quality"],
      answer:[0,1,2],
      why:"Prompt/parameter tuning shapes <b>generation behavior</b>; tracing/analytics/latency give <b>observability</b>; self-critique loops improve <b>reasoning quality</b>. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering' target='_blank' rel='noopener'>Prompt engineering techniques</a>." },

    { tag:"D2", type:"order",
      q:"Put the generative-app build loop in the correct order.",
      items:["Deploy an LLM or multimodal model to a Foundry project","Configure the app to connect to the Foundry project","Implement RAG so answers are grounded","Evaluate for fabrication, relevance, quality, and safety"],
      why:"You deploy the model, connect the app to the project, ground it with RAG, then evaluate before shipping — in that order. <a href='https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview' target='_blank' rel='noopener'>RAG overview</a>." }
  ]
};
