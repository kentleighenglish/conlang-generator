
export type OldManergotResponse = {
  german: string;
  germanIPA: string;
  conlang: string;
  conlangIPA: string;
  chaosLevel: string;
}

/**
 * Drastically evolved post-apocalyptic conlang generator
 * Based on your final approved word list + heavy phonological drift + randomness
 *
 * @param {string} germanWord - German input word (e.g. "Berg", "Gold", "Jäger")
 * @param {number} [chaos=0.6] - 0.0 (mild drift) → 1.0 (total alien chaos)
 * @returns {Object} { german, germanIPA, conlang, conlangIPA, chaosLevel, notes }
 */
export default function (germanWord: string, chaos: number = 0.6): OldManergotResponse {
  let word = germanWord.toLowerCase().trim();

  // Normalize German spelling quirks
  word = word
    .replace(/ä/g, 'ae')
    .replace(/ö/g, 'oe')
    .replace(/ü/g, 'ue')
    .replace(/ß/g, 'ss')
    .replace(/ph/g, 'f')
    .replace(/pf/g, 'f')
    .replace(/qu/g, 'kv');

  // === Step 1: Rough German → IPA approximation ===
  let ipa = word;
  ipa = ipa
    .replace(/sch/g, 'ʃ')
    .replace(/ch/g, 'x')
    .replace(/pf/g, 'f')
    .replace(/ng/g, 'ŋ')
    .replace(/r/g, 'ʁ')
    .replace(/aː/g, 'a')
    .replace(/oː/g, 'o')
    .replace(/uː/g, 'u')
    .replace(/eː/g, 'e')
    .replace(/iː/g, 'i')
    .replace(/yː/g, 'y')
    .replace(/øː/g, 'ø')
    .replace(/au/g, 'aʊ')
    .replace(/ai/g, 'aɪ')
    .replace(/ei/g, 'aɪ')
    .replace(/eu/g, 'ɔʏ')
    .replace(/er$/g, 'ɐ')
    .replace(/en$/g, 'ən');

  const germanIPA = '/' + ipa.replace(/[^a-zɑɔɛɪʊɔʏaɪaʊʃçxʁŋ]/g, '') + '/';

  // === Step 2: Core systematic drift (your original conlang as base) ===
  let c = word;

  // Heavy vowel mutation (more extreme than before)
  const vowels: Record<string, string[]> = {
    'a': ['ɑ', 'æ', 'a', 'ɔ'],
    'o': ['u', 'o', 'ɔ', 'ʊ'],
    'u': ['u', 'y', 'ʉ'],
    'e': ['ɛ', 'e', 'i', 'ɪ'],
    'i': ['i', 'ɪ', 'j'],
    'ä': ['ɛ', 'e'],
    'ö': ['ø', 'œ'],
    'ü': ['y', 'ʏ']
  };

  c = c.split('').map(char => {
    if (vowels[char]) {
      const pool = vowels[char];
      return randChoice(pool, chaos);
    }
    return char;
  }).join('');

  // Diphthong explosion
  if (Math.random() < chaos * 0.8) {
    c = c.replace(/[aeiouy]/g, m => randChoice(['ai', 'au', 'oi', 'ei', 'ou', 'ui', m], chaos * 0.7));
  }

  // === Step 3: Consonant chaos (lenition, aspiration, deletion, metathesis) ===
  if (chaos > 0.3) {
    c = c
      .replace(/b/g, randChoice(['b', 'v', 'β', ''], chaos))
      .replace(/d/g, randChoice(['d', 'ð', 'r', 'l'], chaos))
      .replace(/g/g, randChoice(['g', 'ɣ', 'j', '∅'], chaos))
      .replace(/p/g, randChoice(['p', 'f', 'h', '∅'], chaos))
      .replace(/t/g, randChoice(['t', 's', 'θ', '∅'], chaos))
      .replace(/k/g, randChoice(['k', 'x', 'h', '∅'], chaos))
      .replace(/f/g, randChoice(['f', 'h', 'v'], chaos))
      .replace(/s/g, randChoice(['s', 'ʃ', 'h', '∅'], chaos))
      .replace(/ʃ/g, randChoice(['ʃ', 'ç', 'x'], chaos))
      .replace(/x/g, randChoice(['x', 'h', 'k'], chaos))
      .replace(/ʁ/g, randChoice(['r', 'ʀ', 'h', '∅', 'l'], chaos));
  }

  // Random metathesis (swap adjacent sounds)
  if (Math.random() < chaos * 0.6 && c.length > 2) {
    const i = Math.floor(Math.random() * (c.length - 1));
    c = c.substring(0, i) + c[i+1] + c[i] + c.substring(i+2);
  }

  // Nasal assimilation or loss
  if (Math.random() < chaos * 0.5) {
    c = c.replace(/n[kg]/g, 'ŋ').replace(/n/g, randChoice(['n', 'm', 'ŋ', ''], chaos));
  }

  // Final consonant drop or epenthesis
  if (Math.random() < chaos * 0.7) {
    if (c.match(/[bcdfghjklmnpqrstvwxz]$/)) {
      c = c.slice(0, -1) + randChoice(['', 'a', 'e', 'i', 'o', 'h', 'n'], chaos);
    }
  }

  // Random vowel insertion (echo vowel)
  if (Math.random() < chaos * 0.4) {
    const pos = Math.floor(Math.random() * c.length);
    const echo = c[pos - 1] || 'a';
    c = c.substring(0, pos) + echo + c.substring(pos);
  }

  // Final flourish: occasional prefix/suffix for mythic feel
  if (Math.random() < chaos * 0.3) {
    const prefixes = ['ka', 'ta', 'va', 'ne', 'si', 'lu', 'zo'];
    const suffixes = ['n', 'th', 's', 'k', 'm', 'l', 'x'];
    c = randChoice(prefixes, chaos) + c + randChoice(suffixes, chaos);
  }

  // Clean up impossible clusters
  c = c.replace(/[^aeiouyrlmnŋŋbdgvθðʃçxzfhjptks][^aeiouyrlmnŋbdgvθðʃçxzfhjptks]/g, m =>
    m[0] + randChoice(['a','e','i'], 0.5) + m[1]
  );

  // === Final IPA approximation ===
  const finalIPA = c
    .replace(/ai/g, 'aɪ')
    .replace(/au/g, 'aʊ')
    .replace(/oi/g, 'ɔɪ')
    .replace(/ei/g, 'eɪ')
    .replace(/ou/g, 'oʊ')
    .replace(/ui/g, 'uɪ');

  const conlangIPA = '/' + finalIPA + '/';
  const conlangWritten = c.charAt(0).toUpperCase() + c.slice(1);

  return {
    german: germanWord,
    germanIPA,
    conlang: conlangWritten,
    conlangIPA,
    chaosLevel: chaos.toFixed(2),
  };

  // Helper: weighted random choice
  function randChoice(arr: string[], weight: number) {
    if (Math.random() < weight) {
      return arr[Math.floor(Math.random() * arr.length)];
    }
    return arr[0];
  }
}
