import { validationResult } from "express-validator";
import HttpError from "../middlewares/httpError.js";
// import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import Employee from "../models/employ.js";



export const login = async (req, res, next) => {
    try {
        const errors = validationResult(req);    
        
        const { email, password }  = req.body 
        
        
        if ( !errors.isEmpty() ) {
            return next( new HttpError(
              "Invalid data inputs passed, Please check your data before retry!",
              422 
              ));
        } 
           
            const user = await Employee.findOne({ email: email });
            if ( !user ) {
                return next( new HttpError( "Invalid credentials",400 ) )
            } 
            if ( password !== user.password ) {
                return next( new HttpError( "Invalid credentials",400 ) )
            }
            const token = jwt.sign(
                { userId : user._id, userEmail : user.email, role : user.role }, 
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_TOKEN_EXPIRY }
                 );
                //  res.json({result:user,token:token});
               res.status(200).json({
                 status : true,
                 message : 'Login successful',
                 access_token : token,
                 result:user
               })
        // }
    } catch (error) {
        console.log(error,"logiinn")
        return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
    }
}

export const authConfirmTest = async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if ( ! errors.isEmpty() ) {

        return next( new HttpError( 
          "Invalid data inputs passed, Please check your data before retry!",
          422 
          ));
      } else {
        const { userId } = req.userData 
         res.status(200).json({
                status : true,
                message : '',
                data: userId,
                access_token : null
              })
          }
    } catch ( error ) {
      return next( new HttpError( "Oops! Process failed, please do contact admin", 500 ) );
    }
  };