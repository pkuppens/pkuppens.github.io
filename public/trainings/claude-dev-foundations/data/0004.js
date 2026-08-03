/* Claude Dev Foundations — quiz dataset for lesson 0004 (D3: Claude Code).
   Engine: shared/quiz.js */
window.TRAINING_DATA = window.TRAINING_DATA || {};
window.TRAINING_DATA['0004'] = {
  passMark: 0.7,
  questions: [
    { tag:"D3", type:"order",
      q:"Put Claude Code 101's structured workflow for a feature or fix in order.",
      items:["Explore", "Plan", "Code", "Commit"],
      why:"The workflow is <b>explore → plan → code → commit</b>: understand the code first, agree a plan, implement, then commit." },

    { tag:"D3",
      q:"What is CLAUDE.md, per Claude Code 101?",
      options:["Persistent project memory Claude reads for context on every session","A log file of every command Claude has run","A required license file for using Claude Code","A configuration format only used by MCP servers"],
      answer:0,
      why:"<b>CLAUDE.md</b> is persistent, project-level memory — instructions and context Claude reads across sessions." },

    { tag:"D3",
      q:"Which Claude Code 101 command would you use to shrink the current conversation's context while keeping a working summary?",
      options:["/compact","/clear","/context","/plan"],
      answer:0,
      why:"<code>/compact</code> summarizes to free up context. <code>/clear</code> wipes it entirely; <code>/context</code> inspects current usage." },

    { tag:"D3",
      q:"Why does Claude Code 101 recommend subagents?",
      options:["To delegate a sub-task and keep the main session's context clean","To bypass all permission checks","To replace CLAUDE.md entirely","To connect to MCP servers, which subagents are required for"],
      answer:0,
      why:"<b>Subagents</b> handle a delegated piece of work in their own context, so the main session's context window doesn't get polluted with the sub-task's detail." },

    { tag:"D3",
      q:"Per Claude Code 101, what makes hooks different from just writing instructions in CLAUDE.md?",
      options:["Hooks fire deterministically on specific events, giving control that can't be skipped, unlike CLAUDE.md guidance","Hooks and CLAUDE.md are the exact same mechanism under different names","Hooks only work with subagents, never the main session","Hooks disable all context management commands"],
      answer:0,
      why:"CLAUDE.md is guidance the model usually follows; <b>hooks</b> fire deterministically on events (e.g. blocking a command) regardless of what the model decides — for rules that must never be skipped." },

    { tag:"D3",
      q:"In Claude Code in Action, what does 'Plan Mode' help you do when steering a long session?",
      options:["Scope the work up front before Claude starts making changes","Automatically merge pull requests","Disable all hooks for that session","Skip the explore step of the workflow"],
      answer:0,
      why:"<b>Plan Mode</b> is for scoping and agreeing the approach before execution begins — steering the session at the start, not after the fact." },

    { tag:"D3",
      q:"What does the 'rewind menu' let you do, per Claude Code in Action?",
      options:["Course-correct a session by stepping back to an earlier point","Permanently delete a project's CLAUDE.md","Roll back the Claude model version being used","Undo a GitHub Actions deployment"],
      answer:0,
      why:"The <b>rewind menu</b> lets you step back within a session to course-correct, rather than starting over from scratch." },

    { tag:"D3",
      q:"What is a 'routine,' per Claude Code in Action's automation coverage?",
      options:["A prompt scheduled to run headlessly on Anthropic infrastructure","A required daily check-in with a human reviewer","A synonym for a subagent","A type of MCP resource"],
      answer:0,
      why:"A <b>routine</b> is a scheduled, headless prompt run — used for recurring automated work without a human driving each session." },

    { tag:"D3",
      q:"How does Claude Code in Action describe wiring Claude into GitHub Actions?",
      options:["Wiring Claude into pull requests for managed code review","Replacing GitHub Actions entirely with Claude Code","Only usable for closing issues automatically, not reviewing code","A feature exclusive to the terminal installation of Claude Code"],
      answer:0,
      why:"The course frames GitHub Actions integration as wiring Claude into <b>pull requests</b>, providing managed code review as part of the PR flow." },

    { tag:"D3",
      q:"What is the purpose of Claude Code in Action's 'plugins' feature?",
      options:["Packaging a configured setup (hooks, CLAUDE.md, MCP connections) for team-wide install","A way to add new LLM providers to Claude Code","A billing feature for enterprise accounts only","A replacement for permission modes"],
      answer:0,
      why:"<b>Plugins</b> package a working setup so a team can install the same configuration consistently, rather than everyone hand-configuring their own." }
  ]
};
