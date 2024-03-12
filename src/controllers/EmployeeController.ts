import express from "express";
import { EmployeeModel } from "../model/EmployeeModel";

export class EmployeeController {
  getAllEmployee = async (req: express.Request, res: express.Response) => {
    try {
      const employees = await EmployeeModel.find();
      return res.status(200).json({ data: employees });
    } catch (error) {
      return res.status(400);
    }
  };

  getEmployee = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const employee = await EmployeeModel.findById(id);
      return res.status(200).json({ data: employee });
    } catch (error) {
      return res.status(400);
    }
  };

  createEmployee = async (req: express.Request, res: express.Response) => {
    try {
      const employee = await new EmployeeModel(req.body);
      await employee.save();
      return res.status(200).json({ message: "Employee created" });
    } catch (error) {
      return res.status(400);
    }
  };

  createMultipleEmployee = async (req: express.Request, res: express.Response) => {
    try {
      await EmployeeModel.insertMany(req.body);
      return res.status(200).json({ message: "Employees created" });
    } catch (error) {
      return res.status(400);
    }
  };

  updateEmployee = async (req: express.Request, res: express.Response) => {
    try {
      const { name, email, mobile, dob, doj } = req.body;
      const { id } = req.params;
      const employee = await EmployeeModel.findById(id);
      if (employee) {
        employee.name = name;
        employee.email = email;
        employee.mobile = mobile;
        employee.dob = dob;
        employee.doj = doj;
        await employee.save();
        return res
          .status(201)
          .json({ message: "Employee updated", data: employee });
      }
    } catch (error) {
      return res.status(400);
    }
  };

  deleteEmployee = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      await EmployeeModel.findByIdAndDelete({_id: id});
      return res.status(200).json({ message: "Employee deleted" });
    } catch (error) {
      return res.status(400);
    }
  };
}

export default new EmployeeController();