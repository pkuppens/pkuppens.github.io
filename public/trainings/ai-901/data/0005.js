/* AI-901 — quiz dataset for lesson 0005 (render target: q-svm). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0005'] = {
  passMark: 0.7,
  questions: [
    { tag:"D2", type:"match",
      q:"Match each task to the capability that performs it.",
      items:["Turn a lecture recording into subtitles","Read an answer aloud to the user","Let two people converse across languages live"],
      categories:["Speech recognition","Speech synthesis","Speech translation"],
      answer:[0,1,2],
      why:"Audio→text = recognition; text→audio = synthesis; live cross-language speech = translation." },

    { tag:"D2",
      q:"An app must answer a user's SPOKEN question by reasoning over the audio itself. Best choice?",
      options:["A deployed multimodal model","Azure Speech transcription alone","An image-generation model","An embedding model"],
      answer:0,
      why:"Reasoning over speech in a prompt needs a <b>multimodal model</b>. Transcription alone doesn't reason; image-gen and embeddings don't answer spoken questions." },

    { tag:"D2",
      q:"A user uploads a photo of a rash and asks 'is this urgent?'. You need reasoning over image + text. Deploy a:",
      options:["Multimodal model","Custom Vision classifier","OCR reader","Image-generation model"],
      answer:0,
      why:"Joint image+text reasoning requires a <b>multimodal model</b>. A Custom Vision classifier only labels; OCR reads text; image-gen creates pictures." },

    { tag:"D2", type:"multi",
      q:"Select the TWO tasks that require GENERATING new visual output rather than interpreting existing images.",
      options:["Design a logo from a text brief","Produce a product photo variant from a prompt","Detect defects on a production line","Read totals from a receipt","Caption an uploaded photo"],
      answers:[0,1],
      why:"Creating a <b>logo</b> and a <b>photo variant</b> are image generation. Defect detection, receipt reading, and captioning all interpret existing images." },

    { tag:"D2",
      q:"You only need plain audio→text with no reasoning. The lightest correct choice is:",
      options:["Azure Speech","A multimodal model","Content Understanding","Azure AI Vision"],
      answer:0,
      why:"A pure conversion uses <b>Azure Speech</b>. A multimodal model is overkill; Content Understanding extracts structured fields; AI Vision handles images." },

    { tag:"D2",
      q:"Reading printed text out of a scanned photo (OCR) is best described as:",
      options:["Interpreting an image","Generating an image","Synthesizing speech","Indexing a document"],
      answer:0,
      why:"OCR reads from an existing image, so it's <b>interpreting</b> it. Generation creates images; synthesis makes audio; indexing is a search step." },

    { tag:"D2",
      q:"When one task spans image AND text together, AI-901's preferred approach is:",
      options:["One multimodal model","Two chained single-purpose services","A speech-to-text pipeline","A fine-tuning run on both"],
      answer:0,
      why:"AI-901 favours a single <b>multimodal model</b> over stitching services. Chained services, speech pipelines, and fine-tuning don't match the cue." }
  ]
};
