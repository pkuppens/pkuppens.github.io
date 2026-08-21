/* AI-103 — quiz dataset for lesson 0006 (render target: q-extract). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0006'] = {
  passMark: 0.7,
  questions: [
    { tag:"D5",
      q:"You need both exact keyword precision and semantic (meaning-based) recall in one search query. Which configuration fits?",
      options:["Hybrid search","Vector search alone","Semantic search alone","A plain SQL LIKE query"],
      answer:0,
      why:"Combining exact keyword matching with vector similarity is <b>hybrid search</b>. Vector-only or semantic-only each cover just one side. <a href='https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview' target='_blank' rel='noopener'>Azure AI Search hybrid search</a>." },

    { tag:"D5",
      q:"Which search type matches results by embedding similarity — meaning, not exact wording?",
      options:["Vector search","Keyword search","OCR","Field extraction"],
      answer:0,
      why:"Embedding-similarity matching is <b>vector search</b>. Keyword search needs exact/near-exact terms; OCR and field extraction are extraction steps, not search types. <a href='https://learn.microsoft.com/en-us/azure/search/vector-search-overview' target='_blank' rel='noopener'>Azure AI Search vector search</a>." },

    { tag:"D5",
      q:"A scanned, image-based PDF must become searchable text before it can be retrieved. What ingestion step is required?",
      options:["OCR as part of the RAG ingestion flow","Speech synthesis","Image generation","A safety filter"],
      answer:0,
      why:"Image-based text becomes retrievable via <b>OCR</b> during ingestion. Synthesis and generation don't extract text; safety filters don't ingest content. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview' target='_blank' rel='noopener'>Azure AI Content Understanding overview</a>." },

    { tag:"D5",
      q:"Which service produces a clean, grounded representation of document content specifically for use with agents and RAG?",
      options:["Azure Content Understanding","Azure Translator","Azure Speech","A vector index by itself"],
      answer:0,
      why:"<b>Content Understanding</b> analyzers are built to produce clean, grounded representations for agent/RAG consumption. Translator and Speech serve other modalities; an index alone doesn't extract content. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview' target='_blank' rel='noopener'>Azure AI Content Understanding overview</a>." },

    { tag:"D5", type:"multi",
      q:"Select the TWO components a multimodal document-extraction pipeline combines to pull data from a scanned invoice.",
      options:["OCR","Layout analysis","Speech recognition","Video segmentation","Image generation"],
      answers:[0,1],
      why:"Document extraction combines <b>OCR</b> and <b>layout analysis</b> (plus field extraction). Speech recognition, video segmentation, and image generation don't apply to a scanned document. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview' target='_blank' rel='noopener'>Azure AI Content Understanding overview</a>." },

    { tag:"D5",
      q:"An extracted document's structured fields must feed directly into an agent's knowledge without manual copying. What's the right integration point?",
      options:["Connect the retrieval pipeline directly to the agent's tools/knowledge integration","Email the fields to the agent's owner","Store them only in a spreadsheet","Regenerate the document from scratch each time"],
      answer:0,
      why:"Extraction pipelines should connect <b>directly to workflows and agent tools</b>, avoiding manual hand-off steps. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview' target='_blank' rel='noopener'>Azure AI Content Understanding overview</a>." },

    { tag:"D5",
      q:"What is the purpose of 'enrichment' skills during content ingestion?",
      options:["Adding structure to text, images, and layout as content is ingested","Generating brand-new images","Translating speech in real time","Approving risky agent actions"],
      answer:0,
      why:"Enrichment skills (custom or built-in) add <b>structure to text/images/layout</b> during ingestion. The other options describe unrelated capabilities. <a href='https://learn.microsoft.com/en-us/azure/ai-services/content-understanding/overview' target='_blank' rel='noopener'>Azure AI Content Understanding overview</a>." },

    { tag:"D5", type:"match",
      q:"Match each output requirement to the extraction configuration that produces it.",
      items:["A markdown document ready for an LLM to reason over","Copy an invoice total exactly as printed","A ranked list of the most relevant passages for a query"],
      categories:["Content Understanding markdown analyzer","Field extraction","Semantic/hybrid search"],
      answer:[0,1,2],
      why:"Markdown for downstream reasoning = a <b>Content Understanding markdown analyzer</b>; verbatim values = <b>field extraction</b>; relevance ranking = <b>semantic/hybrid search</b>. <a href='https://learn.microsoft.com/en-us/azure/search/hybrid-search-overview' target='_blank' rel='noopener'>Azure AI Search hybrid search</a>." }
  ]
};
