
enum VowelTonguePosition {
  "front",
  "nearFront",
  "central",
  "nearBack",
  "back",
}
enum VowelTongueHeight {
  "close",
  "nearClose",
  "closeMid",
  "mid",
  "openMid",
  "nearOpen",
  "open",
}
type IPAVowel = {
  ligature: string;
  tonguePos: VowelTonguePosition;
  tongueHeight: VowelTongueHeight;
  rounded: boolean | null,
};

// https://en.wikipedia.org/wiki/Vowel
export const vowels: IPAVowel[] = [
  {
    ligature: "i",
    tonguePos: VowelTonguePosition.front,
    tongueHeight: VowelTongueHeight.close,
    rounded: false,
  },
  {
    ligature: "y",
    tonguePos: VowelTonguePosition.front,
    tongueHeight: VowelTongueHeight.close,
    rounded: true,
  },
  {
    ligature: "ɨ",
    tonguePos: VowelTonguePosition.central,
    tongueHeight: VowelTongueHeight.close,
    rounded: false,
  },
  {
    ligature: "ʉ",
    tonguePos: VowelTonguePosition.central,
    tongueHeight: VowelTongueHeight.close,
    rounded: true,
  },
  {
    ligature: "ɯ",
    tonguePos: VowelTonguePosition.back,
    tongueHeight: VowelTongueHeight.close,
    rounded: false,
  },
  {
    ligature: "u",
    tonguePos: VowelTonguePosition.back,
    tongueHeight: VowelTongueHeight.close,
    rounded: false,
  },
  {
    ligature: "ɪ",
    tonguePos: VowelTonguePosition.nearFront,
    tongueHeight: VowelTongueHeight.nearClose,
    rounded: false,
  },
  {
    ligature: "ʏ",
    tonguePos: VowelTonguePosition.nearFront,
    tongueHeight: VowelTongueHeight.nearClose,
    rounded: true,
  },
  {
    ligature: "ʊ",
    tonguePos: VowelTonguePosition.front,
    tongueHeight: VowelTongueHeight.nearClose,
    rounded: true,
  },
  {
    ligature: "e",
    tonguePos: VowelTonguePosition.front,
    tongueHeight: VowelTongueHeight.closeMid,
    rounded: false,
  },
  {
    ligature: "ø",
    tonguePos: VowelTonguePosition.front,
    tongueHeight: VowelTongueHeight.closeMid,
    rounded: true,
  },
  {
    ligature: "ɘ",
    tonguePos: VowelTonguePosition.central,
    tongueHeight: VowelTongueHeight.closeMid,
    rounded: false,
  },
  {
    ligature: "ɵ",
    tonguePos: VowelTonguePosition.central,
    tongueHeight: VowelTongueHeight.closeMid,
    rounded: true,
  },
  {
    ligature: "ɤ",
    tonguePos: VowelTonguePosition.back,
    tongueHeight: VowelTongueHeight.closeMid,
    rounded: false,
  },
  {
    ligature: "o",
    tonguePos: VowelTonguePosition.back,
    tongueHeight: VowelTongueHeight.closeMid,
    rounded: true,
  },
  {
    ligature: "e̞",
    tonguePos: VowelTonguePosition.front,
    tongueHeight: VowelTongueHeight.mid,
    rounded: false,
  },
  {
    ligature: "ø̞",
    tonguePos: VowelTonguePosition.front,
    tongueHeight: VowelTongueHeight.mid,
    rounded: true,
  },
  {
    ligature: "ə",
    tonguePos: VowelTonguePosition.central,
    tongueHeight: VowelTongueHeight.mid,
    rounded: null,
  },
  {
    ligature: "ɤ̞",
    tonguePos: VowelTonguePosition.back,
    tongueHeight: VowelTongueHeight.mid,
    rounded: false,
  },
  {
    ligature: "o̞",
    tonguePos: VowelTonguePosition.back,
    tongueHeight: VowelTongueHeight.mid,
    rounded: true,
  },
  {
    ligature: "ɛ",
    tonguePos: VowelTonguePosition.front,
    tongueHeight: VowelTongueHeight.openMid,
    rounded: false,
  },
  {
    ligature: "œ",
    tonguePos: VowelTonguePosition.front,
    tongueHeight: VowelTongueHeight.openMid,
    rounded: true,
  },
  {
    ligature: "ɜ",
    tonguePos: VowelTonguePosition.central,
    tongueHeight: VowelTongueHeight.openMid,
    rounded: false,
  },
  {
    ligature: "ɞ",
    tonguePos: VowelTonguePosition.central,
    tongueHeight: VowelTongueHeight.openMid,
    rounded: true,
  },
  {
    ligature: "ʌ",
    tonguePos: VowelTonguePosition.back,
    tongueHeight: VowelTongueHeight.openMid,
    rounded: false,
  },
  {
    ligature: "ɔ",
    tonguePos: VowelTonguePosition.back,
    tongueHeight: VowelTongueHeight.openMid,
    rounded: true,
  },
  {
    ligature: "æ",
    tonguePos: VowelTonguePosition.front,
    tongueHeight: VowelTongueHeight.nearOpen,
    rounded: false,
  },
  {
    ligature: "ɐ",
    tonguePos: VowelTonguePosition.central,
    tongueHeight: VowelTongueHeight.nearOpen,
    rounded: null,
  },
  {
    ligature: "a",
    tonguePos: VowelTonguePosition.front,
    tongueHeight: VowelTongueHeight.open,
    rounded: false,
  },
  {
    ligature: "ɶ",
    tonguePos: VowelTonguePosition.front,
    tongueHeight: VowelTongueHeight.open, // technically nearOpen
    rounded: true,
  },
  {
    ligature: "ä",
    tonguePos: VowelTonguePosition.central,
    tongueHeight: VowelTongueHeight.open,
    rounded: false,
  },
  {
    ligature: "ɑ",
    tonguePos: VowelTonguePosition.back,
    tongueHeight: VowelTongueHeight.open,
    rounded: false,
  },
  {
    ligature: "ɒ",
    tonguePos: VowelTonguePosition.back,
    tongueHeight: VowelTongueHeight.open,
    rounded: true,
  },
];

