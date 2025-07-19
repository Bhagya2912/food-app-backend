import categoryModel from '../models/categoryModel.js';

//create Category
export const createCatController =async (req,res) => {
    try {
        const {title,imageUrl} = req.body;
        //validation
        if(!title || !imageUrl){
            return res.status(500).send({
                success:false,
                message:'Please Provide category title or image',
            });
        }
        const newCategory = new categoryModel({title,imageUrl})
        await newCategory.save()
        res.status(201).send({
            success:true,
            message:'category created',
            newCategory,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error In Create Cat API',
            error,
        })
    }
}

//get all category
export const getAllCatController =async(req,res) => {
    try {
        const categories = await categoryModel.find({})
            if(!categories){
                return res.status(404).send({
                    success:false,
                    message:'No Categories found',
                })
            }
        res.status(200).send({
            success:true,
            totalCat:categories.length,
            categories,
        })
    } catch (error) {
        console.log(error)
        res.send(500).status({
             success:false,
             message:'Error in get All Category API',
             error,
        })
    }
}

//update all
export const updateCatController =async (req,res) => {
    try {
        const {id} =req.params;
        const {title,imageUrl} = req.body;
        const updatedCategory =await categoryModel.findByIdAndUpdate(id,{title,imageUrl},{new:true});
        if(!updatedCategory){
            return res.status(500).send({
                success:false,
                message:'No category found',
            })
        }
        res.status(200).send({
            success:true,
            message:'Category Updated Successfully',
        })

    } catch (error) {
        console.log(error)
         res.status(500).send({
            success:false,
            message:'Error update cat APi',
            error,
         })
    }
}

//delet cat
export const deleteCatContoller =async (req,res) => {
    try {
        const {id} = req.params;
        if(!id){
            return res.status(500).send({
                success:false,
                message:'Please Provide Cat ID',
            })
        }
        const category = await categoryModel.findById(id)
        if(!category){
            return res.status(500).send({
                success:false,
                message:'No category FoundWith this id',
            })
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"category Deleted Successfully",
        });
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in delete Cat API',
            error,
        })
    }
}