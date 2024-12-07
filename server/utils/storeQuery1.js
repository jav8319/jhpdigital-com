const fs = require('fs');

const transformData = (data) => {
let result = {};

data.forEach((row) => {
  const { ProID,CtgryID,ProName, ProDescrptn, price, image_url, attribute_name, attribute_value } = row;

  if (!result[ProID]) {
    result[ProID] = {
    ProID,
    CtgryID,
    ProName,
    ProDescrptn,
    Color:[],
    Images: [],
    Prices: [],
    Attributes:[]
    };
  }
  if (image_url) {
    if(!result[ProID].Images.includes(image_url)){
      result[ProID].Images.push(image_url);
    }
  }
  if (price) {
    if(!result[ProID].Prices.includes(price)){
      result[ProID].Prices.push(price);
    }
  }
  if (attribute_name && attribute_value) {    
    if(attribute_name === 'color'){
      if(!result[ProID].Color.includes(attribute_value)){
        result[ProID].Color.push(attribute_value);
      }
    }else{
      if(result[ProID].Attributes.length === 0){
        result[ProID].Attributes.push({name:attribute_name, valueAttr:[attribute_value]});
      }else{
        const myattrs=result[ProID].Attributes.find((attr) => attr.name === attribute_name);
        if(myattrs){
          let myattrvalues=[]
          myattrvalues = myattrs.valueAttr
          if(!myattrvalues.includes(attribute_value)){
            myattrvalues.push(attribute_value);
            let arrtofilter = result[ProID].Attributes.filter((attr) => attr.name !== attribute_name);
            arrtofilter.push({name:attribute_name, valueAttr:myattrvalues});
            result[ProID].Attributes = arrtofilter;
          }
        }
      }
    }
  }
})
  
  return Object.values(result)

};

fs.readFile('./ProdsAttrsImgsCodes.json', 'utf8', (err, data) => {
  if (err) throw err;
  const rawData = JSON.parse(data);
  const transformedData = transformData(rawData);


  fs.writeFile('./TransformedData.json', JSON.stringify(transformedData, null, 2), (err) => {
    if (err) throw err;
    console.log('Data transformed successfully!');
  });
});


