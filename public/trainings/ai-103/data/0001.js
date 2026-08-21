/* AI-103 — quiz dataset for lesson 0001 (render target: q-diag). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0001'] = {
  passMark: 0.7,
  questions: [
    { tag:"D1",
      q:"A retailer expects sharp, predictable traffic spikes during flash sales and needs guaranteed capacity with stable latency during those spikes, regardless of extra cost. Which deployment configuration should they choose?",
      options:["Provisioned throughput deployment","Global Standard (pay-per-token) deployment","A smaller, cheaper model deployment","Requesting a higher default rate limit on the same deployment type"],
      answer:0,
      why:"<b>Provisioned throughput</b> reserves dedicated capacity, giving guaranteed throughput and predictable latency even under bursty load — the tradeoff is fixed cost regardless of usage. Global Standard is pay-per-token but shares capacity, so it can see latency variability under sustained bursts; a smaller model or a higher rate limit don't guarantee dedicated capacity. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/quotas-limits' target='_blank' rel='noopener'>Foundry quotas and limits</a>." },

    { tag:"D1",
      q:"A team needs to authenticate a Foundry SDK client without embedding an API key. What do they configure?",
      options:["Managed identity / keyless credentials","A higher rate limit","A larger model deployment","A vector index"],
      answer:0,
      why:"Keyless auth is <b>managed identity</b> — a D1 security control. <a href='https://learn.microsoft.com/en-us/azure/ai-services/authentication' target='_blank' rel='noopener'>Foundry Tools authentication</a>." },

    { tag:"D2",
      q:"An app must ground its answers in your company's current documents instead of relying on training data alone. What do you implement?",
      options:["Retrieval-augmented generation (RAG)","A larger max-token setting","Speech synthesis","Image inpainting"],
      answer:0,
      why:"Grounding on retrieved current data is <b>RAG</b> — a core D2 build step. <a href='https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview' target='_blank' rel='noopener'>RAG overview</a>." },

    { tag:"D2",
      q:"A support agent must be able to open a new ticket in the internal ticketing system whenever a customer reports a bug. It also cites the ticketing system's help docs when explaining SLAs, using a separate retrieval source. Which building block specifically makes the 'open a ticket' action possible?",
      options:["A tool schema for the ticketing API","Knowledge integration pointing at the ticketing docs","A larger context window","Conversation-tracking / memory"],
      answer:0,
      why:"Taking an action (calling an API to create a ticket) requires a defined <b>tool schema</b> the agent can invoke. Knowledge integration is for grounding on documents (the SLA docs), not for taking actions; context window and memory don't grant tool-calling capability. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/agents/how-to/tools/function-calling' target='_blank' rel='noopener'>Function calling with Foundry agents</a>." },

    { tag:"D2", type:"multi",
      q:"Select the TWO things a generative-AI evaluation step should score before shipping.",
      options:["Fabrication","Safety","The GPU model used for training","The Azure subscription ID"],
      answers:[0,1],
      why:"Evaluation targets <b>fabrication</b> and <b>safety</b> (plus relevance/quality) — hardware and subscription IDs aren't evaluation signals. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-approach-gen-ai' target='_blank' rel='noopener'>Evaluation approach for generative AI apps</a>." },

    { tag:"D3",
      q:"A user wants to fill in a masked region of an existing photo with new content. Which capability applies?",
      options:["Inpainting / mask-based editing","Fresh image generation from a blank canvas","Video generation","Speech synthesis"],
      answer:0,
      why:"Editing part of an existing image is <b>inpainting</b>, distinct from generating a brand-new image. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/dall-e' target='_blank' rel='noopener'>Azure OpenAI image generation</a>." },

    { tag:"D3",
      q:"Text hidden inside an uploaded image instructs the model to ignore its safety rules. What is this called?",
      options:["Indirect prompt injection","Model drift","Speech translation","A grounding failure"],
      answer:0,
      why:"Instructions smuggled inside image content are <b>indirect prompt injection</b> — a named D3 responsible-AI objective. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-safety/concepts/jailbreak-detection' target='_blank' rel='noopener'>Prompt injection detection in Azure AI</a>." },

    { tag:"D4",
      q:"Converting a recorded interview into a written transcript is which capability?",
      options:["Speech recognition (speech-to-text)","Speech synthesis (text-to-speech)","Speech translation","Sentiment analysis"],
      answer:0,
      why:"Audio → text is <b>speech recognition</b>. Synthesis is the reverse direction. <a href='https://learn.microsoft.com/en-us/azure/ai-services/speech-service/overview' target='_blank' rel='noopener'>Azure AI Speech overview</a>." },

    { tag:"D4",
      q:"Which two services can translate text, per the AI-103 study guide?",
      options:["Azure Translator and an LLM-powered translation flow","Speech recognition and OCR","A vector index and a safety filter","Content Understanding and Azure Monitor"],
      answer:0,
      why:"The study guide explicitly names <b>Azure Translator</b> and <b>LLM-powered translation flows</b> as the two valid text-translation approaches. <a href='https://learn.microsoft.com/en-us/azure/ai-services/translator/overview' target='_blank' rel='noopener'>Azure AI Translator overview</a>." },

    { tag:"D5",
      q:"A retail search index must match exact SKU codes (e.g. 'SKU-88231') with full precision, while also surfacing conceptually related products when a shopper types a natural-language query. Which single configuration satisfies both requirements in one query?",
      options:["Hybrid search (keyword + vector)","Vector search alone","Semantic search alone (re-ranking on top of keyword results)","OCR applied to product listings"],
      answer:0,
      why:"Vector-only search embeds text into similarity space, which blurs exact codes like SKU numbers; semantic search alone only re-ranks an initial keyword result set, it doesn't add vector-based conceptual recall. <b>Hybrid search</b> runs keyword and vector queries together and merges results, giving exact-match precision and conceptual recall in the same request. <a href='https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview' target='_blank' rel='noopener'>Azure AI Search hybrid search</a>." },

    { tag:"D5",
      q:"A scanned invoice must become structured fields (vendor, total, line items). Which service produces this?",
      options:["Azure Content Understanding","Azure Translator","Azure Speech","Azure AI Search alone"],
      answer:0,
      why:"Structured field extraction from documents is <b>Content Understanding</b>. AI Search indexes content but doesn't extract fields from a scan. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview' target='_blank' rel='noopener'>Azure AI Content Understanding overview</a>." },

    { tag:"D1", type:"match",
      q:"Match each planning decision to its category.",
      items:["Choosing between an LLM and an SLM for a task","Configuring managed identity for a deployment","Setting up trace logging and provenance metadata"],
      categories:["Choosing Foundry services","Security","Responsible AI"],
      answer:[0,1,2],
      why:"Model choice = <b>choosing Foundry services</b>; keyless auth = <b>security</b>; audit trail = <b>responsible AI</b> instrumentation. <a href='https://learn.microsoft.com/en-us/azure/ai-services/authentication' target='_blank' rel='noopener'>Foundry Tools authentication</a>." },

    { tag:"D2", type:"order",
      q:"Put the steps of the generative-app build loop in order.",
      items:["Deploy a model to a Foundry project","Connect the app to the project","Ground the app with RAG","Evaluate for fabrication, relevance, and safety"],
      why:"Deploy, connect, ground, then evaluate — the D2 build loop in order. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/concepts/evaluation-approach-gen-ai' target='_blank' rel='noopener'>Evaluation approach for generative AI apps</a>." },

    { tag:"D3", type:"multi",
      q:"AI-103's computer-vision domain splits into two exam objectives: 'image- and video-generation solutions' (produce new visual media from a prompt) and 'multimodal understanding workflows' (analyze an image or video that already exists, even if the output is text). Select the TWO capabilities below that belong to the <b>generation</b> objective.",
      options:["Text-to-image generation","Video generation from a text prompt","Image captioning","Visual question-answering"],
      answers:[0,1],
      why:"The exam blueprint names these as two separate objectives. <b>Text-to-image</b> and <b>text-to-video generation</b> take a text prompt and produce brand-new visual media &mdash; that's the generation objective (Azure OpenAI image/video models). <b>Image captioning</b> and <b>visual question-answering</b> take an existing image as input and produce a text description of it &mdash; the model is analyzing visual content, so both sit under the understanding objective (Azure AI Vision Image Analysis) even though their output happens to be text. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/dall-e' target='_blank' rel='noopener'>Azure OpenAI image generation</a>." },

    { tag:"D5",
      q:"An extraction pipeline's output must reach an agent's knowledge without a manual copy-paste step. What's the correct integration?",
      options:["Connect the retrieval pipeline directly to the agent's tools/knowledge","Store results only in a spreadsheet","Re-run OCR on the same file weekly","Email the extracted fields"],
      answer:0,
      why:"Retrieval pipelines should connect <b>directly to workflows and agent tools</b> — no manual hand-off. <a href='https://learn.microsoft.com/en-us/azure/search/retrieval-augmented-generation-overview' target='_blank' rel='noopener'>RAG overview</a>." }
  ]
};
