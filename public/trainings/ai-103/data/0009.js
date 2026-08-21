/* AI-103 — mock exam 3 (render target: mock3) — readiness gate. Engine: shared/quiz.js
   Exam-weighted: D1 x8 (27%), D2 x10 (33%), D3 x4 (13%), D4 x4 (13%), D5 x4 (13%) = 30 */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0009'] = {
  mode: "exam",
  passMark: 0.7,
  questions: [
    // ---------- Domain 1 (8) ----------
    { tag:"D1", q:"A task must interpret both an uploaded receipt image and a written question about it in one call. What model class do you choose during planning?",
      options:["A multimodal model","A code-completion model","A speech-only model","A pure embedding model"], answer:0,
      why:"Joint image+text reasoning requires choosing a <b>multimodal model</b> at the planning stage. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/foundry-models-overview' target='_blank' rel='noopener'>Foundry model catalog</a>." },

    { tag:"D1", q:"Which deployment configuration choice most directly affects predictable capacity for a high-traffic production workload?",
      options:["Provisioned throughput vs. standard deployment","The model's system prompt","The agent's tool schema","The RAG chunk size"], answer:0,
      why:"Capacity predictability comes from the <b>deployment option</b> chosen (e.g. provisioned throughput), a D1 planning decision. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/quotas-limits' target='_blank' rel='noopener'>Foundry quotas and limits</a>." },

    { tag:"D1", q:"A security review requires that role assignments follow least privilege for every AI resource — each identity should have only the permissions it needs, nothing more. The app already authenticates via managed identity with no stored keys. Does that satisfy the least-privilege requirement on its own?",
      options:["No — managed identity establishes a keyless identity, but least privilege still requires role-based access policies scoping what that identity is permitted to do","Yes — managed identity is inherently scoped to least privilege by default","No — a deployment quota is what enforces least privilege, not identity or roles","Yes, as long as a vector index is also configured"], answer:0,
      why:"<b>Managed identity</b> answers 'who is this, without a stored secret'; <b>role-based access policies</b> answer 'what is this identity allowed to do.' A managed identity with an overly broad role assignment still violates least privilege — the two controls are complementary, not substitutes. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-use-of-ai-overview' target='_blank' rel='noopener'>Responsible AI in Microsoft Foundry</a>." },

    { tag:"D1", q:"Which monitoring signal specifically tells you whether a deployed model's safety behavior has changed since launch?",
      options:["Safety events monitoring","Rate-limit monitoring","Deployment quota monitoring","CI/CD pipeline status"], answer:0,
      why:"Changes in safety behavior over time are caught by <b>safety events monitoring</b>, distinct from capacity/pipeline signals. <a href='https://learn.microsoft.com/en-us/azure/foundry/concepts/observability' target='_blank' rel='noopener'>Foundry observability</a>." },

    { tag:"D1", type:"multi", q:"Select the TWO items that belong under 'choose the appropriate Foundry services' rather than 'set up AI solutions in Foundry'.",
      options:["Choosing a method for retrieval and indexing","Choosing memory/tool/knowledge integration services for agents","Configuring model and agent deployments","Integrating CI/CD pipelines","Designing Azure infrastructure"], answers:[0,1],
      why:"<b>Retrieval/indexing method</b> and <b>agent memory/tool/knowledge services</b> are service-selection decisions. Deployment config, CI/CD, and infra design are 'set up' tasks. <a href='https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview' target='_blank' rel='noopener'>RAG overview</a>." },

    { tag:"D1", q:"An agent is granted access to a payments API but must never be allowed to call it without a human review step. Which control combination applies?",
      options:["Tool-access controls plus an approval workflow","A private endpoint alone","A larger deployment quota alone","A safety filter alone"], answer:0,
      why:"Restricting which tools are callable AND gating execution on human review combines <b>tool-access control</b> with an <b>approval workflow</b>. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-use-of-ai-overview' target='_blank' rel='noopener'>Responsible AI in Microsoft Foundry</a>." },

    { tag:"D1", q:"Which practice produces the evidence an auditor would need to reconstruct why an agent took a specific action?",
      options:["Trace logging with provenance metadata","A safety filter","A deployment quota","A private endpoint"], answer:0,
      why:"Reconstructable audit evidence comes from <b>trace logging and provenance metadata</b>. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-use-of-ai-overview' target='_blank' rel='noopener'>Responsible AI in Microsoft Foundry</a>." },

    { tag:"D1", q:"A cost spike traces back to an agent workload with no configured limits. What should have been set up in advance?",
      options:["Quotas and rate limits for the workload","A safety evaluator","A private endpoint","A CI/CD pipeline"], answer:0,
      why:"Preventing uncontrolled cost requires configured <b>quotas and rate limits</b>, a D1 management practice. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/quotas-limits' target='_blank' rel='noopener'>Foundry quotas and limits</a>." },

    // ---------- Domain 2 (10) ----------
    { tag:"D2", q:"Which credential type lets your Foundry SDK client authenticate using your signed-in identity instead of an API key?",
      options:["DefaultAzureCredential","AzureKeyCredential","A hard-coded bearer token","A shared connection string"], answer:0,
      why:"Identity-based, keyless authentication is <b>DefaultAzureCredential</b>. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/quickstarts/get-started-code' target='_blank' rel='noopener'>Foundry SDK quickstart</a>." },

    { tag:"D2", q:"A knowledge base changes daily and answers must always reflect the latest version without retraining. What approach fits?",
      options:["RAG grounded in the live knowledge base","Fine-tuning weekly","A static system prompt with hard-coded facts","A larger max-token limit"], answer:0,
      why:"Always-current answers without retraining come from <b>RAG</b> against the live source, not periodic fine-tuning. <a href='https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview' target='_blank' rel='noopener'>RAG overview</a>." },

    { tag:"D2", q:"Which agent building block would you update to change what functions/APIs it's permitted to call?",
      options:["Its tool schema","Its conversation history","Its deployment region","Its temperature setting"], answer:0,
      why:"Callable functions and their contracts live in the <b>tool schema</b>. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/tools/function-calling' target='_blank' rel='noopener'>Function calling with Foundry agents</a>." },

    { tag:"D2", q:"A travel-booking agent must check flight availability, then check the customer's loyalty tier, then apply the matching discount rule, before it can quote a final price — each step depends on the previous one's result. A single well-crafted prompt to the model was proposed as a shortcut. Why does that fall short here?",
      options:["A single prompt can't reliably sequence dependent tool calls where each step's output feeds the next — this needs a designed multistep reasoning pipeline that orchestrates the calls in order","A single prompt handles dependent, ordered tool calls exactly as reliably as an explicit pipeline","This only needs a single embedding lookup, since all the data is retrievable at once","This is purely a speech problem, since the customer talks to the agent"], answer:0,
      why:"When later steps genuinely depend on earlier results (availability -> tier -> discount), the model needs a designed <b>multistep reasoning pipeline</b> that sequences the tool calls and passes results forward — a single one-shot prompt can't reliably enforce that ordering and dependency chain. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/agents/overview' target='_blank' rel='noopener'>Microsoft Foundry Agent Service overview</a>." },

    { tag:"D2", type:"multi", q:"Select the TWO practices that are part of 'optimize and operationalize generative AI systems' rather than 'build generative applications'.",
      options:["Setting up observability with tracing and latency breakdowns","Tuning generation behavior via prompt engineering","Implementing RAG in the application","Configuring the app to connect to a Foundry project"], answers:[0,1],
      why:"<b>Observability setup</b> and <b>prompt/parameter tuning</b> are optimization/operationalization practices. RAG implementation and project connection are build-phase steps. <a href='https://learn.microsoft.com/en-us/azure/foundry/concepts/observability' target='_blank' rel='noopener'>Foundry observability</a>." },

    { tag:"D2", q:"Three specialized agents — intake, research, and response — must coordinate on one customer request. What must you implement beyond each individual agent?",
      options:["Orchestration across the agents","A single larger agent instead","A static rules engine only","A speech pipeline"], answer:0,
      why:"Coordinating multiple specialized agents requires <b>orchestration</b>, distinct from building each agent alone. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/connected-agents' target='_blank' rel='noopener'>Multi-agent orchestration in Foundry</a>." },

    { tag:"D2", q:"Which evaluation dimension specifically checks whether an answer actually addresses the user's question, not just whether it's factually accurate?",
      options:["Relevance","Fabrication","Safety","Latency"], answer:0,
      why:"Whether an answer addresses the question is <b>relevance</b>; fabrication is about invented facts; safety is about harmful content; latency is a performance metric. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-approach-gen-ai' target='_blank' rel='noopener'>Evaluation approach for generative AI apps</a>." },

    { tag:"D2", q:"An agent's error rate spikes after a knowledge-base update. What should you perform to find the cause?",
      options:["Error analysis on the agent's recent behavior","A cosmetic UI redesign","A deployment region change","A pricing tier downgrade"], answer:0,
      why:"Diagnosing a post-change error spike is <b>error analysis</b>, part of ongoing agent evaluation. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-approach-gen-ai' target='_blank' rel='noopener'>Evaluation approach for generative AI apps</a>." },

    { tag:"D2", type:"order", q:"Put the steps to add a new tool-augmented capability to an existing agent in order.",
      items:["Define the tool's schema and contract","Integrate the tool into the agent's available tools","Test the agent invoking the tool in a workflow","Evaluate the agent's behavior with the new tool before shipping"],
      why:"You define the schema, integrate it, test invocation, then evaluate before shipping — in that order. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-approach-gen-ai' target='_blank' rel='noopener'>Evaluation approach for generative AI apps</a>." },

    { tag:"D2", q:"A generative app must be wired to a specific Foundry project rather than a hard-coded model file. What configuration step does this?",
      options:["Configuring the application to connect to a Foundry project","Configuring a private endpoint only","Configuring a resource lock","Configuring a storage account tier"], answer:0,
      why:"Binding an app to a Foundry project (endpoint + credential) is <b>configuring the application to connect to a Foundry project</b>, a named D2 build step. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/quickstarts/get-started-code' target='_blank' rel='noopener'>Foundry SDK quickstart</a>." },

    // ---------- Domain 3 (4) ----------
    { tag:"D3", q:"A studio needs a short video generated purely from a text prompt describing a scene. Which capability applies?",
      options:["Text-to-video generation","Video segment analysis","Image captioning","Speech-to-text"], answer:0,
      why:"Creating new video from a text description is <b>text-to-video generation</b>, distinct from analyzing existing video. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/dall-e' target='_blank' rel='noopener'>Azure OpenAI image generation</a>." },

    { tag:"D3", q:"An app must answer a specific question about what's happening in a video, grounded in the actual footage. Which capability applies?",
      options:["Video analysis via Content Understanding","Text-to-video generation","Image inpainting","Speech synthesis"], answer:0,
      why:"Interpreting existing video content is <b>video analysis</b>, the understanding-side counterpart to generation. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/concepts/standard-pro-modes' target='_blank' rel='noopener'>Content Understanding standard vs. pro mode</a>." },

    { tag:"D3", q:"A safety review must classify uploaded images for disallowed content before they're used in an app. Which control applies?",
      options:["Filters to classify unsafe or disallowed visual content","Fabrication evaluation","Drift monitoring","A tool schema"], answer:0,
      why:"Classifying unsafe/disallowed visual content is a named D3 responsible-AI control. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-safety/overview' target='_blank' rel='noopener'>Azure AI Content Safety</a>." },

    { tag:"D3", q:"Which capability produces a concise, single-sentence description of an uploaded product photo for a catalog listing?",
      options:["Image captioning","Object detection","Video generation","OCR"], answer:0,
      why:"A short descriptive sentence for an image is <b>captioning</b>, distinct from object detection or OCR. <a href='https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview-image-analysis' target='_blank' rel='noopener'>Azure AI Vision Image Analysis</a>." },

    // ---------- Domain 4 (4) ----------
    { tag:"D4", q:"An app must produce a structured JSON object of {entities, topics, summary} from free-text reviews, in a shape no built-in Azure Language extractor covers. A teammate argues Azure Language should still be used because it's cheaper per call than an LLM. What's the right call?",
      options:["Use generative prompting against an LLM — Azure Language's built-in extractors return fixed, predefined shapes and can't be configured to emit this custom JSON schema, so the per-call cost saving doesn't apply here","Use Azure Language anyway — its built-in extractors can be configured to emit any custom JSON schema on request","Use Azure Translator, since it can also emit arbitrary structured JSON","Use a fixed built-in extractor with no configuration, since 'entities, topics, summary' is a standard shape"], answer:0,
      why:"Azure Language's built-in extractors return a <b>fixed, predefined</b> output shape — they can't be reconfigured to emit an arbitrary custom schema. Once the required shape is novel, <b>generative prompting</b> against an LLM is the only option that can produce it, even though it costs more per call than the purpose-built service would for a standard task. <a href='https://learn.microsoft.com/en-us/azure/ai-services/language-service/overview' target='_blank' rel='noopener'>Azure AI Language overview</a>." },

    { tag:"D4", q:"A voice assistant needs a custom speech model tuned to an industry-specific vocabulary (e.g. medical terms). What capability supports this?",
      options:["Custom speech models as part of speech integration","Plain Azure Translator only","Generic OCR","A default vector index"], answer:0,
      why:"Domain-specific vocabulary support comes from <b>custom speech models</b>, explicitly named under D4 speech integration. <a href='https://learn.microsoft.com/en-us/azure/ai-services/speech-service/custom-speech-overview' target='_blank' rel='noopener'>Custom speech models</a>." },

    { tag:"D4", q:"Which capability detects the emotional tone (not just literal words) of a customer's written complaint?",
      options:["Sentiment/tone detection via Azure Language","Speech synthesis","OCR","Image generation"], answer:0,
      why:"Emotional tone detection in text is <b>sentiment/tone detection</b>, an Azure Language capability. <a href='https://learn.microsoft.com/en-us/azure/ai-services/language-service/overview' target='_blank' rel='noopener'>Azure AI Language overview</a>." },

    { tag:"D4", q:"An agent must reply to a spoken question with a spoken answer, completing the loop end to end. Which two capabilities together make this possible?",
      options:["Speech-to-text and text-to-speech","OCR and image generation","Vector search and field extraction","Video analysis and captioning"], answer:0,
      why:"A full spoken-interaction loop needs <b>speech recognition</b> (input) and <b>speech synthesis</b> (output) together. <a href='https://learn.microsoft.com/en-us/azure/ai-services/speech-service/overview' target='_blank' rel='noopener'>Azure AI Speech overview</a>." },

    // ---------- Domain 5 (4) ----------
    { tag:"D5", q:"A grounding pipeline must ingest documents, images, audio, and video into one searchable index. What capability spans all four content types?",
      options:["Multimodal ingestion and indexing","Speech recognition alone","Image generation alone","Field extraction alone"], answer:0,
      why:"Ingesting and indexing documents/images/audio/video together is <b>multimodal ingestion</b>, a D5 retrieval-pipeline objective. <a href='https://learn.microsoft.com/en-us/azure/search/search-what-is-azure-search' target='_blank' rel='noopener'>Azure AI Search overview</a>." },

    { tag:"D5", q:"Which search approach is purely embedding-based, with no exact keyword matching component?",
      options:["Vector search","Hybrid search","Keyword search","Field extraction"], answer:0,
      why:"Pure embedding-similarity matching, without keyword matching, is <b>vector search</b> alone. <a href='https://learn.microsoft.com/en-us/azure/search/vector-search-overview' target='_blank' rel='noopener'>Azure AI Search vector search</a>." },

    { tag:"D5", q:"An extraction pipeline's structured output must reach an agent's knowledge tool as soon as new documents are processed, with zero staleness window. A nightly scheduled export job into the agent's knowledge store was proposed as 'automated enough.' Why doesn't that fully satisfy the requirement?",
      options:["A nightly export still leaves up to a full day of staleness between extraction and availability — 'no manual step' plus a zero-staleness requirement means the retrieval pipeline must connect directly to the agent's tools/knowledge, not through a batch handoff","A nightly scheduled export has effectively zero staleness, satisfying the requirement","Staleness only matters for RAG, not for agent knowledge tools","Manual copy-paste and scheduled automation are equally acceptable as long as no human reviews the data"], answer:0,
      why:"A scheduled export removes the <i>manual</i> step but still introduces a staleness window between batches — it isn't the same as <b>connecting the retrieval pipeline directly to the agent's tools/knowledge</b>, which D5 calls for when freshness must be immediate. <a href='https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview' target='_blank' rel='noopener'>RAG overview</a>." },

    { tag:"D5", type:"match", q:"Match each extraction requirement to its solution.",
      items:["Produce a markdown document for LLM reasoning","Extract a printed total exactly as it appears","Ingest a document using OCR as part of RAG"],
      categories:["Content Understanding markdown analyzer","Field extraction","RAG ingestion flow"],
      answer:[0,1,2],
      why:"Markdown for reasoning = <b>Content Understanding markdown analyzer</b>; verbatim value = <b>field extraction</b>; OCR-based document intake = <b>RAG ingestion flow</b>. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview' target='_blank' rel='noopener'>Azure AI Content Understanding overview</a>." }
  ]
};
