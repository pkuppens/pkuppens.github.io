/* AZ-900 — quiz dataset for lesson 0001 (render target: q-diag). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0001'] = {
  passMark: 0.7,
  questions: [
    { tag:"D1",
      q:"You already know AWS/GCP. In Azure's shared responsibility model, who is always responsible for data classification and endpoint protection, regardless of IaaS/PaaS/SaaS?",
      options:["The customer","Microsoft","Whichever party owns the datacenter","No one — it's automated"],
      answer:0,
      why:"<b>The customer</b> always owns data, endpoints, and access management — this doesn't shift with service model, same as AWS's shared responsibility model. Microsoft's responsibility grows (physical → OS → app) as you move IaaS → PaaS → SaaS." },

    { tag:"D1",
      q:"A finance team wants to pay only for compute they consume, with no upfront hardware purchase. Which pricing model is this?",
      options:["Consumption-based model","Capital expenditure (CapEx)","Perpetual licensing","Fixed-capacity reservation"],
      answer:0,
      why:"Pay-for-what-you-use, no upfront spend, is the <b>consumption-based (OpEx) model</b> — the foundational cloud economics concept. CapEx and perpetual licensing describe buying hardware/licenses upfront; a fixed reservation isn't consumption-based." },

    { tag:"D1", type:"match",
      q:"Match each cloud model to its description.",
      items:["Resources shared across many tenants over the internet","Resources dedicated to a single organization, on-prem or hosted","A mix of public and private, connected together"],
      categories:["Public cloud","Private cloud","Hybrid cloud"],
      answer:[0,1,2],
      why:"Multi-tenant/internet = <b>public</b>; single-tenant dedicated = <b>private</b>; a connected mix = <b>hybrid</b>." },

    { tag:"D1",
      q:"A hospital must keep patient records on infrastructure it fully controls but wants to burst reporting workloads to the cloud during month-end. Best fit?",
      options:["Hybrid cloud","Public cloud only","Private cloud only","Community cloud"],
      answer:0,
      why:"Keeping sensitive data on controlled infrastructure while bursting elastic workloads to the cloud is the textbook <b>hybrid</b> use case." },

    { tag:"D1",
      q:"Which benefit describes a cloud service automatically adding resources to handle a traffic spike, then removing them afterward?",
      options:["Scalability","High availability","Fault tolerance","Disaster recovery"],
      answer:0,
      why:"Adding/removing capacity to match demand is <b>scalability</b> (elasticity). High availability is about uptime commitments (SLAs), not scaling; fault tolerance and DR are about surviving failures, not demand changes." },

    { tag:"D1",
      q:"You need to run a container without managing any VM or OS, and you'll be billed per execution. Which service type best fits?",
      options:["Serverless (e.g. Azure Functions)","IaaS","Traditional PaaS web app","On-premises VM"],
      answer:0,
      why:"No infrastructure management, billed by execution, is <b>serverless</b>. IaaS still needs OS management; a traditional PaaS web app runs continuously rather than per-execution; on-prem VMs manage everything yourself." },

    { tag:"D1", type:"multi",
      q:"Select the TWO cloud service types where Microsoft manages the operating system patching for you.",
      options:["IaaS","PaaS","SaaS","On-premises"],
      answers:[1,2],
      why:"Microsoft patches the OS in both <b>PaaS</b> and <b>SaaS</b> — you only manage your app (PaaS) or nothing at all (SaaS). In IaaS you own OS patching yourself; on-premises has no Microsoft involvement at all." },

    { tag:"D2",
      q:"You know AWS Regions and Availability Zones. Azure's equivalent of an AZ — physically separate datacenters within a region, each with independent power/cooling/networking — is called a(n):",
      options:["Availability zone","Region pair","Resource group","Management group"],
      answer:0,
      why:"Azure uses the same term, <b>availability zone</b> — a rare case where the vocabulary matches AWS exactly. A region pair is a DR concept (two regions in the same geography); resource groups and management groups are organizational containers, not physical infrastructure." },

    { tag:"D2",
      q:"What is an Azure region pair primarily used for?",
      options:["Coordinated disaster-recovery updates across two regions in the same geography","Doubling compute quota automatically","Load-balancing traffic between two regions","Reducing storage costs by 50%"],
      answer:0,
      why:"Region pairs are two regions in the same geography that Microsoft sequences platform updates and prioritizes recovery between — a <b>DR/resilience</b> concept, not a performance or cost feature." },

    { tag:"D2",
      q:"You know AWS Organizations. Azure's construct for applying policies and RBAC across MULTIPLE subscriptions at once is:",
      options:["A management group","A resource group","A tenant","An availability set"],
      answer:0,
      why:"<b>Management groups</b> sit above subscriptions and let you govern many subscriptions at once — closest analog to AWS Organizations OUs. A resource group scopes resources within one subscription; a tenant is your Entra ID directory; an availability set is a VM fault-domain construct, unrelated." },

    { tag:"D2",
      q:"Put these Azure organizational scopes in order from broadest to narrowest.",
      type:"order",
      items:["Management group","Subscription","Resource group","Resource"],
      why:"Hierarchy top to bottom: <b>management group</b> → <b>subscription</b> → <b>resource group</b> → <b>resource</b>. Policies and RBAC assigned higher up are inherited by everything below." },

    { tag:"D2",
      q:"You know EC2. Which Azure compute option lets you run identical VM instances that automatically scale out/in based on demand or a schedule?",
      options:["Azure Virtual Machine Scale Sets","Azure Virtual Desktop","An availability set","Azure Container Instances"],
      answer:0,
      why:"Auto-scaling groups of identical VMs is <b>Virtual Machine Scale Sets</b> — Azure's answer to an AWS Auto Scaling Group. Availability sets group VMs for fault-domain redundancy but don't auto-scale; Virtual Desktop is a VDI service; Container Instances runs containers, not VMs." },

    { tag:"D2",
      q:"You know S3. Which Azure Storage redundancy option keeps synchronous copies of your data across three availability zones within one region?",
      options:["Zone-redundant storage (ZRS)","Locally redundant storage (LRS)","Geo-redundant storage (GRS)","Read-access geo-redundant storage (RA-GRS)"],
      answer:0,
      why:"Synchronous replication across zones in one region is <b>ZRS</b>. LRS keeps 3 copies in one datacenter only (no zone spread); GRS/RA-GRS replicate asynchronously to a second, paired region." },

    { tag:"D2",
      q:"You know IAM. Which Azure service is the identity directory that manages users, groups, and app registrations for sign-in and access?",
      options:["Microsoft Entra ID","Azure Resource Manager","Azure Policy","Azure Key Vault"],
      answer:0,
      why:"<b>Microsoft Entra ID</b> (formerly Azure Active Directory) is the identity directory — closest analog to an AWS/GCP IAM identity store, though Azure splits identity (Entra ID) from permission assignment (RBAC) rather than combining both under one IAM umbrella." },

    { tag:"D3",
      q:"You know IAM policies/roles. Azure's mechanism for granting a user, group, or app a specific set of permissions at a particular scope (management group/subscription/resource group/resource) is:",
      options:["Azure role-based access control (RBAC)","Azure Policy","A resource lock","Microsoft Purview"],
      answer:0,
      why:"Assigning permissions at a scope is <b>RBAC</b> — analogous to IAM roles/policies, but layered on Entra ID identities. Azure Policy enforces configuration rules (not permissions); resource locks prevent delete/edit; Purview is for data governance/cataloging." },

    { tag:"D3",
      q:"Which Azure feature enforces organizational rules like \"all resources must have a cost-center tag\" and reports non-compliant resources?",
      options:["Azure Policy","Azure RBAC","Resource locks","Azure Advisor"],
      answer:0,
      why:"Rule enforcement and compliance reporting is <b>Azure Policy</b>. RBAC controls who can do what (not resource configuration); resource locks just block delete/edit; Advisor gives optimization recommendations, not enforcement." }
  ]
};
