/* DP-900 — quiz dataset for lesson 0001 (render target: q-diag). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0001'] = {
  passMark: 0.7,
  questions: [
    // ---------- Domain 1 — core data concepts ----------
    { tag:"D1",
      q:"A file of product photos and scanned invoices has no fixed schema. How is this data best classified?",
      options:["Unstructured","Structured","Semi-structured","Relational"],
      answer:0,
      why:"Images and scanned documents have no predefined model, so they are <b>unstructured</b>. Structured data is rows/columns; semi-structured is self-describing (JSON/XML)." },

    { tag:"D1", type:"match",
      q:"Match each data example to how it is represented.",
      items:["A Customers table with fixed columns","A JSON document with nested tags","A folder of MP4 video files"],
      categories:["Structured","Semi-structured","Unstructured"],
      answer:[0,1,2],
      why:"Fixed rows/columns = structured; self-describing JSON = semi-structured; video files = unstructured." },

    { tag:"D1",
      q:"An order-entry system records thousands of small inserts and updates per second on current data. Which workload is this?",
      options:["Transactional (OLTP)","Analytical (OLAP)","Streaming ingestion","Batch reporting"],
      answer:0,
      why:"Many small, fast reads/writes on current operational data is <b>OLTP</b>. OLAP is large aggregate reads over historical data." },

    { tag:"D1",
      q:"Who is primarily responsible for building the pipelines that ingest and transform data into an analytics store?",
      options:["Data engineer","Database administrator","Data analyst","Data scientist"],
      answer:0,
      why:"Building and operating ingest/transform pipelines is the <b>data engineer</b>. The DBA keeps databases healthy; the analyst models and visualizes." },

    // ---------- Domain 2 — relational on Azure ----------
    { tag:"D2",
      q:"Why is a relational database normalized?",
      options:["To reduce data duplication and update anomalies","To make every query run without joins","To store images more efficiently","To avoid using primary keys"],
      answer:0,
      why:"<b>Normalization</b> stores each fact once, cutting redundancy and update anomalies — at the cost of more joins on read." },

    { tag:"D2",
      q:"You must lift-and-shift an on-premises SQL Server database to Azure with near-full engine compatibility and minimal management. Best target?",
      options:["Azure SQL Managed Instance","Azure SQL Database (single)","SQL Server on an Azure VM","Azure Database for PostgreSQL"],
      answer:0,
      why:"<b>SQL Managed Instance</b> gives near-100% SQL Server compatibility as a managed service — the standard lift-and-shift target. A VM means you manage everything; PostgreSQL is a different engine." },

    { tag:"D2", type:"multi",
      q:"Select the TWO statements that belong to SQL's Data Manipulation Language (DML).",
      options:["SELECT","UPDATE","CREATE TABLE","GRANT","DROP VIEW"],
      answers:[0,1],
      why:"SELECT and UPDATE manipulate data (<b>DML</b>). CREATE/DROP are DDL; GRANT is DCL." },

    { tag:"D2",
      q:"Which Azure service is a fully managed PaaS relational database with the least administrative overhead?",
      options:["Azure SQL Database","SQL Server on Azure VMs","Azure Blob storage","Azure Table storage"],
      answer:0,
      why:"<b>Azure SQL Database</b> is PaaS — Microsoft patches, backs up, and maintains it. A VM is IaaS; Blob/Table are non-relational." },

    // ---------- Domain 3 — non-relational on Azure ----------
    { tag:"D3",
      q:"You need cheap, massively scalable storage for millions of unstructured image and backup files. Which service?",
      options:["Azure Blob storage","Azure Files","Azure SQL Database","Azure Table storage"],
      answer:0,
      why:"<b>Blob storage</b> is object storage built for large volumes of unstructured data. Files is for mountable shares; Table is key-value; SQL is relational." },

    { tag:"D3",
      q:"An app must be globally distributed with single-digit-millisecond latency and multi-region writes. Which database fits best?",
      options:["Azure Cosmos DB","Azure SQL Database","Azure Table storage","Azure Files"],
      answer:0,
      why:"Global distribution, low latency, and multi-region writes are the signature use case for <b>Azure Cosmos DB</b>." },

    { tag:"D3",
      q:"A team is migrating a MongoDB application to Azure Cosmos DB with minimal code change. Which API should they choose?",
      options:["API for MongoDB","NoSQL (Core) API","Apache Gremlin API","Table API"],
      answer:0,
      why:"Pick the Cosmos DB API that matches the source: the <b>API for MongoDB</b> lets existing MongoDB apps connect with minimal change." },

    // ---------- Domain 4 — analytics on Azure ----------
    { tag:"D4",
      q:"Which pair correctly contrasts analytical stores?",
      options:["A data warehouse holds modelled structured data; a data lake holds raw data of any structure","A data lake enforces a star schema; a data warehouse is schema-on-read","Both store only relational tables","A data warehouse is cheaper raw storage than a data lake"],
      answer:0,
      why:"A <b>data warehouse</b> holds cleaned, modelled, structured data; a <b>data lake</b> holds raw data of any structure (schema-on-read)." },

    { tag:"D4",
      q:"Sensor events must be analyzed within seconds of arriving, continuously. Which processing model is this?",
      options:["Streaming","Batch","ETL staging","Normalization"],
      answer:0,
      why:"Continuous, low-latency processing of events as they arrive is <b>streaming</b>. Batch processes bounded data on a schedule." },

    { tag:"D4", type:"order",
      q:"Put these ELT analytics steps in the order they occur.",
      items:["Extract raw data from sources","Load raw data into the data lake","Transform data inside the lake/warehouse"],
      why:"<b>ELT</b> extracts, loads raw first, then transforms using the target's compute — unlike ETL, which transforms before loading." },

    { tag:"D4",
      q:"In Power BI, which artifact is a single-page collection of pinned tiles giving an at-a-glance overview?",
      options:["A dashboard","A report","A data model","A measure"],
      answer:0,
      why:"A <b>dashboard</b> is a single page of pinned tiles. A report is multi-page and detailed; a measure is a calculated aggregation in the model." }
  ]
};
