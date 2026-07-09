/* AI-901 — quiz dataset for lesson 0001 (render target: q-diag). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0001'] = {
  passMark: 0.7,
  questions: [
    { tag:"D1",
      q:"A regulator demands the bank show WHY each applicant received their score. Which responsible-AI principle is this?",
      options:["Transparency","Accountability","Fairness","Reliability and safety"],
      answer:0,
      why:"Making the reasons behind a decision understandable is <b>transparency</b>. Accountability is who's responsible; fairness is equitable outcomes; reliability is robustness." },

    { tag:"D1", type:"match",
      q:"Match each scenario to the responsible-AI principle it best illustrates.",
      items:["A model is audited so no group gets worse outcomes","Personal data is encrypted and deleted on consent expiry","Screen-reader and caption support are added for all abilities"],
      categories:["Fairness","Privacy and security","Inclusiveness"],
      answer:[0,1,2],
      why:"Equitable outcomes = fairness; protecting/purging data = privacy &amp; security; serving all abilities = inclusiveness." },

    { tag:"D1",
      q:"An app must answer from private policy PDFs, stay current, and not retrain the model. Best approach?",
      options:["Retrieval grounding (RAG)","Fine-tuning the weights","Prompt caching","Model quantization"],
      answer:0,
      why:"Supplying retrieved data at inference is <b>grounding/RAG</b> — current, no retraining. Fine-tuning retrains; prompt caching speeds repeats; quantization shrinks the model." },

    { tag:"D1",
      q:"Which configuration parameter sets the maximum length of a model's generated reply?",
      options:["Max tokens","Temperature","Top-p","Presence penalty"],
      answer:0,
      why:"Reply length is capped by <b>max tokens</b>. Temperature and top-p control randomness; presence penalty discourages repetition." },

    { tag:"D1",
      q:"To power semantic search over a knowledge base, which model type produces the vectors?",
      options:["An embedding model","A chat completion model","A reranker model","An image-generation model"],
      answer:0,
      why:"Text-to-vector for similarity is an <b>embedding model</b>. Chat generates text; a reranker reorders results but doesn't create the vectors; image-gen makes pictures." },

    { tag:"D1", type:"multi",
      q:"Select the TWO tasks that are text-analysis techniques.",
      options:["Sentiment analysis","Entity detection","Object detection","Speech synthesis","Image classification"],
      answers:[0,1],
      why:"<b>Sentiment analysis</b> and <b>entity detection</b> operate on text. Object detection and image classification are vision; speech synthesis is audio." },

    { tag:"D1",
      q:"Which scenario is an agentic AI workload?",
      options:["An assistant that checks stock then places a reorder","A model that translates one sentence","A service that transcribes a phone call","A model that tags objects in a photo"],
      answer:0,
      why:"Multi-step action with tools toward a goal is <b>agentic</b>. Translation, transcription, and tagging are single-shot analytical tasks." },

    { tag:"D2",
      q:"You want to deploy a model and test prompts with no code before building anything. You use:",
      options:["The Foundry portal","The Foundry SDK","Azure ML designer","A prompt flow YAML file"],
      answer:0,
      why:"No-code deploy-and-test is the <b>Foundry portal</b>. The SDK and YAML are code; the AML designer builds ML pipelines, not Foundry prompt tests." },

    { tag:"D2",
      q:"Which package is the Foundry SDK for building model + agent clients on the new API?",
      options:["azure-ai-projects","azure-ai-inference","azure-ai-ml","azure-identity"],
      answer:0,
      why:"The Foundry SDK is <b>azure-ai-projects</b>. azure-ai-inference is lower-level model calls; azure-ai-ml is Azure ML; azure-identity only supplies the credential." },

    { tag:"D2",
      q:"The instruction that sets a model's role, rules, and tone for every turn is the:",
      options:["System prompt","User prompt","Output completion","Model deployment"],
      answer:0,
      why:"Role/rules/tone live in the <b>system prompt</b>. The user prompt is each request; the completion is output; the deployment serves the model." },

    { tag:"D2", type:"multi",
      q:"Beyond its base model and instructions, select the TWO things that complete a Foundry agent.",
      options:["Tools","Knowledge","Temperature","Region","API version"],
      answers:[0,1],
      why:"<b>Tools</b> (actions) and <b>knowledge</b> (grounding) complete the agent. Temperature, region, and API version are settings, not agent ingredients." },

    { tag:"D2",
      q:"Which object gives an agent memory across multiple turns in the SDK?",
      options:["A conversation","A deployment","A credential","An endpoint"],
      answer:0,
      why:"Multi-turn memory lives in a <b>conversation</b>. Deployments serve models, credentials authenticate, endpoints locate the project." },

    { tag:"D2",
      q:"Extracting fields from documents, images, audio, AND video through one Foundry service uses:",
      options:["Content Understanding","Document Intelligence","Azure AI Vision","Azure Video Indexer"],
      answer:0,
      why:"Multimodal extraction across all four types is <b>Content Understanding</b>. Document Intelligence is docs-only; AI Vision is images; Video Indexer is video-only (retired name)." },

    { tag:"D2",
      q:"An app must answer a user's spoken question by reasoning over the audio itself. You deploy a:",
      options:["Multimodal model","Azure Speech transcriber","Embedding model","Image-generation model"],
      answer:0,
      why:"Reasoning over speech in a prompt needs a <b>multimodal model</b>. A transcriber only converts audio to text; embeddings and image-gen don't answer spoken questions." },

    { tag:"D2", type:"order",
      q:"Put the steps to call a deployed model with the Foundry SDK in the correct order.",
      items:["Authenticate with DefaultAzureCredential (az login)","Create an AIProjectClient using the project endpoint","Get the OpenAI client for your deployment","Call responses.create with your input and read output_text"],
      why:"Authenticate, create the project client against the endpoint, get the model client, then send input and read the completion." }
  ]
};
