import { StudentModel } from "../student.model";
import { Student } from "./student.interface";

const createStudentIntoDB = async (student: Student) => {
  const result = await StudentModel.create(student);
  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};
// get student by id
const getStudentById = async (id: string) => {
  const result = await StudentModel.find({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentById,
};
