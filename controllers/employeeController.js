import { validationResult } from "express-validator";
import HttpError from "../middlewares/httpError.js";
import Employee from "../models/employ.js";
import fs from "fs" 

export const createEmployee = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty() ) {
            console.log(errors)
            return next( new HttpError( "Something went wrong...", 422 ) )
        } else {
            // const { role } = req.userData;
            const { 
                name, 
                email, 
                phone_number, 
                designation, 
                course, 
                gender, 
                    } = req.body;

            const image = req.file ? process.env.BASE_URL + "profile_images/" + req.file.filename : null;
    
            // if ( role === 'admin'){
                const newEmployee = new Employee({
                    name, 
                    email, 
                    phone_number, 
                    designation, 
                    course, 
                    gender, 
                    image
                   });
               
                   const savedEmployee = await newEmployee.save();
         
                   if ( ! savedEmployee ){
                     return next(new HttpError("Oops! Process failed, please do contact admin", 500));
                   } else{ 
                       res.status(201).json({
                         status: true,
                         message: '',
                         data: savedEmployee,
                         access_token: null
                       });
                   }
            // } else {
            //     return next( new HttpError( "Access denied!!", 500 ) );
            // }
        }
    } catch (error) {
        console.log(error.message)
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
}

export const listEmployees = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty() ) {
            return next(new HttpError("Something went wrong...", 422))
        } else {
        const { q } = req.body
        let query = {isDeleted : false}
        if( q ){
            const searchValue = q.toLowerCase()
            query.$or=[
                { name : { $regex: searchValue, $options: "i" }},
                {email : { $regex: searchValue, $options: "i" }},
                {designation : { $regex: searchValue, $options: "i" }}
            ]
          

        }
        // if( price ){
        //     query.price = { $lte : price }
        // }
        // if( star_rating ){
        //     query.star_rating = star_rating
        // }


            const employees = await Employee.find(query) 


            res.status(200).json({
                status: true,
                message: '',
                data: employees,
                access_token: null
            })
        }
    } catch (err) {
        return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) )
    }
}

export const deleteEmployee = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty() ) {
            return next( new HttpError( "Something went wrong...", 422 ))
        } else {
            // const { role } = req.userData
            const { emp_id } =req.body;

            // if ( role === 'admin' ) {
                await Employee.findOneAndUpdate(
                    { _id :emp_id },
                    { isDeleted : true },
                    { new : true }
                    )
                res.status(200).json({  
                    status: true,
                    message: 'Employee deleted',
                    data: null,
                    access_token: null 
                })
            // } else {
            //     return next( new HttpError( "Access denied!!", 500 ) );
            // }
        }
    } catch ( error ) {
        return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
    }
}

export const editEmployee = async(req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty() ) {
            return next( new HttpError( "Something went wrong...", 422 ) )
        } else {
            // const { role } = req.userData
            // const { bookid } = req.params
            const { 
                name, 
                email, 
                phone_number, 
                designation, 
                course, 
                gender,
                emp_id,
                isStatus
                } = req.body;

         console.log(req.body,"llllllllllllllllll")
            // if ( role === 'admin'){
                const employeeData = await Employee.findOne({ _id : emp_id })
                const image = req.file ? 
                         process.env.BASE_URL + "/profile_images/" + req.file.filename : 
                         employeeData.image
                if ( req.file && employeeData.image !== null ) {
                    const prevImgPath = employeeData.image.slice(22)
                    fs.unlink(`./uploads/${ prevImgPath }`, (err) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                    })
                } 
                const editEmployee = await Employee.findOneAndUpdate(
                    { _id: emp_id },
                    { 
                        name, 
                        email, 
                        phone_number, 
                        designation, 
                        course, 
                        gender,
                        image,
                        isStatus
                     },
                     { new : true})
                if ( ! editEmployee ){
                    return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
                } else {
                    res.status(200).json({  
                        status: true,
                        message: '',
                        data: editEmployee,
                        access_token: null
                    })
                }
            // } else {
            //     return next( new HttpError( "Access denied!!", 500 ) );
            // }
            
        }
    } catch ( error ) {
        console.log(error.message,"hhhhhhhhhh")
        return next(new HttpError("Oops! Process failed, please do contact admin", 500));
    }
}

export const viewEmployee = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty() ) {
            return next( new HttpError( "Something went wrong...", 422 ) )
        } else {
            const { emp_id } = req.body
            let viewEmployee = await Employee.findOne({ _id: emp_id })
            res.status(200).json({
                status: true,
                message: '',
                data: viewEmployee,
                access_token: null
            })
        }
    } catch (error) {
        console.log(error.message)
        return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
        
    }
}

export const password = async (req, res, next) => {
    try {
        const errors = validationResult(req)
        if (! errors.isEmpty() ) {
            return next( new HttpError( "Something went wrong...", 422 ) )
        } else {
            let insertPassword = await Employee.updateMany({},{ password: null })
            res.status(200).json({
                status: true,
                message: 'password inserted',
                data: null,
                access_token: null
            })
        }
    } catch (error) {
        console.log(error.message)
        return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
        
    }
}