enum ConsonantPlace {
  "bilabial",
  "labioDental",
  "linguoLabial",
  "dental",
  "alveolar",
  "postAlveolar",
  "retroFlex",
  "palatal",
  "velar",
  "pharyngeal",
  "glottal",
  "uvular",
  "labialAlveolar",
  "labialRetroflex",
  "labialVelar",
  "labializedPalatal",
  "labializedVelar",
  "labialUvular",
  "uvularEpiglottal",
  "sjSound",
  "velarizedAlveolar",
}
enum ConsonantManner {
  "nasal",
  "plosive",
  "sibilantAffricate",
  "nonSibilantAffricate",
  "sibilantFricative",
  "nonSibilantFricative",
  "approximant",
  "flap",
  "trill",
  "lateralAffricative",
  "lateralFricative",
  "lateralApproximant",
  "lateralFlap",
  "implosive",
  "implosiveVoiced",
  "implosiveVoiceless",
  "ejective",
  "ejectiveStop",
  "ejectiveAffricate",
  "ejectiveFricative",
  "ejectiveLateralAffricate",
  "ejectiveLateralFricative",
  "clickTenuisVelar",
  "clickTenuisUvular",
  "clickVoicedVelar",
  "clickVoicedUvular",
  "clickNasalVelar",
  "clickNasalUvular",
  "clickTenuisLateralVelar",
  "clickTenuisLateralUvular",
  "clickVoicedLateralVelar",
  "clickVoicedLateralUvular",
  "clickNasalLateralVelar",
  "clickNasalLateralUvular",
}
type IPABaseConsonant = {
  ligature: string;
  voiced: boolean;
}

