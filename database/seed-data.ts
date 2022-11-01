
interface SeedData {
  entries: SeedEntry[];
}

interface SeedEntry {
  description: string;
  status: string;
  createdAt: number;
}

export const seedData = {
  entries: [
    {
      description: "Task1",
      status: "pending",
      createdAt: Date.now(),
    },
    {
      description: "Task2",
      status: "in-progress",
      createdAt: Date.now(),
    },
    {
      description: "Task3",
      status: "finished",
      createdAt: Date.now(),
    },
  ],
};
