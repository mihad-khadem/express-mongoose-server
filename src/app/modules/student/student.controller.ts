// student.controller.ts
import { Request, Response } from "express";
import { StudentServices } from "./student-service";
import { Student } from "./student.interface";

const createStudent = async (req: Request, res: Response) => {
  try {
    const student: Student = req.body.student;
    const result = await StudentServices.createStudentIntoDB(student);
    res.status(200).json({
      success: true,
      message: "Student created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: { error },
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
      message: { error },
    });
  }
};
// get student by id
const getStudentById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const result = await StudentServices.getStudentById(id);
    res.status(200).json({
      success: true,
      message: "Student fetched by id ",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: { error },
    });
  }
};

export const StudentController = {
  createStudent,
  getAllStudents,
  getStudentById,
};
