const sequelize = require('../config/connection');
const  models  = require('../models');
// const { Op } = require('sequelize');
const myproducts = require('./ProductList');
const myAttrsSpecs = require('./ProAttrSpecs');

seedProducts = async () => {
    try {
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
                                if(SpecNameVal&&SpecNameVal.length>0){
                                    for (const elementSpecNameVal of SpecNameVal) {
                                        const {SpecName, Value} = elementSpecNameVal
                                        const findmyspecid= await models.Spec.findOne({ where: { SpecName } });
                                        if(findmyspecid){
                                            await models.ProductSpec.create(
                                                {
                                                    ProductID:mymodeltocreate.dataValues.id, 
                                                    SpecID:findmyspecid.dataValues.id, 
                                                    Value
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
                                                codeID: myprcode.dataValues.id, AttributeID: findmyattrid.dataValues.id, Value
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
        console.log('products created successfully');
    } catch (error) {
        console.error('Error creating products:', error);
    } finally {
        sequelize.close();
    }
};

seedProducts();