type IPAPulmonicConsonant = IPABaseConsonant & {
  place: ConsonantPlace.bilabial | ConsonantPlace.labioDental | ConsonantPlace.linguoLabial | ConsonantPlace.dental | ConsonantPlace.alveolar | ConsonantPlace.postAlveolar | ConsonantPlace.retroFlex | ConsonantPlace.palatal | ConsonantPlace.velar | ConsonantPlace.uvular | ConsonantPlace.pharyngeal | ConsonantPlace.glottal;
  manner: ConsonantManner.nasal | ConsonantManner.plosive | ConsonantManner.sibilantAffricate | ConsonantManner.nonSibilantAffricate | ConsonantManner.sibilantFricative | ConsonantManner.nonSibilantFricative | ConsonantManner.approximant | ConsonantManner.flap | ConsonantManner.trill | ConsonantManner.lateralAffricative | ConsonantManner.lateralFricative | ConsonantManner.lateralApproximant | ConsonantManner.lateralFlap;
}

// type IPANonPulmonicConsonant = IPABaseConsonant & {
//   pulmonic: true;
//   place: ConsonantPlace.bilabial | ConsonantPlace.labioDental | ConsonantPlace.dental | ConsonantPlace.alveolar | ConsonantPlace.postAlveolar | ConsonantPlace.retroFlex | ConsonantPlace.palatal | ConsonantPlace.velar | ConsonantPlace.uvular;
//   manner: ConsonantManner.implosiveVoiced | ConsonantManner.implosiveVoiceless | ConsonantManner.ejectiveStop | ConsonantManner.ejectiveAffricate | ConsonantManner.ejectiveFricative | ConsonantManner.ejectiveLateralAffricate | ConsonantManner.ejectiveLateralFricative | ConsonantManner.clickTenuisVelar | ConsonantManner.clickTenuisUvular | ConsonantManner.clickVoicedVelar | ConsonantManner.clickVoicedUvular | ConsonantManner.clickNasalVelar | ConsonantManner.clickNasalUvular | ConsonantManner.clickTenuisLateralVelar | ConsonantManner.clickTenuisLateralUvular | ConsonantManner.clickVoicedLateralVelar | ConsonantManner.clickVoicedLateralUvular | ConsonantManner.clickNasalLateralVelar | ConsonantManner.clickNasalLateralUvular;
// }

// type IPACoarticulatedConsonant = IPABaseConsonant & {
//   coArticulated: true;
//   place: ConsonantPlace.labialAlveolar | ConsonantPlace.labialRetroflex | ConsonantPlace.labialVelar | ConsonantPlace.uvularEpiglottal | ConsonantPlace.labialUvular | ConsonantPlace.labializedPalatal | ConsonantPlace.labializedVelar | ConsonantPlace.sjSound | ConsonantPlace.velarizedAlveolar;
//   manner: ConsonantManner.nasal | ConsonantManner.plosive | ConsonantManner.approximant | ConsonantManner.lateralApproximant | ConsonantManner.implosive | ConsonantManner.ejective;
// }

type IPAConsonant = IPAPulmonicConsonant;


