
export function arrStringToNumb(arrayobjs) {
  const arraytoretun = arrayobjs.map((mypickedTslot) => {
    const arrI = mypickedTslot.InitialHour.split(':').map(Number)
    const arrF = mypickedTslot.FinalHour.split(':').map(Number)
    const I = arrI[0]* 60 + arrI[1]
    const F = arrF[0]* 60 + arrF[1]
    return {WeekDay: mypickedTslot.WeekDay, InitialHour: I, FinalHour: F}
  })
  return (arraytoretun)
}

export function arrNumbToString(arrayobjs) {
  const arraytoretun = arrayobjs.map((mypickedTslot) => {
    const arrelemI = mypickedTslot.InitialHour
    const arrelemF = mypickedTslot.FinalHour
    const hoursI = Math.floor(arrelemI/ 60);
    const minsI = arrelemI % 60;
    const hoursF = Math.floor(arrelemF/ 60);
    const minsF = arrelemF % 60;
    const I = `${hoursI.toString().padStart(2, "0")}:${minsI.toString().padStart(2, "0")}:00`
  const F = `${hoursF.toString().padStart(2, "0")}:${minsF.toString().padStart(2, "0")}:00`
    return {WeekDay: mypickedTslot.WeekDay, InitialHour: I, FinalHour: F}
  })
  return (arraytoretun)
}
