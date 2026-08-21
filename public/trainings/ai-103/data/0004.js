/* AI-103 — quiz dataset for lesson 0004 (render target: q-vision). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0004'] = {
  passMark: 0.7,
  questions: [
    { tag:"D3",
      q:"A user wants to fill in a masked region of an existing product photo with a new background. Which capability fits?",
      options:["Inpainting / mask-based image editing","Fresh text-to-image generation","Video generation","Optical character recognition"],
      answer:0,
      why:"Modifying part of an existing image is <b>inpainting / mask-based editing</b>, not generating a brand-new image from scratch." },

    { tag:"D3",
      q:"An accessibility feature needs an extended description of an image for a screen reader, following accessibility guidelines. What do you configure?",
      options:["Alt-text / extended image description generation","Image inpainting","Video segment analysis","A vector search index"],
      answer:0,
      why:"Accessibility-aligned descriptions are produced by configuring <b>alt-text / extended description generation</b>. The other options don't target accessibility output." },

    { tag:"D3",
      q:"Which service extracts structured visual characteristics — objects, attributes, regions — from images and video in Foundry Tools?",
      options:["Azure Content Understanding","Azure Translator","Azure AI Search","Azure OpenAI embeddings"],
      answer:0,
      why:"Structured visual extraction is <b>Azure Content Understanding</b>. Translator and embeddings don't process visual structure; AI Search indexes rather than extracts." },

    { tag:"D3",
      q:"You need several kinds of structured output from the same image in one pass (objects, text regions, and a caption together). Which pipeline mode fits?",
      options:["Pro-mode Content Understanding","Single-task Content Understanding","A single-agent chat solution","A pure RAG pipeline"],
      answer:0,
      why:"Multiple coordinated extraction steps from one source in a single pass is <b>pro-mode</b>. Single-task is for one narrow extraction job." },

    { tag:"D3", type:"multi",
      q:"Select the TWO items that are responsible-AI controls specific to multimodal/visual content.",
      options:["Detecting indirect prompt injection embedded as text in images","Enforcing watermark and brand-usage policy on generated visuals","Configuring a vector index for hybrid search","Choosing between LLM and SLM for a chat task","Integrating Foundry projects with CI/CD"],
      answers:[0,1],
      why:"<b>Embedded-image prompt injection detection</b> and <b>visual policy enforcement</b> (watermarks/brand) are D3 responsible-AI controls. Indexing, model choice, and CI/CD are D1/D5 concerns." },

    { tag:"D3",
      q:"Text is hidden inside an uploaded image instructing the model to ignore its safety rules. What is this attack called?",
      options:["Indirect prompt injection","Model drift","A rate-limit breach","A grounding failure"],
      answer:0,
      why:"Instructions smuggled inside visual content are <b>indirect prompt injection</b> — a named D3 exam objective, distinct from text-only prompt injection." },

    { tag:"D3",
      q:"An app must answer a question that requires reasoning jointly about a diagram and a written question. Which model capability handles this?",
      options:["A multimodal model analyzing visual context","A text-only chat model","An image-generation model","A speech-to-text model"],
      answer:0,
      why:"Reasoning across image and text together requires a <b>multimodal</b> model. Text-only can't see the diagram; image generation and speech-to-text don't answer questions." },

    { tag:"D3", type:"match",
      q:"Match each request to the capability that satisfies it.",
      items:["Create a brand-new logo from a text description","Process and interpret segments of an uploaded video","Produce a one-sentence caption for a product photo"],
      categories:["Image generation","Video analysis","Image captioning"],
      answer:[0,1,2],
      why:"Creating new visuals = <b>image generation</b>; interpreting video segments = <b>video analysis</b> (Content Understanding); producing a short description = <b>captioning</b>." }
  ]
};
