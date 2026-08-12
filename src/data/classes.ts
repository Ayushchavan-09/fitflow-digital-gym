export type GymClass = {
  name: string;
  when: string;
  coach: string;
  spots: number;
};

export const classes: GymClass[] = [
  { name: "HIIT STRENGTH", when: "Tomorrow • 7:00 AM", coach: "Arjun M.", spots: 4 },
  { name: "SUNRISE FLOW", when: "Tomorrow • 6:15 AM", coach: "Priya K.", spots: 9 },
  { name: "POWER LIFTING LAB", when: "Thu • 6:30 PM", coach: "Rohan S.", spots: 2 },
  { name: "MOBILITY RESET", when: "Fri • 8:00 AM", coach: "Neha D.", spots: 11 },
];

export const leaders = [
  { rank: "01", name: "Arjun", note: "18 sessions" },
  { rank: "02", name: "Priya", note: "16 sessions" },
  { rank: "03", name: "Rohan", note: "15 sessions" },
];

export const plans = [
  {
    id: "flow",
    name: "FLOW",
    price: "₹999",
    perks: ["Gym access", "Cardio zone", "Yoga area", "Basic workout plans"],
  },
  {
    id: "fit",
    name: "FIT",
    price: "₹1,499",
    perks: ["Everything in FLOW", "Trainer guidance", "Progress tracking", "Group classes"],
    featured: true,
  },
  {
    id: "elite",
    name: "ELITE",
    price: "₹2,499",
    perks: ["Personal trainer", "Customized workouts", "Nutrition plan", "Advanced tracking"],
  },
];