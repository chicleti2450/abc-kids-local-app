import type { PersistedAppData } from "./localStore";

const DEFAULT_CHARACTER = {
  animal: "raposa",
  hat: "none",
  face: "none",
  accessory: "none",
  tint: "",
};

export const CLASSROOM_NAME = "1ºEF";
export const TEACHER_NAME = "Silvana";
export const TEACHER_PASSWORD = "SESI1234";

export const STUDENT_NAMES = [
  "Amaya",
  "Angelo",
  "Anna Alice",
  "Anthony Rezende",
  "Anthony Zaia",
  "Arthur",
  "Benício Maia",
  "Benício Zaia",
  "Benjamim Sales",
  "Benjamin Luz",
  "Bernardo",
  "Brendha",
  "Cecília Gomes",
  "Cecília Raiol",
  "Cecília Ziemba",
  "Davi Teixeira",
  "Davi Ventura",
  "Emanuelly",
  "Gabriel",
  "Helena Ferreira",
  "Helena Oliveira",
  "Heloísa",
  "Henrique",
  "Isaque",
  "Liz",
  "Lorena",
  "Lunna",
  "Maria Alice",
  "Maria Clara",
  "Mariah",
  "Paola",
  "Pedro",
  "Sofia",
  "Tainá",
] as const;

type SeedTeacher = {
  id: string;
  name: string;
  password: string;
  createdAt: string;
};

type SeedStudent = {
  id: string;
  name: string;
  password: string;
  character: typeof DEFAULT_CHARACTER;
  characterCustomized: boolean;
  plays: unknown[];
  createdAt: string;
};

type SeedClassroom = {
  id: string;
  name: string;
  studentIds: string[];
  createdAt: string;
};

export function seedSchoolData(input: PersistedAppData): PersistedAppData {
  const now = new Date().toISOString();
  const students = [...input.students] as SeedStudent[];
  const teachers = [...input.teachers] as SeedTeacher[];
  const classrooms = [...input.classrooms] as SeedClassroom[];

  const studentIds: string[] = [];
  const legacySeedIds = new Set<string>();
  STUDENT_NAMES.forEach((name, index) => {
    const existing = students.find((student) => student.name?.toLowerCase() === name.toLowerCase());
    const canonicalId = `student_1ef_${String(index + 1).padStart(2, "0")}`;
    if (existing) {
      legacySeedIds.add(existing.id);
      existing.id = canonicalId;
      existing.password = existing.password || `EDU${String(index + 1).padStart(2, "0")}`;
      studentIds.push(canonicalId);
      return;
    }

    students.push({
      id: canonicalId,
      name,
      password: `EDU${String(index + 1).padStart(2, "0")}`,
      character: { ...DEFAULT_CHARACTER },
      characterCustomized: false,
      plays: [],
      createdAt: now,
    });
    studentIds.push(canonicalId);
  });

  const existingTeacher = teachers.find((teacher) => teacher.name?.toLowerCase() === TEACHER_NAME.toLowerCase());
  if (existingTeacher) {
    existingTeacher.name = TEACHER_NAME;
    existingTeacher.password = TEACHER_PASSWORD;
  } else {
    teachers.push({
      id: "teacher_silvana",
      name: TEACHER_NAME,
      password: TEACHER_PASSWORD,
      createdAt: now,
    });
  }

  const classroom = classrooms.find((item) => item.name === CLASSROOM_NAME);
  if (classroom) {
    const unrelatedStudentIds = classroom.studentIds.filter((id) => !legacySeedIds.has(id));
    classroom.studentIds = Array.from(new Set([...unrelatedStudentIds, ...studentIds]));
  } else {
    classrooms.push({
      id: "classroom_1ef",
      name: CLASSROOM_NAME,
      studentIds,
      createdAt: now,
    });
  }

  return { students, teachers, classrooms };
}
