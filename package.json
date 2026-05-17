// Storage utilities — registro de cumplimiento en localStorage

export type Registro = {
  // Estructura: { "YYYY-MM-DD": { "ejercicioIndex": true/false, ... } }
  [fecha: string]: { [ejercicioIdx: string]: boolean };
};

const STORAGE_KEY = "rutina-tracker-v1";

export function cargarRegistro(): Registro {
  if (typeof window === "undefined") return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function guardarRegistro(registro: Registro): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(registro));
}

export function fechaHoy(): string {
  const d = new Date();
  const año = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${año}-${mes}-${dia}`;
}

export function fechaISO(d: Date): string {
  const año = d.getFullYear();
  const mes = String(d.getMonth() + 1).padStart(2, "0");
  const dia = String(d.getDate()).padStart(2, "0");
  return `${año}-${mes}-${dia}`;
}

// Lunes = 1, Domingo = 0 → convertimos a Lunes=1...Domingo=7
export function diaDeLaSemana(d: Date): number {
  const js = d.getDay(); // 0=domingo
  return js === 0 ? 7 : js;
}

// Devuelve el lunes de la semana de la fecha dada
export function lunesDeSemana(d: Date): Date {
  const copia = new Date(d);
  const dia = diaDeLaSemana(copia);
  copia.setDate(copia.getDate() - (dia - 1));
  copia.setHours(0, 0, 0, 0);
  return copia;
}

// Devuelve array de Date Lunes→Viernes de la semana de la fecha dada
export function semanaLaboral(d: Date): Date[] {
  const lunes = lunesDeSemana(d);
  return Array.from({ length: 5 }, (_, i) => {
    const dia = new Date(lunes);
    dia.setDate(lunes.getDate() + i);
    return dia;
  });
}

// % de cumplimiento de un día específico (0–100)
export function porcentajeDia(
  registro: Registro,
  fecha: string,
  totalEjercicios: number
): number {
  const dia = registro[fecha];
  if (!dia || totalEjercicios === 0) return 0;
  const completados = Object.values(dia).filter(Boolean).length;
  return Math.round((completados / totalEjercicios) * 100);
}

// % cumplimiento de la semana (promedio de 5 días)
export function porcentajeSemana(
  registro: Registro,
  fechas: string[],
  ejerciciosPorDia: number[]
): number {
  let total = 0;
  fechas.forEach((f, i) => {
    total += porcentajeDia(registro, f, ejerciciosPorDia[i]);
  });
  return Math.round(total / fechas.length);
}

// Cuenta de días con al menos 1 ejercicio marcado en últimos N días
export function rachaDias(registro: Registro): number {
  let racha = 0;
  const hoy = new Date();
  for (let i = 0; i < 365; i++) {
    const d = new Date(hoy);
    d.setDate(hoy.getDate() - i);
    const dia = diaDeLaSemana(d);
    if (dia > 5) continue; // solo días laborales
    const fecha = fechaISO(d);
    const reg = registro[fecha];
    if (reg && Object.values(reg).some(Boolean)) {
      racha++;
    } else if (i > 0) {
      break;
    }
  }
  return racha;
}
