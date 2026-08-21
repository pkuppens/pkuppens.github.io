/* AI-103 — mock exam 1 (render target: mock1). Engine: shared/quiz.js
   Exam-weighted: D1 x8 (27%), D2 x10 (33%), D3 x4 (13%), D4 x4 (13%), D5 x4 (13%) = 30 */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0007'] = {
  mode: "exam",
  passMark: 0.7,
  questions: [
    // ---------- Domain 1 (8) ----------
    { tag:"D1", q:"A scenario needs consistent, low-latency answers to a narrow, well-defined classification task at high volume. Which model class is the best fit?",
      options:["A small language model (SLM)","A large language model (LLM)","A multimodal model","An image-generation model"], answer:0,
      why:"Narrow, high-volume, latency-sensitive tasks favor a lean <b>SLM</b>. An LLM is broader (and costlier) than needed; multimodal and image-gen models solve different problems. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/foundry-models-overview' target='_blank' rel='noopener'>Foundry model catalog</a>." },

    { tag:"D1", q:"Which Foundry planning decision determines whether a deployment bursts to extra capacity automatically or runs at fixed throughput?",
      options:["Choosing appropriate deployment options","Choosing a model catalog entry","Configuring a safety filter","Setting up trace logging"], answer:0,
      why:"Throughput/capacity behavior is set by <b>deployment options</b> (e.g. standard vs. provisioned throughput). <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/quotas-limits' target='_blank' rel='noopener'>Foundry quotas and limits</a>." },

    { tag:"D1", q:"An organization wants every AI resource change to flow through a repeatable, reviewed pipeline instead of manual portal edits. What do they configure?",
      options:["CI/CD integration for the Foundry project","A larger deployment quota","A private endpoint","A content filter"], answer:0,
      why:"Repeatable, reviewed releases come from <b>CI/CD integration</b>, not from quota, networking, or filter settings. <a href='https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/set-up-ci-cd-cli' target='_blank' rel='noopener'>Foundry CI/CD with GitHub Actions</a>." },

    { tag:"D1", q:"A team notices their agent's grounding quality has quietly degraded over several weeks even though nothing was redeployed. What should have caught this?",
      options:["Ongoing monitoring for drift and grounding quality","A one-time pre-launch evaluation","A higher rate limit","A larger context window"], answer:0,
      why:"Gradual quality decline over time is exactly what <b>ongoing drift/grounding monitoring</b> is for — a single pre-launch check wouldn't catch it. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/observability' target='_blank' rel='noopener'>Foundry observability</a>." },

    { tag:"D1", type:"multi", q:"Select the TWO controls that let an app authenticate to a Foundry project without a hard-coded secret and without exposing traffic to the public internet.",
      options:["Managed identity","Private networking","A higher token quota","A larger model deployment","A content moderation filter"], answers:[0,1],
      why:"<b>Managed identity</b> removes the hard-coded secret; <b>private networking</b> keeps traffic off the public internet. Quotas, deployment size, and moderation address different concerns. <a href='https://learn.microsoft.com/en-us/azure/ai-services/authentication' target='_blank' rel='noopener'>Foundry Tools authentication</a>." },

    { tag:"D1", q:"Which responsible-AI control specifically requires a human to confirm a risky agent action before it executes?",
      options:["An approval workflow","A safety evaluator","A trace log","A content filter"], answer:0,
      why:"A required human checkpoint before execution is an <b>approval workflow</b>. Evaluators score risk; trace logs record after the fact; filters block content, not actions. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-use-of-ai-overview' target='_blank' rel='noopener'>Responsible AI in Microsoft Foundry</a>." },

    { tag:"D1", q:"An agent's tool schema already restricts it to only the payments API — no other tools are callable. You additionally want a human to confirm the specific transaction amount before any payment is actually sent. Which control adds that confirmation step?",
      options:["An approval workflow","Tighter tool-access controls (removing tools from the allow-list)","A larger context window","Reduced deployment cost"], answer:0,
      why:"Tool-access controls decide <b>which</b> tools an agent may call at all — that's already been narrowed to just the payments API. Gating whether an already-permitted call actually executes, pending human confirmation, is the job of an <b>approval workflow</b>. Removing more tools wouldn't add a confirmation step, it would just remove capability. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-use-of-ai-overview' target='_blank' rel='noopener'>Responsible AI in Microsoft Foundry</a>." },

    { tag:"D1", q:"Which pair of concerns does 'manage, monitor, and secure AI systems' bundle together for model AND agent workloads alike?",
      options:["Cost/capacity footprint and security posture","Image style and video length","Translation language pairs","Caption tone"], answer:0,
      why:"D1's management objective covers <b>quotas/scaling/cost</b> and <b>security</b> (identity, networking, RBAC) across both model and agent workloads. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/quotas-limits' target='_blank' rel='noopener'>Foundry quotas and limits</a>." },

    // ---------- Domain 2 (10) ----------
    { tag:"D2", q:"In the Foundry SDK, which object do you create first, using the project endpoint and a credential?",
      options:["An AIProjectClient","A vector index","A Content Understanding analyzer","A speech recognizer"], answer:0,
      why:"The client that binds to a Foundry project via endpoint + credential is the <b>AIProjectClient</b>. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/quickstarts/get-started-code' target='_blank' rel='noopener'>Foundry SDK quickstart</a>." },

    { tag:"D2", q:"An app must answer using your company's latest internal wiki, not what the base model memorized during training. What do you build?",
      options:["A RAG pipeline grounded in the wiki content","A larger temperature setting","A code-completion model","An image-generation pipeline"], answer:0,
      why:"Grounding on retrieved, current content is <b>RAG</b>. Temperature doesn't add facts; the other options solve unrelated problems. <a href='https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview' target='_blank' rel='noopener'>RAG overview</a>." },

    { tag:"D2", q:"Which Foundry agent building block stores what was said in earlier turns of a conversation?",
      options:["Conversation-tracking / memory","Tool schema","Knowledge integration","Deployment region"], answer:0,
      why:"Multi-turn recall is the agent's <b>conversation-tracking approach (memory)</b>. Tool schema defines callable actions; knowledge integration is retrieval sources. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/agents/concepts/threads-runs-messages' target='_blank' rel='noopener'>Foundry agent threads and memory</a>." },

    { tag:"D2", q:"A workflow needs the model to call an external weather API mid-conversation and use the result in its answer. What must be defined for the agent?",
      options:["A tool schema for the weather API","A larger vector index","A safety filter","A deployment region change"], answer:0,
      why:"Calling an external API requires a defined <b>tool schema</b> the agent can invoke. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/tools/function-calling' target='_blank' rel='noopener'>Function calling with Foundry agents</a>." },

    { tag:"D2", type:"multi", q:"Select the TWO signals a generative-AI evaluation step should specifically flag before an app ships to production.",
      options:["Fabricated (made-up) claims","Unsafe content","The model's parameter count","The Azure region the model runs in"], answers:[0,1],
      why:"Evaluation targets <b>fabrication</b> and <b>safety</b> (plus relevance/quality) — parameter count and region aren't evaluation outputs. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-approach-gen-ai' target='_blank' rel='noopener'>Evaluation approach for generative AI apps</a>." },

    { tag:"D2", q:"A support-ticket triage system needs a researcher agent, a drafting agent, and a QA agent, each handing off to the next. What pattern is this?",
      options:["Orchestrated multi-agent solution","Single-agent solution","One-shot model call","A pure vector search pipeline"], answer:0,
      why:"Multiple specialized roles collaborating on one task is an <b>orchestrated multi-agent</b> solution. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/connected-agents' target='_blank' rel='noopener'>Multi-agent orchestration in Foundry</a>." },

    { tag:"D2", q:"An agent may draft a wire transfer but must never send it without a human clicking 'approve' first. Which pattern does this describe?",
      options:["A semiautonomous workflow with an approval safeguard","A fully autonomous workflow","A one-shot chat completion","A pure retrieval pipeline with no agent"], answer:0,
      why:"Autonomous drafting gated by required human approval is a <b>semiautonomous workflow with an approval safeguard</b>. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/responsible-use-of-ai-overview' target='_blank' rel='noopener'>Responsible AI in Microsoft Foundry</a>." },

    { tag:"D2", q:"Which practice specifically improves a model's intermediate reasoning by having it check and revise its own steps?",
      options:["Chain-of-thought self-critique","Increasing the deployment quota","Adding a private endpoint","Switching to a smaller model"], answer:0,
      why:"Having the model evaluate and revise its own reasoning steps is <b>chain-of-thought self-critique</b>, a D2 optimization technique. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-approach-gen-ai' target='_blank' rel='noopener'>Evaluation approach for generative AI apps</a>." },

    { tag:"D2", q:"An agent's tool-calling accuracy was 95% during pre-launch evaluation. Three weeks after launch, support tickets show it increasingly invoking the wrong tool — but the original evaluation suite hasn't changed and still passes when re-run. What should have been running to catch this regression as it happened?",
      options:["Continuous post-production monitoring and evaluation of live traffic","Nothing further — the pre-launch evaluation already covered this","A single re-run of the original pre-launch test suite","A larger deployment quota"], answer:0,
      why:"Pre-launch evaluation is a point-in-time check against a fixed dataset — it can't see failure modes that emerge from real production traffic and drift after launch. Re-running the same fixed suite would keep passing for the same reason. Only <b>continuous post-production monitoring and evaluation</b> observes live behavior as it degrades. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-approach-gen-ai' target='_blank' rel='noopener'>Evaluation approach for generative AI apps</a>." },

    { tag:"D2", type:"order", q:"Put the steps to build and ship a RAG-grounded generative app in order.",
      items:["Deploy a model to a Foundry project","Connect the app to the project via the SDK","Implement RAG grounding against your data","Evaluate for fabrication, relevance, and safety before shipping"],
      why:"Deploy, connect, ground, then evaluate — the standard D2 build loop. <a href='https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview' target='_blank' rel='noopener'>RAG overview</a>." },

    // ---------- Domain 3 (4) ----------
    { tag:"D3", q:"A marketing team wants a brand-new hero image created purely from a text description. Which capability do they use?",
      options:["Text-to-image generation","Mask-based inpainting on an existing image","Video segment analysis","Alt-text generation"], answer:0,
      why:"Creating a wholly new image from text is <b>text-to-image generation</b>, distinct from editing an existing image. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/dall-e' target='_blank' rel='noopener'>Azure OpenAI image generation</a>." },

    { tag:"D3", q:"An app must answer 'what is happening in this photo?' by reasoning jointly over the image and the question. Which capability is required?",
      options:["A multimodal model analyzing visual context","A text-only chat model","An image-generation model","A speech synthesis model"], answer:0,
      why:"Joint reasoning over image + text needs a <b>multimodal model</b>. <a href='https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview-image-analysis' target='_blank' rel='noopener'>Azure AI Vision Image Analysis</a>." },

    { tag:"D3", type:"multi", q:"Select the TWO responsible-AI controls that are specific to multimodal/visual content (not generic text safety).",
      options:["Detecting indirect prompt injection embedded as text in an image","Enforcing watermark and brand-usage policy on generated visuals","Filtering profanity in a chat transcript","Redacting personal data in a document"], answers:[0,1],
      why:"Embedded-image prompt-injection detection and visual policy enforcement (watermarks/brand) are the D3-specific controls named in the study guide. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-safety/concepts/jailbreak-detection' target='_blank' rel='noopener'>Prompt injection detection in Azure AI</a>." },

    { tag:"D3", q:"Which Content Understanding pipeline mode is right when you need several coordinated extraction outputs (objects, text regions, and a caption) from one image in a single pass?",
      options:["Pro-mode","Single-task mode","Speech recognition mode","Batch translation mode"], answer:0,
      why:"Multiple coordinated extraction steps in one pass is <b>pro-mode</b>. Single-task mode is for one narrow extraction job. <a href='https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview-image-analysis' target='_blank' rel='noopener'>Azure AI Vision Image Analysis</a>." },

    // ---------- Domain 4 (4) ----------
    { tag:"D4", q:"Legal wants every contract summary to follow a firm-specific template — parties, term, and a custom 1-5 termination-risk rating, in a fixed order. Azure Language's built-in summarization skill was proposed since it's cheaper per call. Why does it fall short here?",
      options:["Built-in summarization returns a general-purpose summary and can't be configured to a firm-specific template or emit a custom risk-rating field — that needs generative prompting/instruction customization against a language model instead","Built-in summarization already supports arbitrary custom output schemas identical to prompting an LLM","Speech-to-text must run first because contracts are audio recordings","Image captioning covers this because contracts often contain scanned pages"], answer:0,
      why:"Azure Language's built-in summarization produces a fixed-shape general summary with no schema customization; a firm-specific template with a custom risk field requires <b>customizing the language model's output via prompting/instructions</b>. The other options don't address structured, domain-specific summarization at all. <a href='https://learn.microsoft.com/en-us/azure/ai-services/language-service/overview' target='_blank' rel='noopener'>Azure AI Language overview</a>." },

    { tag:"D4", q:"An agent needs to detect that a user's message contains sensitive personal data before responding. Which capability applies?",
      options:["Detection of sensitive content via Azure Language","Speech synthesis","Image generation","Video analysis"], answer:0,
      why:"Detecting sensitive content/tone/safety issues in text is a D4 <b>Azure Language</b> text-analysis capability. <a href='https://learn.microsoft.com/en-us/azure/ai-services/language-service/overview' target='_blank' rel='noopener'>Azure AI Language overview</a>." },

    { tag:"D4", q:"A voice-driven agent needs to hear the caller, understand the request, and reply in the caller's own spoken language even if it differs from the agent's default. What's required?",
      options:["Speech translation via language models and Foundry Tools","Speech recognition only, no translation","Text-to-image generation","A vector index"], answer:0,
      why:"Translating spoken input/output between languages is <b>speech translation</b>, distinct from plain recognition or synthesis. <a href='https://learn.microsoft.com/en-us/azure/ai-services/speech-service/overview' target='_blank' rel='noopener'>Azure AI Speech overview</a>." },

    { tag:"D4", q:"Which capability lets a voice agent reason about the emotional tone of a customer's recorded complaint, not just its transcribed words?",
      options:["Multimodal reasoning from audio input","Plain speech-to-text transcription","Text-to-speech synthesis","OCR"], answer:0,
      why:"Reasoning over audio content beyond a transcript is <b>multimodal reasoning from audio input</b>. <a href='https://learn.microsoft.com/en-us/azure/ai-services/speech-service/llm-speech' target='_blank' rel='noopener'>LLM-enhanced speech</a>." },

    // ---------- Domain 5 (4) ----------
    { tag:"D5", q:"A retrieval system must rank results by both exact keyword match and semantic similarity. What configuration achieves this?",
      options:["Hybrid search","Vector search alone","OCR","Field extraction alone"], answer:0,
      why:"Combining keyword precision with vector-based recall is <b>hybrid search</b>. <a href='https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview' target='_blank' rel='noopener'>Azure AI Search hybrid search</a>." },

    { tag:"D5", q:"A scanned lease agreement must become structured fields (tenant, rent, term dates) ready for an agent to reason over. Which service produces this?",
      options:["Azure Content Understanding","Azure Translator","Azure Speech","Azure Monitor"], answer:0,
      why:"Structured document field extraction is the job of <b>Content Understanding</b>. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview' target='_blank' rel='noopener'>Azure AI Content Understanding overview</a>." },

    { tag:"D5", q:"A scanned, image-only lease PDF must be searchable by both exact keyword match on lease terms and semantic similarity. Which ingestion step must run first, and why doesn't skipping straight to indexing work?",
      options:["OCR — both keyword search and text-embedding-based semantic search operate on extracted text, not raw image pixels","No ingestion step is needed; the scanned PDF can be indexed directly as-is","Video segmentation, since PDFs are processed as video frames","Speech synthesis, to narrate the PDF content before indexing"], answer:0,
      why:"Keyword indexes and text embeddings are both built from text tokens, not raw image bytes — a scanned page has no extractable text until <b>OCR</b> runs. Skipping it leaves nothing for either search path to index against. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview' target='_blank' rel='noopener'>Azure AI Content Understanding overview</a>." },

    { tag:"D5", type:"match", q:"Match each requirement to the extraction/search configuration that satisfies it.",
      items:["A ranked list of the most relevant passages for a natural-language query","Copy an invoice's total exactly as printed","Enrich ingested content with custom skills for layout and text"],
      categories:["Semantic/hybrid search","Field extraction","Enrichment"],
      answer:[0,1,2],
      why:"Relevance ranking = <b>semantic/hybrid search</b>; verbatim values = <b>field extraction</b>; adding structure during ingestion = <b>enrichment</b>. <a href='https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview' target='_blank' rel='noopener'>Azure AI Search hybrid search</a>." }
  ]
};
