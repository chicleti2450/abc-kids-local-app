export type Activity = {
  id: string;
  title: string;
  subject: string;
  createdAt: string;
};

export type PersistedAppData = {
  students: unknown[];
  teachers: unknown[];
  classrooms: unknown[];
};

export type LocalState = {
  activities: Activity[];
  completedActivities: string[];
  appData: PersistedAppData;
  lastUpdated: string;
};

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const dataDirectory = path.resolve(process.cwd(), "data");
const dataFile = path.join(dataDirectory, "abc-kids.json");

const initialState: LocalState = {
  activities: [
    { id: "letters", title: "Jogo das letras", subject: "Português", createdAt: "2026-01-01T00:00:00.000Z" },
    { id: "numbers", title: "Aventura dos números", subject: "Matemática", createdAt: "2026-01-01T00:00:00.000Z" },
  ],
  completedActivities: [],
  appData: { students: [], teachers: [], classrooms: [] },
  lastUpdated: new Date().toISOString(),
};

export async function readLocalState(): Promise<LocalState> {
  try {
    const content = await readFile(dataFile, "utf8");
    const parsed = JSON.parse(content) as Partial<LocalState>;
    return { ...initialState, ...parsed, appData: parsed.appData ?? initialState.appData };
  } catch {
    await writeLocalState(initialState);
    return initialState;
  }
}

export async function writeLocalState(state: LocalState): Promise<void> {
  await mkdir(dataDirectory, { recursive: true });
  await writeFile(dataFile, JSON.stringify(state, null, 2), "utf8");
}

export async function addActivity(title: string, subject: string): Promise<Activity> {
  const state = await readLocalState();
  const activity: Activity = { id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`, title, subject, createdAt: new Date().toISOString() };
  state.activities.push(activity);
  state.lastUpdated = new Date().toISOString();
  await writeLocalState(state);
  return activity;
}

export async function completeActivity(id: string): Promise<LocalState> {
  const state = await readLocalState();
  if (!state.completedActivities.includes(id)) state.completedActivities.push(id);
  state.lastUpdated = new Date().toISOString();
  await writeLocalState(state);
  return state;
}

export async function readAppData(): Promise<PersistedAppData> {
  return (await readLocalState()).appData;
}

export async function writeAppData(appData: PersistedAppData): Promise<void> {
  const state = await readLocalState();
  state.appData = appData;
  state.lastUpdated = new Date().toISOString();
  await writeLocalState(state);
}