export const consonants: IPAConsonant[] = [
  {
    ligature: "m̥",
    place: ConsonantPlace.bilabial,
    manner: ConsonantManner.nasal,
    voiced: false,
  },
  {
    ligature: "m",
    place: ConsonantPlace.bilabial,
    manner: ConsonantManner.nasal,
    voiced: true,
  },
  {
    ligature: "ɱ̊",
    place: ConsonantPlace.labioDental,
    manner: ConsonantManner.nasal,
    voiced: false,
  },
  {
    ligature: "ɱ",
    place: ConsonantPlace.labioDental,
    manner: ConsonantManner.nasal,
    voiced: true,
  },
  {
    ligature: "n̼",
    place: ConsonantPlace.linguoLabial,
    manner: ConsonantManner.nasal,
    voiced: true,
  },
  {
    ligature: "n̪̊",
    place: ConsonantPlace.dental,
    manner: ConsonantManner.nasal,
    voiced: false,
  },
  {
    ligature: "n̪",
    place: ConsonantPlace.dental,
    manner: ConsonantManner.nasal,
    voiced: true,
  },
  {
    ligature: "n̥",
    place: ConsonantPlace.alveolar,
    manner: ConsonantManner.nasal,
    voiced: false,
  },
  {
    ligature: "n",
    place: ConsonantPlace.alveolar,
    manner: ConsonantManner.nasal,
    voiced: true,
  },
  {
    ligature: "n̠̊",
    place: ConsonantPlace.postAlveolar,
    manner: ConsonantManner.nasal,
    voiced: false,
  },
  {
    ligature: "n̠",
    place: ConsonantPlace.postAlveolar,
    manner: ConsonantManner.nasal,
    voiced: true,
  },
  {
    ligature: "ɳ̊",
    place: ConsonantPlace.retroFlex,
    manner: ConsonantManner.nasal,
    voiced: false,
  },
  {
    ligature: "ɳ",
    place: ConsonantPlace.retroFlex,
    manner: ConsonantManner.nasal,
    voiced: true,
  },
  {
    ligature: "ɲ̊",
    place: ConsonantPlace.palatal,
    manner: ConsonantManner.nasal,
    voiced: false,
  },
  {
    ligature: "ɲ",
    place: ConsonantPlace.palatal,
    manner: ConsonantManner.nasal,
    voiced: true,
  },
  {
    ligature: "ŋ̊",
    place: ConsonantPlace.velar,
    manner: ConsonantManner.nasal,
    voiced: false,
  },
  {
    ligature: "ŋ",
    place: ConsonantPlace.velar,
    manner: ConsonantManner.nasal,
    voiced: true,
  },
  {
    ligature: "ɴ̥",
    place: ConsonantPlace.uvular,
    manner: ConsonantManner.nasal,
    voiced: false,
  },
  {
    ligature: "ɴ",
    place: ConsonantPlace.uvular,
    manner: ConsonantManner.nasal,
    voiced: true,
  },
  // PLOSIVES
  {
    ligature: "p",
    place: ConsonantPlace.bilabial,
    manner: ConsonantManner.plosive,
    voiced: false,
  },
  {
    ligature: "b",
    place: ConsonantPlace.bilabial,
    manner: ConsonantManner.plosive,
    voiced: true,
  },
  {
    ligature: "p̪",
    place: ConsonantPlace.labioDental,
    manner: ConsonantManner.plosive,
    voiced: false,
  },
  {
    ligature: "b̪",
    place: ConsonantPlace.labioDental,
    manner: ConsonantManner.plosive,
    voiced: true,
  },
  {
    ligature: "t̼",
    place: ConsonantPlace.linguoLabial,
    manner: ConsonantManner.plosive,
    voiced: false,
  },
  {
    ligature: "d̼",
    place: ConsonantPlace.linguoLabial,
    manner: ConsonantManner.plosive,
    voiced: true,
  },
  {
    ligature: "t̪",
    place: ConsonantPlace.dental,
    manner: ConsonantManner.plosive,
    voiced: false,
  },
  {
    ligature: "d̪",
    place: ConsonantPlace.dental,
    manner: ConsonantManner.plosive,
    voiced: true,
  },
  {
    ligature: "t",
    place: ConsonantPlace.alveolar,
    manner: ConsonantManner.plosive,
    voiced: false,
  },
  {
    ligature: "d",
    place: ConsonantPlace.alveolar,
    manner: ConsonantManner.plosive,
    voiced: true,
  },
  {
    ligature: "ʈ",
    place: ConsonantPlace.retroFlex,
    manner: ConsonantManner.plosive,
    voiced: false,
  },
  {
    ligature: "ɖ",
    place: ConsonantPlace.retroFlex,
    manner: ConsonantManner.plosive,
    voiced: true,
  },
  {
    ligature: "c",
    place: ConsonantPlace.palatal,
    manner: ConsonantManner.plosive,
    voiced: false,
  },
  {
    ligature: "ɟ",
    place: ConsonantPlace.palatal,
    manner: ConsonantManner.plosive,
    voiced: true,
  },
  {
    ligature: "k",
    place: ConsonantPlace.velar,
    manner: ConsonantManner.plosive,
    voiced: false,
  },
  {
    ligature: "ɡ",
    place: ConsonantPlace.velar,
    manner: ConsonantManner.plosive,
    voiced: true,
  },
  {
    ligature: "q",
    place: ConsonantPlace.uvular,
    manner: ConsonantManner.plosive,
    voiced: false,
  },
  {
    ligature: "ɢ",
    place: ConsonantPlace.uvular,
    manner: ConsonantManner.plosive,
    voiced: true,
  },
  {
    ligature: "ʡ",
    place: ConsonantPlace.pharyngeal,
    manner: ConsonantManner.plosive,
    voiced: false,
  },
  {
    ligature: "ʔ",
    place: ConsonantPlace.glottal,
    manner: ConsonantManner.plosive,
    voiced: false,
  },
  // Sibilant affricate
  {
    ligature: "t̪s̪",
    place: ConsonantPlace.dental,
    manner: ConsonantManner.sibilantAffricate,
    voiced: false,
  },
  {
    ligature: "d̪z̪",
    place: ConsonantPlace.dental,
    manner: ConsonantManner.sibilantAffricate,
    voiced: true,
  },
  {
    ligature: "ts",
    place: ConsonantPlace.alveolar,
    manner: ConsonantManner.sibilantAffricate,
    voiced: false,
  },
  {
    ligature: "dz",
    place: ConsonantPlace.alveolar,
    manner: ConsonantManner.sibilantAffricate,
    voiced: true,
  },
  {
    ligature: "t̠ʃ",
    place: ConsonantPlace.postAlveolar,
    manner: ConsonantManner.sibilantAffricate,
    voiced: false,
  },
  {
    ligature: "d̠ʒ",
    place: ConsonantPlace.postAlveolar,
    manner: ConsonantManner.sibilantAffricate,
    voiced: true,
  },
  {
    ligature: "tʂ",
    place: ConsonantPlace.retroFlex,
    manner: ConsonantManner.sibilantAffricate,
    voiced: false,
  },
  {
    ligature: "dʐ",
    place: ConsonantPlace.retroFlex,
    manner: ConsonantManner.sibilantAffricate,
    voiced: true,
  },
  {
    ligature: "tɕ",
    place: ConsonantPlace.palatal,
    manner: ConsonantManner.sibilantAffricate,
    voiced: false,
  },
  {
    ligature: "dʑ",
    place: ConsonantPlace.palatal,
    manner: ConsonantManner.sibilantAffricate,
    voiced: true,
  },
  // Non-sibilant affricate
  {
    ligature: "pɸ",
    place: ConsonantPlace.bilabial,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: false,
  },
  {
    ligature: "bβ",
    place: ConsonantPlace.bilabial,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: true,
  },
  {
    ligature: "p̪f",
    place: ConsonantPlace.labioDental,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: false,
  },
  {
    ligature: "b̪v",
    place: ConsonantPlace.labioDental,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: true,
  },
  {
    ligature: "t̪θ",
    place: ConsonantPlace.dental,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: false,
  },
  {
    ligature: "d̪ð",
    place: ConsonantPlace.dental,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: true,
  },
  {
    ligature: "tɹ̝̊",
    place: ConsonantPlace.alveolar,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: false,
  },
  {
    ligature: "dɹ̝",
    place: ConsonantPlace.alveolar,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: true,
  },
  {
    ligature: "t̠ɹ̠̊˔",
    place: ConsonantPlace.postAlveolar,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: false,
  },
  {
    ligature: "d̠ɹ̠˔",
    place: ConsonantPlace.postAlveolar,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: true,
  },
  {
    ligature: "cç",
    place: ConsonantPlace.palatal,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: false,
  },
  {
    ligature: "ɟʝ",
    place: ConsonantPlace.palatal,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: true,
  },
  {
    ligature: "kx",
    place: ConsonantPlace.velar,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: false,
  },
  {
    ligature: "ɡɣ",
    place: ConsonantPlace.velar,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: true,
  },
  {
    ligature: "qχ",
    place: ConsonantPlace.uvular,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: false,
  },
  {
    ligature: "ɢʁ",
    place: ConsonantPlace.uvular,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: true,
  },
  {
    ligature: "ʡʜ",
    place: ConsonantPlace.pharyngeal,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: false,
  },
  {
    ligature: "ʡʢ",
    place: ConsonantPlace.pharyngeal,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: true,
  },
  {
    ligature: "ʔh",
    place: ConsonantPlace.glottal,
    manner: ConsonantManner.nonSibilantAffricate,
    voiced: false,
  },
  // Non-sibilant fricatives
  {
    ligature: "s̪",
    place: ConsonantPlace.dental,
    manner: ConsonantManner.sibilantFricative,
    voiced: false,
  },
  {
    ligature: "z̪",
    place: ConsonantPlace.dental,
    manner: ConsonantManner.sibilantFricative,
    voiced: true,
  },
  {
    ligature: "s",
    place: ConsonantPlace.alveolar,
    manner: ConsonantManner.sibilantFricative,
    voiced: false,
  },
  {
    ligature: "z",
    place: ConsonantPlace.alveolar,
    manner: ConsonantManner.sibilantFricative,
    voiced: true,
  },
  {
    ligature: "ʃ",
    place: ConsonantPlace.postAlveolar,
    manner: ConsonantManner.sibilantFricative,
    voiced: false,
  },
  {
    ligature: "ʒ",
    place: ConsonantPlace.postAlveolar,
    manner: ConsonantManner.sibilantFricative,
    voiced: true,
  },
  {
    ligature: "ʂ",
    place: ConsonantPlace.retroFlex,
    manner: ConsonantManner.sibilantFricative,
    voiced: false,
  },
  {
    ligature: "ʐ",
    place: ConsonantPlace.retroFlex,
    manner: ConsonantManner.sibilantFricative,
    voiced: true,
  },
  {
    ligature: "ɕ",
    place: ConsonantPlace.palatal,
    manner: ConsonantManner.sibilantFricative,
    voiced: false,
  },
  {
    ligature: "ʑ",
    place: ConsonantPlace.palatal,
    manner: ConsonantManner.sibilantFricative,
    voiced: true,
  },
];




							
// Non-sibilant fricative	ɸ	β	f	v	θ̼	ð̼	θ	ð	θ̠	ð̠	ɹ̠̊˔	ɹ̠˔	ɻ̊˔	ɻ˔	ç	ʝ	x	ɣ	χ	ʁ	ħ	ʕ	h	ɦ
// Approximant		β̞		ʋ				ð̞		ɹ		ɹ̠		ɻ		j		ɰ						˷
// Tap/flap		ⱱ̟		ⱱ					ɾ̥	ɾ			ɽ̊	ɽ						ɢ̆		ʡ̮		
// Trill	ʙ̥	ʙ							r̥	r		r̠	ɽ̊r̥	ɽr					ʀ̥	ʀ	ʜ	ʢ		
// Lateral affricate									tɬ	dɮ			tꞎ	d𝼅	c𝼆	ɟʎ̝	k𝼄	ɡʟ̝						
// Lateral fricative							ɬ̪		ɬ	ɮ			ꞎ	𝼅	𝼆	ʎ̝	𝼄	ʟ̝						
// Lateral approximant								l̪	l̥	l		l̠	ɭ̊	ɭ	ʎ̥	ʎ	ʟ̥	ʟ		ʟ̠				
// Lateral tap/flap									ɺ̥	ɺ			𝼈̊	𝼈		ʎ̮		ʟ̆				