/* DP-900 — quiz dataset for lesson 0003 (render target: q-rel). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0003'] = {
  passMark: 0.7,
  questions: [
    { tag:"D2",
      q:"What does a foreign key do in a relational database?",
      options:["References a primary key in another table to enforce a relationship","Uniquely identifies each row in its own table","Encrypts a column's values","Speeds up a specific lookup"],
      answer:0,
      why:"A <b>foreign key</b> points to a primary key in another table, enforcing referential integrity. A primary key identifies rows; an index speeds lookups." },

    { tag:"D2",
      q:"Normalization primarily helps you to:",
      options:["Eliminate redundant data and avoid update anomalies","Guarantee every query avoids joins","Compress unstructured files","Distribute data across regions"],
      answer:0,
      why:"<b>Normalization</b> removes redundancy so each fact is stored once, preventing update anomalies." },

    { tag:"D2", type:"match",
      q:"Match each SQL statement to its language family.",
      items:["CREATE TABLE","INSERT","GRANT"],
      categories:["DDL","DML","DCL"],
      answer:[0,1,2],
      why:"CREATE defines structure (<b>DDL</b>); INSERT changes data (<b>DML</b>); GRANT controls access (<b>DCL</b>)." },

    { tag:"D2",
      q:"Which database object is a saved query that can be used like a virtual table?",
      options:["View","Stored procedure","Index","Trigger"],
      answer:0,
      why:"A <b>view</b> is a stored query presented as a virtual table. A stored procedure is executable SQL; an index speeds access." },

    { tag:"D2",
      q:"Which option is IaaS, giving you full control of the operating system and SQL Server engine?",
      options:["SQL Server on Azure Virtual Machines","Azure SQL Database","Azure SQL Managed Instance","Azure Database for MySQL"],
      answer:0,
      why:"<b>SQL Server on Azure VMs</b> is IaaS — you manage the OS and engine. The others are managed PaaS." },

    { tag:"D2",
      q:"A cloud-native team wants a single managed relational database with minimal administration and automatic patching. Best choice?",
      options:["Azure SQL Database","SQL Server on Azure VMs","Azure Blob storage","Azure Cosmos DB"],
      answer:0,
      why:"<b>Azure SQL Database</b> is fully managed PaaS — ideal for new cloud-native apps. A VM is IaaS; Blob/Cosmos are non-relational." },

    { tag:"D2", type:"multi",
      q:"Select the TWO Azure managed services for open-source relational databases.",
      options:["Azure Database for PostgreSQL","Azure Database for MySQL","Azure SQL Managed Instance","Azure Cosmos DB","Azure Table storage"],
      answers:[0,1],
      why:"Azure Database for <b>PostgreSQL</b> and <b>MySQL</b> (and MariaDB) are open-source engines. SQL Managed Instance is the Microsoft SQL engine; Cosmos/Table are non-relational." },

    { tag:"D2",
      q:"You must migrate an on-prem SQL Server app that uses SQL Agent jobs and cross-database queries, with the least re-engineering. Which service?",
      options:["Azure SQL Managed Instance","Azure SQL Database (single database)","Azure Database for PostgreSQL","Azure Table storage"],
      answer:0,
      why:"<b>SQL Managed Instance</b> supports instance-scoped features like SQL Agent and cross-database queries, so lift-and-shift needs minimal change." },

    { tag:"D2",
      q:"Which SQL statement retrieves rows without modifying them?",
      options:["SELECT","UPDATE","DELETE","ALTER"],
      answer:0,
      why:"<b>SELECT</b> reads data. UPDATE/DELETE modify data; ALTER changes structure." },

    { tag:"D2",
      q:"What is the main purpose of an index on a table?",
      options:["To speed up data retrieval for matching queries","To guarantee transactions are atomic","To store the table's backup","To grant users permissions"],
      answer:0,
      why:"An <b>index</b> is a structure that speeds lookups/filters, at the cost of extra write and storage overhead." }
  ]
};
