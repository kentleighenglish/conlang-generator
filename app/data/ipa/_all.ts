
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
}

type IPAPulmonicConsonant = IPABaseConsonant & {
  place: ConsonantPlace.bilabial | ConsonantPlace.labioDental | ConsonantPlace.dental | ConsonantPlace.alveolar | ConsonantPlace.postAlveolar | ConsonantPlace.retroFlex | ConsonantPlace.palatal | ConsonantPlace.velar | ConsonantPlace.pharyngeal | ConsonantPlace.glottal;
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
  },
];


// Plosive	p	b	p̪	b̪	t̼	d̼	t̪	d̪	t	d			ʈ	ɖ	c	ɟ	k	ɡ	q	ɢ	ʡ		ʔ	
// Sibilant affricate							t̪s̪	d̪z̪	ts	dz	t̠ʃ	d̠ʒ	tʂ	dʐ	tɕ	dʑ								
// Non-sibilant affricate	pɸ	bβ	p̪f	b̪v			t̪θ	d̪ð	tɹ̝̊	dɹ̝	t̠ɹ̠̊˔	d̠ɹ̠˔			cç	ɟʝ	kx	ɡɣ	qχ	ɢʁ	ʡʜ	ʡʢ	ʔh	
// Sibilant fricative							s̪	z̪	s	z	ʃ	ʒ	ʂ	ʐ	ɕ	ʑ								
// Non-sibilant fricative	ɸ	β	f	v	θ̼	ð̼	θ	ð	θ̠	ð̠	ɹ̠̊˔	ɹ̠˔	ɻ̊˔	ɻ˔	ç	ʝ	x	ɣ	χ	ʁ	ħ	ʕ	h	ɦ
// Approximant		β̞		ʋ				ð̞		ɹ		ɹ̠		ɻ		j		ɰ						˷
// Tap/flap		ⱱ̟		ⱱ					ɾ̥	ɾ			ɽ̊	ɽ						ɢ̆		ʡ̮		
// Trill	ʙ̥	ʙ							r̥	r		r̠	ɽ̊r̥	ɽr					ʀ̥	ʀ	ʜ	ʢ		
// Lateral affricate									tɬ	dɮ			tꞎ	d𝼅	c𝼆	ɟʎ̝	k𝼄	ɡʟ̝						
// Lateral fricative							ɬ̪		ɬ	ɮ			ꞎ	𝼅	𝼆	ʎ̝	𝼄	ʟ̝						
// Lateral approximant								l̪	l̥	l		l̠	ɭ̊	ɭ	ʎ̥	ʎ	ʟ̥	ʟ		ʟ̠				
// Lateral tap/flap									ɺ̥	ɺ			𝼈̊	𝼈		ʎ̮		ʟ̆				