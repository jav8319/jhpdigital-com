
export function getFreeTimeSlots(arrayobjs,interval,initialhouri, finalhouri) {
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
  const checkobjarrayi = arrayobjs.filter((element) => {
  return element.day<0&&element.WeekDay>6&&element.InitialHour<0&&element.InitialHour>=element.FinalHour&&
      element.FinalHour<0
  });
  if (checkobjarrayi.length > 0) {
    throw new Error("The availability can't be computed with the current parameters.");
  }

  let slots = [];
  let maxiterations = ((finalhouri*1) - (initialhouri*1)) / (interval*1)
  for (let day = 0; day <= 6; day++) {
    for (let kk = 0; kk <=maxiterations; kk++) {
        const Starthour = ((initialhouri*1)-(interval*1))+(kk*(interval*1))
        const Finalhour= ((initialhouri*1))+(kk*(interval*1))
        if(kk!==0){
            slots.push({ WeekDay:day, InitialHour: Starthour, FinalHour: Finalhour });
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
    myslotdaynumber=slot.WeekDay
    myslotinitialhour=slot.InitialHour
    myslotfinalhour=slot.FinalHour
    let findoverlap=arrayobjs.find((element) => {
        daynumber=element.WeekDay
        myinitialhour=element.InitialHour
        myfinalhour=element.FinalHour
        if(myslotdaynumber===daynumber){
            return (myinitialhour===myslotinitialhour)||
            ((myslotinitialhour < myfinalhour) && (myslotinitialhour >= myinitialhour))||
            ((myslotfinalhour > myinitialhour) && (myslotfinalhour <= myfinalhour))||
            ((myslotinitialhour < myinitialhour) && (myslotfinalhour > myfinalhour))||
            (myslotfinalhour===myfinalhour)
        }else{
            return false
        }
    })
    if(findoverlap!==undefined){
        result=false
    }
    return result
  });

  function sortByDayAndHour(array) {
    return array.sort((a, b) => {
        if (a.WeekDay === b.WeekDay) {
        return a.InitialHour - b.InitialHour; // Sort by InitialHour if days are the same
        }
        return a.WeekDay - b.WeekDay; // Otherwise, sort by day
    });
  }
    const sortarray=sortByDayAndHour(availableslots);
  const newarr = sortarray.map((element) => element.WeekDay);
  const unique = [...new Set(newarr)];
    let myuniquearray=[]
  for (const element of unique) {
    const arraytocheck=sortarray.filter((slot) => slot.WeekDay === element);
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
        while(found===false&&i<1441){
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
            if(indextoskip===-1){
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
                        const elementtopushhere={WeekDay:element,InitialHour:firselementtopushhere,FinalHour:elementfound.FinalHour}
                        myuniquearray.push(elementtopushhere)
                        found=true
                    }else{
                        indexoffirstelement=indextofind-(i-1)
                        const firselementtopush=myorderarry[indexoffirstelement].InitialHour
                        const elementtopushhere={WeekDay:element,InitialHour:firselementtopush,FinalHour:elementfound.FinalHour}
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
  console.log('myuniquearray',myuniquearray)
return (myuniquearray)
}