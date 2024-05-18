import { Student } from "../student.model";
import { TStudent } from "./student.interface";

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student); // built in mongoose static method
  // built in instance method
  const student = new Student(studentData); //create an instance
  const isExists = await student.isUserExists(studentData.id as string);

  if (isExists) {
    throw new Error("Duplicate key error: ID must be unique");
  }
  const result = await student.save();
  return result;
};
const getAllStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};
// get student by id
const getStudentById = async (id: string) => {
  const result = await Student.find({ id });
  return result;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getStudentById,
};
