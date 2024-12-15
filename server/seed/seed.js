const sequelize = require('../config/connection');
const  models  = require('../models');
const { Op } = require('sequelize');
const myproducts = require('./ProductList');
const myAttrsSpecs = require('./ProAttrSpecs');
const users = require('./Userstoseed.js');
const myOrders = require('./Orderstpseed.js');
const fs = require('fs');
const path = require('path');
const folderPath = './imgs';
const { storage, bucketName } = require('../config/connectionGC');
const { teachingJobs, maintenanceJobs } = require('./Taskstoseed.js');
const {teachingOrdersArr,MaintOrdeArr}= require('./OrdersServices.js');


async function deleteFile(fileName) {
    try {
        await storage.bucket(bucketName).file(fileName).delete();
        console.log(`Deleted file: ${fileName}`);
    } catch (error) {
        // Handle the case where the file does not exist
        if (error.code === 404) {
        console.log(`File not found: ${fileName}`);
        } else {
        console.error('Error in file deletion:', error);
        }
    }
}
  
async function uploadFile(filePath, destination) {
    await storage.bucket(bucketName).upload(filePath, {
        destination: destination,
    });
    console.log(`${filePath} uploaded to ${bucketName}`);
}
  
seedDataBase = async () => {
    let photonames = []
    for (let index = 1; index <= 19; index++) {
        const elementphotoname = `photo${index}`;
        photonames.push(elementphotoname)
    }
    try {
        photonames.forEach(fileName => {
            deleteFile(fileName).catch(console.error);
          });
        
          // Example: uploading files from a folder
          fs.readdirSync(folderPath).forEach(file => {
            const filePath = path.join(folderPath, file);
            uploadFile(filePath, file).catch(console.error);
          });
        const category = [
            {CategoryName:'electronics'}, 
            {CategoryName:'women clothing'}, 
            {CategoryName:'clothing'}, 
            {CategoryName:'men clothing'}, 
            {CategoryName:'Home'}, 
            {CategoryName:'Beauty'}, 
            {CategoryName:'Health'}, 
            {CategoryName:'Sports'}, 
            {CategoryName:'Toys'}, 
            {CategoryName:'Books'}, 
            {CategoryName:'Other'}
        ];
        let prevArrAttrs = []
        let prevSpecs = []
        for (const elementobj of myAttrsSpecs) {
            const productlistItems = elementobj.ProductItems
            const specsListItems = elementobj.SpecNameVal
            if(productlistItems&&productlistItems.length>0){
                for (const elementobj2 of productlistItems) {
                    const attrs = elementobj2.AttrNameVal
                    if(attrs&&attrs.length>0){
                        for (const elementobj3 of attrs) {
                            const   {AttributeName} =   elementobj3
                            if(prevArrAttrs.length===0){
                                prevArrAttrs.push({ AttributeName });
                            }else{
                                let seeObj = prevArrAttrs.some((pushed) => pushed.AttributeName === AttributeName)
                                if(!seeObj){
                                    prevArrAttrs.push({ AttributeName });
                                }
                            }
                        }
                    }
                }
                for (const elementobjspec of specsListItems) {
                    const   {SpecName} =   elementobjspec
                    if(prevSpecs.length===0){
                        prevSpecs.push({ SpecName });
                    }else{
                        let seeObjSpec = prevSpecs.some((pushedSpec) => pushedSpec.SpecName === SpecName)
                        if(!seeObjSpec){
                            prevSpecs.push({ SpecName });
                        }
                    }
                }
            }
        }
        const createAttributes = await models.ListAttribute.bulkCreate(prevArrAttrs);
        const createSpecs = await models.Spec.bulkCreate(prevSpecs);
        const createCategory = await models.Category.bulkCreate(category);
        if(createCategory&&createAttributes&&createSpecs){
            let catToFind= await models.Category.findOne({ where: { CategoryName: 'electronics' } });
            if(catToFind){
                await models.Subcategory.create(
                    {CategoryID:catToFind.dataValues.id, SubcategoryName:'gadgets'}
                );
            }
        }
        const seedCategory = await models.Category.findAll({ })
        if(seedCategory){
            for (const element of seedCategory) {
                const myproductcats = myproducts.filter((product) => product.CategoryID === element.CategoryName);
                if(myproductcats&&myproductcats.length>0){
                    for (const productIt of myproductcats) {
                        const findProductItems = myAttrsSpecs.find((product) => product.ProductGroupID === productIt.ProductGroupID);
                        const myphotostocreate = productIt.photos
                        if(findProductItems){
                            const {ProductItems, SpecNameVal} = findProductItems
                            let myprcode
                            let mymodeltocreate
                            if(productIt.ProductGroupID==='GRP011'){
                                const mysubcat = await models.Subcategory.findOne({ where: { SubcategoryName: 'gadgets' } });
                                if(mysubcat){
                                    mymodeltocreate=    await models.Product.create(
                                        {...productIt, 
                                            SubcategoryID:mysubcat.dataValues.id, 
                                            CategoryID:element.id
                                        })
                                }
                            }else{
                                const deconstruct ={...productIt, CategoryID:element.id}
                                mymodeltocreate=   await models.Product.create(deconstruct)
                            }
                            if(mymodeltocreate){
                                if(myphotostocreate&&myphotostocreate.length>0){
                                    for (const elemphoto of myphotostocreate) {
                                        const photostr=`https://storage.googleapis.com/ecphotos/${elemphoto}.jpg`
                                        await models.ProductImage.create({ImageUrl:photostr, ProductID:mymodeltocreate.dataValues.id});
                                    }
                                }
                                if(SpecNameVal&&SpecNameVal.length>0){
                                    for (const elementSpecNameVal of SpecNameVal) {
                                        const {SpecName, Value} = elementSpecNameVal
                                        const findmyspecid= await models.Spec.findOne({ where: { SpecName } });
                                        if(findmyspecid){
                                            await models.ProductSpec.create(
                                                {
                                                    ProductID:mymodeltocreate.dataValues.id, 
                                                    SpecID:findmyspecid.dataValues.id, 
                                                    SpecValue:Value
                                                }
                                            )
                                        }
                                    }
                                }
                            }
                            for (const elemProductItems of ProductItems) {
                                const{ProdCode, Price, Stock, AttrNameVal} = elemProductItems
                                myprcode = await models.ProdCode.create({ProdCode, Price, Stock, 
                                    ProductID:mymodeltocreate.dataValues.id});
                                if (AttrNameVal && AttrNameVal.length > 0) {
                                    for (const elementAttrNameVal of AttrNameVal) {
                                        const { AttributeName, Value } = elementAttrNameVal;                            
                                        const findmyattrid = await models.ListAttribute.findOne({ where: { AttributeName } });
                                        if (findmyattrid) {
                                            await models.ProductAttribute.create({
                                                codeID: myprcode.dataValues.id, AttributeID: findmyattrid.dataValues.id,
                                                 AttributeValue:Value
                                            });
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
            }
        }
        
        const pcodes= await models.ProdCode.findAll({
            attributes: ['id'],
            where: {
                stock: {
                    [Op.gt]: 4
                },
            },
        });
        if(pcodes&&pcodes.length>0&&myOrders&&myOrders.length>0){
            for (const elemOrder of myOrders) {
                const myidrandon = getRandomElement(pcodes)
                const ordertocreate = await models.P_Order.create(elemOrder);
                if(ordertocreate){
                    await models.ProductOrder.create(
                    {codeID:myidrandon.dataValues.id, 
                        P_OrderID:ordertocreate.dataValues.id, 
                        ProductQty:getRandomIntegerInRange(1,4)});
                }
            }
        }
        const myuserscreated =   await models.User.bulkCreate(users, { individualHooks: true })
        const availabilities = [];
        if(myuserscreated&&myuserscreated.length>0){
            for (let userId = 2; userId <= myuserscreated.length+1; userId++) {
                for (let day = 0; day < 7; day++) {
                    const range1 = getRandomTimeRange1();
                    const range2 = getRandomTimeRange2(range1.finalHour);
                    if(range2!==null){
                        availabilities.push(
                            {
                                UserID: userId,
                                WeekDay: day,
                                InitialHour: range1.initialHour,
                                FinalHour: range1.finalHour,
                            },
                            {
                                UserID: userId,
                                WeekDay: day,
                                InitialHour: range2.I,
                                FinalHour: range2.F,
                            }
                        );
                    }else{
                        availabilities.push(
                            {
                                UserID: userId,
                                WeekDay: day,
                                InitialHour: range1.initialHour,
                                FinalHour: range1.finalHour,
                            }
                        );
                    }
        
                }
            }
        }   
        await models.Availability.bulkCreate(availabilities);
        let teachinTask=0
        let maintenanceTask=0
        teachinTask=teachingJobs.length
        maintenanceTask=maintenanceJobs.length
        const CodesT = []
        let totaltasknum=teachinTask+maintenanceTask
        let mintask = totaltasknum-4
        let maxtask = totaltasknum-2
        if(mintask<0){
            mintask=1
        }
        if(maxtask<0){
            maxtask=1
        }
        const ObjsTeach = []
        const ObjsMaint = []
        for (const elemteachobj of teachingJobs) {
            const codetoadd1 = generateRandomString(6)
            CodesT.push({TaskCode:codetoadd1})
            const elemteachtoadd = {...elemteachobj, TaskCode:codetoadd1}
            ObjsTeach.push(elemteachtoadd)
        }
        for (const elemMaintobj of maintenanceJobs) {
            const codetoadd2 = generateRandomString(6)
            CodesT.push({TaskCode:codetoadd2})
            const elemMainttoadd = {...elemMaintobj, TaskCode:codetoadd2}
            ObjsMaint.push(elemMainttoadd)
        }
        await models.Task.bulkCreate(CodesT)
        const taskcodesarr = await models.Task.findAll({ attributes: ['id'] });
        await models.MaintenanceJob.bulkCreate(ObjsMaint);
        await models.TeachingJob.bulkCreate(ObjsTeach);
        for (let index2 = 1; index2 <=myuserscreated.length; index2++) {
            const howmanytasks= getRandomIntegerInRange(mintask,maxtask)
            const mypickedtasks = createUniquePicker(taskcodesarr, howmanytasks);
            for (const elementpicked of mypickedtasks) {
                await models.UserTask.create({ UserID: index2, taskID: elementpicked.id, isApproved: true});
            }
        }
        const myclientmaintenance = [];
        const mydatetoiterate = new Date();
        for (let indexom = 1; indexom <= MaintOrdeArr.length; indexom++) {
            const mydate = new Date(
            mydatetoiterate.getFullYear(),
            mydatetoiterate.getMonth(),
            mydatetoiterate.getDate() + indexom*2
            );
            const arrindex =indexom-1
            myclientmaintenance.push({itr:arrindex, appointment:mydate});
        }
        const myMaintjobtopick = await models.MaintenanceJob.findAll({ attributes: ['id','Duration','TaskCode'] });
        if(myMaintjobtopick&&myMaintjobtopick.length>0){
            for (const appointreachelm of myclientmaintenance) {
                const{itr, appointment} = appointreachelm;
                const myramdonMaint = getRandomElement(myMaintjobtopick);
                const availabilitiesdb = await models.Availability.findAll({})
                if(availabilitiesdb&&availabilitiesdb.length>0){
                    const tskdrtn = myramdonMaint.dataValues.Duration;
                    const appdatetopass = new Date(appointment)
                    const datecorrected =  new Date(appdatetopass.getFullYear(), 
                    appdatetopass.getMonth(), appdatetopass.getDate(), 0, 0, 0);
                    const testappgetday = appdatetopass.getDay()
                    const appointmentslot= filterAvailableTimes(availabilitiesdb, tskdrtn, testappgetday)
                    const gettasks = await models.Task.findAll({ where: { TaskCode: myramdonMaint.dataValues.TaskCode } });
                    const arruserstask = []
                    if(gettasks&&gettasks.length>0){
                        for (const tsk of gettasks) {
                            const getTasksIds = await models.UserTask.findAll({ where: { taskID: tsk.id } });
                            if(getTasksIds&&getTasksIds.length>0){
                                for (const elem of getTasksIds) {
                                    arruserstask.push(elem.UserID)
                                }
                            }
                        }
                    }
                    if(appointmentslot&&appointmentslot.length>0){
                        const filteredMaintSlots = appointmentslot.filter((slot) => arruserstask.includes(slot.UserID));
                        const mypickedslot = getRandomElement(filteredMaintSlots);
                        const [hour, minute, second] = mypickedslot.InitialHour.split(':').map(Number); // Parse the time components
                        const BookingDateStart = new Date(
                            datecorrected.getFullYear(),
                            datecorrected.getMonth(),
                            datecorrected.getDate(),
                            hour,
                            minute,
                            second || 0
                        );
                        const durationinmilliseconds = tskdrtn * 1000;
                        const BookingDateEnd = new Date(BookingDateStart.getTime() + durationinmilliseconds);
                        const orderformaint = await models.M_Order.create(MaintOrdeArr[itr]);                  
                        if(orderformaint){
                            await models.MaintBooking.create({UserID:mypickedslot.dataValues.UserID, 
                            MaintOrderID:orderformaint.dataValues.id,
                            MaintJobId:myramdonMaint.dataValues.id,  dateStartScheduled:BookingDateStart, 
                            dateEndScheduled:BookingDateEnd, isBooked:true});
                        }
                    }
                }
            }
        }
        const myclientteaching= [];
        const mydateteachIt = new Date();
        for (let indextom = 1; indextom <= teachingOrdersArr.length; indextom++) {
            const mytdate = new Date(
            mydateteachIt.getFullYear(),
            mydateteachIt.getMonth(),
            mydateteachIt.getDate() + indextom*2+1
            );
            const arrtindex =indextom-1
            myclientteaching.push({itrteach:arrtindex, appointmenteach:mytdate});
        }
        const myTeachingJobTopick = await models.TeachingJob.findAll({ attributes: ['id','Duration','TaskCode'] });
        if(myTeachingJobTopick &&myTeachingJobTopick .length>0){
            for (const appointeachelm of myclientteaching) {
                const{itrteach, appointmenteach} = appointeachelm;
                const myramdonTeach = getRandomElement(myTeachingJobTopick);
                const availabilitiestdb = await models.Availability.findAll({})
                if(availabilitiestdb&&availabilitiestdb.length>0){
                    const tsktdrtn = myramdonTeach.dataValues.Duration;
                    const appdateteachtopass = new Date(appointmenteach)
                    const datetcorrected =  new Date(appdateteachtopass.getFullYear(), 
                    appdateteachtopass.getMonth(), appdateteachtopass.getDate(), 0, 0, 0);
                    const teachGetDay= datetcorrected.getDay();
                    const appointmentteachslot= filterAvailableTimes(availabilitiestdb, tsktdrtn, teachGetDay)
                    const getttasks = await models.Task.findAll({ where: { TaskCode: myramdonTeach.dataValues.TaskCode } });
                    const arrusersttask = []
                    if(getttasks&&getttasks.length>0){
                        for (const ttsk of getttasks) {
                            const getTasktsIds = await models.UserTask.findAll({ where: { taskID: ttsk.id } });
                            if(getTasktsIds&&getTasktsIds.length>0){
                                for (const elemte of getTasktsIds) {
                                    arrusersttask.push(elemte.UserID)
                                }
                            }
                        }
                    }
                    if(appointmentteachslot&&appointmentteachslot.length>0){
                        const filteredTeachSlots = appointmentteachslot.filter((slot) => arrusersttask.includes(slot.UserID));
                        const mypickedTslot = getRandomElement(filteredTeachSlots);
                        const [hour, minute, second] = mypickedTslot.InitialHour.split(':').map(Number); // Parse the time components
                        const BookingTDateStart = new Date(
                            datetcorrected.getFullYear(),
                            datetcorrected.getMonth(),
                            datetcorrected.getDate(),
                            hour,
                            minute,
                            second || 0
                        );
                        const durationTinmilliseconds = tsktdrtn * 1000;
                        const BookingTDateEnd = new Date(BookingTDateStart.getTime() + durationTinmilliseconds);
                        const orderforteach = await models.T_Order.create(teachingOrdersArr[itrteach]);                  
                        if(orderforteach){
                            await models.TeachingBooking.create({UserID:mypickedTslot.dataValues.UserID, 
                              TeachOrderID:orderforteach.dataValues.id,
                              TeachingJobId:myramdonTeach.dataValues.id,  dateStartScheduled:BookingTDateStart, 
                            dateEndScheduled:BookingTDateEnd, isBooked:true});
                        }
                    }
                }
            }
        }
        console.log('database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        sequelize.close();
    }
};


seedDataBase();

const getRandomTimeRange1 = () => {
    let startHour = 0
    let duration = 0
startHour = Math.floor(Math.random() * (11)) + 6; // Random hour between 8 AM and 3 PM

duration = Math.floor(Math.random() * 6) + 3; // Random duration between 1 and 3 hours
let cointest = Math.floor(Math.random() * (3))
if(duration+startHour>20&&cointest===1){
    duration = 3
    startHour = 17
}
if(duration+startHour>20&&cointest===2){
    duration = 5
    startHour = 14
}
if(duration+startHour>20&&cointest===0){
    duration = 6
    startHour = 12
}


const initialHour = `${String(startHour).padStart(2, '0')}:00:00`;
const finalHour = `${String(startHour + duration).padStart(2, '0')}:00:00`;
return { initialHour, finalHour };
};
const getRandomTimeRange2 = (finalHour2) => {
    let starthourstr=0
    let  durationstr=0
    let I=''
    let F=''
    let overtime = false
    const arrelemF = finalHour2.split(':').map(Number)
    const hoursF = arrelemF[0]
    let cointest = Math.floor(Math.random() * (3))
    if(hoursF<15&&cointest>=1){
        overtime = true
        starthourstr = Math.floor(Math.random() * (5)) + 15; // Random hour between 8 AM and 
        durationstr = Math.floor(Math.random() * 4) + 2; // Random duration between 1 and 3 hours
        if(durationstr+starthourstr>20&&cointest===1){
            durationstr = 2
            starthourstr = 18
        }
        if(durationstr+starthourstr>20&&cointest===2){
            durationstr = 3
            starthourstr = 16
        }
    }
    I = `${String(starthourstr).padStart(2, '0')}:00:00`;
    F = `${String( durationstr + starthourstr).padStart(2, '0')}:00:00`;
    if(overtime===true){
        return {I, F};
    }else{
        return null
    }
};




function generateRandomString(length) {
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
let result = '';
for (let i = 0; i < length; i++) {
result += characters.charAt(Math.floor(Math.random() * characters.length));
}
return result;
}
function createUniquePicker(arr, count) {
if (!Array.isArray(arr) || arr.length === 0 || count > arr.length || count < 0) {
throw new Error('Invalid input: Ensure the array is non-empty and count is within range.');
}
const picked = new Set();
const maxIterations = arr.length * count;
let iterations = 0;
while (picked.size < count && iterations < maxIterations) {
const randomIndex = Math.floor(Math.random() * arr.length);
picked.add(arr[randomIndex]); // Use Set to ensure uniqueness
iterations++;
}
return Array.from(picked); // Convert Set to Array before returning
}

const filterAvailableTimes = (availabilityArray, taskDuration, targetDay) => {

if (!Array.isArray(availabilityArray)) {
throw new Error('Availability data must be an array.');
}
const taskDurationMs = taskDuration

const filtered = availabilityArray.filter((row) => {
if (row.dataValues.WeekDay !== targetDay) return false;

const [hourI, minuteI, secondI] = row.dataValues.InitialHour.split(':').map(Number);
const [hourE, minuteE, secondE] = row.dataValues.FinalHour.split(':').map(Number);

const secondsI = hourI * 3600 + minuteI * 60 + secondI;
const secondsE = hourE * 3600 + minuteE * 60 + secondE;
return secondsE- secondsI >= taskDurationMs;
});

return filtered;
};

function getRandomElement(arr) {
if (!Array.isArray(arr) || arr.length === 0) {
throw new Error('The input must be a non-empty array.');
}
const randomIndex = Math.floor(Math.random() * arr.length);
return arr[randomIndex];
}

function getRandomIntegerInRange(A, B) {
if (A <= 0 || B <= 0 || A >= B) {
throw new Error('Invalid range: Ensure A > 0, B > 0, and A < B.');
}
return Math.floor(Math.random() * (B - A + 1)) + A;
}

   