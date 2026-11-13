export const DISCORD = "https://discord.gg/m8qnWv9XX";
export const GITHUB = "https://github.com/rein-protocol-foundation/nori-agent";
export type Story = {
  id: string;
  tab: string;
  title: string;
  summary: string;
  channel: string;
  messages: [string, string][];
  artifacts: [string, string][];
  actions: string[];
  collaboration: string;
  outcome: string;
};
export const stories: Record<string, Story> = {
  handoff: {
    id: "handoff",
    tab: "A promise kept",
    title: "Someone’s away. The work still moves.",
    summary:
      "A partner update is due tomorrow. The person responsible is on leave, and the project notes are incomplete.",
    channel: "program-ops",
    messages: [
      [
        "Nori",
        "The partner update is due tomorrow. I found the missing project notes and asked the covering teammate to check the summary.",
      ],
      ["Teammate", "Reviewed. The summary is ready to share."],
      ["Nori", "Sent through the agreed channel. The handoff is recorded."],
    ],
    artifacts: [
      ["Team calendar", "Owner on leave · coverage identified"],
      ["Partner update", "Project notes attached · handoff recorded"],
    ],
    actions: [
      "Notice the approaching commitment and check the team’s coverage arrangements.",
      "Recover the project context, prepare the update, and ask the covering teammate to review it.",
      "Deliver through the agreed channel and link the result to the original commitment.",
    ],
    collaboration:
      "The covering teammate reviews the summary. Nori uses the organization’s existing communication and document tools, within its access permissions.",
    outcome:
      "The partner receives the update, and the returning teammate can see what was shared and what comes next.",
  },
  requests: {
    id: "requests",
    tab: "Everyday requests",
    title: "A new tool request. An existing seat.",
    summary:
      "A teammate needs access before Monday. Nori checks what the organization already has before buying something new.",
    channel: "employee-help",
    messages: [
      ["Teammate", "Can I get access to the research tool before Monday?"],
      [
        "Nori",
        "We already have an unused seat. I’ve assigned it and sent your access link.",
      ],
      ["Teammate", "I’m in. Thank you."],
      ["Nori", "Access checked. The inventory is updated."],
    ],
    artifacts: [
      ["Research workspace", "Existing seat assigned"],
      ["Access is ready", "Sign-in verified · inventory updated"],
    ],
    actions: [
      "Understand the request and check existing subscriptions, seats, and access policies.",
      "Assign an available seat and send the access instructions. If there is a gap, compare and procure a suitable service within the authorized budget.",
      "Confirm the teammate can use the tool, update the inventory, and retain renewal or exit details.",
    ],
    collaboration:
      "The teammate confirms access. Service providers handle their own provisioning; Nori coordinates the work and follows up on exceptions.",
    outcome:
      "The teammate is ready to work, without an unnecessary purchase or an unresolved support thread.",
  },
  hiring: {
    id: "hiring",
    tab: "Global hiring",
    title: "From an offer to a first day that’s ready.",
    summary:
      "A new colleague is joining across borders. Employment, immigration, payroll, and workspace access need to come together.",
    channel: "people-ops",
    messages: [
      [
        "People team",
        "Our new hire is joining from another country. Can you coordinate the setup?",
      ],
      [
        "Nori",
        "I’ve mapped the employment and visa needs, compared service options, and prepared the onboarding checklist.",
      ],
      [
        "Nori",
        "The provider needs the designated signer. I’ve routed that step and will continue the remaining setup.",
      ],
    ],
    artifacts: [
      ["Onboarding checklist", "Employment · payroll · benefits · accounts"],
      ["Specialist services", "Visa sponsorship · E-Verify · EOR"],
    ],
    actions: [
      "Clarify work location, start date, employment needs, and visa sponsorship requirements.",
      "Select and procure appropriate employment and specialist immigration services, including specialized nonprofit H-1B scenarios where applicable.",
      "Coordinate documents, contracts, E-Verify through the applicable service, payroll, benefits, accounts, and first-day arrangements.",
    ],
    collaboration:
      "Specialist providers handle professional processes. Designated people complete identity checks and signatures; Nori follows up and resumes dependent work.",
    outcome:
      "The team has a connected onboarding plan, clear owners for remaining requirements, and a first-day setup that keeps moving.",
  },
  payroll: {
    id: "payroll",
    tab: "Payroll & leave",
    title: "Time off, with the loose ends covered.",
    summary:
      "A leave request affects coverage, payroll inputs, and an upcoming trip. Nori connects the details.",
    channel: "employee-help",
    messages: [
      [
        "Teammate",
        "I need to take leave next week. What happens to my workshop trip?",
      ],
      [
        "Nori",
        "I’ve updated the leave request and prepared coverage. I’m coordinating the travel change and reimbursement follow-up.",
      ],
    ],
    artifacts: [
      ["Leave & coverage", "Dates recorded · responsibilities handed over"],
      ["Payroll & expenses", "Inputs checked · reimbursement followed up"],
    ],
    actions: [
      "Handle PTO or sick-leave requests through the HR platform and check balances and dates.",
      "Coordinate coverage, travel changes, receipts, and reimbursement through the relevant services.",
      "Reconcile payroll inputs, track provider exceptions, and follow through on employee pay questions.",
    ],
    collaboration:
      "HR and payroll providers maintain the official records. Human decision-makers handle requests that require their authority.",
    outcome:
      "People can step away with coverage in place, while payroll and reimbursement work continues.",
  },
  board: {
    id: "board",
    tab: "Board work",
    title: "Make the decision. Carry it into the week.",
    summary:
      "Quarterly priorities need to become work people can pick up and report on.",
    channel: "governance",
    messages: [
      [
        "Nori",
        "The quarterly meeting pack is ready: progress, blockers, resource needs, and decisions requested.",
      ],
      [
        "Board liaison",
        "The decision is recorded. Please follow up with the project owners.",
      ],
      [
        "Nori",
        "Owners and next steps are linked to the decision. I’ll include progress in the next operations update.",
      ],
    ],
    artifacts: [
      ["Quarterly meeting pack", "Progress · proposals · resource needs"],
      ["Decision record", "Owners named · follow-up scheduled"],
    ],
    actions: [
      "Collect project progress and blockers, and prepare the board’s meeting materials.",
      "Coordinate proposals and voting through the organization’s governance process.",
      "Record decisions and follow up on commitments, reporting outcomes and unresolved questions to people.",
    ],
    collaboration:
      "The board makes governance decisions. Nori prepares materials, coordinates logistics, and keeps approved work moving.",
    outcome:
      "The decision stays connected to its rationale, responsible people, and next review.",
  },
  expenses: {
    id: "expenses",
    tab: "Expense follow-through",
    title: "The receipt that closes the loop.",
    summary:
      "A workshop expense is missing its purpose and supporting receipt. Nori connects the spending to the work.",
    channel: "finance-ops",
    messages: [
      [
        "Finance team",
        "This expense is missing a purpose. Which workshop was it for?",
      ],
      [
        "Nori",
        "Matched to the workshop booking. Receipt attached; project coding is ready for review.",
      ],
    ],
    artifacts: [
      ["Workshop booking", "Receipt attached · project matched"],
      ["Accounting record", "Purpose added · ready for review"],
    ],
    actions: [
      "Match the spending request to the project budget and booking.",
      "Follow up for missing invoices or receipts and prepare the accounting classification.",
      "Coordinate accounting, audit, or tax services, track exceptions, and retain the resulting records.",
    ],
    collaboration:
      "Accounting and tax professionals handle their specialist work. Nori prepares materials and follows through on questions and deadlines.",
    outcome:
      "An incomplete expense becomes a traceable record connected to the project it supported.",
  },
  treasury: {
    id: "treasury",
    tab: "On-chain work",
    title: "Working funds. Clear boundaries.",
    summary:
      "A project needs an on-chain payment. Nori carries the request through contract interaction and reconciliation within a limited hot-wallet allocation.",
    channel: "project-treasury",
    messages: [
      [
        "Nori",
        "The project request is within the working allocation. I’ve prepared the contract interaction.",
      ],
      [
        "Nori",
        "The resulting record is linked to the project. Reserves remain separately controlled.",
      ],
    ],
    artifacts: [
      ["Limited hot wallet", "Balance · transaction · cycle limits"],
      ["Project record", "Contract result checked · purpose linked"],
    ],
    actions: [
      "Check purpose, project allocation, and enforceable wallet limits.",
      "Prepare and execute permitted payments or contract interactions on Ethereum, BNB Chain, or Solana through established infrastructure.",
      "Check the result and associate it with the project. Route out-of-scope actions to the appropriate authority.",
    ],
    collaboration:
      "Independent custodians, cold wallets, or multisig holders control reserves and replenishment. Nori cannot raise its limits, hold reserve keys, or bypass isolation through contract approvals.",
    outcome:
      "The organization can put bounded working funds to use while keeping reserves separate. Nori also coordinates appropriate insurance and custody-service procurement and renewal; coverage depends on the actual service.",
  },
  storefront: {
    id: "storefront",
    tab: "Storefront & support",
    title: "Keep incoming support connected to the mission.",
    summary:
      "A digital product, event ticket, or donation should lead to a completed delivery and a continuing relationship.",
    channel: "supporter-ops",
    messages: [
      [
        "Nori",
        "The digital guide and payment link are ready. Delivery instructions are linked to the order.",
      ],
      [
        "Nori",
        "I’m following up on the confirmation and preparing the supporter update.",
      ],
    ],
    artifacts: [
      ["Storefront", "Product · payment link · digital delivery"],
      ["Supporter record", "Confirmation · follow-up · next update"],
    ],
    actions: [
      "Maintain listings, digital products, event offers, and payment links through a Stripe storefront or another suitable service.",
      "Track orders, delivery, receipts, and applicable refunds; keep donations distinct from sales and project grants.",
      "Connect one-time or recurring support to acknowledgments and relevant project updates.",
    ],
    collaboration:
      "Stripe, PayPal, and other established services perform supported payment work. For banking, Nori prepares and follows up while designated people complete required verification, signatures, or release steps.",
    outcome:
      "Orders and support have a clear next step, with routine work automated within the platform’s permissions and organizational budget.",
  },
  funding: {
    id: "funding",
    tab: "Funding opportunities",
    title: "Follow the opportunity beyond the first conversation.",
    summary:
      "A relevant grant or sponsor needs a proposal, a clear project budget, and dependable follow-through.",
    channel: "development",
    messages: [
      [
        "Nori",
        "This opportunity fits the project’s goals. I’ve assembled the proposal materials and funding requirements.",
      ],
      [
        "Nori",
        "The next conversation and supporting documents are tracked with the commitment.",
      ],
    ],
    artifacts: [
      ["Opportunity brief", "Mission fit · proposal · project budget"],
      ["Relationship notes", "Commitment · follow-up · supporter update"],
    ],
    actions: [
      "Identify opportunities relevant to the organization and prepare application or proposal materials.",
      "Follow conversations, commitments, budget needs, and incoming funds through the appropriate services.",
      "Keep donors, grantmakers, or sponsors updated on the work they support.",
    ],
    collaboration:
      "People shape commitments and approve decisions within their authority. Nori maintains continuity across fundraising, finance, and program work.",
    outcome:
      "The relationship continues from initial interest to the proposal, commitment, and ongoing project updates.",
  },
  contribution: {
    id: "contribution",
    tab: "A first contribution",
    title: "From saying hello to shipping a first contribution.",
    summary:
      "A new community member wants to help. Nori finds a useful starting point and stays with them through the work.",
    channel: "welcome",
    messages: [
      [
        "New contributor",
        "I’d love to help. I have some time this weekend and enjoy writing tests.",
      ],
      [
        "Nori",
        "There’s a small reproduction that needs a test. Here’s the setup, why it matters, and what a good contribution looks like.",
      ],
      ["New contributor", "The test is ready for review."],
      [
        "Nori",
        "I’ve coordinated a reviewer. Let’s work through the feedback together.",
      ],
    ],
    artifacts: [
      ["A well-scoped issue", "Reproduction · setup · acceptance checks"],
      ["First contribution", "Tests · human review · recognition"],
    ],
    actions: [
      "Ask about interests, available time, and voluntarily shared experience.",
      "Recommend a useful, bounded task with setup instructions and acceptance criteria; help resolve blockers.",
      "Coordinate tests and human review, follow revisions through the merge outcome, and invite the contributor into the next piece of work.",
    ],
    collaboration:
      "Contributors choose their tasks. Human reviewers provide project judgment; Nori connects people, context, and follow-through.",
    outcome:
      "A newcomer has a way to contribute, support while doing it, and a place in the continuing project.",
  },
  expertise: {
    id: "expertise",
    tab: "Human expertise",
    title: "When Nori needs expertise, it brings people in.",
    summary:
      "Donation payments and confirmation records occasionally fall out of sync. Nori narrows down the problem and organizes help.",
    channel: "help-wanted",
    messages: [
      [
        "Nori",
        "I’ve narrowed this down to the retry path. I need a developer to fix it and a second contributor to test the failure cases.",
      ],
      [
        "Contributor",
        "I can take the implementation. Can you share the reproduction?",
      ],
      [
        "Nori",
        "The sanitized reproduction and acceptance checks are attached. I’ll coordinate the review and testing.",
      ],
    ],
    artifacts: [
      ["Paid task brief", "Scope · agreed fee · timing · acceptance"],
      ["Independent testing", "Retry cases · review · settlement"],
    ],
    actions: [
      "Document symptoms, attempted fixes, a sanitized reproduction, and the expertise needed.",
      "Invite willing contributors. For a scoped paid task, agree deliverables, compensation, timing, and acceptance within the organization’s authorized budget.",
      "Coordinate implementation and independent testing, verify acceptance, follow agreed payment and release steps, and retain the tests and learning.",
    ],
    collaboration:
      "A developer implements the fix and a separate contributor tests failure cases. Existing contract, bounty, code-review, and payment services support delivery.",
    outcome:
      "The issue is resolved only when delivery and independent checks support that conclusion. Volunteers and paid collaborators have clear, distinct expectations.",
  },
  events: {
    id: "events",
    tab: "Events & programs",
    title: "Give a good conversation somewhere to go.",
    summary:
      "Recurring contributor questions become an office-hours session, a hackathon challenge, or a conference talk.",
    channel: "community-programs",
    messages: [
      [
        "Nori",
        "The same setup question came up again. I’ve prepared an office-hours topic and invited a contributor to walk through it.",
      ],
      [
        "Nori",
        "The session notes now link to the guide and the next open tasks.",
      ],
    ],
    artifacts: [
      ["Program brief", "Speakers · participants · logistics"],
      ["After the session", "Notes · guide changes · follow-up tasks"],
    ],
    actions: [
      "Identify recurring needs and shape an office hour, hackathon, conference session, or fundraising event.",
      "Coordinate speakers, participants, logistics, materials, and delivery.",
      "Turn questions and results into guidance and next contributions, keeping relationships active after the event.",
    ],
    collaboration:
      "Community members and speakers bring experience. Nori handles preparation and connects the session to ongoing project work.",
    outcome:
      "An event leaves useful documentation, relationships, and work the community can continue.",
  },
  voice: {
    id: "voice",
    tab: "Posts & replies",
    title: "A question becomes the next useful update.",
    summary:
      "A project announcement sparks a question. Nori responds with context and carries the feedback back into the work.",
    channel: "public-conversations",
    messages: [
      [
        "Organization post",
        "We’re opening a new contribution topic: practical evaluation for safer AI agents.",
      ],
      ["Community question", "Where should someone new to the project begin?"],
      [
        "Nori",
        "Start with the contributor guide. I’ve also added a clearer first-task example based on this question.",
      ],
    ],
    artifacts: [
      ["Contributor guide", "First-task example added"],
      ["Short-video storyboard", "The problem · the work · a way to join"],
    ],
    actions: [
      "Create original project updates, invitations, and outcome summaries for the organization’s audience.",
      "Reply thoughtfully to relevant questions; select resources to repost or quote with the organization’s perspective.",
      "Feed questions back into documentation and adapt program material into short videos, live-session outlines, and supporter updates.",
    ],
    collaboration:
      "The organization sets its voice and publishing authority. Speakers, contributors, and partners add context; Nori keeps communication connected to the work.",
    outcome:
      "Public communication gives people a way to understand, discuss, and participate in the mission. Demonstration posts are illustrative, not actual social records.",
  },
  media: {
    id: "media",
    tab: "Video & live conversations",
    title: "One program. More ways to take part.",
    summary:
      "A useful discussion can reach beyond the people in the room, with a format that fits each audience.",
    channel: "communications",
    messages: [
      [
        "Nori",
        "The session has a useful explanation of the problem. I’ve outlined a short clip and a live discussion follow-up.",
      ],
      [
        "Nori",
        "The supporter update links the project progress to the next way to participate.",
      ],
    ],
    artifacts: [
      ["Vertical-video storyboard", "Opening question · key idea · invitation"],
      ["Live-session outline", "Guest context · questions · follow-up"],
    ],
    actions: [
      "Select meaningful project or event moments and prepare short-form edits suitable for channels such as TikTok.",
      "Prepare live-session announcements, outlines, and audience questions for Twitch or another suitable channel.",
      "Adapt the result into partner and supporter communication with a relevant next action.",
    ],
    collaboration:
      "Participants supply project context and appropriate media permissions. Nori coordinates production and distribution within the organization’s policies.",
    outcome:
      "Each audience gets a useful version of the story, with a continuing route back to the project.",
  },
  rein: {
    id: "rein",
    tab: "A shared mission",
    title: "An AI safety project, carried forward.",
    summary:
      "An illustrative project journey connects organizational intent, resources, community contributions, and supporter communication at Rein.",
    channel: "AI safety project",
    messages: [
      [
        "Nori",
        "The project brief connects the research question to the people, resources, and decisions needed.",
      ],
      [
        "Nori",
        "A scoped test contribution and a supporter update now share the same project context.",
      ],
    ],
    artifacts: [
      ["Project purpose", "Practical work for safer AI agents"],
      ["Community contribution", "Evaluation test · review · next question"],
      ["Supporter update", "Progress · open questions · next steps"],
    ],
    actions: [
      "Clarify the mission, intended beneficiaries, project questions, and governance needs.",
      "Coordinate resources and useful contributions, bringing in human expertise when needed.",
      "Connect progress, supporter communication, and unresolved commitments to the next cycle.",
    ],
    collaboration:
      "Rein Protocol Foundation is a nonprofit focused on AI safety and making AI agents safe for people and society. People lead organizational decisions and contribute expertise.",
    outcome:
      "This is a demonstration of how the work connects, not a claimed historical project record. Meet Nori in Rein’s community to explore projects and participate.",
  },
  continuity: {
    id: "continuity",
    tab: "Organizational continuity",
    title: "Leave the next person ready to continue.",
    summary:
      "A teammate moves on and a new quarter begins. The next person needs the reasoning, relationships, and unfinished commitments.",
    channel: "handoff-notes",
    messages: [
      [
        "Nori",
        "The handoff includes the decision context, current owners, and the next supporter update.",
      ],
      [
        "Incoming teammate",
        "I can see what’s decided, what’s still open, and who to contact.",
      ],
    ],
    artifacts: [
      ["Quarterly decision", "Rationale retained · follow-up linked"],
      ["Handoff summary", "Open commitments · contacts · next steps"],
      ["Supporter update", "Previous promise · next check-in"],
    ],
    actions: [
      "Keep decisions connected to their context and subsequent work.",
      "Prepare a handoff, coordinate offboarding and access changes, and identify the next owner.",
      "Carry outstanding commitments into the next reporting cycle with appropriate access to organizational information.",
    ],
    collaboration:
      "Access follows organizational policy. Nori does not expose employee cases or internal financial detail to public channels.",
    outcome:
      "People inherit usable context and a clear next step. Clear roles, appropriate access, and a record of what happened support continuity.",
  },
};
export const roles = [
  {
    title: "Chief Operating Officer",
    type: "Executive",
    description:
      "Keep the organization moving and report progress, priorities, and outcomes.",
    work: "Quarterly operations summary",
    tools: "Project workspace · Board materials",
    color: "#b5e5d1",
  },
  {
    title: "Chief People Officer",
    type: "Executive",
    description:
      "Connect workforce needs and employee experience to organizational decisions.",
    work: "People priorities & service progress",
    tools: "People workspace · HR services",
    color: "#f2cf7f",
  },
  {
    title: "Chief Financial Officer",
    type: "Executive",
    description:
      "Report financial position, commitments, and the resources behind the mission.",
    work: "Resources & commitments report",
    tools: "Accounting · Treasury services",
    color: "#a7c9f7",
  },
  {
    title: "Executive Secretary",
    type: "Employee services",
    description:
      "Take care of scheduling, documents, travel, and follow-through.",
    work: "Meeting pack & travel arrangements",
    tools: "Calendar · Documents · Travel",
    color: "#d4b3e8",
  },
  {
    title: "Community Operator",
    type: "Hands-on execution",
    description:
      "Welcome members, answer questions, and help people participate.",
    work: "First contribution & community follow-up",
    tools: "Discord · GitHub",
    color: "#efb09a",
  },
  {
    title: "Software Engineer",
    type: "Hands-on execution",
    description:
      "Build, test, and deliver the software work the organization needs.",
    work: "Implementation, tests & review",
    tools: "GitHub · Development workspace",
    color: "#91c9c4",
  },
];
export const extendedRoles = [
  [
    "HR Specialist",
    "Coordinate onboarding, employment services, leave, and employee requests.",
  ],
  [
    "Payroll Specialist",
    "Keep payroll inputs, provider follow-up, and employee pay queries moving.",
  ],
  [
    "Event Producer",
    "Organize speakers, participants, logistics, and event delivery.",
  ],
  [
    "Content Producer",
    "Create, publish, and adapt content for the organization’s audiences.",
  ],
  [
    "Development Officer",
    "Pursue fundraising opportunities and maintain donor relationships.",
  ],
];
