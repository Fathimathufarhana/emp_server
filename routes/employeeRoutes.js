import express from "express";
import { upload } from "../middlewares/multer/fileUpload.js";
import { check } from "express-validator";
import { createEmployee, deleteEmployee, editEmployee, listEmployees, password, viewEmployee } from "../controllers/employeeController.js";
import authCheck from "../middlewares/authCheck.js";


const router = express.Router()

router.post("/list", listEmployees)
router.post("/view",viewEmployee)
router.post("/updatepassword",password)



// router.use(authCheck);

router.post("/create", upload.single('image'),
[
  check('name').not().isEmpty(),
  check('email').not().isEmpty(),
  check('phone_number').not().isEmpty(),
  check('designation').not().isEmpty(),
  check('course').not().isEmpty(),
  check('gender').not().isEmpty(),
  // check('image').not().isEmpty(),
], createEmployee);

router.patch("/edit", upload.single('image'), editEmployee)

router.patch("/delete",[check('emp_id').not().isEmpty()], deleteEmployee)


export default router
