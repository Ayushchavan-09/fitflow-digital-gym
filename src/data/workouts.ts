export type Exercise = { name: string; scheme: string };
export type Mode = {
  id: string;
  label: string;
  title: string;
  note: string;
  exercises: Exercise[];
};

export const modes: Mode[] = [
  {
    id: "strength",
    label: "STRENGTH",
    title: "PUSH DAY",
    note: "Heavy compound lifts.",
    exercises: [
      { name: "Bench Press", scheme: "4 × 10" },
      { name: "Incline Press", scheme: "4 × 10" },
      { name: "Shoulder Press", scheme: "3 × 12" },
      { name: "Cable Fly", scheme: "3 × 12" },
      { name: "Tricep Dips", scheme: "3 × 15" },
    ],
  },
  {
    id: "cardio",
    label: "CARDIO",
    title: "ENGINE DAY",
    note: "Running, cycling, rowing.",
    exercises: [
      { name: "Treadmill Warmup", scheme: "10 min" },
      { name: "Row Intervals", scheme: "8 × 250m" },
      { name: "Bike Tempo", scheme: "15 min" },
      { name: "Incline Walk", scheme: "12 min" },
      { name: "Cooldown Jog", scheme: "5 min" },
    ],
  },
  {
    id: "hiit",
    label: "HIIT",
    title: "CONDITIONING",
    note: "Intervals and conditioning.",
    exercises: [
      { name: "Kettlebell Swing", scheme: "40s / 20s" },
      { name: "Burpees", scheme: "40s / 20s" },
      { name: "Box Jumps", scheme: "40s / 20s" },
      { name: "Battle Ropes", scheme: "40s / 20s" },
      { name: "Sled Push", scheme: "6 rounds" },
    ],
  },
  {
    id: "yoga",
    label: "YOGA",
    title: "FLOW STUDIO",
    note: "Mobility and flexibility.",
    exercises: [
      { name: "Sun Salutation", scheme: "5 rounds" },
      { name: "Warrior II Hold", scheme: "60s / side" },
      { name: "Hip Opener Flow", scheme: "8 min" },
      { name: "Spinal Twist", scheme: "60s / side" },
      { name: "Savasana", scheme: "5 min" },
    ],
  },
  {
    id: "mobility",
    label: "MOBILITY",
    title: "JOINT PREP",
    note: "Range of motion work.",
    exercises: [
      { name: "Ankle Rockers", scheme: "2 × 15" },
      { name: "90/90 Switches", scheme: "3 × 10" },
      { name: "Thoracic Openers", scheme: "3 × 12" },
      { name: "Banded Shoulder Pass", scheme: "3 × 12" },
      { name: "Deep Squat Hold", scheme: "3 × 60s" },
    ],
  },
  {
    id: "recovery",
    label: "RECOVERY",
    title: "COOLDOWN",
    note: "Stretching and cooldown.",
    exercises: [
      { name: "Foam Roll Quads", scheme: "3 min" },
      { name: "Hamstring Stretch", scheme: "90s / side" },
      { name: "Pigeon Pose", scheme: "90s / side" },
      { name: "Breathwork", scheme: "5 min" },
      { name: "Sauna", scheme: "10 min" },
    ],
  },
];

export const quotes = [
  ["NO EXCUSES.", "JUST CONSISTENCY."],
  ["SHOW UP.", "GET STRONGER."],
  ["YOUR FUTURE SELF", "IS WATCHING."],
  ["ONE MORE REP", "CHANGES EVERYTHING."],
  ["YOUR ONLY COMPETITION", "IS YESTERDAY."],
];

export const exerciseLibrary = [
  { group: "PUSH", items: ["Bench Press", "Overhead Press", "Dips", "Cable Fly"] },
  { group: "PULL", items: ["Deadlift", "Barbell Row", "Pull-ups", "Face Pulls"] },
  { group: "LEGS", items: ["Back Squat", "Front Squat", "Lunges", "Leg Press"] },
  { group: "CORE", items: ["Hanging Leg Raise", "Ab Rollout", "Pallof Press", "Plank"] },
];