import { consonants, type IPAConsonant } from "~/data/ipa/_all";

export default (sound: string | IPAConsonant): IPAConsonant | null => {
  if (typeof sound === "string") {
    const consonant = consonants.find(({ ligature }) => ligature === sound);
    if (consonant) {
      sound = consonant;
    } else {
      return null;
    }
  }
  const findMatch = consonants.find((match) => {
    return (
      sound.category === match.category &&
      sound.manner === match.manner &&
      sound.places.join(",") === match.places.join(",") &&
      sound.voicing !== match.voicing
    );
  });
  if (findMatch) {
    return findMatch;
  } else {
    return null;
  }
}