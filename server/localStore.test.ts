import { describe, expect, it } from "vitest";
import { addActivity, completeActivity, readLocalState } from "./localStore";
import { seedSchoolData } from "./seed";

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

  it("seeds Silvana, the 1ºEF classroom, and 34 students without duplicates", () => {
    const first = seedSchoolData({ students: [], teachers: [], classrooms: [] });
    const second = seedSchoolData(first);
    const students = first.students as Array<{ name: string; password: string }>;
    const teacher = first.teachers as Array<{ name: string; password: string }>;
    const classroom = (first.classrooms as Array<{ name: string; studentIds: string[] }>).find((item) => item.name === "1ºEF");

    expect(students).toHaveLength(34);
    expect(students[0]).toMatchObject({ name: "Amaya", password: "EDU01" });
    expect(students[33]).toMatchObject({ name: "Tainá", password: "EDU34" });
    expect(teacher).toContainEqual(expect.objectContaining({ name: "Silvana", password: "SESI1234" }));
    expect(classroom?.studentIds).toHaveLength(34);
    expect(second.students).toHaveLength(34);
    expect(second.teachers).toHaveLength(1);
    expect(second.classrooms).toHaveLength(1);
  });
});
