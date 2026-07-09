/* DP-900 — quiz dataset for lesson 0004 (render target: q-nonrel). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0004'] = {
  passMark: 0.7,
  questions: [
    { tag:"D3",
      q:"Which Azure Storage service is object storage designed for unstructured data such as images, video, and backups?",
      options:["Azure Blob storage","Azure Files","Azure Table storage","Azure Queue storage"],
      answer:0,
      why:"<b>Blob storage</b> is object storage for unstructured data at scale. Files is a mountable share; Table is key-value; Queue is messaging." },

    { tag:"D3",
      q:"You need a cloud file share that on-prem servers can mount over SMB, like a network drive. Which service?",
      options:["Azure Files","Azure Blob storage","Azure Table storage","Azure Cosmos DB"],
      answer:0,
      why:"<b>Azure Files</b> provides managed SMB/NFS file shares you can mount. Blob is objects, not a mountable filesystem." },

    { tag:"D3", type:"match",
      q:"Match each need to the right Azure Storage service.",
      items:["Store millions of unstructured photos cheaply","Mount a shared drive over SMB","Store large volumes of key-value structured data"],
      categories:["Blob storage","Azure Files","Table storage"],
      answer:[0,1,2],
      why:"Unstructured objects → <b>Blob</b>; mountable share → <b>Files</b>; key-value NoSQL → <b>Table storage</b>." },

    { tag:"D3", type:"order",
      q:"Order Blob access tiers from lowest storage cost / least frequent access to highest availability / most frequent access.",
      items:["Archive","Cold","Cool","Hot"],
      why:"Colder tiers cost less to store but more/slower to access: <b>Archive → Cold → Cool → Hot</b>." },

    { tag:"D3",
      q:"Which scenario is the strongest fit for Azure Cosmos DB?",
      options:["A globally distributed retail app needing low latency and multi-region writes","A single-region reporting data warehouse","Archiving cold backup files","A departmental SMB file share"],
      answer:0,
      why:"Global distribution, low latency, and multi-region writes are Cosmos DB's signature <b>use case</b>." },

    { tag:"D3",
      q:"A team migrating a Cassandra workload wants minimal application change on Cosmos DB. Which API should they select?",
      options:["Apache Cassandra API","NoSQL (Core) API","API for MongoDB","Gremlin API"],
      answer:0,
      why:"Choose the Cosmos DB API matching the source engine: the <b>Cassandra API</b> for Cassandra workloads." },

    { tag:"D3",
      q:"Which Cosmos DB API is designed for graph data (vertices and edges)?",
      options:["Apache Gremlin","NoSQL (Core)","Table","MongoDB"],
      answer:0,
      why:"The <b>Gremlin</b> API is Cosmos DB's graph API. Core is documents; Table is key-value; MongoDB is documents." },

    { tag:"D3", type:"multi",
      q:"Select the TWO true statements about Azure Table storage.",
      options:["It is a NoSQL key-value store","It suits large volumes of structured, non-relational data","It enforces foreign-key relationships","It is primarily for mounting SMB shares"],
      answers:[0,1],
      why:"Table storage is a <b>NoSQL key-value</b> store for large volumes of structured non-relational data. It has no relational keys and is not a file share." },

    { tag:"D3",
      q:"Which Blob access tier is cheapest to store but has the highest retrieval latency, suited to rarely accessed data?",
      options:["Archive","Hot","Cool","Cold"],
      answer:0,
      why:"The <b>Archive</b> tier is cheapest to store but must be rehydrated before reading — for data accessed very rarely." },

    { tag:"D3",
      q:"Semi-structured JSON documents that need flexible schemas and native document queries fit which Cosmos DB API?",
      options:["NoSQL (Core) API","Table API","Cassandra API","Gremlin API"],
      answer:0,
      why:"The native document store is the <b>NoSQL (Core) API</b>, best for JSON documents with flexible schemas." }
  ]
};
