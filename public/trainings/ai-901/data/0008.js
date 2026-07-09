/* AI-901 — quiz dataset for lesson 0008 (render target: mock3). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0008'] = {
  mode: "exam",
  passMark: 0.7,
  questions: [
    // ---------- Domain 1 (13) ----------
    { tag:"D1", q:"A hospital forms an oversight committee that is answerable for an AI triage tool's decisions. Which principle?",
      options:["Accountability","Transparency","Reliability and safety","Inclusiveness"], answer:0,
      why:"Human ownership and governance of outcomes is <b>accountability</b>. Transparency is explainability; reliability is robustness; inclusiveness is accessibility." },

    { tag:"D1", q:"Applying content filters so a model won't produce hateful or violent output primarily serves which principle?",
      options:["Reliability and safety","Fairness","Transparency","Privacy and security"], answer:0,
      why:"Preventing harmful behaviour and failing safely is <b>reliability and safety</b>. Fairness targets bias; transparency explainability; privacy data protection." },

    { tag:"D1", q:"Ensuring the training data represents all customer groups so the model performs well for each is which principle?",
      options:["Fairness","Accountability","Transparency","Reliability and safety"], answer:0,
      why:"Equitable performance across groups is <b>fairness</b>. The others concern governance, explainability, and robustness." },

    { tag:"D1", type:"multi", q:"Select the TWO items that are official Microsoft responsible-AI principles.",
      options:["Transparency","Accountability","Robustness","Interpretability","Efficiency"], answers:[0,1],
      why:"<b>Transparency</b> and <b>accountability</b> are two of the six principles. Robustness, interpretability, and efficiency are related ideas but not the named principles." },

    { tag:"D1", q:"A generative language model produces text by repeatedly predicting the:",
      options:["Most likely next token","Exact training sentence","Nearest image pixel","Loudest audio sample"], answer:0,
      why:"Generation works by predicting the <b>next token</b> given context. It doesn't recall exact sentences or handle pixels/audio here." },

    { tag:"D1", q:"Which decoding parameter samples from the smallest set of tokens whose probabilities sum to a threshold?",
      options:["Top-p","Temperature","Max tokens","Presence penalty"], answer:0,
      why:"Nucleus sampling by a probability threshold is <b>top-p</b>. Temperature scales randomness differently; max tokens caps length; presence penalty discourages repetition." },

    { tag:"D1", q:"To generate a brand-new product image from a text description, which model type do you pick?",
      options:["An image-generation model","An embedding model","A chat completion model","A speech recognition model"], answer:0,
      why:"Creating a new picture from text needs an <b>image-generation model</b>. Embeddings make vectors, chat makes text, speech handles audio." },

    { tag:"D1", type:"match", q:"Match each text-analysis output to its technique.",
      items:["A positive / negative / neutral score","A list of people and place names","A two-line gist of an article"],
      categories:["Sentiment analysis","Entity detection","Summarization"], answer:[0,1,2],
      why:"Tone score = sentiment analysis; named things = entity detection; short gist = summarization." },

    { tag:"D1", q:"Extracting the printed words from a photo of a street sign is called:",
      options:["Optical character recognition","Object detection","Image generation","Image classification"], answer:0,
      why:"Reading text out of an image is <b>OCR</b>. Detection locates objects; generation creates images; classification labels the whole image." },

    { tag:"D1", q:"A voice assistant must speak its reply to the user. Which capability produces that audio?",
      options:["Speech synthesis","Speech recognition","Speech translation","Entity detection"], answer:0,
      why:"Turning text into spoken audio is <b>speech synthesis</b>. Recognition transcribes; translation crosses languages; entity detection is text analysis." },

    { tag:"D1", q:"Pulling key topics and speaker segments out of a recorded webinar is an example of:",
      options:["Information extraction","Speech synthesis","Image generation","Sentiment analysis"], answer:0,
      why:"Turning recorded content into structured insights is <b>information extraction</b>. The others synthesize audio, create images, or score tone." },

    { tag:"D1", type:"multi", q:"Select the TWO scenarios that call for a generative model rather than a classic analytical model.",
      options:["Draft a marketing email from bullet points","Write a summary in the user's own words","Predict churn probability from a table","Classify an email as spam or not","Detect fraud from transaction features"], answers:[0,1],
      why:"Producing new text (a <b>draft</b> and a <b>summary</b>) is generative. Predicting churn, classifying spam, and detecting fraud are classic analytical/ML tasks." },

    // ---------- Domain 2 (17) ----------
    { tag:"D2", q:"You need to try several prompt wordings against a deployed model quickly, without writing code. You use:",
      options:["The Foundry portal playground","A Foundry SDK script","Content Understanding Studio","The Azure CLI"], answer:0,
      why:"Fast, no-code prompt iteration is the <b>portal playground</b>. The SDK and CLI are code; Content Understanding Studio is for extraction." },

    { tag:"D2", q:"Which Python package do you install to build model and agent clients on the new Foundry API?",
      options:["azure-ai-projects","azure-ai-vision","azure-ai-language","azure-ai-formrecognizer"], answer:0,
      why:"The Foundry SDK is <b>azure-ai-projects</b> (v2.x). The others are single-service or superseded libraries." },

    { tag:"D2", q:"Which single formula captures what a Foundry agent is?",
      options:["Model plus instructions, tools, knowledge","Endpoint plus key plus region","Prompt plus temperature plus seed","Dataset plus epochs plus learning rate"], answer:0,
      why:"An agent is <b>model + instructions + tools + knowledge</b>. The others describe infrastructure, decoding, or training — not an agent." },

    { tag:"D2", q:"In the SDK, what keeps an agent's later turns aware of earlier ones?",
      options:["A conversation","A credential","A deployment","A content filter"], answer:0,
      why:"Multi-turn memory lives in a <b>conversation</b>. Credentials authenticate, deployments serve models, filters block harmful content." },

    { tag:"D2", type:"multi", q:"Select the TWO things an agent's tools can do.",
      options:["Search the web for current data","Call your custom REST API","Set the model's temperature","Define the exam pass mark","Rename the Azure project"], answers:[0,1],
      why:"Tools let an agent <b>search the web</b> and <b>call your APIs</b>. They don't tune temperature, set pass marks, or rename projects." },

    { tag:"D2", q:"An agent must answer only from your company's internal documents. That grounding data is the agent's:",
      options:["Knowledge","Tools","Instructions","Endpoint"], answer:0,
      why:"Data the agent grounds its answers in is its <b>knowledge</b>. Tools act; instructions set behaviour; the endpoint is infrastructure." },

    { tag:"D2", type:"match", q:"Match each Content Understanding job to its field-extraction method.",
      items:["Return the purchase-order number exactly as written","Sort files into invoice vs receipt","Write a scene-by-scene description of a video"],
      categories:["Extract","Classify","Generate"], answer:[0,1,2],
      why:"Verbatim value = Extract; category routing = Classify; freely produced description = Generate." },

    { tag:"D2", q:"On AI-901, a multimodal-extraction question offering 'Document Intelligence' as a choice should point you to:",
      options:["Content Understanding","Document Intelligence","Custom Vision","Azure Speech"], answer:0,
      why:"'Document Intelligence' (formerly Form Recognizer) is documents-only and a distractor; the current multimodal answer is <b>Content Understanding</b>." },

    { tag:"D2", q:"Content Understanding traces each extracted value back to its exact spot in the source. This is:",
      options:["Grounding","Chunking","Tokenizing","Sampling"], answer:0,
      why:"Pointing to the source location of a value is <b>grounding</b>, which speeds verification. The others are preprocessing/generation terms." },

    { tag:"D2", q:"Generating subtitles from a recorded lecture's audio uses which Azure Speech capability?",
      options:["Speech recognition","Speech synthesis","Speech translation","Image captioning"], answer:0,
      why:"Audio &rarr; text for subtitles is <b>speech recognition</b>. Synthesis voices text; translation crosses languages; captioning describes images." },

    { tag:"D2", q:"An app must answer a user's spoken question by reasoning over the audio directly. Best choice?",
      options:["A deployed multimodal model","Azure Speech transcription only","An image-generation model","An embedding model"], answer:0,
      why:"Reasoning over speech in a prompt uses a <b>multimodal model</b>. Plain transcription doesn't reason; image-gen and embeddings don't answer spoken questions." },

    { tag:"D2", q:"Why is DefaultAzureCredential preferred over embedding API keys in your code?",
      options:["It uses your signed-in identity, keyless","It makes responses shorter","It raises the temperature safely","It caches the model locally"], answer:0,
      why:"It authenticates with your <b>signed-in identity</b> — no secrets in code. It doesn't affect response length, temperature, or caching." },

    { tag:"D2", q:"AI-901's agent objective is scoped to building which kind of solution?",
      options:["A single-agent solution","A multi-agent orchestration","A distributed training cluster","A batch ETL pipeline"], answer:0,
      why:"The exam tests a <b>single-agent</b> solution. Multi-agent orchestration is AI-102-level; the others aren't agent tasks." },

    { tag:"D2", q:"For feeding extracted fields straight into an automated business workflow, which Content Understanding output fits best?",
      options:["Structured JSON","A rendered PNG","A raw audio clip","A word cloud"], answer:0,
      why:"Automation consumes <b>structured JSON</b> matching your schema. Markdown suits search/RAG; images, audio, and word clouds aren't structured outputs." },

    { tag:"D2", type:"order", q:"Put the Content Understanding pipeline stages in order.",
      items:["Provide input files (documents, images, audio, or video)","Apply an analyzer that defines the field schema","Produce structured fields with confidence and grounding","Output the result as JSON or Markdown"],
      why:"Inputs enter, an analyzer defines how/what to extract, fields are produced with confidence and grounding, then the structured result is emitted." }
  ]
};
