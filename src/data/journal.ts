export type JournalEntry = {
  id: string;
  title: string;
  date: string;
  category: "DEVLOG" | "RESEARCH" | "PROJECT" | "PERSONAL";
  excerpt: string;
  body: string[];
  tags: string[];
};

export const journalEntries: JournalEntry[] = [
  {
    id: "laputa-build-0103",
    title: "BUILD 01.03 // JOURNAL SYSTEM ONLINE",
    date: "2026-07-25",
    category: "DEVLOG",
    excerpt:
      "The Journal and Gallery are now first-class destinations inside the shared TopHud navigation system.",
    body: [
      "Build 01.03 expands Laputa beyond project records by introducing a dedicated journal and visual archive.",
      "The journal will document project decisions, research progress, development notes, and longer technical reflections. Entries remain data-driven so future posts can be added without rebuilding the interface.",
    ],
    tags: ["LAPUTA", "FRONTEND", "RELEASE"],
  },
  {
    id: "spinal-battery-log-01",
    title: "SPINAL BATTERY // SYSTEM DEFINITION",
    date: "2026-07-20",
    category: "PROJECT",
    excerpt:
      "Defining the mechanical, electrical, and wearable constraints for a modular spinal power platform.",
    body: [
      "The Spinal Battery System is being treated as a real wearable robotics platform rather than a visual prop.",
      "Current work focuses on vertebral articulation, realistic range of motion, battery packaging, cable routing, serviceability, and future electronics integration.",
    ],
    tags: ["HARDWARE", "CAD", "WEARABLE ROBOTICS"],
  },
  {
    id: "research-log-01",
    title: "TENSEGRITY EXOSKELETON // SENSOR ONBOARDING",
    date: "2026-07-15",
    category: "RESEARCH",
    excerpt:
      "Notes from integrating IMU and EMG sensing into an upper-limb tensegrity exoskeleton research platform.",
    body: [
      "The research objective is to support feedback control, motion tracking, rehabilitation experiments, and optimization of muscle effort.",
      "Near-term work includes understanding the control architecture, selecting sensors, reviewing electronics, and defining repeatable tests for the prototype.",
    ],
    tags: ["RESEARCH", "EMG", "IMU", "CONTROLS"],
  },
];
