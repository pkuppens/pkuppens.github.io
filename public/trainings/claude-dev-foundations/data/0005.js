/* Claude Dev Foundations — quiz dataset for lesson 0005 (D4: Model Context Protocol).
   Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0005'] = {
  passMark: 0.7,
  questions: [
    { tag:"D4", type:"match",
      q:"Match each MCP primitive to who controls it.",
      items:["Tools","Resources","Prompts"],
      categories:["The model decides to invoke it","The app exposes it, read-only","The user selects it"],
      answer:[0,1,2],
      why:"<b>Tools</b> are model-controlled executable operations; <b>resources</b> are app-controlled read-only data; <b>prompts</b> are user-selected, pre-crafted instructions." },

    { tag:"D4",
      q:"How does the Introduction to MCP course have you define tools?",
      options:["With the MCP Python SDK, using decorators","By editing a static JSON schema file only","Through the server inspector's UI exclusively","By writing a CLAUDE.md entry"],
      answer:0,
      why:"The course is hands-on with the <b>Python SDK</b>, defining tools via decorators, then testing them with the server inspector." },

    { tag:"D4",
      q:"What is the MCP 'server inspector,' per the intro course?",
      options:["A browser-based tool for testing and debugging an MCP server","A production monitoring dashboard for deployed servers","A linter that checks Python type hints","A required authentication proxy for all MCP traffic"],
      answer:0,
      why:"The <b>server inspector</b> is a browser-based tool used during development to test and debug an MCP server's tools/resources." },

    { tag:"D4",
      q:"What makes 'sampling' (Advanced Topics) different from the typical MCP request direction?",
      options:["The server asks the client to run a model call on its behalf, reversing the usual client-to-server direction","Sampling means the client randomly selects which tool to call","Sampling is a synonym for prompt caching","Sampling only applies to resources, never tools"],
      answer:0,
      why:"Normally the client calls the server for something. <b>Sampling</b> flips it: the <b>server</b> requests a language-model call <em>through</em> the client." },

    { tag:"D4",
      q:"What do MCP's progress and logging notifications provide, per Advanced Topics?",
      options:["Real-time feedback for long-running operations","A permanent audit log stored by the client","Automatic retries on failed tool calls","A way to bypass roots-based permissions"],
      answer:0,
      why:"<b>Notifications</b> (progress/logging) give real-time feedback during long-running server operations — they don't grant permissions or retry logic." },

    { tag:"D4",
      q:"What does the 'roots' feature control, per Advanced Topics?",
      options:["A permission system granting a server access to specific directories, with defined security boundaries","Which language model the server is allowed to call via sampling","The root URL a server must be hosted at","The order in which tools appear to the model"],
      answer:0,
      why:"<b>Roots</b> is the directory-scoped permission system — bounding exactly what filesystem access a server has." },

    { tag:"D4", type:"match",
      q:"Match each MCP transport to its description.",
      items:["Communication over standard input/output with an initialization handshake","Server-to-client streaming over HTTP using Server-Sent Events, with session management"],
      categories:["STDIO","StreamableHTTP"],
      answer:[0,1],
      why:"<b>STDIO</b> is the local, handshake-based stdin/stdout transport. <b>StreamableHTTP</b> uses Server-Sent Events for server→client streaming over HTTP, with its own session management." },

    { tag:"D4",
      q:"Per the Advanced Topics course, why might a production deployment choose stateless HTTP over a stateful session?",
      options:["Stateless HTTP supports horizontal scaling more easily than stateful sessions","Stateless HTTP is required for the sampling feature to work at all","Stateful sessions are deprecated and no longer supported","Stateless HTTP is the only option for STDIO transport"],
      answer:0,
      why:"The course frames <b>stateless HTTP</b> as favoring horizontal scaling, versus stateful sessions which trade that off for other conveniences (e.g. simpler multi-turn state)." },

    { tag:"D4",
      q:"In the intro course's client implementation, what does 'accessing resources' involve handling, beyond the URI itself?",
      options:["MIME type handling","OAuth token refresh","Git commit signing","Docker image pulls"],
      answer:0,
      why:"The intro course specifically covers <b>MIME type handling</b> when a client accesses a resource — resources can be more than plain text." },

    { tag:"D4",
      q:"What does the MCP JSON message specification (Advanced Topics) organize communication into?",
      options:["Request/result pairs and notifications","HTTP status codes only","YAML configuration blocks","Binary protobuf messages exclusively"],
      answer:0,
      why:"MCP's wire format is JSON messages organized as <b>request/result pairs</b> (for calls expecting a response) and standalone <b>notifications</b> (no response expected)." }
  ]
};
