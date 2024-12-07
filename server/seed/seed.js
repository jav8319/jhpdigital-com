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
                                myprcode = await models.ProdCode.create({ProdCode, Price, Stock, ProductID:mymodeltocreate.dataValues.id});
                                if (AttrNameVal && AttrNameVal.length > 0) {
                                    for (const elementAttrNameVal of AttrNameVal) {
                                        const { AttributeName, Value } = elementAttrNameVal;                            
                                        const findmyattrid = await models.ListAttribute.findOne({ where: { AttributeName } });
                                        if (findmyattrid) {
                                            await models.ProductAttribute.create({
                                                codeID: myprcode.dataValues.id, AttributeID: findmyattrid.dataValues.id, AttributeValue:Value
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
                {codeID:myidrandon.dataValues.id, P_OrderID:ordertocreate.dataValues.id, ProductQty:getRandomIntegerInRange(1,4)});
            }
        }
    }
 const myuserscreated =   await models.User.bulkCreate(users, { individualHooks: true })

 const availabilities = [];

    if(myuserscreated&&myuserscreated.length>0){

        for (let userId = 1; userId <= myuserscreated.length; userId++) {
            for (let day = 1; day <= 7; day++) {
                // Generate up to two random time ranges per day
                const range1 = getRandomTimeRange();
                const range2 = getRandomTimeRange();

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
                    InitialHour: range2.initialHour,
                    FinalHour: range2.finalHour,
                }
                );
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
  for (let index1 = 1; index1 <=teachinTask+maintenanceTask; index1++) {
      const codetoadd1 = { TaskCode: generateRandomString(6) }
      CodesT.push(codetoadd1) 
  }

  await models.Task.bulkCreate(CodesT)
  const taskcodesarr = await models.Task.findAll({ attributes: ['id'] });



  await models.MaintenanceJob.bulkCreate(maintenanceJobs);
  await models.TeachingJob.bulkCreate(teachingJobs);



    for (let index2 = 1; index2 <=myuserscreated.length; index2++) {

        const howmanytasks= getRandomIntegerInRange(mintask,maxtask)

        const mypickedtasks = createUniquePicker(taskcodesarr, howmanytasks);

        for (const elementpicked of mypickedtasks) {
            await models.UserTask.create({ UserID: index2, taskID: elementpicked.id, isApproved: true});
        }
    }



//     const myclientdates = [];
//     const mydatetoiterate = new Date();
    
//     // Formatter for Colombian time
//     const formatter = new Intl.DateTimeFormat('en-US', {
//       timeZone: 'America/Bogota',
//       year: 'numeric',
//       month: '2-digit',
//       day: '2-digit',
//       hour: '2-digit',
//       minute: '2-digit',
//       second: '2-digit',
//     });
    
//     for (let index3 = 0; index3 <= 12; index3++) {
//       const mydate = new Date(
//         mydatetoiterate.getFullYear(),
//         mydatetoiterate.getMonth(),
//         mydatetoiterate.getDate() + index3 * 2
//       );
    
//       // Format date to Colombian time
//       const formattedDate = formatter.format(mydate);
//       myclientdates.push(formattedDate);
//     }


//      for (const appointment of myclientdates) {
// const myteachingjobtopick = await models.TeachingJob.findAll({ attributes: ['id'] });

//         const myramdonteaching = getRandomElement(myteachingjobtopick);
//         const dateAt8AM = new Date( appointment);
//         dateAt8AM.setHours(8, 0, 30, 0); // Set to 8:00 AM (hours, minutes, seconds, milliseconds)

//         const dateAt10PM = new Date(date);
//         dateAt10PM.setHours(18, 0, 30, 0); 
        
//  let mybusyusersteaching = await models.TeachingBooking.findAll({attributes: ['id'],where:{[Op.and]: [{ dateStartScheduled: {
//     [Op.gt] : dateAt8AM
//           }, },
//         {      dateStartScheduled: {
//             [Op.lte]: dateAt10PM
//           }, }
//       ],
//     },
//   });
//  let mybusyusersmaint = await models.MaintBooking.findAll({ attributes: ['id'],where:{[Op.and]: [{ dateStartScheduled: {

//     [Op.gt] : dateAt8AM
//           }, },
//         {     dateStartScheduled: {
//             [Op.lte]: dateAt10PM
//           }, }
//       ],

//     },
    
//   });



// const availabilitiesdb = await models.Availability.findAll({})


// const availableUsers = availabilitiesdb.filter((availability) => {
// let findit = mybusyusersteaching.find((busy) => busy.id === availability.UserID);
// let findit2 = mybusyusersmaint.find((busy) => busy.id === availability.UserID);

// return !findit && !findit2;

// })


// if (availableUsers.length > 0) {
// const filtermyday = availableUsers.filter((availability) => {
// return availability.WeekDay === appointment.getDay();
// })

// if (filtermyday.length > 0) {

// }


// }



//      }





        console.log('database seeded successfully');
    } catch (error) {
        console.error('Error seeding database:', error);
    } finally {
        sequelize.close();
    }
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

const getRandomTimeRange = () => {
    const startHour = Math.floor(Math.random() * (16 - 8)) + 8; // Random hour between 8 AM and 3 PM
    const duration = Math.floor(Math.random() * 3) + 1; // Random duration between 1 and 3 hours
    const initialHour = `${String(startHour).padStart(2, '0')}:00:00`;
    const finalHour = `${String(startHour + duration).padStart(2, '0')}:00:00`;
  
    return { initialHour, finalHour };
  };

  function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  }

seedDataBase();


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
