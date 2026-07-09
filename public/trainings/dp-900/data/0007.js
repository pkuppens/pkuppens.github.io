/* DP-900 — quiz dataset for lesson 0007 (render target: mock2). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0007'] = {
  mode: "exam",
  passMark: 0.7,
  questions: [
    // ---------- Domain 1 (8) ----------
    { tag:"D1", q:"Which is an example of structured data?",
      options:["A relational table with fixed columns","A folder of PNG images","A free-text support email","An MP3 recording"], answer:0,
      why:"A fixed-column relational table is <b>structured</b>; images, free text, and audio are unstructured." },

    { tag:"D1", q:"Which workload type is optimized for reads over large historical datasets?",
      options:["Analytical (OLAP)","Transactional (OLTP)","Message queuing","Object storage"], answer:0,
      why:"<b>OLAP</b> is read-optimized over historical data." },

    { tag:"D1", type:"match", q:"Match each responsibility to the correct data role.",
      items:["Keep a database available, secure, and backed up","Build pipelines that move and shape data","Create Power BI reports to reveal trends"],
      categories:["Database administrator","Data engineer","Data analyst"], answer:[0,1,2],
      why:"Availability/backup = DBA; pipelines = engineer; reports = analyst." },

    { tag:"D1", q:"Which format is columnar and optimized for analytical queries?",
      options:["Parquet","CSV","Plain text","XML"], answer:0,
      why:"<b>Parquet</b> is columnar and analytics-optimized; CSV/text/XML are row-based or human-readable." },

    { tag:"D1", type:"multi", q:"Select the TWO characteristics of a transactional (OLTP) workload.",
      options:["Many small, fast writes","Normalized schema with ACID guarantees","Denormalized star schema","Large aggregate scans over history"], answers:[0,1],
      why:"OLTP: <b>small fast writes</b> and <b>normalized, ACID</b>. Star schema and aggregate scans are OLAP." },

    { tag:"D1", q:"A stream of clickstream JSON events with varying fields is which data type?",
      options:["Semi-structured","Structured","Unstructured","Columnar"], answer:0,
      why:"JSON with varying fields is <b>semi-structured</b>." },

    { tag:"D1", q:"Which Azure datastore best fits storing structured, non-relational key-value data cheaply at scale?",
      options:["Azure Table storage","Azure SQL Database","Azure Files","Azure SQL Managed Instance"], answer:0,
      why:"<b>Azure Table storage</b> is a low-cost NoSQL key-value store for structured non-relational data." },

    { tag:"D1", q:"Which task is squarely a database administrator responsibility?",
      options:["Configuring backups and restore procedures","Choosing chart types for a dashboard","Designing a Spark transformation","Writing a data-lake ingestion job"], answer:0,
      why:"Backup/restore is the <b>DBA</b>. Charts = analyst; Spark/ingestion = engineer." },

    // ---------- Domain 2 (7) ----------
    { tag:"D2", q:"Which database object is precompiled executable SQL you can call by name?",
      options:["Stored procedure","View","Index","Primary key"], answer:0,
      why:"A <b>stored procedure</b> is saved, executable SQL. A view is a saved query; an index speeds lookups." },

    { tag:"D2", q:"Which Azure SQL option is the best lift-and-shift target with near-full SQL Server compatibility as a managed service?",
      options:["Azure SQL Managed Instance","Azure SQL Database (single)","SQL Server on Azure VMs","Azure Database for MariaDB"], answer:0,
      why:"<b>SQL Managed Instance</b> offers near-100% engine compatibility as PaaS — the lift-and-shift choice." },

    { tag:"D2", type:"multi", q:"Select the TWO statements that are DDL.",
      options:["ALTER TABLE","CREATE VIEW","SELECT","GRANT"], answers:[0,1],
      why:"ALTER and CREATE define structure (<b>DDL</b>). SELECT is DML; GRANT is DCL." },

    { tag:"D2", q:"What does a foreign key enforce?",
      options:["A relationship referencing another table's primary key","Uniqueness within the same table","Faster query lookups","Row-level encryption"], answer:0,
      why:"A <b>foreign key</b> enforces a relationship to another table's primary key." },

    { tag:"D2", q:"Which is a fully managed service for the MySQL open-source engine?",
      options:["Azure Database for MySQL","Azure SQL Database","Azure Cosmos DB","Azure Blob storage"], answer:0,
      why:"<b>Azure Database for MySQL</b> is the managed open-source MySQL service." },

    { tag:"D2", q:"Which statement removes rows of data but leaves the table structure intact?",
      options:["DELETE","DROP TABLE","ALTER TABLE","CREATE INDEX"], answer:0,
      why:"<b>DELETE</b> (DML) removes rows; DROP removes the whole table (DDL)." },

    { tag:"D2", q:"Which is the main benefit of an index?",
      options:["Faster retrieval for matching queries","Guaranteed multi-region replication","Automatic normalization","Free data encryption"], answer:0,
      why:"An <b>index</b> speeds retrieval, at a write/storage cost." },

    // ---------- Domain 3 (5) ----------
    { tag:"D3", type:"match", q:"Match each requirement to the right Azure Storage service.",
      items:["Cheap object storage for backups and media","A mountable SMB share","Key-value NoSQL at large scale"],
      categories:["Blob storage","Azure Files","Table storage"], answer:[0,1,2],
      why:"Objects → Blob; mountable share → Files; key-value → Table." },

    { tag:"D3", q:"Which Cosmos DB API stores graph data as vertices and edges?",
      options:["Gremlin","NoSQL (Core)","Table","MongoDB"], answer:0,
      why:"The <b>Gremlin</b> API is for graph data." },

    { tag:"D3", q:"Which Blob tier suits data that is rarely accessed but must be kept, at the lowest storage cost?",
      options:["Archive","Hot","Cool","Cold"], answer:0,
      why:"<b>Archive</b> is cheapest to store and is rehydrated before reading." },

    { tag:"D3", q:"Which is a primary use case for Azure Cosmos DB?",
      options:["A globally distributed, low-latency web app","A single-region BI data warehouse","A departmental SMB file share","Long-term cold archival of logs"], answer:0,
      why:"Global distribution and low latency are Cosmos DB's core <b>use case</b>." },

    { tag:"D3", q:"Which service is object storage rather than a mountable filesystem?",
      options:["Azure Blob storage","Azure Files","Azure NetApp Files","Azure Disk"], answer:0,
      why:"<b>Blob</b> is object storage; Files/NetApp/Disk present filesystems or volumes." },

    // ---------- Domain 4 (10) ----------
    { tag:"D4", q:"Which analytical store enforces structure up front (schema-on-write) for modelled reporting data?",
      options:["Data warehouse","Data lake","Blob container","Message queue"], answer:0,
      why:"A <b>data warehouse</b> is schema-on-write, structured for reporting." },

    { tag:"D4", q:"Batch processing is best characterized by:",
      options:["Processing bounded data on a schedule","Reacting to each event within milliseconds","Never handling large volumes","Only running on relational data"], answer:0,
      why:"<b>Batch</b> processes bounded datasets on a schedule with high throughput." },

    { tag:"D4", type:"match", q:"Match each service to its role.",
      items:["Self-service report and dashboard authoring","Spark platform for engineering and ML","Unified SaaS analytics over OneLake"],
      categories:["Power BI","Azure Databricks","Microsoft Fabric"], answer:[0,1,2],
      why:"BI authoring = Power BI; Spark = Databricks; unified SaaS analytics = Fabric." },

    { tag:"D4", q:"Which Power BI item is a single page of pinned tiles for at-a-glance monitoring?",
      options:["A dashboard","A report","A dataset","A measure"], answer:0,
      why:"A <b>dashboard</b> is a single page of pinned tiles." },

    { tag:"D4", q:"Which visualization best compares a single metric against its target?",
      options:["A KPI visual","A pie chart","A scatter chart","A map"], answer:0,
      why:"A <b>KPI</b> visual shows value vs. target." },

    { tag:"D4", type:"multi", q:"Select the TWO true statements about a data lake.",
      options:["It stores raw data of any structure","It uses low-cost scalable storage","It requires a fixed relational schema before loading","It cannot store unstructured files"], answers:[0,1],
      why:"A data lake stores <b>raw data of any structure</b> on <b>low-cost storage</b>; it does not require a schema up front." },

    { tag:"D4", q:"Which service analyzes continuous event streams in near real time?",
      options:["Azure Stream Analytics","Azure SQL Database","Azure Blob storage","Power BI Desktop"], answer:0,
      why:"<b>Azure Stream Analytics</b> handles real-time streaming." },

    { tag:"D4", q:"In ELT, the compute that performs the transform is:",
      options:["The target lake or warehouse","A separate staging server before load","The Power BI service","The source database only"], answer:0,
      why:"<b>ELT</b> transforms using the <b>target's</b> compute after loading raw data." },

    { tag:"D4", q:"Which is a feature of a Power BI data model?",
      options:["Relationships and measures across tables","Blob access tiers","SQL GRANT statements","Cosmos DB partition keys"], answer:0,
      why:"A Power BI <b>data model</b> defines relationships and measures." },

    { tag:"D4", q:"A line chart is the best choice to show:",
      options:["A trend over a continuous time axis","The share of a whole","A single value vs. goal","Exact row-level detail"], answer:0,
      why:"A <b>line chart</b> shows trends over continuous time." }
  ]
};
