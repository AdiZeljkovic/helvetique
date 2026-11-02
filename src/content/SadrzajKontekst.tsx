"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Sadrzaj } from "./cms";

/**
 * Isti sadržaj koji serverske komponente dobiju iz `getSadrzaj()`, za klijentske
 * (meni, obrazac, interaktivne sekcije). Layout ga postavlja jednom za cijelu stranicu.
 */
const Kontekst = createContext<Sadrzaj | null>(null);

export function SadrzajProvider({ value, children }: { value: Sadrzaj; children: ReactNode }) {
  return <Kontekst.Provider value={value}>{children}</Kontekst.Provider>;
}

export function useSadrzaj(): Sadrzaj {
  const v = useContext(Kontekst);
  if (!v) throw new Error("useSadrzaj: nema SadrzajProvider u layoutu");
  return v;
}
