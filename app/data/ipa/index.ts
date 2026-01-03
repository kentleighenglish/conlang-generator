import type { IPAConsonant, IPAVowel } from "./_all";
export * as en from "./en";
export * as de from "./de";
export * as all from "./_all";

export type IPALanguage = {
  vowels: IPAVowel[],
  consonants: IPAConsonant[],
  stresses: string[],
  syllabifications: string[],
}