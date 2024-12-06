


function generateTimeSlots(arrayobjs,interval,initialhouri, finalhouri) {
//this function will generate time slots from the array of objects(arrayobjs) passed as argument,
//,creating spots that do not overlap the time slots passed in the arrayobjs.
//The array passed as argument will have the following structure
//with all initial hours in minute(6:00AM=6hrs*60min = 320, 10:00PM=22hr*60min=1320) divisible by 
//the interval argument, day is a number from 0 to 6, InitialHour and FinalHour are numbers from 0 to 1440
//array exemple:
// const availability=[
//     { day: 0, InitialHour: 480, FinalHour: 1080 },
//     { day: 0, InitialHour: 1080, FinalHour: 1320 },
//     { day: 2, InitialHour: 480, FinalHour: 1080 },
//     { day: 3, InitialHour: 690, FinalHour: 1140 },
//     { day: 4, InitialHour: 480, FinalHour: 1080 },
//     { day: 5, InitialHour: 480, FinalHour: 1080 },
//     { day: 6, InitialHour: 480, FinalHour: 1080 },
//     { day: 1, InitialHour: 480, FinalHour: 1080 },
//     ];
if(arrayobjs===undefined||interval===undefined||initialhouri===undefined||finalhouri===undefined){
  throw new Error("The arrayobjs, interval, initialhour and finalhour must be defined");
}
if (((finalhouri*1) - (initialhouri*1)) % (interval*1) !== 0) {
  throw new Error("The difference between finalhour and initialhour must be divisible by the interval with no remainder.");
}

if((interval*1)<=0||(initialhouri*1)<=0||(finalhouri*1)<=0){
  throw new Error("The interval, initialhour and finalhour must be greater than 0");
}

if((initialhouri*1)>=(finalhouri*1)){
  throw new Error("The initialhour must be less than the finalhour");
}

if((interval*1)<15){
  throw new Error("The interval must be greater than 15");
}
if(arrayobjs.length===0){
  throw new Error("The arrayobjs must have at least one element");
  
}
const checkobjarray = arrayobjs.filter((element) => element.InitialHour % interval !== 0);

if (checkobjarray.length > 0) {
  throw new Error("The InitialHour must be divisible by the interval with no remainder.");
}
let slots = [];
let maxiterations = ((finalhouri*1) - (initialhouri*1)) / (interval*1)
for (let day = 0; day <= 6; day++) {
  for (let kk = 0; kk <=maxiterations; kk++) {
      const Starthour = ((initialhouri*1)-(interval*1))+(kk*(interval*1))
      const Finalhour= ((initialhouri*1))+(kk*(interval*1))
      if(kk!==0){
          slots.push({ day:day, InitialHour: Starthour, FinalHour: Finalhour });
      }
      
  }
}
const availableslots=slots.filter((slot) => {
  let result=true
  let daynumber=0
  let myinitialhour=0
  let myfinalhour=0
  let myslotinitialhour=0
  let myslotfinalhour=0
  let myslotdaynumber=0
  myslotdaynumber=slot.day
  myslotinitialhour=slot.InitialHour
  myslotfinalhour=slot.FinalHour
  let find1=arrayobjs.find((element) => {
      daynumber=element.day
      myinitialhour=element.InitialHour
      myfinalhour=element.FinalHour
      if(myslotdaynumber===element.day){
          return myinitialhour===myslotinitialhour||
          myslotinitialhour < myfinalhour && myslotinitialhour >= myinitialhour||
          myslotfinalhour > myinitialhour && myslotfinalhour <= myfinalhour||
          myslotinitialhour < myinitialhour && myslotfinalhour > myfinalhour||
          myslotfinalhour===myfinalhour
      }else{
          return false
      }
  })
  if(find1!==undefined){
      result=false
  }
  return result
});
function sortByDayAndHour(array) {
  return array.sort((a, b) => {
      if (a.day === b.day) {
      return a.InitialHour - b.InitialHour; // Sort by InitialHour if days are the same
      }
      return a.day - b.day; // Otherwise, sort by day
  });
}
const sortarray=sortByDayAndHour(availableslots);
const newarr = sortarray.map((element) => element.day);
const unique = [...new Set(newarr)];
let myuniquearray=[]
for (const element of unique) {
  const arraytocheck=sortarray.filter((slot) => slot.day === element);
  const myorderarry=sortByDayAndHour(arraytocheck)
  const firstelement = myorderarry[0]
  const lastelement = myorderarry[myorderarry.length-1]
  const InitialHourfirstelement=firstelement.InitialHour
  const InitialHourlastelement=lastelement.InitialHour
  let maxlopp=0
  let indexoffirstelement=0
  let indexofmynextelement = 0
  let indextofind=0
  let indextoskip=0
  let prevLenght=myuniquearray.length
  let nextelement=InitialHourfirstelement
  while(nextelement<=InitialHourlastelement&&maxlopp<1441){
      let found=false
      let i=0
      while(found===false){
          if(i===0&&maxlopp===0){
              nextelement=InitialHourfirstelement
          }else if(prevLenght!==myuniquearray.length){
              nextelement=myorderarry[indexofmynextelement].InitialHour
              prevLenght=myuniquearray.length
          }else{
              nextelement=  nextelement+(interval*1)
          }
          indextoskip=myorderarry.findIndex((element) => (element.InitialHour*1)===(nextelement*1))
          indextofind=myorderarry.findIndex((element) => (element.InitialHour*1)===((nextelement*1)-(interval*1)))
          if(indextoskip==-1){
              const elementfound=myorderarry[indextofind] 
              const initialhourtocheck=elementfound.InitialHour
              indexofmynextelement = indextofind+1
              const myarrayelementtopush=myorderarry[indextofind]
              if(initialhourtocheck!==undefined&&initialhourtocheck===InitialHourfirstelement){
                  myuniquearray.push(myarrayelementtopush)
                  found=true
              }else{             
                  if(initialhourtocheck!==undefined&&initialhourtocheck!==InitialHourlastelement){
                      indexoffirstelement=indextofind-(i-1)
                      const firselementtopushhere=myorderarry[indexoffirstelement].InitialHour
                      const elementtopushhere={day:element,InitialHour:firselementtopushhere,FinalHour:elementfound.FinalHour}
                      myuniquearray.push(elementtopushhere)
                      found=true
                  }else{
                      indexoffirstelement=indextofind-(i-1)
                      const firselementtopush=myorderarry[indexoffirstelement].InitialHour
                      const elementtopushhere={day:element,InitialHour:firselementtopush,FinalHour:elementfound.FinalHour}
                      myuniquearray.push(elementtopushhere)
                      maxlopp=1500
                      found=true  
                  }  
              }
          }
          i++
      }
      maxlopp++
  }
}
return (myuniquearray)
}

module.exports = generateTimeSlots;
