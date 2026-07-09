/* DP-900 — quiz dataset for lesson 0008 (render target: mock3). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0008'] = {
  mode: "exam",
  passMark: 0.7,
  questions: [
    // ---------- Domain 1 (8) ----------
    { tag:"D1", q:"Unstructured data is best defined as data that:",
      options:["Has no predefined schema or model","Always fits fixed rows and columns","Is always stored in a relational database","Must be encoded as Parquet"], answer:0,
      why:"<b>Unstructured</b> data has no predefined model — images, audio, video, free text." },

    { tag:"D1", type:"match", q:"Match each format to its category.",
      items:["CSV","JSON","Parquet"], categories:["Delimited text","Semi-structured","Columnar"], answer:[0,1,2],
      why:"CSV = delimited text; JSON = semi-structured; Parquet = columnar analytics format." },

    { tag:"D1", q:"Which describes an OLTP database's schema and access pattern?",
      options:["Normalized, many small transactions","Denormalized star schema, big scans","Schema-on-read raw files","Append-only event stream"], answer:0,
      why:"<b>OLTP</b> is normalized with many small transactions." },

    { tag:"D1", q:"A data engineer is most responsible for:",
      options:["Designing and running ingestion and transformation pipelines","Authoring executive dashboards","Approving firewall change requests","Writing DAX measures for reports"], answer:0,
      why:"Pipelines are the <b>data engineer</b>; dashboards/DAX are the analyst." },

    { tag:"D1", type:"multi", q:"Select the TWO examples of semi-structured data.",
      options:["An XML purchase order","A key-value settings store","A normalized SQL table","A scanned PDF contract"], answers:[0,1],
      why:"XML and key-value are <b>semi-structured</b>; a SQL table is structured; a scanned PDF is unstructured." },

    { tag:"D1", q:"Which workload would you run to produce a monthly sales trend report from years of history?",
      options:["Analytical (OLAP)","Transactional (OLTP)","Message queuing","File share hosting"], answer:0,
      why:"Reporting over historical data is <b>OLAP</b>." },

    { tag:"D1", q:"Which Azure datastore is the natural home for large unstructured data such as a data lake's raw files?",
      options:["Azure Blob storage","Azure SQL Database","Azure SQL Managed Instance","Azure Database for MySQL"], answer:0,
      why:"<b>Blob storage</b> (ADLS is built on it) holds large unstructured/raw data." },

    { tag:"D1", q:"Which is a data analyst deliverable rather than an engineer or DBA task?",
      options:["An interactive Power BI report","A tuned backup schedule","A Spark ETL job","A database failover configuration"], answer:0,
      why:"The <b>analyst</b> delivers reports; backups/failover are DBA; Spark ETL is the engineer." },

    // ---------- Domain 2 (7) ----------
    { tag:"D2", q:"Which command grants a user permission on a table?",
      options:["GRANT","SELECT","CREATE","UPDATE"], answer:0,
      why:"<b>GRANT</b> is DCL, controlling access. The others are DML/DDL." },

    { tag:"D2", type:"match", q:"Match each Azure SQL option to its model.",
      items:["Azure SQL Database","SQL Server on Azure VMs","Azure SQL Managed Instance"],
      categories:["PaaS single/elastic database","IaaS full control","PaaS near-full engine compatibility"], answer:[0,1,2],
      why:"SQL Database = PaaS database; SQL on VM = IaaS; Managed Instance = PaaS with near-full compatibility." },

    { tag:"D2", q:"Why normalize a relational schema?",
      options:["To store each fact once and reduce anomalies","To eliminate the need for indexes","To convert data to JSON","To enable global multi-region writes"], answer:0,
      why:"<b>Normalization</b> stores each fact once, reducing anomalies." },

    { tag:"D2", q:"Which object presents a saved query as if it were a table?",
      options:["A view","An index","A trigger","A primary key"], answer:0,
      why:"A <b>view</b> is a saved query used like a virtual table." },

    { tag:"D2", q:"An app must move from on-prem SQL Server to Azure PaaS with minimal code change and instance features. Best fit?",
      options:["Azure SQL Managed Instance","Azure SQL Database (single)","Azure Cosmos DB","Azure Table storage"], answer:0,
      why:"<b>SQL Managed Instance</b> preserves instance-level features with minimal change." },

    { tag:"D2", type:"multi", q:"Select the TWO open-source engines offered as managed Azure Database services.",
      options:["PostgreSQL","MySQL","Microsoft SQL Server","Cosmos DB"], answers:[0,1],
      why:"Azure Database for <b>PostgreSQL</b> and <b>MySQL</b> (plus MariaDB) are open source. SQL Server is Microsoft's; Cosmos is NoSQL." },

    { tag:"D2", q:"Which statement reads data without changing it?",
      options:["SELECT","INSERT","DELETE","DROP"], answer:0,
      why:"<b>SELECT</b> reads; the others modify data or structure." },

    // ---------- Domain 3 (5) ----------
    { tag:"D3", q:"Which service is best for storing millions of unstructured objects such as images at low cost?",
      options:["Azure Blob storage","Azure Files","Azure SQL Database","Azure Cosmos DB"], answer:0,
      why:"<b>Blob storage</b> is object storage for unstructured data at scale." },

    { tag:"D3", q:"Which Cosmos DB API is the native document store for JSON with flexible schemas?",
      options:["NoSQL (Core)","Cassandra","Gremlin","Table"], answer:0,
      why:"The <b>NoSQL (Core) API</b> is the native document store for JSON." },

    { tag:"D3", type:"order", q:"Order Blob access tiers from most-frequent/most-available access to least.",
      items:["Hot","Cool","Cold","Archive"],
      why:"From most to least frequent access and availability: <b>Hot → Cool → Cold → Archive</b>." },

    { tag:"D3", q:"Which service gives a mountable network file share over SMB or NFS?",
      options:["Azure Files","Azure Blob storage","Azure Table storage","Azure Queue storage"], answer:0,
      why:"<b>Azure Files</b> provides mountable SMB/NFS shares." },

    { tag:"D3", q:"Azure Table storage is best described as:",
      options:["A schemaless NoSQL key-value store for structured non-relational data","A relational database with foreign keys","An object store for video","A real-time streaming engine"], answer:0,
      why:"<b>Table storage</b> is a schemaless key-value NoSQL store." },

    // ---------- Domain 4 (10) ----------
    { tag:"D4", q:"Which contrast is correct?",
      options:["ETL transforms before load; ELT loads raw then transforms in the target","ELT transforms before load; ETL never transforms","Both refuse to handle relational data","ETL only applies to streaming data"], answer:0,
      why:"<b>ETL</b> transforms first; <b>ELT</b> loads raw then transforms in the target." },

    { tag:"D4", q:"Which Microsoft platform unifies data integration, engineering, warehousing, real-time intelligence, and Power BI over OneLake?",
      options:["Microsoft Fabric","Azure Databricks","Azure SQL Database","Azure Files"], answer:0,
      why:"<b>Microsoft Fabric</b> is the unified SaaS analytics platform over OneLake." },

    { tag:"D4", q:"Streaming analytics is required when:",
      options:["Insights are needed within seconds of events arriving","Data is exported once per quarter","Reports run overnight on yesterday's data","Only historical trends matter"], answer:0,
      why:"<b>Streaming</b> is for near-real-time insight on arriving events." },

    { tag:"D4", type:"match", q:"Match each analytical store to its description.",
      items:["Modelled structured data for BI (schema-on-write)","Raw data of any structure (schema-on-read)","Cheap object storage underlying the lake"],
      categories:["Data warehouse","Data lake","Blob storage"], answer:[0,1,2],
      why:"Warehouse = modelled/schema-on-write; lake = raw/schema-on-read; Blob underlies the lake." },

    { tag:"D4", q:"Where does a report author typically build a Power BI data model before publishing?",
      options:["Power BI Desktop","The Azure portal","Azure Databricks","SQL Server Management Studio"], answer:0,
      why:"Models and reports are authored in <b>Power BI Desktop</b>." },

    { tag:"D4", type:"multi", q:"Select the TWO Microsoft services suited to large-scale analytics.",
      options:["Azure Databricks","Microsoft Fabric","Azure Queue storage","Azure Files"], answers:[0,1],
      why:"<b>Databricks</b> and <b>Fabric</b> are large-scale analytics services." },

    { tag:"D4", q:"A filled map visualization is most appropriate when the data is:",
      options:["Geographic (values by region or country)","A single KPI versus target","A time series trend","Detailed transaction rows"], answer:0,
      why:"A <b>map</b> suits geographic data. KPI/line/table serve the other cases." },

    { tag:"D4", q:"Which best distinguishes a report from a dashboard in Power BI?",
      options:["A report is multi-page and detailed; a dashboard is a single page of pinned tiles","A dashboard is authored in Desktop; a report is not","A report cannot contain visuals","A dashboard stores the raw data model"], answer:0,
      why:"A <b>report</b> is multi-page/detailed; a <b>dashboard</b> is a single page of pinned tiles." },

    { tag:"D4", q:"Which is a defining feature of batch processing?",
      options:["High throughput over bounded data on a schedule","Per-event millisecond latency","Continuous unbounded input","No ability to process large data"], answer:0,
      why:"<b>Batch</b> = scheduled, high-throughput processing of bounded data." },

    { tag:"D4", q:"A measure in a Power BI data model is:",
      options:["A calculated aggregation used in visuals","A storage access tier","A relational foreign key","A Cosmos DB API"], answer:0,
      why:"A <b>measure</b> is a calculated aggregation (e.g. total sales) in the model." }
  ]
};
