/* AI-103 — quiz dataset for lesson 0004 (render target: q-vision). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0004'] = {
  passMark: 0.7,
  questions: [
    { tag:"D3",
      q:"A retailer wants to swap only the background behind an existing product photo, keeping the product itself pixel-for-pixel untouched. Which capability fits, and why not full text-to-image generation instead?",
      options:["Inpainting / mask-based image editing — modifies just the masked region, leaving the rest of the source image intact","Text-to-image generation — a new image from a prompt gives the same guarantee that the product stays pixel-for-pixel unchanged","Video generation — produces a new video from a text prompt","OCR — extracts text from the image, unrelated to editing"],
      answer:0,
      why:"<b>Inpainting / mask-based editing</b> operates on a mask relative to the existing source image, so everything outside the mask is preserved exactly. Text-to-image generation synthesizes a whole new image from a prompt with no guarantee that untouched regions stay pixel-identical to the original. <a href='https://learn.microsoft.com/en-us/azure/ai-foundry/openai/how-to/dall-e' target='_blank' rel='noopener'>Azure OpenAI image generation</a>." },

    { tag:"D3",
      q:"An accessibility feature needs an extended description of an image for a screen reader, following accessibility guidelines. What do you configure?",
      options:["Alt-text / extended image description generation","Image inpainting","Video segment analysis","A vector search index"],
      answer:0,
      why:"Accessibility-aligned descriptions are produced by configuring <b>alt-text / extended description generation</b>. The other options don't target accessibility output. <a href='https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview-image-analysis' target='_blank' rel='noopener'>Azure AI Vision Image Analysis</a>." },

    { tag:"D3",
      q:"You need to extract a custom-defined schema of fields (product name, primary color, defect present: yes/no) from thousands of product photos — not just generic tags. Which service fits, and why not the simpler Azure AI Vision Image Analysis API?",
      options:["Azure Content Understanding — lets you define a custom extraction schema and returns structured fields matching it","Azure AI Vision Image Analysis — extracts a fixed set of built-in tags, captions, and objects rather than a custom schema","Azure Translator — translates text, unrelated to image field extraction","Azure AI Search — indexes and retrieves content, but doesn't extract structured fields from an image"],
      answer:0,
      why:"<b>Content Understanding</b> lets you define your own field schema and returns matching structured output; Image Analysis only returns its predefined feature set (tags, captions, objects, OCR) with no way to add a custom 'defect present' field. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview' target='_blank' rel='noopener'>Azure AI Content Understanding overview</a>." },

    { tag:"D3",
      q:"You need several kinds of structured output from the same image in one pass (objects, text regions, and a caption together). Which pipeline mode fits?",
      options:["Pro-mode Content Understanding","Single-task Content Understanding","A single-agent chat solution","A pure RAG pipeline"],
      answer:0,
      why:"Multiple coordinated extraction steps from one source in a single pass is <b>pro-mode</b>. Single-task is for one narrow extraction job. <a href='https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview-image-analysis' target='_blank' rel='noopener'>Azure AI Vision Image Analysis</a>." },

    { tag:"D3", type:"multi",
      q:"Select the TWO items that are responsible-AI controls specific to multimodal/visual content.",
      options:["Detecting indirect prompt injection embedded as text in images","Enforcing watermark and brand-usage policy on generated visuals","Configuring a vector index for hybrid search","Choosing between LLM and SLM for a chat task","Integrating Foundry projects with CI/CD"],
      answers:[0,1],
      why:"<b>Embedded-image prompt injection detection</b> and <b>visual policy enforcement</b> (watermarks/brand) are D3 responsible-AI controls. Indexing, model choice, and CI/CD are D1/D5 concerns. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-safety/concepts/jailbreak-detection' target='_blank' rel='noopener'>Prompt injection detection in Azure AI</a>." },

    { tag:"D3",
      q:"Text is hidden inside an uploaded image instructing the model to ignore its safety rules. What is this attack called?",
      options:["Indirect prompt injection","Model drift","A rate-limit breach","A grounding failure"],
      answer:0,
      why:"Instructions smuggled inside visual content are <b>indirect prompt injection</b> — a named D3 exam objective, distinct from text-only prompt injection. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-safety/concepts/jailbreak-detection' target='_blank' rel='noopener'>Prompt injection detection in Azure AI</a>." },

    { tag:"D3",
      q:"An app must answer a question that requires reasoning jointly about a diagram and a written question. Which model capability handles this?",
      options:["A multimodal model analyzing visual context","A text-only chat model","An image-generation model","A speech-to-text model"],
      answer:0,
      why:"Reasoning across image and text together requires a <b>multimodal</b> model. Text-only can't see the diagram; image generation and speech-to-text don't answer questions. <a href='https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview-image-analysis' target='_blank' rel='noopener'>Azure AI Vision Image Analysis</a>." },

    { tag:"D3", type:"match",
      q:"Match each request to the capability that satisfies it.",
      items:["Create a brand-new logo from a text description","Process and interpret segments of an uploaded video","Produce a one-sentence caption for a product photo"],
      categories:["Image generation","Video analysis","Image captioning"],
      answer:[0,1,2],
      why:"Creating new visuals = <b>image generation</b>; interpreting video segments = <b>video analysis</b> (Content Understanding); producing a short description = <b>captioning</b>. <a href='https://learn.microsoft.com/en-us/azure/ai-services/computer-vision/overview-image-analysis' target='_blank' rel='noopener'>Azure AI Vision Image Analysis</a>." }
  ]
};
