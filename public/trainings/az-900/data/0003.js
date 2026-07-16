/* AZ-900 — quiz dataset for lesson 0003 (D2a: Core architecture, compute & networking). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0003'] = {
  passMark: 0.7,
  questions: [
    { tag:"D2",
      q:"What is an Azure region?",
      options:["A set of datacenters deployed within a defined geographic perimeter, connected by a low-latency network","A single physical building housing servers","A billing boundary for a subscription","A logical container for related resources"],
      answer:0,
      why:"A <b>region</b> is a geography-bound set of datacenters with a dedicated low-latency network between them. A single building is a datacenter; a billing boundary is a subscription; a logical container for resources is a resource group." },

    { tag:"D2",
      q:"What does 'sovereign region' mean in Azure?",
      options:["An isolated instance of Azure for specific compliance/legal requirements (e.g. government or a specific nation), separate from global Azure","A region with extra availability zones","A region reserved for a single large customer","The default region assigned at signup"],
      answer:0,
      why:"<b>Sovereign regions</b> (e.g. Azure Government, Azure China) are physically and logically isolated instances of Azure for legal/compliance reasons — not just 'more zones' or a single-tenant region." },

    { tag:"D2",
      q:"Your app must survive the loss of an entire datacenter within its region, with automatic synchronous replication and near-zero data loss. What should you deploy across?",
      options:["Availability zones","Region pairs","Multiple management groups","Multiple resource groups"],
      answer:0,
      why:"Surviving a single datacenter loss within a region, with synchronous replication, is exactly what <b>availability zones</b> are for. Region pairs protect against losing an entire region; management/resource groups are organizational, not physical redundancy." },

    { tag:"D2",
      q:"Which Azure construct is the fundamental unit of deployment and management — e.g. a specific VM, storage account, or web app?",
      options:["A resource","A resource group","A subscription","A tenant"],
      answer:0,
      why:"The individual, deployable item (a VM, a storage account) is a <b>resource</b>. A resource group is a container for related resources; a subscription is the billing/access boundary; a tenant is your Entra ID identity directory." },

    { tag:"D2",
      q:"What is the billing and access-management boundary that a set of resource groups lives inside?",
      options:["A subscription","A resource group","A management group","A tenant"],
      answer:0,
      why:"A <b>subscription</b> is Azure's billing and scale boundary. A tenant is one level up — your Entra ID directory, which can contain multiple subscriptions; management groups group multiple subscriptions together for governance." },

    { tag:"D2",
      q:"Which compute option requires you to manage the least — no server, OS, or scaling config — and bills per execution?",
      options:["Azure Functions (serverless)","Azure Virtual Machines","Azure Virtual Machine Scale Sets","Azure Virtual Desktop"],
      answer:0,
      why:"Event-driven, per-execution billing with zero infrastructure management is <b>Azure Functions</b>. VMs and scale sets still require OS-level management; Virtual Desktop provisions full desktop VMs for end users." },

    { tag:"D2", type:"match",
      q:"Match each compute concept to what it describes.",
      items:["A packaged app with its dependencies, sharing the host OS kernel","A group of identical VMs that automatically scale together","A logical grouping of VMs for fault-domain and update-domain redundancy"],
      categories:["Container","Virtual Machine Scale Set","Availability set"],
      answer:[0,1,2],
      why:"Lightweight, OS-kernel-sharing package = <b>container</b>; auto-scaling identical VM group = <b>VM Scale Set</b>; fault/update-domain grouping for redundancy = <b>availability set</b>." },

    { tag:"D2",
      q:"Azure's software-defined network boundary that lets resources communicate privately, and can be segmented into subnets, is called a(n):",
      options:["Azure Virtual Network (VNet)","Resource group","Availability set","Azure DNS zone"],
      answer:0,
      why:"A <b>Virtual Network (VNet)</b> provides private IP space, subnets, and controlled connectivity, all inside one region." },

    { tag:"D2",
      q:"Two VNets in different regions need to communicate as if they were one network, without traffic going over the public internet. Which feature connects them?",
      options:["VNet peering","Azure DNS","A public endpoint","A resource lock"],
      answer:0,
      why:"Private, low-latency VNet-to-VNet connectivity is <b>VNet peering</b>. Azure DNS resolves names, not connects networks; a public endpoint exposes a service to the internet — the opposite of what's needed here." },

    { tag:"D2", type:"multi",
      q:"Select the TWO services used to connect an on-premises network privately to Azure.",
      options:["Azure VPN Gateway","ExpressRoute","Azure DNS","Azure Load Balancer","Azure CDN"],
      answers:[0,1],
      why:"<b>VPN Gateway</b> (encrypted tunnel over the internet) and <b>ExpressRoute</b> (dedicated private circuit, not over the public internet) both connect on-premises networks to Azure. DNS, Load Balancer, and CDN solve different problems entirely." },

    { tag:"D2",
      q:"What distinguishes a private endpoint from a public endpoint for an Azure service?",
      options:["A private endpoint gives the service a private IP inside your VNet, keeping traffic off the public internet","A private endpoint is only for storage accounts","A private endpoint disables authentication","A private endpoint is free while public endpoints are billed"],
      answer:0,
      why:"A <b>private endpoint</b> brings a PaaS service's traffic inside your VNet via a private IP — no public internet exposure. It applies broadly (storage, SQL, Key Vault, etc.), not just storage." },

    { tag:"D2",
      q:"Which Azure Virtual Machine option is purpose-built for delivering a full remote desktop and apps to end users?",
      options:["Azure Virtual Desktop","Virtual Machine Scale Sets","Availability sets","Azure Container Instances"],
      answer:0,
      why:"Full desktop/app delivery to end users, at scale, is <b>Azure Virtual Desktop</b> — a VDI service built on top of VMs, not just a bare VM feature." }
  ]
};
