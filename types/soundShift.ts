type SoundShiftBase = {
  id: string;
  preventMultipleIterations: boolean;
  occurrence: number;
}
type SoundShiftWithoutId = {
  preventMultipleIterations: boolean;
  occurrence: number;
}

enum ShiftMode {
  "changeVoice",
  "dropSound"
}
export const ShiftModeArray = Object.values(ShiftMode);

type SoundShiftEmpty = {
  from: undefined;
  to: undefined;
  shiftMode: undefined;
}
type SoundShiftNoMode = {
  from: string;
  to: string;
  shiftMode: undefined;
}
type SoundShiftNormal = {
  from: string;
  to: undefined;
  shiftMode: ShiftMode
}
type SoundShiftMode = SoundShiftEmpty | SoundShiftNoMode | SoundShiftNormal;

type SoundShiftNoCondition = {
  startOnly: false;
  leading: undefined;
  endOnly: false;
  trailing: undefined;
}
type SoundShiftStart = {
  startOnly: true;
  leading: undefined;
}
type SoundShiftLeading = {
  startOnly: false;
  leading: string;
}
type SoundShiftEnd = {
  endOnly: true;
  trailing: undefined;
}
type SoundShiftTrailing = {
  endOnly: false;
  trailing: string;
}
type SoundShiftConditions = SoundShiftNoCondition | ((SoundShiftStart | SoundShiftLeading) & (SoundShiftEnd | SoundShiftTrailing));

export type SoundShift = SoundShiftBase & SoundShiftMode & SoundShiftConditions;
export type NewSoundShift = SoundShiftWithoutId & SoundShiftMode & SoundShiftConditions;