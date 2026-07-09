/* AI-901 — quiz dataset for lesson 0007 (render target: mock2). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0007'] = {
  mode: "exam",
  passMark: 0.7,
  questions: [
    // ---------- Domain 1 (13) ----------
    { tag:"D1", q:"A team adds screen-reader support, captions, and high-contrast modes so people with disabilities can fully use the app. Which principle?",
      options:["Inclusiveness","Fairness","Transparency","Accountability"], answer:0,
      why:"Empowering people of all abilities is <b>inclusiveness</b>. Fairness targets equitable outcomes; transparency is explainability; accountability is governance." },

    { tag:"D1", q:"A loan model is retrained after it approved men at higher rates than equally-qualified women. Which principle drove the fix?",
      options:["Fairness","Accountability","Inclusiveness","Privacy and security"], answer:0,
      why:"Correcting biased outcomes across groups is <b>fairness</b>. Accountability is who owns it; inclusiveness is accessibility; privacy is data protection." },

    { tag:"D1", q:"Publishing a document describing a model's intended uses, limitations, and measured performance supports which principle?",
      options:["Transparency","Reliability and safety","Fairness","Privacy and security"], answer:0,
      why:"Making capabilities and limits understandable is <b>transparency</b>. It isn't about robustness, bias, or data protection directly." },

    { tag:"D1", type:"multi", q:"Select the TWO reasons that favour grounding (RAG) over fine-tuning.",
      options:["The source data changes frequently","Answers must cite specific documents","You want to permanently change writing style","You have thousands of labelled examples","You need the smallest possible model"], answers:[0,1],
      why:"Grounding suits <b>changing data</b> and <b>citable sources</b> without retraining. Permanent style change and learning from many labelled examples point to fine-tuning; model size is unrelated." },

    { tag:"D1", q:"The maximum amount of text (prompt plus response) a model can consider at once is its:",
      options:["Context window","Temperature","Embedding size","Learning rate"], answer:0,
      why:"The total text a model can attend to is the <b>context window</b>. Temperature controls randomness; embedding size and learning rate are unrelated." },

    { tag:"D1", q:"For repeatable, deterministic field extraction you should set the temperature to:",
      options:["A low value","A high value","Its maximum","A negative value"], answer:0,
      why:"<b>Low temperature</b> gives focused, deterministic output — ideal for extraction. High/max increases randomness; temperature isn't negative." },

    { tag:"D1", q:"You need a model that holds a back-and-forth conversation with a user. Which model type fits best?",
      options:["A chat completion model","An embedding model","An image-generation model","A speech-only model"], answer:0,
      why:"Conversational back-and-forth uses a <b>chat completion model</b>. Embeddings make vectors; image-gen makes pictures; speech-only handles audio." },

    { tag:"D1", type:"match", q:"Match each task to its AI workload category.",
      items:["Detect the make and model of cars in a photo","Flag negative tweets mentioning a brand","Turn a recorded podcast into subtitles"],
      categories:["Computer vision","Natural language processing","Speech"], answer:[0,1,2],
      why:"Interpreting images = computer vision; analysing text sentiment = NLP; audio-to-text = speech." },

    { tag:"D1", q:"Producing a two-sentence overview of a long report is which text-analysis technique?",
      options:["Summarization","Key phrase extraction","Entity detection","Sentiment analysis"], answer:0,
      why:"Condensing text into a short overview is <b>summarization</b>. Key-phrase pulls topics; entity detection finds names; sentiment scores tone." },

    { tag:"D1", q:"Assigning the single label 'cat' to an entire image is which vision task?",
      options:["Image classification","Object detection","Optical character recognition","Image segmentation"], answer:0,
      why:"One label for the whole image is <b>classification</b>. Detection locates multiple objects; OCR reads text; segmentation outlines regions." },

    { tag:"D1", q:"Which scenario best describes an agentic AI workload?",
      options:["An assistant that checks a calendar and books a meeting","A model that scores a sentence's sentiment","A service that transcribes an audio file","A model that labels an image"], answer:0,
      why:"Taking multi-step actions with tools toward a goal is <b>agentic</b>. The others are single-shot analytical tasks." },

    { tag:"D1", q:"Reading handwritten totals from scanned receipts into structured fields is an example of:",
      options:["Information extraction","Image generation","Speech synthesis","Sentiment analysis"], answer:0,
      why:"Turning content into structured fields is <b>information extraction</b>. The others create images, audio, or score tone." },

    { tag:"D1", type:"multi", q:"Select the TWO capabilities that belong to speech workloads.",
      options:["Speech-to-text transcription","Text-to-speech synthesis","Object detection","Image generation","Key phrase extraction"], answers:[0,1],
      why:"Speech covers <b>transcription</b> and <b>synthesis</b>. Object detection and image generation are vision; key-phrase extraction is text." },

    // ---------- Domain 2 (17) ----------
    { tag:"D2", q:"Which is the no-code place to pick a model from the catalog, deploy it, and test prompts in a playground?",
      options:["The Foundry portal","Azure Monitor","Azure DevOps","The Foundry SDK"], answer:0,
      why:"Deploy-and-test with no code is the <b>Foundry portal</b>. Monitor and DevOps aren't model tools; the SDK is code-based." },

    { tag:"D2", q:"In a prompt, which of these is the user prompt?",
      options:["The specific question the end-user asks","The persistent role and rules","The model's generated reply","The project endpoint URL"], answer:0,
      why:"The <b>user prompt</b> is the specific request. Role/rules are the system prompt; the reply is the completion; the endpoint is infrastructure." },

    { tag:"D2", q:"Why give a Foundry agent persistent instructions instead of resending rules each turn?",
      options:["To keep consistent behaviour across turns","To lower the token price per call","To speed up model deployment","To encrypt the conversation"], answer:0,
      why:"Instructions hold a <b>consistent persona/behaviour</b> every turn without repetition. They don't set price, deployment speed, or encryption." },

    { tag:"D2", type:"multi", q:"Select the TWO statements that are true about a Foundry SDK chat client.",
      options:["It authenticates via DefaultAzureCredential","It calls a model by its deployment name","It requires hard-coded API keys in source","It can only run inside the portal","It fine-tunes the model on startup"], answers:[0,1],
      why:"The SDK client uses <b>DefaultAzureCredential</b> and calls a model by its <b>deployment name</b>. It avoids hard-coded keys, runs anywhere, and doesn't fine-tune." },

    { tag:"D2", q:"You want an agent to answer strictly from your internal handbook PDFs. You attach that data as the agent's:",
      options:["Knowledge","Tools","Temperature","Deployment"], answer:0,
      why:"Grounding data the agent retrieves from is its <b>knowledge</b>. Tools take actions; temperature and deployment aren't data sources." },

    { tag:"D2", q:"An agent must search the web and call your pricing API mid-conversation. Those abilities are provided by its:",
      options:["Tools","Knowledge","Instructions","Context window"], answer:0,
      why:"Taking actions like web search and API calls is what <b>tools</b> add. Knowledge grounds; instructions set behaviour; context window is capacity." },

    { tag:"D2", type:"match", q:"Match each Content Understanding job to its input modality.",
      items:["Extract fields from a PDF contract","Summarize a recorded customer call","Describe the scenes in a training video"],
      categories:["Document","Audio","Video"], answer:[0,1,2],
      why:"Contract = document; call recording = audio; training footage = video. One multimodal service handles all three." },

    { tag:"D2", q:"Copying a value verbatim from a document (only supported for documents) uses which field method?",
      options:["Extract","Classify","Generate","Translate"], answer:0,
      why:"Verbatim copying from a document is <b>Extract</b>. Classify buckets into categories; Generate creates new text; translate isn't a field method." },

    { tag:"D2", q:"Sorting incoming documents into 'invoice' vs 'receipt' before routing them uses which field method?",
      options:["Classify","Extract","Generate","Index"], answer:0,
      why:"Choosing from predefined categories to route content is <b>Classify</b>. Extract copies verbatim; Generate creates text; Index isn't a method." },

    { tag:"D2", q:"Which Content Understanding output format is best for ingesting extracted content into a search / RAG index?",
      options:["Markdown","YAML","Protobuf","Binary blob"], answer:0,
      why:"For search and RAG ingestion, Content Understanding emits clean <b>Markdown</b>. Structured JSON is for automation; YAML/Protobuf/binary aren't its outputs." },

    { tag:"D2", q:"A per-field 0-to-1 reliability estimate that lets you skip manual review is the:",
      options:["Confidence score","Latency budget","Token quota","Similarity score"], answer:0,
      why:"The <b>confidence score</b> gauges reliability for straight-through processing. It isn't latency, quota, or similarity." },

    { tag:"D2", q:"Two people speaking different languages converse in real time, each hearing the other's language. Which capability?",
      options:["Speech translation","Speech synthesis","Speech recognition","Sentiment analysis"], answer:0,
      why:"Live cross-language conversation is <b>speech translation</b>. Synthesis only voices text; recognition only transcribes; sentiment scores tone." },

    { tag:"D2", q:"An app must accept a photo and a written question and reason over both. What do you deploy?",
      options:["A multimodal model","A text-only chat model","An embedding model","A transcription model"], answer:0,
      why:"Reasoning across image and text needs a <b>multimodal model</b>. Text-only can't see; embeddings and transcription don't answer image questions." },

    { tag:"D2", q:"The Foundry SDK package azure-ai-projects v1.x targets which platform, versus v2.x for the new API?",
      options:["Foundry classic","Foundry agents","Foundry Speech","Foundry vision"], answer:0,
      why:"v1.x is <b>Foundry classic</b>; v2.x is the current Foundry projects API. The others are capabilities, not SDK generations." },

    { tag:"D2", type:"order", q:"Put the steps to create and chat with a single agent (SDK) in order.",
      items:["Create the AIProjectClient with the project endpoint","Create the agent with a model and instructions","Start a conversation to hold history","Send input via responses.create and read the reply"],
      why:"Connect the project client, define the agent, open a conversation for memory, then send input and read the reply." }
  ]
};
