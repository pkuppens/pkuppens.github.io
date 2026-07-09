/* AI-901 — quiz dataset for lesson 0002 (render target: q-foundry). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0002'] = {
  passMark: 0.7,
  questions: [
    { tag:"D2",
      q:"You need to iterate on prompt wording against a deployed model with zero code. Which tool fits?",
      options:["Foundry portal playground","Azure Machine Learning designer","Content Understanding Studio","Azure AI Search index"],
      answer:0,
      why:"No-code prompt iteration is the <b>Foundry portal playground</b>. AML designer builds ML pipelines; Content Understanding Studio is for extraction; AI Search indexes data." },

    { tag:"D2",
      q:"Which Python package IS the Foundry SDK for building model + agent clients on the new API?",
      options:["azure-ai-projects","azure-ai-inference","azure-ai-ml","azure-identity"],
      answer:0,
      why:"The Foundry SDK is <b>azure-ai-projects</b> (v2.x). azure-ai-inference is a lower-level model-call library; azure-ai-ml is the Azure ML SDK; azure-identity only supplies the credential." },

    { tag:"D2",
      q:"Which class gives the SDK keyless auth from your signed-in identity (az login / managed identity)?",
      options:["DefaultAzureCredential","AzureKeyCredential","ClientSecretCredential","InteractiveBrowserCredential"],
      answer:0,
      why:"<b>DefaultAzureCredential</b> walks a chain (env, managed identity, az login) — keyless. AzureKeyCredential uses an API key; the other two are narrower, explicit credential types." },

    { tag:"D2", type:"multi",
      q:"Select the TWO statements that are true when calling a deployed model with the Foundry SDK.",
      options:["You reference the model by its deployment name","Auth uses your identity via DefaultAzureCredential","You must paste an API key into the source","The call runs only inside the Foundry portal","You must retrain the model on each call"],
      answers:[0,1],
      why:"You call a model by its <b>deployment name</b> and authenticate with your <b>identity</b>. No hard-coded keys, it runs anywhere, and no retraining occurs per call." },

    { tag:"D2",
      q:"A model sits in the catalog but your code gets a 'not found' error. What step is missing?",
      options:["Deploying the model","Quantizing the model","Fine-tuning the model","Registering a domain name"],
      answer:0,
      why:"A catalog model must be <b>deployed</b> (given a name/endpoint) before code can call it. Quantizing/fine-tuning change the model itself; a domain name is unrelated." },

    { tag:"D2",
      q:"Which item belongs in the system prompt rather than the user prompt?",
      options:["The assistant's role, rules, and tone","The end-user's specific question","The model's returned completion","The request's timestamp"],
      answer:0,
      why:"Persistent <b>role, rules, and tone</b> are the system prompt. The specific question is the user prompt; the completion is output; a timestamp isn't prompt content." },

    { tag:"D2",
      q:"The Foundry SDK connects to which scope via the endpoint 'https://<res>.ai.azure.com/api/projects/<name>'?",
      options:["A project","A subscription","A resource group","A tenant"],
      answer:0,
      why:"The endpoint targets a <b>project</b> inside a Foundry resource. Subscription, resource group, and tenant are broader Azure scopes, not what the client binds to." },

    { tag:"D2",
      q:"azure-ai-projects v1.x targets which platform, versus v2.x for the current Foundry API?",
      options:["Foundry classic","Foundry Agent Service","Azure AI Search","Azure OpenAI Studio"],
      answer:0,
      why:"v1.x is <b>Foundry classic</b>; v2.x is the new Foundry projects API. Agent Service, AI Search, and OpenAI Studio aren't SDK-version targets." }
  ]
};
