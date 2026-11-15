export const roles = [
  {
    name: "Chief Operating Officer",
    short: "COO",
    kind: "Executive",
    description:
      "Keep the organization moving and report progress, priorities, and outcomes.",
    work: "Quarterly operations brief",
    hair: "#9dcfba",
    accent: "#e7b4bd",
    tone: "#e1eee2",
    accessory: "jacket",
  },
  {
    name: "Chief People Officer",
    short: "CPO",
    kind: "Executive",
    description:
      "Connect workforce needs and employee experience to organizational decisions.",
    work: "People & employee services update",
    hair: "#d6b16c",
    accent: "#f0d6a3",
    tone: "#f0e8d6",
    accessory: "jacket",
  },
  {
    name: "Chief Financial Officer",
    short: "CFO",
    kind: "Executive",
    description:
      "Report financial position, commitments, and the resources behind the mission.",
    work: "Resources & commitments report",
    hair: "#879fc2",
    accent: "#c2d0e0",
    tone: "#e1e7ec",
    accessory: "glasses",
  },
  {
    name: "Executive Secretary",
    short: "ES",
    kind: "Employee support",
    description:
      "Take care of scheduling, documents, travel, and follow-through.",
    work: "Meeting pack & follow-up record",
    hair: "#b3a2c7",
    accent: "#d9cae6",
    tone: "#ebe5ef",
    accessory: "headset",
  },
  {
    name: "Community Operator",
    short: "CO",
    kind: "Hands-on execution",
    description:
      "Welcome members, answer questions, and help people participate.",
    work: "First-contribution handoff",
    hair: "#c68b72",
    accent: "#ebbc9f",
    tone: "#f0e2d8",
    accessory: "cap",
  },
  {
    name: "Software Engineer",
    short: "SE",
    kind: "Hands-on execution",
    description:
      "Build, test, and deliver the software work the organization needs.",
    work: "Tested change & review notes",
    hair: "#577f76",
    accent: "#98bcb0",
    tone: "#dfe8e0",
    accessory: "headset",
  },
] as const;

export const specialistRoles = [
  [
    "HR Specialist",
    "Onboarding, employment services, leave, and employee requests.",
  ],
  [
    "Payroll Specialist",
    "Payroll inputs, provider follow-up, and employee pay queries.",
  ],
  ["Event Producer", "Speakers, participants, logistics, and event delivery."],
  [
    "Content Producer",
    "Stories, publishing, and content adapted for each audience.",
  ],
  [
    "Development Officer",
    "Fundraising opportunities and long-term donor relationships.",
  ],
] as const;
