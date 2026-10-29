"use client";

import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/**
 * The current year. The page is prerendered, so the server value is the build
 * year; in the browser it is replaced with the visitor's year, so the
 * copyright line stays right without a rebuild every January.
 */
export function CurrentYear({ buildYear }: { buildYear: number }) {
  const year = useSyncExternalStore(
    subscribe,
    () => new Date().getFullYear(),
    () => buildYear,
  );
  return <>{year}</>;
}
