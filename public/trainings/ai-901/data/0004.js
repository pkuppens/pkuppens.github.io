/* AI-901 — quiz dataset for lesson 0004 (render target: q-cu). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0004'] = {
  passMark: 0.7,
  questions: [
    { tag:"D2", type:"multi",
      q:"Select the TWO input modalities that Content Understanding handles but Document Intelligence (Form Recognizer) does not.",
      options:["Audio","Video","Scanned documents","Digital PDFs","Images of forms"],
      answers:[0,1],
      why:"Content Understanding adds <b>audio</b> and <b>video</b> on top of documents/images. Document Intelligence was documents-only — that broader modality reach is the AI-901 upgrade." },

    { tag:"D2",
      q:"A team must extract fields from invoices AND generate scene descriptions from training videos, in one tool. Choose:",
      options:["Content Understanding","Document Intelligence","Azure AI Vision","Azure Video Indexer"],
      answer:0,
      why:"Only <b>Content Understanding</b> spans documents and video in one service. Document Intelligence is docs-only; AI Vision is images; Video Indexer is the retired video-only tool." },

    { tag:"D2",
      q:"In Content Understanding, the reusable config holding the field schema and processing settings is the:",
      options:["Analyzer","Skillset","Indexer","Pipeline"],
      answer:0,
      why:"An <b>analyzer</b> defines the schema and settings applied to all inputs. 'Skillset' and 'indexer' are Azure AI Search terms; 'pipeline' is generic." },

    { tag:"D2", type:"match",
      q:"Match each task to its Content Understanding field-extraction method.",
      items:["Return an invoice total exactly as printed","Route each file as invoice vs receipt","Summarize a recorded call in new words"],
      categories:["Extract","Classify","Generate"],
      answer:[0,1,2],
      why:"Verbatim value = Extract (documents only); choosing a category to route = Classify; freely producing new text = Generate." },

    { tag:"D2",
      q:"Which pair of features together enable straight-through processing with easy human spot-checks?",
      options:["Confidence scores and grounding","Temperature and top-p","Chunking and embedding","Tokenizing and sampling"],
      answer:0,
      why:"<b>Confidence scores</b> gauge reliability and <b>grounding</b> shows the source location — together enabling review-free automation with quick verification. The others are decoding/preprocessing terms." },

    { tag:"D2",
      q:"For ingesting extracted content into a search / RAG index, Content Understanding is best asked to output:",
      options:["Markdown","Structured JSON","A CSV table","A PNG snapshot"],
      answer:0,
      why:"For search/RAG ingestion the clean <b>Markdown</b> representation is ideal. Structured JSON suits automation; CSV and PNG aren't its retrieval outputs." },

    { tag:"D2",
      q:"An exam item lists 'Video Indexer' and 'Document Intelligence' as options for multimodal extraction. The intended answer is:",
      options:["Content Understanding","Video Indexer","Document Intelligence","Azure AI Language"],
      answer:0,
      why:"Both named options are retired single-purpose services used as distractors; the current multimodal answer on AI-901 is <b>Content Understanding</b>." },

    { tag:"D2",
      q:"A per-field value of 0.42 versus 0.98 in Content Understanding output most directly tells you:",
      options:["How much to trust that field","How long extraction took","How many tokens it used","How similar two fields are"],
      answer:0,
      why:"That 0–1 <b>confidence score</b> estimates how much to trust the extracted value. It isn't latency, token usage, or similarity." }
  ]
};
