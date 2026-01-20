import { ShiftModeEnum, type SoundShift } from "~~/types/soundShift";

const applySoundShift = function (ipa: string, soundShifts: SoundShift[]): string {
  return ipa.split("").map((char, index) => {
    const matched = soundShifts.find((shift) => shift.from === char);
    if (!matched)
      return char;
    
    const { startOnly, endOnly, leading, trailing, shiftMode, allowMultipleIterations } = matched;

    // check conditions
    if (
      (startOnly && index !== 0) ||
      (endOnly && (index + 1) !== ipa.length) ||
      (trailing && ipa[index + 1] !== trailing) ||
      (leading && ipa[index - 1] !== leading)
    ) {
      return char;
    }

    let out = char;
    if (shiftMode === ShiftModeEnum.dropSound) {
      out = "";
    } else if (shiftMode === ShiftModeEnum.changeVoice) {
      const voicingAlternative = getVoicingAlternative(matched.from);
      out = voicingAlternative?.ligature ?? char;
    } else {
      out = matched.to!;
    }

    if (allowMultipleIterations) {
      out = applySoundShift(out, soundShifts);
    }
    return out;
  }).join("");
}

export default applySoundShift;