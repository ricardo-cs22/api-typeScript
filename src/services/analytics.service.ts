import prisma from '../config/database';

interface StudentRiskAnalysis {
  alunoId: string;
  risco: 'ALTO' | 'MEDIO' | 'BAIXO';
}

class AnalyticsService {
  // Listar alunos por semestre, ano ou disciplina
  async listStudentsInfo({ semestreId, ano, disciplinaId }: { semestreId?: string; ano?: number; disciplinaId?: string }) {
    const alunos = await prisma.aluno.findMany({
      where: {
        ...(semestreId && { semestreId }),
        ...(ano && { semestre: { ano } }),
        ...(disciplinaId && { disciplinaId }),
      },
      include: {
        semestre: true,
        disciplina: true,
      },
    });

    return alunos.map(aluno => ({
      id: aluno.id,
      nome: aluno.nome,
      idade: aluno.idade,
      presenca: aluno.presenca,
      media: this.calculateAverage(aluno.notaOficial, aluno.notaParcial),
      disciplina: aluno.disciplina?.nome || 'Sem disciplina', // Handle potential null
      semestre: aluno.semestre?.periodo || 'Sem semestre', // Handle potential null
    }));
  }

  // Calcular média ponderada
  calculateAverage(notaOficial: number, notaParcial: number): number {
    return ((notaOficial * 7) + (notaParcial * 3)) / 10;
  }

  // Determinar a porcentagem de presença
  calculatePresencePercentage(presenca: number, totalAulas: number): number {
    return (totalAulas > 0) ? (presenca / totalAulas) * 100 : 0; // Prevent division by zero
  }

  // Análise de risco de evasão e reprovação
  async analyzeStudentRisk(alunoId: string): Promise<StudentRiskAnalysis> {
    const aluno = await prisma.aluno.findUnique({
      where: { id: alunoId },
      include: { disciplina: true },
    });

    if (!aluno) throw new Error('Aluno não encontrado');

    const media = this.calculateAverage(aluno.notaOficial, aluno.notaParcial);
    const presenca = this.calculatePresencePercentage(aluno.presenca, aluno.disciplina?.quantidadeAulas || 0); // Handle potential null
    const atividadesEmSala = aluno.atividadesEmSala || 0; // Fallback to 0 if null
    const atividadesExtracurriculares = aluno.atividadesExtracurriculares || 0; // Fallback to 0 if null

    if (presenca < 30 || media <= 5 || atividadesEmSala <= 7 || atividadesExtracurriculares < 3) {
      return { alunoId, risco: 'ALTO' };
    } else if (presenca >= 30 && presenca <= 60 && media > 5 && media < 7 && atividadesEmSala > 7 && atividadesEmSala <= 10 && atividadesExtracurriculares >= 3 && atividadesExtracurriculares < 5) {
      return { alunoId, risco: 'MEDIO' };
    } else {
      return { alunoId, risco: 'BAIXO' };
    }
  }

  // Formar grupos de estudo para melhoria de desempenho
  async formStudyGroups(semestreId: string) {
    const alunos = await prisma.aluno.findMany({ where: { semestreId }, include: { disciplina: true } });
    const riscos = await Promise.all(alunos.map(aluno => this.analyzeStudentRisk(aluno.id)));

    // Agrupando alunos de alto risco com alunos de melhor desempenho (baixo risco)
    const highRisk = riscos.filter(r => r.risco === 'ALTO').map(r => r.alunoId);
    const lowRisk = riscos.filter(r => r.risco === 'BAIXO').map(r => r.alunoId);
    
    const studyGroups: string[][] = [];
    while (highRisk.length > 0 && lowRisk.length > 0) {
      const group = highRisk.splice(0, 3).concat(lowRisk.splice(0, 2));
      studyGroups.push(group);
    }
    return studyGroups;
  }
}

export default new AnalyticsService();
