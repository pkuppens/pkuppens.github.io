/* AZ-900 — quiz dataset for lesson 0002 (D1: Cloud concepts). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0002'] = {
  passMark: 0.7,
  questions: [
    { tag:"D1",
      q:"What is the most precise definition of cloud computing for exam purposes?",
      options:["The delivery of computing services over the internet, with pay-as-you-go pricing","Any server you don't physically own","A backup datacenter","A website hosting company"],
      answer:0,
      why:"The exam's definition centers on <b>on-demand delivery over the internet with consumption-based pricing</b> — not simply 'not owning the hardware'." },

    { tag:"D1",
      q:"In the shared responsibility model, as you move from IaaS to PaaS to SaaS, what happens to Microsoft's share of responsibility?",
      options:["It increases","It decreases","It stays exactly the same","It becomes zero"],
      answer:0,
      why:"Microsoft takes on <b>more</b> responsibility (OS, runtime, sometimes the app itself) as you move toward SaaS. The customer's share shrinks but never reaches zero — data and access are always the customer's job." },

    { tag:"D1", type:"match",
      q:"Match each item to who is ALWAYS responsible for it, in every service model.",
      items:["Physical datacenter security","Classifying and protecting your data","Electrical power and cooling"],
      categories:["Customer","Microsoft"],
      answer:[1,0,1],
      why:"Data classification/protection is always the <b>customer's</b> job. Physical security and power/cooling are always <b>Microsoft's</b> job, in every model from IaaS to SaaS." },

    { tag:"D1",
      q:"A startup wants to avoid buying servers and instead pay monthly based on actual usage. Which model are they choosing?",
      options:["Consumption-based (OpEx)","Capital expenditure (CapEx)","Reserved on-premises capacity","Perpetual license"],
      answer:0,
      why:"Paying as you go, tied to usage, is <b>OpEx/consumption-based</b>. CapEx means buying assets upfront; the other two options both involve upfront or fixed commitments." },

    { tag:"D1",
      q:"Which is a private cloud, as opposed to public or hybrid?",
      options:["Infrastructure dedicated to one organization, whether on-prem or hosted by a provider","Any resource reachable over the internet","A resource shared by multiple unrelated companies","A backup copy of a public cloud VM"],
      answer:0,
      why:"Private cloud = <b>single-tenant, dedicated</b> infrastructure — it can still be hosted by a provider, as long as it isn't shared with other organizations. Multi-tenant sharing describes public cloud." },

    { tag:"D1",
      q:"Which benefit lets an Azure service commit to and be measured against an uptime percentage (e.g. 99.9%)?",
      options:["High availability, backed by an SLA","Elasticity","Fault domain isolation","Geo-replication"],
      answer:0,
      why:"An uptime commitment measured contractually is <b>high availability</b>, expressed through a Service Level Agreement (SLA). Elasticity is about scaling with demand, a related but distinct benefit." },

    { tag:"D1",
      q:"Which benefit describes the cloud reducing the effort needed to deploy, monitor, and maintain resources at scale, via tools like the Azure portal and Azure Monitor?",
      options:["Manageability","Reliability","Predictability","Governance"],
      answer:0,
      why:"Ease of deploying/monitoring/maintaining resources is <b>manageability</b>. Reliability is about consistent operation; predictability is about forecasting cost/performance; governance is about policy and compliance control." },

    { tag:"D1",
      q:"A company wants to know its exact monthly cloud spend in advance and avoid surprise charges. Which cloud benefit are they relying on?",
      options:["Predictability (cost and performance)","Scalability","High availability","Fault tolerance"],
      answer:0,
      why:"Forecasting cost and performance in advance is <b>predictability</b> — a distinct benefit from elasticity/scaling, which is about handling variable demand, not forecasting it." },

    { tag:"D1", type:"match",
      q:"Match each scenario to the cloud service type it best illustrates.",
      items:["Renting virtual machines and managing the OS yourself","Deploying code to a managed web app platform with no server management","Using a web-based email client you didn't build or host"],
      categories:["IaaS","PaaS","SaaS"],
      answer:[0,1,2],
      why:"Full VM control = <b>IaaS</b>; deploy code, platform managed = <b>PaaS</b>; fully finished, ready-to-use app = <b>SaaS</b>." },

    { tag:"D1",
      q:"A team needs full control over the OS and networking stack to run a legacy application with unusual dependencies. Which service type fits best?",
      options:["IaaS","SaaS","Serverless functions","A fully managed PaaS web app"],
      answer:0,
      why:"Needing full OS/network control for a legacy app is the classic <b>IaaS</b> use case. PaaS and serverless abstract the OS away; SaaS gives no infrastructure control at all." }
  ]
};
