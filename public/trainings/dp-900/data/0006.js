/* DP-900 — quiz dataset for lesson 0006 (render target: mock1). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0006'] = {
  mode: "exam",
  passMark: 0.7,
  questions: [
    // ---------- Domain 1 — core data concepts (8) ----------
    { tag:"D1", q:"A collection of scanned contracts and photographs has no fixed schema. How is it classified?",
      options:["Unstructured","Structured","Semi-structured","Relational"], answer:0,
      why:"Scanned documents and photos have no predefined model — <b>unstructured</b> data." },

    { tag:"D1", q:"Which is a defining feature of semi-structured data?",
      options:["It is self-describing with tags or keys but no rigid table schema","It always fits fixed rows and columns","It can never be stored as JSON","It requires a primary key"], answer:0,
      why:"<b>Semi-structured</b> data (JSON, XML, key-value) carries its own tags/keys without a fixed table schema." },

    { tag:"D1", q:"An operational system with many small, fast inserts and updates on current data is which workload?",
      options:["Transactional (OLTP)","Analytical (OLAP)","Batch reporting","Streaming visualization"], answer:0,
      why:"Frequent small writes on current data = <b>OLTP</b>." },

    { tag:"D1", type:"multi", q:"Select the TWO responsibilities that belong to a data engineer.",
      options:["Build data ingestion and transformation pipelines","Integrate data from multiple sources","Design a report's colour palette","Approve database user password policies"], answers:[0,1],
      why:"The <b>data engineer</b> builds pipelines and integrates sources. Report visuals are the analyst; password policy is DBA/security." },

    { tag:"D1", q:"Which file format is row-based and human-readable rather than columnar?",
      options:["CSV","Parquet","ORC","Avro"], answer:0,
      why:"<b>CSV</b> is delimited, row-oriented, human-readable. Parquet/ORC/Avro are analytics-optimized columnar/binary formats." },

    { tag:"D1", type:"match", q:"Match each data example to its representation type.",
      items:["A fixed-column Orders table","A key-value configuration store","A folder of audio recordings"],
      categories:["Structured","Semi-structured","Unstructured"], answer:[0,1,2],
      why:"Fixed columns = structured; key-value = semi-structured; audio files = unstructured." },

    { tag:"D1", q:"Which best describes an analytical (OLAP) workload?",
      options:["Aggregating large volumes of historical data for reporting","Recording individual sales transactions in real time","Serving single-row lookups by key","Enforcing ACID on every write"], answer:0,
      why:"<b>OLAP</b> aggregates large historical datasets for reporting; the others describe OLTP." },

    { tag:"D1", q:"Who typically owns modelling and visualizing data to communicate insight?",
      options:["Data analyst","Database administrator","Network engineer","Site reliability engineer"], answer:0,
      why:"The <b>data analyst</b> models and visualizes data (e.g. in Power BI)." },

    // ---------- Domain 2 — relational on Azure (7) ----------
    { tag:"D2", q:"What uniquely identifies each row within a single table?",
      options:["A primary key","A foreign key","An index","A view"], answer:0,
      why:"A <b>primary key</b> uniquely identifies rows in its own table." },

    { tag:"D2", q:"Which family does the CREATE TABLE statement belong to?",
      options:["DDL","DML","DCL","TCL"], answer:0,
      why:"CREATE defines structure — <b>Data Definition Language</b>." },

    { tag:"D2", q:"Which Azure service is fully managed PaaS and best for a new cloud-native relational app with minimal admin?",
      options:["Azure SQL Database","SQL Server on Azure VMs","Azure Cosmos DB","Azure Files"], answer:0,
      why:"<b>Azure SQL Database</b> is managed PaaS, ideal for new cloud-native apps." },

    { tag:"D2", q:"Which option provides the greatest control by giving you the operating system and full SQL Server engine?",
      options:["SQL Server on Azure Virtual Machines","Azure SQL Database","Azure SQL Managed Instance","Azure Database for MySQL"], answer:0,
      why:"<b>SQL Server on Azure VMs</b> (IaaS) gives OS-level and engine control, with the most administration." },

    { tag:"D2", type:"match", q:"Match each SQL statement to its language family.",
      items:["DROP TABLE","DELETE","REVOKE"], categories:["DDL","DML","DCL"], answer:[0,1,2],
      why:"DROP = DDL, DELETE = DML, REVOKE = DCL." },

    { tag:"D2", q:"Which managed Azure service targets the open-source PostgreSQL engine?",
      options:["Azure Database for PostgreSQL","Azure SQL Managed Instance","Azure Table storage","Azure Cosmos DB for NoSQL"], answer:0,
      why:"<b>Azure Database for PostgreSQL</b> is the managed open-source PostgreSQL offering." },

    { tag:"D2", q:"Normalization reduces which problem?",
      options:["Redundant data and update anomalies","Query latency for every workload","Storage encryption overhead","Network egress cost"], answer:0,
      why:"<b>Normalization</b> reduces redundancy and update anomalies." },

    // ---------- Domain 3 — non-relational on Azure (5) ----------
    { tag:"D3", q:"Which service stores large amounts of unstructured object data cheaply?",
      options:["Azure Blob storage","Azure SQL Database","Azure Files","Azure Queue storage"], answer:0,
      why:"<b>Blob storage</b> is object storage for unstructured data at scale." },

    { tag:"D3", q:"You need a mountable SMB file share in Azure. Which service?",
      options:["Azure Files","Azure Blob storage","Azure Table storage","Azure Cosmos DB"], answer:0,
      why:"<b>Azure Files</b> provides mountable SMB/NFS shares." },

    { tag:"D3", q:"A global app needs multi-region writes and single-digit-millisecond latency. Which database?",
      options:["Azure Cosmos DB","Azure SQL Database","Azure Table storage","Azure Files"], answer:0,
      why:"<b>Cosmos DB</b> is built for global distribution and low latency." },

    { tag:"D3", q:"Migrating a MongoDB app to Cosmos DB with minimal change uses which API?",
      options:["API for MongoDB","NoSQL (Core)","Gremlin","Cassandra"], answer:0,
      why:"Match the source: the <b>MongoDB API</b> for MongoDB apps." },

    { tag:"D3", type:"multi", q:"Select the TWO true statements about Azure Blob storage.",
      options:["It offers hot, cool, cold, and archive access tiers","It is ideal for unstructured data at scale","It enforces relational foreign keys","It is a mountable SMB file share"], answers:[0,1],
      why:"Blob offers tiered access and suits unstructured data. It has no relational keys and is not a mounted share (that is Files)." },

    // ---------- Domain 4 — analytics on Azure (10) ----------
    { tag:"D4", q:"In ELT, when is data transformed?",
      options:["After loading raw data into the target store","Before it leaves the source system","Only during visualization","It is never transformed"], answer:0,
      why:"<b>ELT</b> transforms after loading raw data into the lake/warehouse." },

    { tag:"D4", q:"Which store holds raw data of any structure at low cost using schema-on-read?",
      options:["Data lake","Data warehouse","OLTP database","Message queue"], answer:0,
      why:"A <b>data lake</b> holds raw data cheaply with schema-on-read." },

    { tag:"D4", q:"Which Microsoft service is an Apache Spark-based analytics platform?",
      options:["Azure Databricks","Power BI","Azure SQL Database","Azure Files"], answer:0,
      why:"<b>Azure Databricks</b> is the Spark-based analytics platform." },

    { tag:"D4", q:"Which describes streaming data?",
      options:["Unbounded events processed continuously as they arrive","Bounded data processed on a nightly schedule","A one-time historical export","A normalized relational schema"], answer:0,
      why:"<b>Streaming</b> = continuous processing of unbounded events." },

    { tag:"D4", q:"Which Azure service processes real-time streaming data?",
      options:["Azure Stream Analytics","Azure Blob storage","Azure SQL Managed Instance","Power BI Desktop"], answer:0,
      why:"<b>Azure Stream Analytics</b> processes streaming data in near real time." },

    { tag:"D4", type:"order", q:"Order these ETL steps as they occur.",
      items:["Extract data from the source","Transform it in the staging engine","Load it into the warehouse"],
      why:"<b>ETL</b> extracts, transforms in staging, then loads the transformed data." },

    { tag:"D4", q:"Which Power BI artifact is multi-page and detailed, built in Desktop?",
      options:["A report","A dashboard","A measure","A dataflow"], answer:0,
      why:"A <b>report</b> is multi-page and detailed; a dashboard is a single page of pinned tiles." },

    { tag:"D4", q:"Which visualization best shows the proportion each product line contributes to total sales?",
      options:["A pie or stacked bar chart","A line chart","A KPI card","A scatter chart"], answer:0,
      why:"Composition/proportion is shown by a <b>pie or stacked bar</b>. Line shows trend; scatter shows correlation." },

    { tag:"D4", q:"Microsoft Fabric is best described as:",
      options:["A unified SaaS analytics platform over OneLake including Power BI","A single relational database engine","A Cosmos DB API","An object storage tier"], answer:0,
      why:"<b>Microsoft Fabric</b> unifies analytics workloads over OneLake, including Power BI." },

    { tag:"D4", type:"multi", q:"Select the TWO options for analytical data stores.",
      options:["Data warehouse","Data lake","OLTP transactional table","Azure Queue storage"], answers:[0,1],
      why:"<b>Data warehouse</b> and <b>data lake</b> are analytical stores. OLTP tables and queues are not analytical stores." }
  ]
};
