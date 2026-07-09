/* AI-901 — quiz dataset for lesson 0003 (render target: q-agents). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0003'] = {
  passMark: 0.7,
  questions: [
    { tag:"D2", type:"match",
      q:"Match each agent ingredient to what it provides.",
      items:["Instructions","Tools","Knowledge","Conversation"],
      categories:["Persistent behaviour","Ability to act","Grounding data","Turn-to-turn memory"],
      answer:[0,1,2,3],
      why:"Instructions = persistent behaviour; tools = ability to act; knowledge = grounding data; conversation = memory across turns." },

    { tag:"D2",
      q:"An agent must consistently refuse off-topic questions and answer in a fixed JSON shape. Where does that go?",
      options:["Instructions","A tool definition","The knowledge source","The conversation object"],
      answer:0,
      why:"Fixed behaviour and output format belong in the agent's <b>instructions</b>. Tools act, knowledge grounds, and the conversation only stores history." },

    { tag:"D2",
      q:"An agent needs to query live inventory and then call your shipping API mid-task. This requires:",
      options:["Tools","Knowledge","A longer context window","A lower temperature"],
      answer:0,
      why:"Taking live actions (queries, API calls) is what <b>tools</b> enable. Knowledge only grounds; context window and temperature don't add actions." },

    { tag:"D2",
      q:"You want answers grounded strictly in your policy PDFs, with citations. You attach them as:",
      options:["Knowledge","A tool","A system prompt","A fine-tune set"],
      answer:0,
      why:"Retrieval-grounded source data is the agent's <b>knowledge</b>. A tool acts; a system prompt sets rules; a fine-tune set retrains the model." },

    { tag:"D2", type:"multi",
      q:"Select the TWO things that distinguish an agent from a single bare model call.",
      options:["It can take actions via tools","It retains context across turns","It runs without any model","It needs no deployment","It cannot use instructions"],
      answers:[0,1],
      why:"An agent adds <b>tool-driven actions</b> and <b>multi-turn memory</b> on top of a model. It still needs a model, a deployment, and it does use instructions." },

    { tag:"D2",
      q:"A one-shot 'classify this sentence's sentiment' with no memory or actions is best served by:",
      options:["A plain model call","A single-agent solution","A multi-agent workflow","A knowledge index"],
      answer:0,
      why:"With no memory, tools, or grounding needed, a <b>plain model call</b> is enough. Agents and indexes add overhead you don't need here." },

    { tag:"D2",
      q:"On AI-901, an agent question offering 'multi-agent orchestration' as a choice should steer you to:",
      options:["A single-agent solution","A multi-agent swarm","A fine-tuning pipeline","A batch scoring job"],
      answer:0,
      why:"AI-901 scopes to a <b>single-agent</b> solution; multi-agent orchestration is AI-102-level. Fine-tuning and batch scoring aren't agent tasks." }
  ]
};
