export default function (ipa: string, soundShifts: SoundShift[]): string {
  return ipa.split("").map((char, _index) => {
    const matched = soundShifts.find((shift) => shift.from === char);
    if (!matched)
      return char;
    
    return matched.to;
  }).join("");
}