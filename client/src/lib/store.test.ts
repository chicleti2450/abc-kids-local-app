import { describe, expect, it } from "vitest"
import {
  DEFAULT_CHARACTER,
  gameStats,
  psicogenese,
  studentLevelOverview,
  studentOverview,
  type Student,
} from "./store"

const student = (plays: Student["plays"] = []): Student => ({
  id: "student-test",
  name: "Aluno Teste",
  password: "EDU00",
  character: DEFAULT_CHARACTER,
  characterCustomized: false,
  plays,
  createdAt: new Date().toISOString(),
})

describe("classificação e percentuais", () => {
  it("não classifica nem mostra percentual antes do primeiro jogo", () => {
    expect(studentOverview(student()).overallPct).toBeNull()
    expect(psicogenese(null)).toBeNull()
  })

  it("usa apenas Silábico-Alfabético e Alfabético após jogos", () => {
    expect(psicogenese(79)).toBe("Silábico-Alfabético")
    expect(psicogenese(80)).toBe("Alfabético")
  })

  it("calcula o percentual acumulado do jogo por acertos e tentativas", () => {
    const result = gameStats(student([
      { gameId: 1, acertos: 3, erros: 1, tentativas: 4, pct: 75, date: "2026-01-01" },
      { gameId: 1, acertos: 4, erros: 0, tentativas: 4, pct: 100, date: "2026-01-02" },
    ]), 1)
    expect(result.pct).toBe(88)
    expect(studentOverview(student(result ? [
      { gameId: 1, acertos: 3, erros: 1, tentativas: 4, pct: 75, date: "2026-01-01" },
      { gameId: 1, acertos: 4, erros: 0, tentativas: 4, pct: 100, date: "2026-01-02" },
    ] : [])).overallPct).toBe(88)
  })

  it("mantém os percentuais separados entre os níveis", () => {
    const item = student([
      { gameId: 1, level: "silabico", acertos: 3, erros: 1, tentativas: 4, pct: 75, date: "2026-01-01" },
      { gameId: 1, level: "alfabetico", acertos: 1, erros: 1, tentativas: 2, pct: 50, date: "2026-01-02" },
    ])
    expect(studentLevelOverview(item, "silabico").overallPct).toBe(75)
    expect(studentLevelOverview(item, "alfabetico").overallPct).toBe(50)
  })
})
