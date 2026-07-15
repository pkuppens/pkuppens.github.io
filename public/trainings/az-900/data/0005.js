/* AZ-900 — quiz dataset for lesson 0005 (D3: Management & governance). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0005'] = {
  passMark: 0.7,
  questions: [
    { tag:"D3",
      q:"Which of these does NOT directly affect Azure cost?",
      options:["The color theme of the Azure portal","Resource type and tier","Region chosen for deployment","Bandwidth (data egress)"],
      answer:0,
      why:"Portal <b>theming is purely cosmetic</b>. Resource type/tier, region (prices vary by region), and outbound data transfer all directly affect billing." },

    { tag:"D3",
      q:"Before deploying anything, you want to estimate the monthly cost of a proposed set of Azure resources. Which tool do you use?",
      options:["The Pricing calculator","Azure Cost Management","Azure Advisor","Azure Monitor"],
      answer:0,
      why:"Estimating cost <em>before</em> deployment is the <b>Pricing calculator</b>. Cost Management analyzes and controls spend on resources you've already deployed; Advisor recommends changes to existing resources; Monitor tracks performance/health, not cost estimation." },

    { tag:"D3",
      q:"After resources are running, which tool lets you analyze actual spend, set budgets, and get alerted when spend approaches a threshold?",
      options:["Azure Cost Management","The Pricing calculator","Azure Policy","Resource locks"],
      answer:0,
      why:"Ongoing spend analysis, budgets, and alerts is <b>Azure Cost Management</b>. The Pricing calculator is a pre-deployment estimator, not a live-tracking tool." },

    { tag:"D3",
      q:"You know AWS tags (identical concept, same name). What is the primary purpose of Azure resource tags?",
      options:["Attaching metadata (e.g. cost-center, environment) for organization, cost allocation, and automation","Encrypting resource data at rest","Granting RBAC permissions","Locking a resource against deletion"],
      answer:0,
      why:"Tags are <b>key-value metadata</b> — used for cost allocation, filtering, and automation. This is a rare case where the AWS concept and name transfer directly; don't overthink it looking for a trick that isn't there. Tags grant no permissions and provide no encryption or delete protection." },

    { tag:"D3",
      q:"Which Azure service provides a unified data map, catalog, and lineage view across your data estate for governance and compliance?",
      options:["Microsoft Purview","Azure Policy","Azure Advisor","Microsoft Defender for Cloud"],
      answer:0,
      why:"Data cataloging, classification, and lineage across the data estate is <b>Microsoft Purview</b>. Azure Policy governs resource configuration (not data content); Defender for Cloud is security posture, not a data catalog." },

    { tag:"D3",
      q:"You define a rule requiring 'all storage accounts must use only HTTPS'. Non-compliant accounts get flagged automatically. Which service?",
      options:["Azure Policy","Azure RBAC","A resource lock","Azure Blueprints only"],
      answer:0,
      why:"Automatic evaluation of resources against a configuration rule is <b>Azure Policy</b>. RBAC controls who can act, not what configuration is allowed; a resource lock just blocks delete/edit actions." },

    { tag:"D3",
      q:"A finance director accidentally deletes a critical production resource group. Which feature would have prevented this, without changing anyone's RBAC permissions?",
      options:["A CanNotDelete resource lock","Azure Policy","Azure Cost Management budget","Microsoft Purview"],
      answer:0,
      why:"A <b>CanNotDelete resource lock</b> blocks deletion regardless of a user's RBAC permissions, until the lock itself is removed. Azure Policy governs configuration compliance, not accidental deletion; the other two are unrelated to this scenario." },

    { tag:"D3",
      q:"You know the AWS/GCP web console. Which is the Azure equivalent — a web-based, graphical UI for managing all Azure resources?",
      options:["The Azure portal","Azure Cloud Shell","Azure Resource Manager","Azure CLI"],
      answer:0,
      why:"The graphical web UI is the <b>Azure portal</b>. Cloud Shell is a browser-based command-line shell; Resource Manager is the underlying deployment/management API/engine; the CLI is a local command-line tool." },

    { tag:"D3",
      q:"Which tool gives you a browser-based Bash or PowerShell shell, pre-authenticated to your Azure subscription, with no local install required?",
      options:["Azure Cloud Shell","Azure PowerShell (local module)","Azure CLI (local install)","Azure Arc"],
      answer:0,
      why:"Browser-based, pre-authenticated shell with zero local setup is <b>Cloud Shell</b>. Azure PowerShell and CLI are the same underlying tools, but installed locally on your machine instead." },

    { tag:"D3",
      q:"Which Azure service extends Azure management (RBAC, Policy, tags) to servers and Kubernetes clusters running on-premises or in other clouds?",
      options:["Azure Arc","Azure Resource Manager","Azure Advisor","Azure Service Health"],
      answer:0,
      why:"Bringing non-Azure and multi-cloud/on-prem resources under Azure's management plane is <b>Azure Arc</b>. Resource Manager is the deployment engine used underneath; Advisor and Service Health don't extend management scope, they report on it." },

    { tag:"D3",
      q:"You know CloudFormation/Terraform (declarative deployment). Azure's native declarative deployment templates, written in JSON (or authored more easily in Bicep), are called:",
      options:["ARM templates","Azure Blueprints","Azure Policy definitions","Resource Manager scripts"],
      answer:0,
      why:"Declarative, JSON-based infrastructure-as-code is an <b>ARM template</b> — the direct analog to a CloudFormation template. Bicep is a friendlier authoring language that compiles down to ARM JSON." },

    { tag:"D3",
      q:"What is the core benefit of infrastructure as code (IaC), as tested on this exam?",
      options:["Repeatable, consistent deployments defined in version-controllable text files instead of manual portal clicks","Automatically reducing your Azure bill","Removing the need for resource groups","Bypassing RBAC permission checks"],
      answer:0,
      why:"IaC's value is <b>repeatability and consistency</b> via version-controlled definitions, replacing manual, error-prone portal steps. It doesn't inherently reduce cost, remove the need for resource groups, or bypass any permission model." },

    { tag:"D3",
      q:"Which tool proactively recommends cost, performance, reliability, and security improvements for resources you already have deployed?",
      options:["Azure Advisor","Azure Policy","Azure Cost Management","Azure Service Health"],
      answer:0,
      why:"Personalized, proactive best-practice recommendations across cost/performance/reliability/security/operational excellence is <b>Azure Advisor</b>. Policy enforces rules you write; Cost Management is spend tracking only; Service Health reports incidents, not recommendations." },

    { tag:"D3",
      q:"Which service tells you about ongoing Azure outages and planned maintenance that could affect YOUR specific resources?",
      options:["Azure Service Health","Azure Advisor","Azure Monitor","Azure Policy"],
      answer:0,
      why:"Personalized notification of Azure-platform issues affecting your resources is <b>Azure Service Health</b>. Monitor tracks your resources' own telemetry (not platform-wide incidents); Advisor gives optimization tips, not incident status." },

    { tag:"D3",
      q:"You know CloudWatch. Which Azure service collects metrics and logs from your resources, and can trigger alerts and dashboards from that telemetry?",
      options:["Azure Monitor","Azure Service Health","Azure Advisor","Microsoft Purview"],
      answer:0,
      why:"Metrics/logs collection plus alerting is <b>Azure Monitor</b> — the closest analog to CloudWatch. Within it, <b>Log Analytics</b> queries log data, <b>Application Insights</b> monitors app performance, and <b>alerts</b> notify on thresholds." }
  ]
};
