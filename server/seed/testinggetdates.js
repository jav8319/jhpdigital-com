const sequelize = require('../config/connection');
const  models  = require('../models');
const { Op } = require('sequelize');

const taskcodetopass = [
	{
		"id" : 1,
		"task_code" : "KLG421",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 2,
		"task_code" : "B5BH8J",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 3,
		"task_code" : "OJHTBX",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 4,
		"task_code" : "GJWWS4",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 5,
		"task_code" : "RUFOD4",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 6,
		"task_code" : "SHQ9L4",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 7,
		"task_code" : "YFTFX3",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 8,
		"task_code" : "89H22L",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 9,
		"task_code" : "JEPLWG",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 10,
		"task_code" : "QXGDZH",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 11,
		"task_code" : "A3Y48C",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 12,
		"task_code" : "1VMSZ9",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 13,
		"task_code" : "HMDGGF",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 14,
		"task_code" : "A8MOA5",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 15,
		"task_code" : "RJ0RJN",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 16,
		"task_code" : "780KOA",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 17,
		"task_code" : "QN9274",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 18,
		"task_code" : "1EI9SX",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	},
	{
		"id" : 19,
		"task_code" : "Q146VZ",
		"created_at" : "2024-12-17 13:18:16",
		"updated_at" : "2024-12-17 13:18:16"
	}
]
const mytaskfromfrontend=getRandomUniqueObjects(taskcodetopass,2)

const mytttttt = mytaskfromfrontend.map((task) => task.task_code)

//passed from frontend
const objcityprovince = {cityID:1,provinceID:1}//passed from frontend

function getColombiaTimeInUtcMilliseconds() {
// Get the current date and time in UTC
const now = new Date();

// Get the UTC time in milliseconds
const utcMilliseconds = now.getTime();

// Calculate the offset for Colombia (UTC-5) in milliseconds
const colombiaOffset = -5 * 60 * 60 * 1000; // -5 hours to milliseconds

// Adjust the UTC time to Colombia time
const colombiaTimeInUtcMilliseconds = utcMilliseconds + colombiaOffset;

return colombiaTimeInUtcMilliseconds;
}

async function findmetechinician() {
try{

const mycolcurrent = getColombiaTimeInUtcMilliseconds();

const mydateobj = new Date(mycolcurrent);

//filter by task code
let codestofindandcheck=[]
for (const elempassed of mytttttt) {
const taskcodestab = await models.Task.findOne({where:{TaskCode:elempassed}});

if(taskcodestab){
codestofindandcheck.push(taskcodestab.dataValues.id)
}
}

let userIdsTofilter = []

for (const element of codestofindandcheck) {

const userTasks = await models.UserTask.findAll({where:{taskID:element, isApproved:true}});
if(userTasks){

userIdsTofilter=[...userIdsTofilter,...userTasks.map((userTask) => userTask.dataValues.UserID)]
}

}


//filter by city and provice
const getuserscityprovince = await models.User.findAll({where:{CityID:objcityprovince.cityID,ProvinceID:objcityprovince.provinceID,isLive:true}});
//filte day
const getallusersavailability = await models.Availability.findAll({where:{WeekDay:mydateobj.getDay()}});

//filter by available time
const colcurrenttimeEnd = new Date( mycolcurrent );
colcurrenttimeEnd.setDate(mydateobj.getDate()); 
const filteredBookings = await models.MaintBooking.findAll({
where: {
dateStartScheduled: {
[Op.gte]: mydateobj,      
[Op.lt]: colcurrenttimeEnd,
},
isBooked: true,                  
},
});





const filterAvailableTimes = getallusersavailability.filter((avail) => {

const{ InitialHour, FinalHour} = avail
//initial hour: 08:00:00
//final hour: 17:00:00


const[inith,initmin,initsec]= InitialHour.split(':').map(Number)
const[ffinalh,ffinalmin, ffinalsec] = FinalHour.split(':').map(Number)

const datetoconvert = new Date( mycolcurrent );

const datetoworki= new Date(datetoconvert.getFullYear(), datetoconvert.getMonth(), datetoconvert.getDate(), inith,initmin,initsec,0)
const datetoworkf= new Date(datetoconvert.getFullYear(), datetoconvert.getMonth(), datetoconvert.getDate(), ffinalh,ffinalmin,ffinalsec,0)

return userIdsTofilter.includes(avail.dataValues.UserID)&&
getuserscityprovince.some((user) => user.dataValues.id === avail.dataValues.UserID)&&
!filteredBookings.some((booking) => booking.dataValues.UserID === avail.dataValues.UserID)
&&datetoconvert.getTime()>=datetoworki.getTime()&&datetoconvert.getTime()<=datetoworkf.getTime();

})

console.log('*************filterAvailableTimes**********',filterAvailableTimes)
let technician = null
if(filterAvailableTimes.length>0){

technician=getRandomElement(filterAvailableTimes)



}else{
    technician = 'lo sentimos no hay tecnicos disponibles en el momento'
}


return console.log('******este es mi tecnico***********',technician)


} catch (error) {
console.error('Error testing getting available technician:', error);
} finally {
sequelize.close();
}
};

findmetechinician();
function getRandomElement(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
    throw new Error('The input must be a non-empty array.');
    }
    const randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
    }

    function getRandomUniqueObjects(Arrobs, A) {
        if (!Array.isArray(Arrobs) || typeof A !== 'number') {
          throw new Error('Invalid arguments. Arrobs must be an array and A must be a number.');
        }
        
        if (A > Arrobs.length) {
          throw new Error('A cannot be greater than the number of objects in Arrobs.');
        }
      
        // Use a Set to ensure unique object IDs
        const uniqueObjects = new Set();
      
        while (uniqueObjects.size < A) {
          const randomIndex = Math.floor(Math.random() * Arrobs.length); // Random index
          const randomObject = Arrobs[randomIndex];
          
          // Ensure IDs are unique
          uniqueObjects.add(randomObject);
        }
      
        return Array.from(uniqueObjects);
      }

   


    // Sample array
    let fruits = ['Apple', 'Banana', 'Cherry', 'Date', 'Fig', 'Grape'];
    
    // 1. indexOf: Find the index of an element in an array
    let fruitToRemove = 'Cherry';
    let index = fruits.indexOf(fruitToRemove);
    if (index !== -1) {
      console.log(`Found fruitToRemove at index: index`);
    } else {
      console.log(`fruitToRemove not found in the array.`);
    }
    
    // 2. splice: Remove the element if found
    if (index !== -1) {
     fruits.splice(index, 1); // Removes 1 element at the found index
      console.log(`Removed: removed`);
      console.log(`Updated fruits array:`, fruits);
    }
    
    // 3. splice: Add elements at a specific position
    fruits.splice(2, 0, 'Kiwi', 'Lemon'); // Inserts elements at index 2 without removing anything
    console.log(`After adding Kiwi and Lemon:`, fruits);
    
    // 4. join: Convert the array into a string
    let fruitString = fruits.join(' | '); // Joins array elements with a '|' separator
    console.log(`Joined fruits string: fruitString`);
    
    // 5. Complex Example: Remove all instances of a specific element using splice and indexOf
    let fruitToRemoveAll = 'Banana';
    while (fruits.indexOf(fruitToRemoveAll) !== -1) {
      let removeIndex = fruits.indexOf(fruitToRemoveAll);
      fruits.splice(removeIndex, 1);
      console.log(`Removed fruitToRemoveAll at index removeIndex`);
    }
    console.log(`Final fruits array after removing all 'fruitToRemoveAll':`, fruits);