"use client";

import { useEffect, useState } from "react";
import { RUTINA } from "@/lib/rutina";
import {
  cargarRegistro,
  guardarRegistro,
  fechaHoy,
  fechaISO,
  diaDeLaSemana,
  semanaLaboral,
  porcentajeDia,
  porcentajeSemana,
  rachaDias,
  Registro,
} from "@/lib/storage";
import DiaCard from "@/components/DiaCard";
import Estadisticas from "@/components/Estadisticas";

export default function Home() {
  const [registro, setRegistro] = useState<Registro>({});
  const [tab, setTab] = useState<"hoy" | "semana" | "stats">("hoy");
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    setRegistro(cargarRegistro());
    setMontado(true);
  }, []);

  const toggleEjercicio = (fecha: string, idx: number) => {
    const nuevo = { ...registro };
    if (!nuevo[fecha]) nuevo[fecha] = {};
    nuevo[fecha][idx] = !nuevo[fecha][idx];
    setRegistro(nuevo);
    guardarRegistro(nuevo);
  };

  if (!montado) {
    return (
      <div className="flex h-screen items-center justify-center text-muted font-mono text-sm">
        cargando…
      </div>
    );
  }

  const hoy = new Date();
  const diaHoy = diaDeLaSemana(hoy);
  const fechaHoyStr = fechaHoy();
  const rutinaHoy = RUTINA.find((d) => d.diaSemana === diaHoy);
  const semana = semanaLaboral(hoy);
  const racha = rachaDias(registro);
  const pctSemana = porcentajeSemana(
    registro,
    semana.map(fechaISO),
    RUTINA.map((d) => d.ejercicios.length)
  );

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-8 md:py-12">
      {/* Header */}
      <header className="mb-10 md:mb-14">
        <div className="flex items-baseline justify-between border-b border-line pb-4">
          <div>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted mb-2">
              Bitácora · {new Date().getFullYear()}
            </p>
            <h1 className="font-display text-4xl md:text-5xl font-medium leading-none">
              Rutina
              <span className="italic font-light text-accent">.</span>
            </h1>
          </div>
          <div className="text-right">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted mb-1">
              Racha
            </p>
            <p className="font-display text-3xl font-medium">
              {racha}
              <span className="font-mono text-xs text-muted ml-1">d</span>
            </p>
          </div>
        </div>

        {/* Tabs */}
        <nav className="flex gap-1 mt-6">
          {[
            { id: "hoy", label: "Hoy" },
            { id: "semana", label: "Semana" },
            { id: "stats", label: "Progreso" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id as typeof tab)}
              className={`px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all ${
                tab === t.id
                  ? "bg-ink text-paper"
                  : "text-muted hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </header>

      {/* HOY */}
      {tab === "hoy" && (
        <section className="fade-up">
          {rutinaHoy ? (
            <DiaCard
              dia={rutinaHoy}
              fecha={fechaHoyStr}
              registro={registro[fechaHoyStr] || {}}
              onToggle={(idx) => toggleEjercicio(fechaHoyStr, idx)}
              esHoy
            />
          ) : (
            <div className="text-center py-16">
              <p className="font-display italic text-2xl text-muted mb-2">
                Día de descanso.
              </p>
              <p className="text-sm text-muted">
                Aprovecha y saca al perro a caminar largo.
              </p>
            </div>
          )}
        </section>
      )}

      {/* SEMANA */}
      {tab === "semana" && (
        <section className="space-y-6 fade-up">
          <div className="flex items-baseline justify-between border-b border-line pb-3">
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
              Esta semana
            </p>
            <p className="font-display text-2xl">
              {pctSemana}
              <span className="font-mono text-xs text-muted">%</span>
            </p>
          </div>
          {RUTINA.map((dia, i) => {
            const fecha = fechaISO(semana[i]);
            const pct = porcentajeDia(
              registro,
              fecha,
              dia.ejercicios.length
            );
            const esHoyDia = fecha === fechaHoyStr;
            return (
              <DiaCard
                key={dia.id}
                dia={dia}
                fecha={fecha}
                registro={registro[fecha] || {}}
                onToggle={(idx) => toggleEjercicio(fecha, idx)}
                porcentaje={pct}
                esHoy={esHoyDia}
                compacto
              />
            );
          })}
        </section>
      )}

      {/* STATS */}
      {tab === "stats" && (
        <section className="fade-up">
          <Estadisticas registro={registro} />
        </section>
      )}

      <footer className="mt-20 pt-6 border-t border-line text-center">
        <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
          Los datos se guardan en este dispositivo
        </p>
      </footer>
    </div>
  );
}
