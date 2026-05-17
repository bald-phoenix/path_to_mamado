"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
} from "recharts";
import { RUTINA } from "@/lib/rutina";
import {
  Registro,
  fechaISO,
  diaDeLaSemana,
  porcentajeDia,
  lunesDeSemana,
} from "@/lib/storage";

type Props = {
  registro: Registro;
};

export default function Estadisticas({ registro }: Props) {
  // Últimas 4 semanas: % cumplimiento promedio
  const semanas = useMemo(() => {
    const hoy = new Date();
    const lunesActual = lunesDeSemana(hoy);
    const data: { semana: string; pct: number }[] = [];

    for (let s = 3; s >= 0; s--) {
      const lunes = new Date(lunesActual);
      lunes.setDate(lunesActual.getDate() - s * 7);
      let suma = 0;
      let cuenta = 0;
      for (let d = 0; d < 5; d++) {
        const fecha = new Date(lunes);
        fecha.setDate(lunes.getDate() + d);
        const fechaStr = fechaISO(fecha);
        const rutinaDia = RUTINA.find((r) => r.diaSemana === d + 1);
        if (rutinaDia) {
          suma += porcentajeDia(
            registro,
            fechaStr,
            rutinaDia.ejercicios.length
          );
          cuenta++;
        }
      }
      const dia = lunes.getDate();
      const mes = lunes.toLocaleDateString("es", { month: "short" });
      data.push({
        semana: `${dia} ${mes}`,
        pct: cuenta > 0 ? Math.round(suma / cuenta) : 0,
      });
    }
    return data;
  }, [registro]);

  // % por día de la semana — para ver qué día se cumple más / menos
  const porDiaSemana = useMemo(() => {
    const totales: { [k: number]: { suma: number; cuenta: number } } = {};
    for (let d = 1; d <= 5; d++) totales[d] = { suma: 0, cuenta: 0 };

    Object.keys(registro).forEach((fecha) => {
      const d = new Date(fecha + "T00:00:00");
      const ds = diaDeLaSemana(d);
      if (ds > 5) return;
      const rutinaDia = RUTINA.find((r) => r.diaSemana === ds);
      if (!rutinaDia) return;
      const pct = porcentajeDia(registro, fecha, rutinaDia.ejercicios.length);
      totales[ds].suma += pct;
      totales[ds].cuenta++;
    });

    return [1, 2, 3, 4, 5].map((d) => {
      const t = totales[d];
      const nombres = ["", "Lun", "Mar", "Mié", "Jue", "Vie"];
      return {
        dia: nombres[d],
        pct: t.cuenta > 0 ? Math.round(t.suma / t.cuenta) : 0,
      };
    });
  }, [registro]);

  // Total de sesiones completadas (≥80%)
  const sesionesCompletas = useMemo(() => {
    return Object.entries(registro).filter(([fecha, eje]) => {
      const d = new Date(fecha + "T00:00:00");
      const ds = diaDeLaSemana(d);
      const rutinaDia = RUTINA.find((r) => r.diaSemana === ds);
      if (!rutinaDia) return false;
      const completados = Object.values(eje).filter(Boolean).length;
      return completados / rutinaDia.ejercicios.length >= 0.8;
    }).length;
  }, [registro]);

  // Total de checks individuales
  const totalChecks = useMemo(() => {
    let n = 0;
    Object.values(registro).forEach((d) => {
      n += Object.values(d).filter(Boolean).length;
    });
    return n;
  }, [registro]);

  return (
    <div className="space-y-10">
      {/* KPIs */}
      <div className="grid grid-cols-2 gap-px bg-line">
        <div className="bg-paper p-5">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted mb-2">
            Sesiones completas
          </p>
          <p className="font-display text-4xl font-medium">
            {sesionesCompletas}
          </p>
          <p className="font-mono text-[10px] text-muted mt-1">
            ≥ 80% del día
          </p>
        </div>
        <div className="bg-paper p-5">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted mb-2">
            Ejercicios totales
          </p>
          <p className="font-display text-4xl font-medium">{totalChecks}</p>
          <p className="font-mono text-[10px] text-muted mt-1">marcados</p>
        </div>
      </div>

      {/* Cumplimiento últimas 4 semanas */}
      <div>
        <div className="flex items-baseline justify-between border-b border-line pb-3 mb-4">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
            Cumplimiento · últimas 4 semanas
          </p>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={semanas}>
              <XAxis
                dataKey="semana"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b6357", fontSize: 10, fontFamily: "JetBrains Mono" }}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b6357", fontSize: 10, fontFamily: "JetBrains Mono" }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                cursor={{ fill: "rgba(200,75,49,0.06)" }}
                contentStyle={{
                  background: "#1a1814",
                  border: "none",
                  fontFamily: "JetBrains Mono",
                  fontSize: 11,
                  color: "#f5f1e8",
                }}
                labelStyle={{ color: "#f5f1e8" }}
                formatter={(v: number) => [`${v}%`, "Cumplimiento"]}
              />
              <Bar dataKey="pct" fill="#c84b31" radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* % por día de la semana */}
      <div>
        <div className="flex items-baseline justify-between border-b border-line pb-3 mb-4">
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-muted">
            Promedio por día de la semana
          </p>
        </div>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={porDiaSemana}>
              <XAxis
                dataKey="dia"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b6357", fontSize: 10, fontFamily: "JetBrains Mono" }}
              />
              <YAxis
                domain={[0, 100]}
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6b6357", fontSize: 10, fontFamily: "JetBrains Mono" }}
                tickFormatter={(v) => `${v}%`}
              />
              <Tooltip
                cursor={{ fill: "rgba(26,24,20,0.04)" }}
                contentStyle={{
                  background: "#1a1814",
                  border: "none",
                  fontFamily: "JetBrains Mono",
                  fontSize: 11,
                  color: "#f5f1e8",
                }}
                labelStyle={{ color: "#f5f1e8" }}
                formatter={(v: number) => [`${v}%`, "Promedio"]}
              />
              <Bar dataKey="pct" radius={[2, 2, 0, 0]}>
                {porDiaSemana.map((entry, idx) => (
                  <Cell
                    key={idx}
                    fill={entry.pct >= 80 ? "#c84b31" : entry.pct >= 50 ? "#1a1814" : "#6b6357"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <p className="font-mono text-[10px] text-muted mt-3">
          Días con menor cumplimiento aparecen más claros — revisa si hay
          patrón.
        </p>
      </div>
    </div>
  );
}
