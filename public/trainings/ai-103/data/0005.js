/* AI-103 — quiz dataset for lesson 0005 (render target: q-text). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0005'] = {
  passMark: 0.7,
  questions: [
    { tag:"D4",
      q:"You need standard entity/sentiment extraction at scale with no custom prompt engineering. Which approach fits best?",
      options:["Azure Language in Foundry Tools","A raw LLM with a hand-written extraction prompt","Azure Speech","Azure Content Understanding for video"],
      answer:0,
      why:"Standard, structured text tasks at scale are the strength of the purpose-built <b>Azure Language</b> service. An LLM prompt is more flexible but unnecessary overhead here. <a href='https://learn.microsoft.com/en-us/azure/ai-services/language-service/overview' target='_blank' rel='noopener'>Azure AI Language overview</a>." },

    { tag:"D4",
      q:"A request needs a novel, custom structured-JSON shape that no built-in extractor supports. Best approach?",
      options:["Generative prompting against an LLM","Azure Translator","Speech-to-text","A fixed, unconfigurable extractor"],
      answer:0,
      why:"Novel, flexible output shapes are best served by <b>generative prompting</b>. Translator and speech-to-text solve different problems; a fixed extractor can't adapt. <a href='https://learn.microsoft.com/en-us/azure/ai-services/translator/overview' target='_blank' rel='noopener'>Azure AI Translator overview</a>." },

    { tag:"D4",
      q:"Converting a recorded customer call into a written transcript for downstream analysis is:",
      options:["Speech recognition (speech-to-text)","Speech synthesis (text-to-speech)","Speech translation","Sentiment analysis"],
      answer:0,
      why:"Audio → text is <b>speech recognition</b>. Synthesis goes the other direction; translation crosses languages; sentiment scores tone, not transcription. <a href='https://learn.microsoft.com/en-us/azure/ai-services/translator/overview' target='_blank' rel='noopener'>Azure AI Translator overview</a>." },

    { tag:"D4",
      q:"An agent must read its written answer aloud to the caller. Which capability is required?",
      options:["Speech synthesis (text-to-speech)","Speech recognition","Optical character recognition","Entity detection"],
      answer:0,
      why:"Text → audio output is <b>speech synthesis</b>. Recognition is the reverse direction; OCR and entity detection are unrelated to audio output. <a href='https://learn.microsoft.com/en-us/azure/ai-services/speech-service/overview' target='_blank' rel='noopener'>Azure AI Speech overview</a>." },

    { tag:"D4", type:"multi",
      q:"Select the TWO valid ways to translate text described in the study guide.",
      options:["Azure Translator in Foundry Tools","An LLM-powered translation flow","Speech recognition alone","A vector index alone","A safety filter alone"],
      answers:[0,1],
      why:"The study guide names both <b>Azure Translator</b> and an <b>LLM-powered translation flow</b> as valid paths. Recognition, indexing, and filtering don't translate text. <a href='https://learn.microsoft.com/en-us/azure/ai-services/translator/overview' target='_blank' rel='noopener'>Azure AI Translator overview</a>." },

    { tag:"D4",
      q:"An app must reason directly over the content of an audio clip (e.g. detect a specific claim being made), not just transcribe it. Which capability applies?",
      options:["Multimodal reasoning from audio input","Plain speech-to-text transcription","Text-to-speech synthesis","Image captioning"],
      answer:0,
      why:"Reasoning over audio content, beyond transcription, is <b>multimodal reasoning from audio input</b>. Plain transcription only converts modality, without reasoning about meaning. <a href='https://learn.microsoft.com/en-us/azure/ai-services/speech-service/llm-speech' target='_blank' rel='noopener'>LLM-enhanced speech</a>." },

    { tag:"D4",
      q:"A live voice agent must handle both understanding spoken user input and speaking replies, in the same conversation loop. What's the right framing?",
      options:["Speech integrated as an agent modality, including custom speech models","Two unrelated one-off API calls","A text-only agent with no audio support","A batch transcription job"],
      answer:0,
      why:"Continuous, two-way voice interaction is <b>speech integrated as an agent modality</b> — the study guide's specific phrasing, distinct from isolated one-off calls. <a href='https://learn.microsoft.com/en-us/azure/ai-services/speech-service/overview' target='_blank' rel='noopener'>Azure AI Speech overview</a>." },

    { tag:"D4", type:"order",
      q:"Put the steps to build a spoken-input agentic interaction in order.",
      items:["Convert the caller's speech to text","Run text analysis / reasoning on the transcript","Generate the agent's text reply","Convert the reply to speech for playback"],
      why:"Speech-to-text feeds analysis/reasoning, which produces a text reply, which is then synthesized back to speech — in that order. <a href='https://learn.microsoft.com/en-us/azure/ai-services/speech-service/overview' target='_blank' rel='noopener'>Azure AI Speech overview</a>." }
  ]
};
