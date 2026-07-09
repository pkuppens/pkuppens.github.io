/* DP-900 — quiz dataset for lesson 0005 (render target: q-analytics). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0005'] = {
  passMark: 0.7,
  questions: [
    { tag:"D4",
      q:"What is the key difference between ETL and ELT?",
      options:["ELT loads raw data first and transforms it in the target; ETL transforms before loading","ELT never transforms data at all","ETL only works on streaming data","ELT is only used with relational databases"],
      answer:0,
      why:"<b>ELT</b> extracts, loads raw into the target (lake/warehouse), then transforms with the target's compute. <b>ETL</b> transforms in a staging engine before loading." },

    { tag:"D4",
      q:"Which analytical store holds cleaned, modelled, structured data (often a star schema) for BI reporting?",
      options:["Data warehouse","Data lake","Blob archive tier","Message queue"],
      answer:0,
      why:"A <b>data warehouse</b> holds structured, modelled data for reporting. A data lake holds raw data of any structure." },

    { tag:"D4",
      q:"A data lake is best described as:",
      options:["Low-cost storage for raw data of any structure, read with schema-on-read","A relational engine enforcing a fixed star schema","A Power BI visualization type","A key-value transactional store"],
      answer:0,
      why:"A <b>data lake</b> stores raw data of any structure cheaply and applies schema-on-read. The warehouse is schema-on-write and structured." },

    { tag:"D4", type:"match",
      q:"Match each Microsoft service to its analytics role.",
      items:["Apache Spark platform for large-scale engineering and ML","Unified SaaS analytics suite over OneLake with Power BI","Self-service BI authoring and visualization tool"],
      categories:["Azure Databricks","Microsoft Fabric","Power BI"],
      answer:[0,1,2],
      why:"Spark platform = <b>Databricks</b>; unified SaaS analytics over OneLake = <b>Fabric</b>; BI visualization = <b>Power BI</b>." },

    { tag:"D4",
      q:"Which statement correctly contrasts batch and streaming processing?",
      options:["Batch processes bounded data on a schedule; streaming processes unbounded events as they arrive","Batch is always lower latency than streaming","Streaming can only process data once per day","Batch cannot process large volumes"],
      answer:0,
      why:"<b>Batch</b> = bounded data, scheduled, high throughput. <b>Streaming</b> = unbounded events, continuous, low latency." },

    { tag:"D4",
      q:"You must analyze a continuous feed of IoT telemetry within seconds of arrival. Which Azure service is designed for this?",
      options:["Azure Stream Analytics","Azure SQL Database","Azure Blob storage","Power BI Desktop"],
      answer:0,
      why:"<b>Azure Stream Analytics</b> (and Fabric Real-Time Intelligence) process streaming data in near real time. SQL/Blob are stores; Power BI Desktop authors reports." },

    { tag:"D4",
      q:"In Power BI, where do you primarily author reports and build the data model before publishing?",
      options:["Power BI Desktop","The Power BI mobile app","Azure Databricks","Azure Data Factory"],
      answer:0,
      why:"You author in <b>Power BI Desktop</b>, then publish to the Power BI service to share." },

    { tag:"D4", type:"multi",
      q:"Select the TWO elements that are part of a Power BI data model.",
      options:["Relationships between tables","Measures (calculated aggregations)","The archive storage tier","The SQL DCL commands"],
      answers:[0,1],
      why:"A Power BI <b>data model</b> is tables, <b>relationships</b>, and <b>measures</b>. Storage tiers and DCL are unrelated." },

    { tag:"D4",
      q:"An analyst needs to show a single value versus its target at a glance. Which visualization is most appropriate?",
      options:["A KPI visual","A scatter chart","A filled map","A matrix"],
      answer:0,
      why:"A <b>KPI</b> visual shows a value against a target/goal. Scatter shows correlation; maps show geography; matrices show cross-tabs." },

    { tag:"D4",
      q:"Which visualization best shows a trend of sales over twelve months?",
      options:["A line chart","A pie chart","A single-value card","A table"],
      answer:0,
      why:"A <b>line chart</b> shows change over a continuous time axis. Pie shows composition; cards show one number; tables show detail." }
  ]
};
