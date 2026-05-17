export type Ejercicio = {
  nombre: string;
  detalle: string;
};

export type Dia = {
  id: string;
  diaSemana: number; // 1=Lunes ... 5=Viernes
  titulo: string;
  enfoque: string;
  ejercicios: Ejercicio[];
};

export const RUTINA: Dia[] = [
  {
    id: "lunes",
    diaSemana: 1,
    titulo: "Lunes",
    enfoque: "Push — Pecho, Hombros, Tríceps",
    ejercicios: [
      { nombre: "Press de pecho en banco", detalle: "3 × 10  ·  15 lb" },
      { nombre: "Press militar de pie", detalle: "3 × 10  ·  10 lb" },
      { nombre: "Aperturas en banco", detalle: "3 × 12  ·  10 lb" },
      { nombre: "Patada de tríceps", detalle: "3 × 12  ·  10 lb" },
      { nombre: "Plancha", detalle: "3 × 30 seg" },
    ],
  },
  {
    id: "martes",
    diaSemana: 2,
    titulo: "Martes",
    enfoque: "Pull — Espalda, Bíceps",
    ejercicios: [
      { nombre: "Remo a una mano en banco", detalle: "3 × 10 c/lado  ·  20 lb" },
      { nombre: "Remo inclinado a dos manos", detalle: "3 × 10  ·  15 lb" },
      { nombre: "Curl de bíceps", detalle: "3 × 12  ·  15 lb" },
      { nombre: "Curl martillo", detalle: "3 × 12  ·  10 lb" },
      { nombre: "Superman en tapete", detalle: "3 × 12" },
    ],
  },
  {
    id: "miercoles",
    diaSemana: 3,
    titulo: "Miércoles",
    enfoque: "Lower — Piernas, Glúteo",
    ejercicios: [
      { nombre: "Sentadilla goblet", detalle: "3 × 12  ·  20 lb" },
      { nombre: "Zancadas alternadas", detalle: "3 × 10 c/pierna  ·  10 lb" },
      { nombre: "Peso muerto rumano", detalle: "3 × 12  ·  20 lb (cada mano)" },
      { nombre: "Puente de glúteo", detalle: "3 × 15" },
      { nombre: "Plancha lateral", detalle: "2 × 20 seg c/lado" },
    ],
  },
  {
    id: "jueves",
    diaSemana: 4,
    titulo: "Jueves",
    enfoque: "Push variante — Énfasis en hombro",
    ejercicios: [
      { nombre: "Press Arnold sentado", detalle: "3 × 10  ·  10 lb" },
      { nombre: "Elevaciones laterales", detalle: "3 × 12  ·  10 lb" },
      { nombre: "Press inclinado en banco", detalle: "3 × 10  ·  15 lb" },
      { nombre: "Fondos de tríceps en banco", detalle: "3 × 12  ·  peso corporal" },
      { nombre: "Crunch en tapete", detalle: "3 × 15" },
    ],
  },
  {
    id: "viernes",
    diaSemana: 5,
    titulo: "Viernes",
    enfoque: "Pull variante + Core",
    ejercicios: [
      { nombre: "Remo renegado (plancha + remo)", detalle: "3 × 8 c/lado  ·  10 lb" },
      { nombre: "Pullover en banco", detalle: "3 × 12  ·  15 lb" },
      { nombre: "Curl concentrado", detalle: "3 × 10 c/brazo  ·  15 lb" },
      { nombre: "Apertura inversa (face pull)", detalle: "3 × 12  ·  10 lb" },
      { nombre: "Russian twist", detalle: "3 × 20  ·  10 lb" },
    ],
  },
];
