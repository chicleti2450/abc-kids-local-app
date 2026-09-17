import { describe, expect, it } from "vitest";
import { addActivity, completeActivity, readLocalState } from "./localStore";

describe("localStore", () => {
  it("persists a created activity and its completion state", async () => {
    const before = await readLocalState();
    const activity = await addActivity("Atividade de teste", "Teste");
    const afterCreate = await readLocalState();
    expect(afterCreate.activities.some((item) => item.id === activity.id)).toBe(true);

    const afterComplete = await completeActivity(activity.id);
    expect(afterComplete.completedActivities).toContain(activity.id);

    if (before.activities.every((item) => item.id !== activity.id)) {
      const finalState = await readLocalState();
      finalState.activities = finalState.activities.filter((item) => item.id !== activity.id);
      finalState.completedActivities = finalState.completedActivities.filter((id) => id !== activity.id);
      const { writeLocalState } = await import("./localStore");
      await writeLocalState(finalState);
    }
  });
});
