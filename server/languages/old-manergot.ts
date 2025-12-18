import { fetchIPA } from "../helpers/unalengua";
import type { LanguageClass, Translation } from "../../types/translate";

export class OldManergot implements LanguageClass {
  public name = "Old Manergot";
  public key = "oldManergot";

  /**
   * Drastically evolved post-apocalyptic conlang generator
   * Based on your final approved word list + heavy phonological drift + randomness
   *
   * @param {string} germanWord - German input word (e.g. "Berg", "Gold", "Jäger")
   * @returns {Object} { german, germanIPA, conlang, conlangIPA, chaosLevel, notes }
   */
  public async translate(germanWord: string): Promise<Translation[]> {
    const word = germanWord.toLowerCase().trim();
    const chaos = 0; // temporary @todo implement incremental response

    const germanIPA = await fetchIPA(germanWord, "de");

    if (!germanIPA) {
      throw "Cannot get German IPA";
    }

    // === Step 2: Core systematic drift (your original conlang as base) ===
    let c = word;

    // Heavy vowel mutation (more extreme than before)
    const vowels: Record<string, string[]> = {
      a: ["ɑ", "æ", "a", "ɔ"],
      o: ["u", "o", "ɔ", "ʊ"],
      u: ["u", "y", "ʉ"],
      e: ["ɛ", "e", "i", "ɪ"],
      i: ["i", "ɪ", "j"],
      ä: ["ɛ", "e"],
      ö: ["ø", "œ"],
      ü: ["y", "ʏ"],
    };

    c = c
      .split("")
      .map((char) => {
        if (vowels[char]) {
          const pool = vowels[char];
          return this._randChoice(pool, chaos);
        }
        return char;
      })
      .join("");

    // Diphthong explosion
    if (Math.random() < chaos * 0.8) {
      c = c.replace(/[aeiouy]/g, (m) =>
        this._randChoice(["ai", "au", "oi", "ei", "ou", "ui", m], chaos * 0.7)
      );
    }

    // === Step 3: Consonant chaos (lenition, aspiration, deletion, metathesis) ===
    if (chaos > 0.3) {
      c = c
        .replace(/b/g, this._randChoice(["b", "v", "β", ""], chaos))
        .replace(/d/g, this._randChoice(["d", "ð", "r", "l"], chaos))
        .replace(/g/g, this._randChoice(["g", "ɣ", "j", "∅"], chaos))
        .replace(/p/g, this._randChoice(["p", "f", "h", "∅"], chaos))
        .replace(/t/g, this._randChoice(["t", "s", "θ", "∅"], chaos))
        .replace(/k/g, this._randChoice(["k", "x", "h", "∅"], chaos))
        .replace(/f/g, this._randChoice(["f", "h", "v"], chaos))
        .replace(/s/g, this._randChoice(["s", "ʃ", "h", "∅"], chaos))
        .replace(/ʃ/g, this._randChoice(["ʃ", "ç", "x"], chaos))
        .replace(/x/g, this._randChoice(["x", "h", "k"], chaos))
        .replace(/ʁ/g, this._randChoice(["r", "ʀ", "h", "∅", "l"], chaos));
    }

    // Random metathesis (swap adjacent sounds)
    if (Math.random() < chaos * 0.6 && c.length > 2) {
      const i = Math.floor(Math.random() * (c.length - 1));
      c = c.substring(0, i) + c[i + 1] + c[i] + c.substring(i + 2);
    }

    // Nasal assimilation or loss
    if (Math.random() < chaos * 0.5) {
      c = c
        .replace(/n[kg]/g, "ŋ")
        .replace(/n/g, this._randChoice(["n", "m", "ŋ", ""], chaos));
    }

    // Final consonant drop or epenthesis
    if (Math.random() < chaos * 0.7) {
      if (c.match(/[bcdfghjklmnpqrstvwxz]$/)) {
        c =
          c.slice(0, -1) +
          this._randChoice(["", "a", "e", "i", "o", "h", "n"], chaos);
      }
    }

    // Random vowel insertion (echo vowel)
    if (Math.random() < chaos * 0.4) {
      const pos = Math.floor(Math.random() * c.length);
      const echo = c[pos - 1] || "a";
      c = c.substring(0, pos) + echo + c.substring(pos);
    }

    // Final flourish: occasional prefix/suffix for mythic feel
    if (Math.random() < chaos * 0.3) {
      const prefixes = ["ka", "ta", "va", "ne", "si", "lu", "zo"];
      const suffixes = ["n", "th", "s", "k", "m", "l", "x"];
      c =
        this._randChoice(prefixes, chaos) +
        c +
        this._randChoice(suffixes, chaos);
    }

    // Clean up impossible clusters
    c = c.replace(
      /[^aeiouyrlmnŋŋbdgvθðʃçxzfhjptks][^aeiouyrlmnŋbdgvθðʃçxzfhjptks]/g,
      (m) => m[0] + this._randChoice(["a", "e", "i"], 0.5) + m[1]
    );

    // === Final IPA approximation ===
    const finalIPA = c
      .replace(/ai/g, "aɪ")
      .replace(/au/g, "aʊ")
      .replace(/oi/g, "ɔɪ")
      .replace(/ei/g, "eɪ")
      .replace(/ou/g, "oʊ")
      .replace(/ui/g, "uɪ");

    const conlangIPA = "/" + finalIPA + "/";
    const conlangWritten = c.charAt(0).toUpperCase() + c.slice(1);

    return [
      {
        rootText: germanWord,
        rootTextIPA: germanIPA,
        translatedText: conlangWritten,
        translatedTextIPA: conlangIPA,
        chaos,
      },
    ];
  }

  // Helper: weighted random choice
  private _randChoice(arr: string[], weight: number) {
    if (Math.random() < weight) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    return arr[0];
  }
}
