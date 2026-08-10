"use client";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Tabs } from "@/components/ui/tabs";
import type { KundliReport, Planet } from "@/types";
import { DoshaBadge } from "./dosha-badge";
import { Calendar, Compass, Info, Moon, Sparkles, Sun } from "lucide-react";
import { useState } from "react";

interface ChartWheelProps {
  report: KundliReport;
  personName?: string;
}

export function ChartWheel({ report, personName = "Arjun Mehta" }: ChartWheelProps) {
  const [activeTab, setActiveTab] = useState("chart");
  const { chart } = report;

  // Traditional 12 House placements helper for diamond layout
  const housePlanets: Record<number, Planet[]> = {};
  for (let i = 1; i <= 12; i++) {
    housePlanets[i] = chart.planets.filter((p) => p.house === i);
  }

  return (
    <div className="space-y-6">
      {/* ── Summary Header Bar ──────────────────────────────────── */}
      <Card className="p-6 bg-gradient-to-r from-primary via-primary-light to-primary text-white border-0 shadow-md">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/10 text-accent text-xs font-medium backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Vedic Kundli Report</span>
            </div>
            <h2 className="font-display text-2xl md:text-3xl font-bold">
              Birth Chart for {personName}
            </h2>
            <p className="text-xs text-white/80">
              Computed via Swiss Ephemeris Adapter • {new Date(report.computedAt).toLocaleDateString("en-IN")}
            </p>
          </div>

          {/* Core Signs Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
              <span className="text-white/60 block text-[10px]">Ascendant (Lagna)</span>
              <span className="font-bold text-accent">{chart.ascendant}</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
              <span className="text-white/60 block text-[10px]">Moon Sign (Rashi)</span>
              <span className="font-bold text-white flex items-center justify-center gap-1">
                <Moon className="h-3 w-3 text-blue-300" /> {chart.moonSign}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
              <span className="text-white/60 block text-[10px]">Sun Sign</span>
              <span className="font-bold text-white flex items-center justify-center gap-1">
                <Sun className="h-3 w-3 text-amber-300" /> {chart.sunSign}
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-sm">
              <span className="text-white/60 block text-[10px]">Nakshatra</span>
              <span className="font-bold text-accent">{chart.nakshatra}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* ── Interactive Tab View ───────────────────────────────── */}
      <div className="space-y-4">
        <Tabs
          tabs={[
            { id: "chart", label: "Lagna Kundli Chart", icon: <Compass className="h-4 w-4" /> },
            { id: "planets", label: "Planetary Positions", icon: <Sun className="h-4 w-4" /> },
            { id: "dashas", label: "Dasha Timeline", icon: <Calendar className="h-4 w-4" /> },
            { id: "doshas", label: "Dosha Analysis", icon: <Sparkles className="h-4 w-4" /> },
          ]}
          defaultTab="chart"
          onChange={setActiveTab}
        />

        {/* Tab 1: Lagna Chart (Stylized Traditional Diamond Layout) */}
        {activeTab === "chart" && (
          <Card className="p-6 space-y-6">
            <div className="text-center space-y-1">
              <h3 className="font-bold text-base text-text-primary dark:text-text-primary-dark">
                North Indian Style Birth Chart (Lagna Kundli)
              </h3>
              <p className="text-xs text-text-muted dark:text-text-muted-dark">
                House 1 is Lagna ({chart.ascendant}). House numbers run counter-clockwise.
              </p>
            </div>

            {/* Diamond Chart Graphic Representation */}
            <div className="max-w-md mx-auto aspect-square relative border-2 border-primary/40 dark:border-primary-light/50 bg-primary/5 dark:bg-primary-light/5 rounded-2xl p-4 flex items-center justify-center shadow-inner">
              {/* Inner Diamond Lines (SVG overlay for North Indian chart grid) */}
              <svg className="absolute inset-0 w-full h-full text-primary/30 dark:text-primary-light/30 pointer-events-none" viewBox="0 0 100 100">
                <line x1="0" y1="0" x2="100" y2="100" stroke="currentColor" strokeWidth="0.75" />
                <line x1="100" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="0.75" />
                <polygon points="50,0 100,50 50,100 0,50" fill="none" stroke="currentColor" strokeWidth="0.75" />
              </svg>

              {/* House 1 (Top Center Diamond) */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2 text-center space-y-0.5">
                <span className="text-[10px] font-bold text-accent block">H1 (Lagna)</span>
                <div className="flex flex-wrap justify-center gap-1 text-[11px] font-semibold text-text-primary dark:text-text-primary-dark">
                  {housePlanets[1]?.map((p) => p.name).join(", ") || "Me, Su"}
                </div>
              </div>

              {/* House 2 (Top Left) */}
              <div className="absolute top-6 left-6 text-center">
                <span className="text-[9px] text-text-muted dark:text-text-muted-dark block">H2</span>
                <span className="text-[11px] font-semibold text-text-primary dark:text-text-primary-dark">
                  {housePlanets[2]?.map((p) => p.name).join(", ") || "Su, Ra"}
                </span>
              </div>

              {/* House 3 (Left Top) */}
              <div className="absolute top-20 left-4 text-center">
                <span className="text-[9px] text-text-muted dark:text-text-muted-dark block">H3</span>
                <span className="text-[11px] font-semibold text-text-primary dark:text-text-primary-dark">
                  {housePlanets[3]?.map((p) => p.name).join(", ") || "Ve"}
                </span>
              </div>

              {/* House 4 (Center Left) */}
              <div className="absolute top-1/2 left-8 -translate-y-1/2 text-center">
                <span className="text-[9px] font-bold text-accent block">H4</span>
                <span className="text-[11px] font-semibold text-text-primary dark:text-text-primary-dark">
                  {housePlanets[4]?.map((p) => p.name).join(", ") || "—"}
                </span>
              </div>

              {/* House 9 (Center Right) */}
              <div className="absolute top-1/2 right-8 -translate-y-1/2 text-center">
                <span className="text-[9px] font-bold text-accent block">H9</span>
                <span className="text-[11px] font-semibold text-text-primary dark:text-text-primary-dark">
                  {housePlanets[9]?.map((p) => p.name).join(", ") || "Mo"}
                </span>
              </div>

              {/* House 10 (Bottom Center) */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center space-y-0.5">
                <span className="text-[10px] font-bold text-accent block">H10</span>
                <span className="text-[11px] font-semibold text-text-primary dark:text-text-primary-dark">
                  {housePlanets[10]?.map((p) => p.name).join(", ") || "Ju"}
                </span>
              </div>

              {/* House 12 (Top Right) */}
              <div className="absolute top-6 right-6 text-center">
                <span className="text-[9px] text-text-muted dark:text-text-muted-dark block">H12</span>
                <span className="text-[11px] font-semibold text-text-primary dark:text-text-primary-dark">
                  {housePlanets[12]?.map((p) => p.name).join(", ") || "Sa(R)"}
                </span>
              </div>

              {/* Center Lagna Indicator */}
              <div className="text-center bg-surface dark:bg-surface-dark border border-accent/40 rounded-full px-3 py-1.5 shadow-sm z-10">
                <span className="text-[11px] font-bold text-primary dark:text-primary-light block">
                  {chart.ascendant}
                </span>
                <span className="text-[9px] text-accent block font-medium">Lagna</span>
              </div>
            </div>
          </Card>
        )}

        {/* Tab 2: Planetary Positions Table */}
        {activeTab === "planets" && (
          <Card className="p-6 space-y-4 overflow-x-auto">
            <h3 className="font-bold text-base text-text-primary dark:text-text-primary-dark">
              Planetary Positions & Degrees
            </h3>
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-black/10 dark:border-white/10 text-text-muted dark:text-text-muted-dark font-medium">
                  <th className="pb-2">Planet</th>
                  <th className="pb-2">Zodiac Sign</th>
                  <th className="pb-2">House</th>
                  <th className="pb-2">Degree</th>
                  <th className="pb-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5 dark:divide-white/5">
                {chart.planets.map((planet) => (
                  <tr key={planet.name} className="hover:bg-black/2 dark:hover:bg-white/2">
                    <td className="py-2.5 font-bold text-text-primary dark:text-text-primary-dark">
                      {planet.name}
                    </td>
                    <td className="py-2.5 text-text-muted dark:text-text-muted-dark">{planet.sign}</td>
                    <td className="py-2.5 font-semibold text-primary dark:text-primary-light">House {planet.house}</td>
                    <td className="py-2.5 text-text-muted dark:text-text-muted-dark">{planet.degree.toFixed(1)}°</td>
                    <td className="py-2.5">
                      {planet.retrograde ? (
                        <Badge variant="warning">Retrograde (R)</Badge>
                      ) : (
                        <Badge variant="success">Direct</Badge>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}

        {/* Tab 3: Dasha Timeline */}
        {activeTab === "dashas" && (
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-base text-text-primary dark:text-text-primary-dark">
              Vimshottari Dasha Periods
            </h3>
            <div className="space-y-3">
              {chart.dashas.map((dasha, idx) => (
                <div
                  key={dasha.planet}
                  className={`p-3.5 rounded-xl border flex items-center justify-between gap-4 ${
                    idx === 0
                      ? "bg-primary/10 border-primary text-primary dark:bg-primary-light/20 dark:border-primary-light dark:text-primary-light font-semibold"
                      : "bg-black/3 dark:bg-white/3 border-black/5 dark:border-white/5 text-text-muted dark:text-text-muted-dark"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm font-bold">{dasha.planet} Mahadasha</span>
                    {idx === 0 && <Badge variant="accent">Active Now</Badge>}
                  </div>
                  <span className="text-xs">
                    {new Date(dasha.start).getFullYear()} — {new Date(dasha.end).getFullYear()}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Tab 4: Dosha Analysis */}
        {activeTab === "doshas" && (
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-base text-text-primary dark:text-text-primary-dark">
              Kundli Dosha Indicators
            </h3>
            <div className="space-y-3">
              <DoshaBadge
                name="Manglik Dosha (Kuja Dosha)"
                isPresent={chart.doshas.manglik}
                description={
                  chart.doshas.manglik
                    ? "Mars placed in 1st, 4th, 7th, 8th or 12th house. Match with Manglik partner recommended."
                    : "Mars is favorably placed in your chart. No Manglik Dosha present."
                }
              />
              <DoshaBadge
                name="Kalsarpa Dosha"
                isPresent={chart.doshas.kalsarpa}
                description={
                  chart.doshas.kalsarpa
                    ? "All planets hemmed between Rahu and Ketu axis."
                    : "No Kalsarpa Dosha present in birth chart."
                }
              />
              <DoshaBadge
                name="Pitru Dosha"
                isPresent={chart.doshas.pitruDosha}
                description={
                  chart.doshas.pitruDosha
                    ? "Affliction to 9th house or Sun. Simple remedies suggested."
                    : "9th house is clear of malefic influence."
                }
              />
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
