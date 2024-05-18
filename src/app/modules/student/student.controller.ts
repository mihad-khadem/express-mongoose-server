import { Request, Response } from "express";
import { StudentServices } from "./student-service";
import { Student } from "./student.interface";
import Joi from "joi";

// Joi schema for validation
const joiSchema = Joi.object({
  id: Joi.string().required().messages({
    "string.base": `ID should be a type of 'text'`,
    "string.empty": `ID cannot be an empty field`,
    "any.required": `ID is a required field`,
  }),
  name: Joi.object({
    firstName: Joi.string().required().messages({
      "string.base": `First name should be a type of 'text'`,
      "string.empty": `First name cannot be an empty field`,
      "any.required": `First name is a required field`,
    }),
    lastName: Joi.string().required().messages({
      "string.base": `Last name should be a type of 'text'`,
      "string.empty": `Last name cannot be an empty field`,
      "any.required": `Last name is a required field`,
    }),
    middleName: Joi.string().optional(),
  }).required(),
  gender: Joi.string().valid("male", "female").required().messages({
    "any.only": `Gender must be either 'male' or 'female'`,
    "any.required": `Gender is a required field`,
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    "string.email": `Email must be a valid email`,
    "any.required": `Email is a required field`,
  }),
  contactNo: Joi.string().required().messages({
    "string.base": `Contact number should be a type of 'text'`,
    "string.empty": `Contact number cannot be an empty field`,
    "any.required": `Contact number is a required field`,
  }),
  emergencyContactNo: Joi.string().required().messages({
    "string.base": `Emergency contact number should be a type of 'text'`,
    "string.empty": `Emergency contact number cannot be an empty field`,
    "any.required": `Emergency contact number is a required field`,
  }),
  bloodGroup: Joi.string()
    .valid("A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-")
    .optional(),
  presentAddress: Joi.string().required().messages({
    "string.base": `Present address should be a type of 'text'`,
    "string.empty": `Present address cannot be an empty field`,
    "any.required": `Present address is a required field`,
  }),
  permanentAddress: Joi.string().required().messages({
    "string.base": `Permanent address should be a type of 'text'`,
    "string.empty": `Permanent address cannot be an empty field`,
    "any.required": `Permanent address is a required field`,
  }),
  guardian: Joi.object({
    fatherName: Joi.string().required().messages({
      "string.base": `Father's name should be a type of 'text'`,
      "string.empty": `Father's name cannot be an empty field`,
      "any.required": `Father's name is a required field`,
    }),
    fatherOccupation: Joi.string().required().messages({
      "string.base": `Father's occupation should be a type of 'text'`,
      "string.empty": `Father's occupation cannot be an empty field`,
      "any.required": `Father's occupation is a required field`,
    }),
    fatherContactNo: Joi.string().required().messages({
      "string.base": `Father's contact number should be a type of 'text'`,
      "string.empty": `Father's contact number cannot be an empty field`,
      "any.required": `Father's contact number is a required field`,
    }),
    motherName: Joi.string().required().messages({
      "string.base": `Mother's name should be a type of 'text'`,
      "string.empty": `Mother's name cannot be an empty field`,
      "any.required": `Mother's name is a required field`,
    }),
    motherOccupation: Joi.string().required().messages({
      "string.base": `Mother's occupation should be a type of 'text'`,
      "string.empty": `Mother's occupation cannot be an empty field`,
      "any.required": `Mother's occupation is a required field`,
    }),
    motherContactNo: Joi.string().required().messages({
      "string.base": `Mother's contact number should be a type of 'text'`,
      "string.empty": `Mother's contact number cannot be an empty field`,
      "any.required": `Mother's contact number is a required field`,
    }),
  }).required(),
  localGuardian: Joi.object({
    name: Joi.string().required().messages({
      "string.base": `Local guardian's name should be a type of 'text'`,
      "string.empty": `Local guardian's name cannot be an empty field`,
      "any.required": `Local guardian's name is a required field`,
    }),
    occupation: Joi.string().required().messages({
      "string.base": `Local guardian's occupation should be a type of 'text'`,
      "string.empty": `Local guardian's occupation cannot be an empty field`,
      "any.required": `Local guardian's occupation is a required field`,
    }),
    contactNo: Joi.string().required().messages({
      "string.base": `Local guardian's contact number should be a type of 'text'`,
      "string.empty": `Local guardian's contact number cannot be an empty field`,
      "any.required": `Local guardian's contact number is a required field`,
    }),
    address: Joi.string().required().messages({
      "string.base": `Local guardian's address should be a type of 'text'`,
      "string.empty": `Local guardian's address cannot be an empty field`,
      "any.required": `Local guardian's address is a required field`,
    }),
  }).required(),
  profileImg: Joi.string().optional(),
  isActive: Joi.string().valid("active", "blocked").default("active").messages({
    "any.only": `Status must be either 'active' or 'blocked'`,
  }),
});

const createStudent = async (req: Request, res: Response) => {
  try {
    const { error, value } = joiSchema.validate(req.body.student, {
      abortEarly: false,
    });

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details.map((detail) => detail.message).join(", "),
      });
    }

    const result = await StudentServices.createStudentIntoDB(value);
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: "Students fetched successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

const getStudentById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.getStudentById(id);
    res.status(200).json({
      success: true,
      message: "Student fetched by id",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error instanceof Error ? error.message : String(error),
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getStudentById,
};
