/* AZ-900 — quiz dataset for lesson 0004 (D2b: Storage, identity, access & security). Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0004'] = {
  passMark: 0.7,
  questions: [
    { tag:"D2",
      q:"You know S3. Which Azure Storage service is the direct object-storage analog — unstructured blobs (files, images, backups) accessed over HTTP/HTTPS?",
      options:["Azure Blob Storage","Azure Files","Azure Table Storage","Azure Queue Storage"],
      answer:0,
      why:"<b>Blob Storage</b> is Azure's object store, the closest match to S3. Azure Files is SMB/NFS file shares; Table Storage is NoSQL key-value; Queue Storage is messaging." },

    { tag:"D2", type:"match",
      q:"Match each Azure Storage service to its purpose.",
      items:["Fully managed SMB/NFS file shares mountable like a network drive","NoSQL key-value store for structured, non-relational data","Simple messaging between application components"],
      categories:["Azure Files","Table Storage","Queue Storage"],
      answer:[0,1,2],
      why:"Mountable network shares = <b>Files</b>; NoSQL key-value = <b>Table Storage</b>; app-to-app messaging = <b>Queue Storage</b>." },

    { tag:"D2",
      q:"Data accessed constantly, needing the lowest latency and highest cost per GB, belongs in which access tier?",
      options:["Hot","Cool","Cold","Archive"],
      answer:0,
      why:"Frequent access, lowest latency, highest storage cost (but lowest access cost) is the <b>Hot</b> tier. Cool/Cold trade lower storage cost for higher access cost; Archive is cheapest to store but has hours of retrieval latency." },

    { tag:"D2",
      q:"Rarely-accessed compliance data that can tolerate hours of retrieval latency, to minimize storage cost, should go in:",
      options:["Archive tier","Hot tier","Premium tier","Cool tier"],
      answer:0,
      why:"Lowest storage cost, accepting retrieval delay of hours, is the <b>Archive</b> tier — the cheapest but least immediately accessible option." },

    { tag:"D2", type:"match",
      q:"Match each redundancy option to its replication behavior.",
      items:["3 synchronous copies in a single datacenter","3 synchronous copies across zones in one region","Async copies in a paired region, hundreds of miles away"],
      categories:["Locally redundant storage (LRS)","Zone-redundant storage (ZRS)","Geo-redundant storage (GRS)"],
      answer:[0,1,2],
      why:"Single datacenter = <b>LRS</b>; spread across zones in one region = <b>ZRS</b>; async copy to a separate paired region = <b>GRS</b>. Redundancy level and protection scope both increase down this list." },

    { tag:"D2",
      q:"Which tool is a GUI application for uploading, downloading, and managing blobs, files, and queues from your desktop?",
      options:["Azure Storage Explorer","AzCopy","Azure File Sync","Azure Migrate"],
      answer:0,
      why:"The desktop GUI is <b>Storage Explorer</b>. AzCopy is a command-line copy tool; Azure File Sync centralizes on-prem file shares with Azure Files caching; Azure Migrate assesses/moves whole workloads, not individual files." },

    { tag:"D2",
      q:"A company wants to migrate terabytes of on-premises data to Azure without saturating its internet link. Which offline transfer option fits?",
      options:["Azure Data Box","AzCopy","Azure Storage Explorer","Azure File Sync"],
      answer:0,
      why:"Physical, offline bulk transfer for large datasets is <b>Azure Data Box</b> — a shippable appliance. The other three all move data over the network." },

    { tag:"D2",
      q:"You know IAM users/groups. Where do user and group identities live in Azure so they can sign in and be assigned permissions?",
      options:["Microsoft Entra ID","Azure Resource Manager","A resource group","Azure Policy"],
      answer:0,
      why:"<b>Microsoft Entra ID</b> is the identity store — users, groups, and app registrations. Resource Manager deploys resources; a resource group organizes them; Azure Policy enforces configuration rules, none of which store identities." },

    { tag:"D2",
      q:"Which Entra ID feature lets you require MFA only when a sign-in looks risky (e.g. new device, unusual location) rather than every time?",
      options:["Conditional Access","Microsoft Entra Domain Services","Azure RBAC","Zero Trust"],
      answer:0,
      why:"Rule-based, context-aware sign-in requirements are <b>Conditional Access</b> policies. Entra Domain Services provides classic AD-style domain join/LDAP compatibility; RBAC controls resource permissions, not sign-in conditions; Zero Trust is the overarching principle, not a specific feature." },

    { tag:"D2",
      q:"An org needs classic Active Directory features (domain join, LDAP, Group Policy) for legacy VMs, without deploying and patching domain controllers themselves. Which service fits?",
      options:["Microsoft Entra Domain Services","Microsoft Entra ID","Azure RBAC","Conditional Access"],
      answer:0,
      why:"Managed, classic AD-compatible domain services (no DC management) is <b>Microsoft Entra Domain Services</b> — distinct from Entra ID, which is Azure's modern cloud identity directory, not a legacy AD replacement." },

    { tag:"D2",
      q:"Which authentication method eliminates the password entirely, using something like Windows Hello, a FIDO2 key, or the Authenticator app?",
      options:["Passwordless authentication","Single sign-on (SSO)","Multifactor authentication (MFA)","Conditional Access"],
      answer:0,
      why:"Removing the password from the flow entirely is <b>passwordless</b>. SSO reduces repeated sign-ins (but may still use a password once); MFA adds a second factor to a password rather than removing it; Conditional Access decides when to require these." },

    { tag:"D2",
      q:"You know IAM roles/policies (JSON documents attached to users). Azure's equivalent concept — a set of permissions assigned to a security principal at a scope — is called a:",
      options:["Role assignment (RBAC)","Resource lock","Azure Policy definition","Management group"],
      answer:0,
      why:"A <b>role assignment</b> = security principal + role definition + scope, Azure's version of attaching an IAM policy to an identity. A resource lock only blocks delete/edit; an Azure Policy definition enforces configuration rules, not identity permissions." },

    { tag:"D2",
      q:"What is the core principle of Zero Trust?",
      options:["Never trust, always verify — authenticate and authorize every request explicitly, regardless of network location","Trust any request from inside the corporate network","Trust any request with a valid password","Trust is granted once per day per user"],
      answer:0,
      why:"Zero Trust assumes breach and verifies <b>every request explicitly</b> — no implicit trust just because traffic originates 'inside' the network perimeter, which is the old (now outdated) trust model." },

    { tag:"D2",
      q:"Which Azure service continuously assesses resource configurations against security best practices and gives a Secure Score plus remediation recommendations?",
      options:["Microsoft Defender for Cloud","Azure Policy","Azure Advisor","Microsoft Purview"],
      answer:0,
      why:"Security posture management with a Secure Score is <b>Microsoft Defender for Cloud</b>. Azure Policy enforces specific rules you define; Advisor gives broader (cost/performance/reliability) recommendations; Purview is for data governance/cataloging." }
  ]
};
