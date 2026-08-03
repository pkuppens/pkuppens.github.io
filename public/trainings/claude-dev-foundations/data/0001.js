/* Claude Dev Foundations — quiz dataset for lesson 0001 (diagnostic, mixed D1-D4).
   Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0001'] = {
  passMark: 0.7,
  questions: [
    { tag:"D1",
      q:"In Claude 101, which term describes a standalone generated document, piece of code, or UI that you keep iterating on?",
      options:["Artifact","Project","Skill","Resource"],
      answer:0,
      why:"An <b>artifact</b> is the standalone generated output. A <b>project</b> is the persistent context around a body of work." },

    { tag:"D1",
      q:"The AI Fluency 4D Framework's 'Diligence' competency is about:",
      options:["Owning the outcome and verifying the AI's work","Choosing which tasks to delegate","Writing a clear task description","Judging whether an output is good"],
      answer:0,
      why:"<b>Diligence</b> is about responsibility and verification. Delegation, Description, and Discernment are the other three competencies." },

    { tag:"D1",
      q:"Per AI Capabilities and Limitations, which property most directly explains why Claude can only reason over a bounded amount of the current conversation?",
      options:["Working memory","Steerability","Knowledge","Next-token prediction"],
      answer:0,
      why:"<b>Working memory</b> is bounded by the context window, limiting how much a single turn can reason over." },

    { tag:"D2",
      q:"Claude Platform 101 frames the agent loop as which repeating cycle?",
      options:["Act, observe, decide","Plan, code, test, deploy","Request, cache, retrieve","Chunk, embed, rank"],
      answer:0,
      why:"The <b>agent loop</b> is act → observe → decide, repeating until the task is done." },

    { tag:"D2",
      q:"Why does Building with the Claude API teach RAG (retrieval-augmented generation)?",
      options:["To bring in only the relevant slice of information instead of filling a finite context window with everything","To permanently replace the need for an API key","To make model responses deterministic","To disable extended thinking for cost savings"],
      answer:0,
      why:"RAG exists because working memory is finite and costly to fill — retrieval brings in just the relevant slice." },

    { tag:"D2",
      q:"What distinguishes an 'agent' from a fixed 'workflow' (chaining/routing/parallelization), per Building with the Claude API?",
      options:["An agent decides its own next step dynamically; a workflow's steps are predefined","A workflow can call tools, but an agent cannot","Agents only run on the Haiku model","There is no real difference between the two"],
      answer:0,
      why:"A <b>workflow</b> follows known, fixed steps; an <b>agent</b> decides its next step via the agent loop when the path isn't known ahead of time." },

    { tag:"D3", type:"order",
      q:"Order Claude Code 101's daily workflow for tackling a feature or fix.",
      items:["Explore","Plan","Code","Commit"],
      why:"<b>Explore → plan → code → commit</b> — understand first, agree an approach, implement, then commit." },

    { tag:"D3",
      q:"What is CLAUDE.md used for, per Claude Code 101?",
      options:["Persistent project memory Claude reads across sessions","A required license file","A log of every executed shell command","A format exclusive to MCP server configuration"],
      answer:0,
      why:"<b>CLAUDE.md</b> holds persistent, project-level context and instructions." },

    { tag:"D3",
      q:"Per Claude Code in Action, what makes hooks suited for rules that must never be skipped?",
      options:["They fire deterministically on specific events, unlike CLAUDE.md guidance which the model merely tends to follow","They require a paid enterprise plan","They only work inside GitHub Actions","They replace the need for permission modes"],
      answer:0,
      why:"<b>Hooks</b> fire deterministically on events, giving enforcement that guidance in CLAUDE.md can't guarantee." },

    { tag:"D4", type:"match",
      q:"Match each MCP primitive to who controls it.",
      items:["Tools","Resources","Prompts"],
      categories:["The model","The app","The user"],
      answer:[0,1,2],
      why:"<b>Tools</b> are model-controlled, <b>resources</b> are app-controlled read-only data, <b>prompts</b> are user-selected." },

    { tag:"D4",
      q:"What is distinctive about MCP 'sampling', per Model Context Protocol: Advanced Topics?",
      options:["The server requests a language-model call through the connected client, reversing the usual direction","It lets a client randomly pick which server to connect to","It is another name for a resource's MIME type","It only applies to STDIO transport, never HTTP"],
      answer:0,
      why:"Sampling flips the usual direction: the <b>server</b> asks the <b>client</b> to run a model call on its behalf." },

    { tag:"D4",
      q:"Which MCP transport uses Server-Sent Events for server-to-client streaming over HTTP, with its own session management?",
      options:["StreamableHTTP","STDIO","gRPC","WebSocket-only transport"],
      answer:0,
      why:"<b>StreamableHTTP</b> is the SSE-based, session-managed HTTP transport. STDIO is the local stdin/stdout transport instead." }
  ]
};
