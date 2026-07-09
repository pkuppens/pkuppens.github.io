/* DP-900 — quiz dataset for lesson 0002 (render target: q-core). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0002'] = {
  passMark: 0.7,
  questions: [
    { tag:"D1",
      q:"Which characteristic best describes structured data?",
      options:["It conforms to a fixed schema of rows and columns","It has no predefined organization at all","It is always stored as image files","It cannot be queried with SQL"],
      answer:0,
      why:"<b>Structured</b> data fits a fixed schema of rows and columns — the relational-table shape, queried with SQL." },

    { tag:"D1",
      q:"A JSON document with nested fields and optional properties is an example of which data type?",
      options:["Semi-structured","Structured","Unstructured","Columnar"],
      answer:0,
      why:"JSON is self-describing with tags/keys but no rigid table schema — <b>semi-structured</b>." },

    { tag:"D1", type:"multi",
      q:"Select the TWO file formats that are columnar and optimized for large-scale analytics.",
      options:["Parquet","Avro","CSV","JSON","XML"],
      answers:[0,1],
      why:"<b>Parquet</b> and <b>Avro</b> (and ORC) are compact analytics formats. CSV/JSON/XML are row-oriented and human-readable." },

    { tag:"D1",
      q:"Which set of properties characterizes an analytical (OLAP) workload?",
      options:["Large aggregate reads over historical data, denormalized, read-optimized","Many tiny writes on current data, normalized, ACID","Single-record lookups by primary key","Continuous per-event stream processing"],
      answer:0,
      why:"<b>OLAP</b> = large aggregate reads over historical, denormalized data. The second option describes OLTP." },

    { tag:"D1", type:"match",
      q:"Match each workload trait to the correct workload type.",
      items:["Normalized schema, thousands of small transactions","Star schema, heavy aggregate queries for reporting","Guarantees atomic, consistent, isolated, durable writes"],
      categories:["OLTP","OLAP"],
      answer:[0,1,0],
      why:"Small transactions + ACID belong to <b>OLTP</b>; star-schema aggregate reporting is <b>OLAP</b>." },

    { tag:"D1",
      q:"Which task is a database administrator (DBA) primarily responsible for?",
      options:["Backup, restore, availability, and security of a database","Designing Power BI report visuals","Building Spark data-transformation notebooks","Choosing which chart best shows a trend"],
      answer:0,
      why:"The <b>DBA</b> owns availability, performance, backup/restore, and security. Visuals/charts are the analyst; Spark pipelines are the engineer." },

    { tag:"D1",
      q:"A data analyst's core responsibility is best described as:",
      options:["Modelling and visualizing data to surface business insight","Patching the database engine","Provisioning virtual networks","Configuring storage replication"],
      answer:0,
      why:"The <b>data analyst</b> models, explores, and visualizes data (e.g. in Power BI) to produce insight." },

    { tag:"D1",
      q:"You must store large volumes of unstructured video for later analysis at the lowest cost. Which Azure datastore fits the use case?",
      options:["Azure Blob storage","Azure SQL Database","Azure Table storage","Azure SQL Managed Instance"],
      answer:0,
      why:"Unstructured video at scale and low cost → <b>Blob storage</b>. SQL products are relational; Table is key-value for structured non-relational data." },

    { tag:"D1", type:"multi",
      q:"Select the TWO items that are semi-structured data stores or formats.",
      options:["A key-value store","An XML document","A normalized SQL table","A JPEG image","A columnar warehouse fact table"],
      answers:[0,1],
      why:"Key-value stores and XML are <b>semi-structured</b>. A normalized SQL table is structured; a JPEG is unstructured." },

    { tag:"D1",
      q:"Which statement about ACID is correct?",
      options:["It guarantees atomicity, consistency, isolation, and durability for transactions","It is a file format for analytics","It describes a Power BI visual type","It is the name of a Cosmos DB API"],
      answer:0,
      why:"<b>ACID</b> = Atomicity, Consistency, Isolation, Durability — the transactional guarantees relational OLTP systems provide." }
  ]
};
