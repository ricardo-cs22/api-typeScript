// src/utils/calculations.ts

export function calcularMedia(notaOficial: number, notaParcial: number): number {
    return ((notaOficial * 7) + (notaParcial * 3)) / 10;
  }
  
  export function calcularPorcentagemPresenca(totalAulas: number, presenca: number): number {
    return (presenca / totalAulas) * 100;
  }
  
  export function determinarRisco(
    presenca: number, 
    media: number, 
    atividadesEmSala: number, 
    atividadesExtra: number
  ): string {
    if (presenca < 30 && media <= 5 && atividadesEmSala <= 7 && atividadesExtra < 3) {
      return 'Alto';
    }
    if (presenca >= 30 && presenca <= 60 && media > 5 && media < 7 && 
        atividadesEmSala > 7 && atividadesEmSala <= 10 && atividadesExtra >= 3 && atividadesExtra < 5) {
      return 'Médio';
    }
    return 'Baixo';
  }
  