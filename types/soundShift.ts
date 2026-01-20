type SoundShiftBase = {
  id: string;
  preventMultipleIterations: boolean;
  occurrence: number;
}
type SoundShiftWithoutId = {
  preventMultipleIterations: boolean;
  occurrence: number;
}

export enum ShiftModeEnum {
  "changeVoice" = "changeVoice",
  "dropSound" = "dropSound"
}
export const ShiftModeArray = Object.values(ShiftModeEnum);

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
  shiftMode: ShiftModeEnum
}
type SoundShiftMode = SoundShiftEmpty | SoundShiftNoMode | SoundShiftNormal;

type SoundShiftNoCondition = {
  startOnly: false;
  leading?: string;
  endOnly: false;
  trailing?: string;
}
type SoundShiftStart = {
  startOnly: true;
  leading: undefined;
  endOnly: false;
  trailing?: string;
}
type SoundShiftEnd = {
  startOnly: false;
  leading?: string;
  endOnly: true;
  trailing: undefined;
}
// type SoundShiftStartEnd = {
//   startOnly: true;
//   leading: undefined;
//   endOnly: true;
//   trailing: undefined;
// }
type SoundShiftConditions = SoundShiftNoCondition | SoundShiftStart | SoundShiftEnd;

export type SoundShift = SoundShiftBase & SoundShiftMode & SoundShiftConditions;
export type NewSoundShift = SoundShiftWithoutId & SoundShiftMode & SoundShiftConditions;