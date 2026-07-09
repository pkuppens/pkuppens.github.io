/* AI-901 — quiz dataset for lesson 0006 (render target: mock1). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0006'] = {
  mode: "exam",
  passMark: 0.7,
  questions: [
    // ---------- Domain 1 (13) ----------
    { tag:"D1", q:"A bank must tell a rejected applicant exactly which factors drove the model's decision. Which responsible-AI principle does this serve?",
      options:["Transparency","Accountability","Fairness","Reliability and safety"], answer:0,
      why:"Making the reasons behind a decision understandable is <b>transparency</b>. Accountability is about who is responsible; fairness is about equitable outcomes." },

    { tag:"D1", q:"An organization assigns a named team to own an AI system's outcomes and sets up a review board. Which principle is this?",
      options:["Accountability","Transparency","Inclusiveness","Privacy and security"], answer:0,
      why:"Human ownership, governance and oversight is <b>accountability</b>. Transparency is explainability; inclusiveness is serving all users." },

    { tag:"D1", q:"Before shipping a driver-assist feature, engineers stress-test it against rare weather and road conditions so it degrades safely. Which principle?",
      options:["Reliability and safety","Fairness","Accountability","Inclusiveness"], answer:0,
      why:"Consistent, robust behaviour that fails safely under stress is <b>reliability and safety</b>. The others don't describe robustness testing." },

    { tag:"D1", q:"A health app encrypts patient records and deletes voice data once consent lapses. Which principle is most directly upheld?",
      options:["Privacy and security","Transparency","Reliability and safety","Fairness"], answer:0,
      why:"Protecting personal data and honouring consent is <b>privacy and security</b>. Transparency and fairness are unrelated to data protection here." },

    { tag:"D1", type:"multi", q:"Select the TWO items below that are official Microsoft responsible-AI principles.",
      options:["Inclusiveness","Fairness","Explainability","Sustainability","Profitability"], answers:[0,1],
      why:"The six principles are fairness, reliability &amp; safety, privacy &amp; security, <b>inclusiveness</b>, transparency, accountability. 'Explainability' is part of transparency but not a named principle; sustainability and profitability aren't principles." },

    { tag:"D1", type:"match", q:"Match each scenario to the responsible-AI principle it best illustrates.",
      items:["A résumé screener is audited so no demographic group is disadvantaged","Recordings are encrypted and purged when consent expires","A feature is tested against rare edge cases before launch"],
      categories:["Fairness","Privacy and security","Reliability and safety"], answer:[0,1,2],
      why:"Equitable outcomes = fairness; protecting/purging personal data = privacy &amp; security; robust edge-case testing = reliability &amp; safety." },

    { tag:"D1", q:"In a generative model, the input and output are measured and billed in units called:",
      options:["Tokens","Epochs","Gradients","Embeddings"], answer:0,
      why:"Length and cost are counted in <b>tokens</b> (word-pieces). Epochs and gradients are training terms; embeddings are vector representations." },

    { tag:"D1", q:"You need a chat assistant to answer from your company's latest internal policies without retraining the model. Best approach?",
      options:["Ground it with retrieval (RAG)","Fine-tune the model weights","Increase the temperature","Add more system tokens"], answer:0,
      why:"Supplying retrieved data at inference time is <b>grounding/RAG</b> — no retraining, always current. Fine-tuning retrains and won't stay up to date; temperature and tokens don't add data." },

    { tag:"D1", q:"A model must permanently adopt a specialized output style learned from thousands of labelled examples, changing its behaviour at the weight level. Best approach?",
      options:["Fine-tuning","Retrieval grounding","A longer user prompt","A lower top-p value"], answer:0,
      why:"Baking learned behaviour into the weights from many examples is <b>fine-tuning</b>. Grounding adds data at inference but doesn't change style-at-weights; prompt/top-p don't retrain." },

    { tag:"D1", q:"To turn product descriptions into vectors so you can find semantically similar items, which model type do you deploy?",
      options:["An embedding model","A chat completion model","An image-generation model","A speech synthesis model"], answer:0,
      why:"Text-to-vector for similarity search uses an <b>embedding model</b>. Chat models generate text; the others handle images and audio." },

    { tag:"D1", q:"An app must accept a photo plus a written question and reason about both together. Which model capability is required?",
      options:["Multimodal","Text-only","Embedding","Transcription"], answer:0,
      why:"Reasoning across image and text in one prompt requires a <b>multimodal</b> model. Text-only can't see images; embeddings and transcription don't answer questions." },

    { tag:"D1", q:"Pulling organization names and dates out of legal contracts is which text-analysis technique?",
      options:["Entity detection","Sentiment analysis","Summarization","Key phrase extraction"], answer:0,
      why:"Identifying named things (orgs, dates) is <b>entity detection</b>. Sentiment scores tone; summarization condenses; key-phrase pulls main topics." },

    { tag:"D1", type:"multi", q:"Select the TWO tasks below that are computer-vision workloads.",
      options:["Object detection","Optical character recognition","Sentiment analysis","Speech synthesis","Text summarization"], answers:[0,1],
      why:"<b>Object detection</b> and <b>OCR</b> operate on images. Sentiment and summarization are text; speech synthesis is audio." },

    // ---------- Domain 2 (17) ----------
    { tag:"D2", q:"You want to ship a chat feature inside a Python application that calls a deployed model. Which door do you use?",
      options:["The Foundry SDK","The Foundry portal playground","Content Understanding Studio","The Azure pricing calculator"], answer:0,
      why:"Building an app feature in code uses the <b>Foundry SDK</b>. The playground is for no-code testing; the others aren't app-build tools." },

    { tag:"D2", q:"Which Python package is the current Microsoft Foundry SDK for building model and agent clients?",
      options:["azure-ai-projects","azure-cognitiveservices-vision","azure-ai-textanalytics","azure-ai-formrecognizer"], answer:0,
      why:"The Foundry SDK is <b>azure-ai-projects</b> (v2.x). The others are older single-service libraries, several now superseded." },

    { tag:"D2", q:"In the SDK, DefaultAzureCredential is used so that your app can:",
      options:["Authenticate keylessly via signed-in identity","Cache model weights locally","Randomize the sampling seed","Compress the response payload"], answer:0,
      why:"<b>DefaultAzureCredential</b> gives keyless, identity-based auth (az login) — safer than embedding keys. It has nothing to do with weights, sampling, or compression." },

    { tag:"D2", q:"When you call the model, the value you pass as the model name actually refers to:",
      options:["Your model deployment name","The project's region code","The raw model checkpoint file","The system prompt identifier"], answer:0,
      why:"You invoke a <b>deployment</b> by the name you gave it. It's not a region, a raw file, or a prompt id." },

    { tag:"D2", q:"Which part of a prompt sets the assistant's role, rules, and tone for every turn?",
      options:["The system prompt","The user prompt","The response token","The temperature value"], answer:0,
      why:"Persistent role/rules/tone belong in the <b>system prompt</b>. The user prompt is each request; tokens and temperature aren't prompt roles." },

    { tag:"D2", type:"multi", q:"Beyond the base model, select the TWO things that let a Foundry agent take actions and ground its answers in your data.",
      options:["Tools","Knowledge","Temperature","Deployment region","API version"], answers:[0,1],
      why:"<b>Tools</b> let an agent act (search, run code, call APIs); <b>knowledge</b> grounds answers in your data. Temperature, region, and API version don't add capability or grounding." },

    { tag:"D2", q:"Within the SDK, what object makes an agent's turn two aware of what was said in turn one?",
      options:["A conversation","A credential","A deployment","A parameter set"], answer:0,
      why:"Multi-turn memory lives in a <b>conversation</b>. Credentials authenticate, deployments serve models, parameters tune output — none store dialogue." },

    { tag:"D2", q:"A task needs an assistant that plans several steps, calls an external API, then composes a result. You build:",
      options:["A single-agent solution","A one-shot model call","An embedding index","A speech pipeline"], answer:0,
      why:"Multi-step planning plus tool use is an <b>agent</b>. A single model call can't take actions; embeddings and speech don't orchestrate steps." },

    { tag:"D2", type:"match", q:"Match each Content Understanding task to the field-extraction method it uses.",
      items:["Copy an invoice's total exactly as printed","Label each support call as complaint or praise","Write a fresh summary of a meeting recording"],
      categories:["Extract","Classify","Generate"], answer:[0,1,2],
      why:"Verbatim value = <b>Extract</b>; choosing from set categories = <b>Classify</b>; freely producing new text = <b>Generate</b>." },

    { tag:"D2", q:"Which set of inputs can a single Content Understanding analyzer process?",
      options:["Documents, images, audio, and video","Only PDFs and images","Only audio and video","Only structured spreadsheets"], answer:0,
      why:"Content Understanding is multimodal across <b>documents, images, audio, and video</b>. Restricting to one or two modalities describes the older single-purpose services." },

    { tag:"D2", q:"A media team needs searchable insights extracted from thousands of videos. On AI-901 the intended service is:",
      options:["Content Understanding","Azure Video Indexer","Azure Speech","Custom Vision"], answer:0,
      why:"The current multimodal answer is <b>Content Understanding</b>. 'Video Indexer' is a retired single-purpose name used as a distractor; Speech and Custom Vision don't cover broad video insights." },

    { tag:"D2", q:"Content Understanding returns a 0-to-1 value per extracted field. What does it represent, and what does it enable?",
      options:["Reliability, enabling review-free automation","Latency, enabling faster responses","Token cost, enabling cheaper billing","Similarity, enabling vector search"], answer:0,
      why:"A per-field 0–1 <b>confidence score</b> estimates reliability and enables straight-through (no-review) processing. It isn't latency, cost, or similarity." },

    { tag:"D2", q:"Content Understanding can point to the exact region of a source where a value came from. This capability is called:",
      options:["Grounding","Sampling","Chunking","Tokenizing"], answer:0,
      why:"Tracing a value back to its source location is <b>grounding</b>, which speeds human verification. The others are generation/preprocessing terms." },

    { tag:"D2", q:"Converting a recorded interview into a written transcript is which Azure Speech capability?",
      options:["Speech recognition","Speech synthesis","Speech translation","Speech grounding"], answer:0,
      why:"Audio &rarr; text is <b>speech recognition</b> (speech-to-text). Synthesis is text-to-speech; translation crosses languages." },

    { tag:"D2", q:"An accessibility feature must read on-screen text aloud to visually impaired users. Which capability?",
      options:["Speech synthesis","Speech recognition","Optical character recognition","Sentiment analysis"], answer:0,
      why:"Text &rarr; audio is <b>speech synthesis</b> (text-to-speech). OCR reads text from images; recognition transcribes audio; sentiment scores tone." },

    { tag:"D2", q:"The instruction 'design a logo of a soaring eagle' should be routed to which capability?",
      options:["An image-generation model","An image-classification model","An OCR model","An anomaly-detection model"], answer:0,
      why:"Creating a new picture from text is <b>image generation</b>. Classification, OCR, and anomaly detection analyse existing input rather than create images." },

    { tag:"D2", type:"order", q:"Put the steps to call a deployed model with the Foundry SDK in the correct order.",
      items:["Authenticate with DefaultAzureCredential (az login)","Create an AIProjectClient using the project endpoint","Get the OpenAI client for your deployment","Call responses.create with your input and read output_text"],
      why:"You authenticate, create the project client against the endpoint, obtain the model client, then send input and read the completion — in that order." }
  ]
};
