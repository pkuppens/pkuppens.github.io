/* AI-103 — mock exam 2 (render target: mock2). Engine: shared/quiz.js
   Exam-weighted: D1 x8 (27%), D2 x10 (33%), D3 x4 (13%), D4 x4 (13%), D5 x4 (13%) = 30 */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0008'] = {
  mode: "exam",
  passMark: 0.7,
  questions: [
    // ---------- Domain 1 (8) ----------
    { tag:"D1", q:"A scenario needs an app that both reads a diagram and answers questions about it. Which model class must you choose at the planning stage?",
      options:["A multimodal model","An SLM tuned for text only","A pure vector-search index","A code model"], answer:0,
      why:"Reasoning across image + text requires choosing a <b>multimodal model</b> up front, a D1 planning decision. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/foundry-models-overview' target='_blank' rel='noopener'>Foundry model catalog</a>." },

    { tag:"D1", q:"An architecture must keep model traffic entirely off the public internet, reachable only from inside the corporate VNet. What do you configure?",
      options:["Private networking","A higher rate limit","A larger deployment quota","A safety evaluator"], answer:0,
      why:"Keeping traffic off the public internet is a <b>private networking</b> configuration, a D1 security control. <a href='https://learn.microsoft.com/en-us/azure/ai-services/cognitive-services-virtual-networks' target='_blank' rel='noopener'>Virtual networks for Foundry Tools</a>." },

    { tag:"D1", q:"Which practice specifically catches search index degradation before users notice worse retrieval results?",
      options:["Monitoring data ingestion quality and search index health","A one-time load test before launch","Increasing the deployment quota","Adding a content filter"], answer:0,
      why:"Ongoing <b>index health and ingestion-quality monitoring</b> is the D1 objective that catches this, not a one-time test. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/observability' target='_blank' rel='noopener'>Foundry observability</a>." },

    { tag:"D1", q:"A governance team wants an auditable record of exactly which source document backed a given agent answer. Which control provides this?",
      options:["Provenance metadata via trace logging","A safety filter","A private endpoint","A deployment quota"], answer:0,
      why:"Traceable source attribution is <b>provenance metadata</b>, captured through trace logging. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-use-of-ai-overview' target='_blank' rel='noopener'>Responsible AI in Microsoft Foundry</a>." },

    { tag:"D1", type:"multi", q:"Select the TWO items that fall under 'implement responsible AI' rather than 'manage, monitor, and secure'.",
      options:["Configuring safety filters and guardrails","Applying responsible-AI instrumentation (evaluators, safety evaluations)","Monitoring quotas and rate limits","Configuring managed identity","Monitoring search index health"], answers:[0,1],
      why:"<b>Safety filters/guardrails</b> and <b>RAI instrumentation/evaluators</b> are responsible-AI controls. Quotas, identity, and index health are operational management. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/quotas-limits' target='_blank' rel='noopener'>Foundry quotas and limits</a>." },

    { tag:"D1", q:"An agent must be blocked from calling any tool outside an explicit allow-list, regardless of what the model 'decides'. Which control enforces this?",
      options:["Tool-access controls","A larger context window","A cheaper model tier","A faster deployment region"], answer:0,
      why:"Restricting which tools an agent may invoke is a <b>tool-access control</b>, part of governing agent behavior. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-use-of-ai-overview' target='_blank' rel='noopener'>Responsible AI in Microsoft Foundry</a>." },

    { tag:"D1", q:"Which two-word phrase describes designing the Azure infrastructure an AI app or agent will run on, before any model is deployed?",
      options:["Infrastructure design","Model evaluation","Content moderation","Speech integration"], answer:0,
      why:"Designing the hosting infrastructure for AI apps/agents is <b>infrastructure design</b>, the first step under 'set up AI solutions in Foundry'. <a href='https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103' target='_blank' rel='noopener'>AI-103 Study Guide — Plan and manage</a>." },

    { tag:"D1", q:"A cost review shows one agent workload consuming a disproportionate share of quota. What should have flagged this earlier?",
      options:["Managing quotas, scaling, and cost footprint per workload","A safety evaluation","A private endpoint audit","A CI/CD pipeline check"], answer:0,
      why:"Per-workload <b>quota/scaling/cost management</b> is exactly the D1 practice that surfaces this. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/quotas-limits' target='_blank' rel='noopener'>Foundry quotas and limits</a>." },

    // ---------- Domain 2 (10) ----------
    { tag:"D2", q:"Which SDK call actually sends the prompt to the deployed model and returns a completion?",
      options:["openai.responses.create(...)","AIProjectClient(...)","DefaultAzureCredential()","get_openai_client()"], answer:0,
      why:"Sending input and receiving a completion is done via <b>responses.create(...)</b>. The other calls set up the client and credential. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/quickstarts/get-started-code' target='_blank' rel='noopener'>Foundry SDK quickstart</a>." },

    { tag:"D2", q:"An app must plan several steps, call a database API, then compose a final answer. What do you build?",
      options:["An agent with a tool schema","A single embedding call","A static FAQ lookup","An image classifier"], answer:0,
      why:"Multi-step planning plus tool use requires an <b>agent</b> with defined tools. <a href='https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103' target='_blank' rel='noopener'>AI-103 Study Guide — Generative AI and agents</a>." },

    { tag:"D2", q:"Which Foundry agent building block lets it ground answers in your organization's documents, not just its own memory of the conversation?",
      options:["Knowledge integration","Conversation-tracking","Tool schema alone","Deployment region"], answer:0,
      why:"Grounding on external documents is <b>knowledge integration</b>, distinct from conversation memory or callable tools. <a href='https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview' target='_blank' rel='noopener'>RAG overview</a>." },

    { tag:"D2", q:"A pipeline routes easy questions to a cheap model and hard questions to an expensive one. What optimization pattern is this?",
      options:["Orchestrating multiple models / hybrid rules engines","Chain-of-thought self-critique","RAG grounding","A single-agent solution"], answer:0,
      why:"Combining multiple models by routing is <b>orchestrating multiple models</b>, a D2 optimization technique. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/concepts/prompt-engineering' target='_blank' rel='noopener'>Prompt engineering techniques</a>." },

    { tag:"D2", type:"multi", q:"Select the TWO observability signals the study guide names for a deployed generative system.",
      options:["Token analytics","Latency breakdowns","The model's training dataset size","The Azure subscription name"], answers:[0,1],
      why:"<b>Token analytics</b> and <b>latency breakdowns</b> are named observability signals; dataset size and subscription name aren't runtime observability data. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/observability' target='_blank' rel='noopener'>Foundry observability</a>." },

    { tag:"D2", q:"An autonomous agent workflow includes explicit safeguards and approval-flow controls before high-risk actions execute. What is this pattern called?",
      options:["A semiautonomous workflow with safeguards","A fully manual, human-only workflow","A pure RAG pipeline","A one-shot completion"], answer:0,
      why:"Autonomy with built-in safeguards/approval gates is a <b>semiautonomous workflow</b>. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-use-of-ai-overview' target='_blank' rel='noopener'>Responsible AI in Microsoft Foundry</a>." },

    { tag:"D2", q:"Which practice detects that a model's answer contains a claim not supported by any retrieved source?",
      options:["Evaluating for fabrication","Adjusting temperature","Increasing max tokens","Switching deployment regions"], answer:0,
      why:"Detecting unsupported claims is <b>fabrication evaluation</b>, a named D2 evaluation dimension. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-approach-gen-ai' target='_blank' rel='noopener'>Evaluation approach for generative AI apps</a>." },

    { tag:"D2", q:"Which Foundry integration point lets a generative workflow call out to your existing internal APIs?",
      options:["Foundry SDK connectors","A vector index by itself","A safety filter","A deployment quota"], answer:0,
      why:"Integrating generative workflows with external systems uses <b>Foundry SDK connectors</b>. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/tools/function-calling' target='_blank' rel='noopener'>Function calling with Foundry agents</a>." },

    { tag:"D2", type:"match", q:"Match each agent-orchestration scenario to its pattern.",
      items:["One well-tooled assistant completes the whole task alone","A researcher, writer, and editor agent hand off work in sequence","The agent drafts an action but a human must approve it"],
      categories:["Single agent","Orchestrated multi-agent","Semiautonomous with approval safeguard"],
      answer:[0,1,2],
      why:"One role end-to-end = <b>single agent</b>; specialized roles collaborating = <b>orchestrated multi-agent</b>; drafting + human gate = <b>semiautonomous with approval</b>. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/connected-agents' target='_blank' rel='noopener'>Multi-agent orchestration in Foundry</a>." },

    { tag:"D2", q:"Which practice specifically checks that a generated answer doesn't contain unsafe or disallowed content before it reaches the user?",
      options:["A safety evaluation as part of the app's evaluation step","A deployment quota increase","A larger context window","A faster region"], answer:0,
      why:"Checking generated output for unsafe content is a <b>safety evaluation</b>, one of the named D2 evaluation dimensions alongside fabrication, relevance, and quality. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-approach-gen-ai' target='_blank' rel='noopener'>Evaluation approach for generative AI apps</a>." },

    // ---------- Domain 3 (4) ----------
    { tag:"D3", q:"A creative team needs to change only the sky in an existing photo while keeping the foreground untouched. Which capability fits?",
      options:["Mask-based image editing","Fresh text-to-image generation","Video generation","Speech-to-text"], answer:0,
      why:"Modifying a targeted region of an existing image is <b>mask-based editing</b>, not full regeneration. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/dall-e' target='_blank' rel='noopener'>Azure OpenAI image generation</a>." },

    { tag:"D3", q:"An accessibility team needs an extended, guideline-aligned description of a product photo for screen readers. What do you configure?",
      options:["Alt-text/extended description generation aligned to accessibility guidelines","Image inpainting","Object detection only","Video captioning"], answer:0,
      why:"This is specifically <b>alt-text/extended description generation</b> configured for accessibility, not raw object detection. <a href='https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview-image-analysis' target='_blank' rel='noopener'>Azure AI Vision Image Analysis</a>." },

    { tag:"D3", q:"An app must identify which specific region of a product image shows a defect. Which capability applies?",
      options:["Identifying objects, components, or regions within images","Text-to-video generation","Speech translation","Sentiment analysis"], answer:0,
      why:"Locating specific regions/components within an image is a named D3 Content Understanding capability. <a href='https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/ai-103' target='_blank' rel='noopener'>AI-103 Study Guide — Computer vision</a>." },

    { tag:"D3", q:"Which visual-safety control specifically enforces brand and prohibited-symbol rules on AI-generated marketing images?",
      options:["Visual policy enforcement (watermarks, brand usage, prohibited symbols)","Fabrication evaluation","Drift monitoring","Tool-access control"], answer:0,
      why:"Brand/compliance rules on generated visuals are enforced via <b>visual policy enforcement</b>, a D3-specific control. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-safety/overview' target='_blank' rel='noopener'>Azure AI Content Safety</a>." },

    // ---------- Domain 4 (4) ----------
    { tag:"D4", q:"An app needs to pull entities, topics, and a structured JSON summary from thousands of support tickets at scale with no custom prompting. What's the best fit?",
      options:["Azure Language in Foundry Tools","A hand-written LLM prompt each time","Azure Speech","Azure Content Understanding for video"], answer:0,
      why:"Standard structured extraction at scale is the strength of <b>Azure Language</b>, a purpose-built Foundry Tool. <a href='https://learn.microsoft.com/en-us/azure/ai-services/language-service/overview' target='_blank' rel='noopener'>Azure AI Language overview</a>." },

    { tag:"D4", q:"A live customer-service agent must both hear the caller and speak replies in one continuous conversation loop. What's the correct framing?",
      options:["Speech integrated as an agent modality","Two disconnected batch jobs","A text-only interaction","A single transcription call with no synthesis"], answer:0,
      why:"Continuous two-way voice interaction is <b>speech as an integrated agent modality</b>, not isolated calls. <a href='https://learn.microsoft.com/en-us/azure/ai-services/speech-service/overview' target='_blank' rel='noopener'>Azure AI Speech overview</a>." },

    { tag:"D4", q:"Which capability detects that a chat message may contain sensitive personal data before an agent responds?",
      options:["Sensitive-content detection via Azure Language","Speech synthesis","Video segmentation","Image generation"], answer:0,
      why:"Detecting sensitive content in text is a D4 <b>Azure Language</b> detection capability. <a href='https://learn.microsoft.com/en-us/azure/ai-services/language-service/overview' target='_blank' rel='noopener'>Azure AI Language overview</a>." },

    { tag:"D4", q:"A global support team needs replies auto-translated into the caller's language using an LLM-powered flow instead of Azure Translator. Is this valid per the study guide?",
      options:["Yes — LLM-powered translation flows are an explicitly named alternative","No — only Azure Translator is allowed","No — translation must always be manual","Yes, but only for speech, never text"], answer:0,
      why:"The study guide explicitly names <b>LLM-powered translation flows</b> as a valid alternative to Azure Translator for text. <a href='https://learn.microsoft.com/en-us/azure/ai-services/translator/overview' target='_blank' rel='noopener'>Azure AI Translator overview</a>." },

    // ---------- Domain 5 (4) ----------
    { tag:"D5", q:"Which search type re-ranks results using language understanding, on top of an initial candidate set?",
      options:["Semantic search","Plain keyword search","OCR","Field extraction"], answer:0,
      why:"Relevance re-ranking via language understanding is <b>semantic search</b>. <a href='https://learn.microsoft.com/en-us/azure/search/semantic-search-overview' target='_blank' rel='noopener'>Azure AI Search semantic ranking</a>." },

    { tag:"D5", q:"Which pipeline produces markdown output from a document, specifically formatted for downstream LLM reasoning?",
      options:["A Content Understanding analyzer configured for markdown output","Azure Translator","Azure Speech","A vector index alone"], answer:0,
      why:"Structured/markdown output for downstream reasoning is a named <b>Content Understanding analyzer</b> capability. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview' target='_blank' rel='noopener'>Azure AI Content Understanding overview</a>." },

    { tag:"D5", q:"An enrichment step adds structure to text and layout as documents are ingested. What is this called?",
      options:["Enrichment using custom or built-in skills","Field extraction","Semantic search","Speech synthesis"], answer:0,
      why:"Adding structure during ingestion is <b>enrichment</b>, distinct from downstream search or field extraction. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview' target='_blank' rel='noopener'>Azure AI Content Understanding overview</a>." },

    { tag:"D5", type:"order", q:"Put the steps of a document RAG ingestion pipeline in order.",
      items:["OCR the scanned document","Run enrichment skills over the extracted text and layout","Index the enriched content for semantic/hybrid search","Connect the index to an agent's knowledge tool"],
      why:"OCR extracts text, enrichment adds structure, indexing enables search, and the index is then connected to the agent — in that order. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview' target='_blank' rel='noopener'>Azure AI Content Understanding overview</a>." }
  ]
};
