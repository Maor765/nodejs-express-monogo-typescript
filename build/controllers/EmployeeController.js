"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeController = void 0;
const EmployeeModel_1 = require("../model/EmployeeModel");
class EmployeeController {
    constructor() {
        this.getAllEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield EmployeeModel_1.EmployeeModel.find();
                return res.status(200).json({ data: employees });
            }
            catch (error) {
                return res.status(400);
            }
        });
        this.getEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const employee = yield EmployeeModel_1.EmployeeModel.findById(id);
                return res.status(200).json({ data: employee });
            }
            catch (error) {
                return res.status(400);
            }
        });
        this.createEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, mobile, dob, doj } = req.body;
                const employee = yield new EmployeeModel_1.EmployeeModel({ name, email, mobile, dob, doj });
                yield employee.save();
                return res.status(200).json({ message: "Employee created" });
            }
            catch (error) {
                return res.status(400);
            }
        });
        this.updateEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, mobile, dob, doj } = req.body;
                const { id } = req.params;
                const employee = yield EmployeeModel_1.EmployeeModel.findById(id);
                if (employee) {
                    employee.name = name;
                    employee.email = email;
                    employee.mobile = mobile;
                    employee.dob = dob;
                    employee.doj = doj;
                    yield employee.save();
                    return res
                        .status(201)
                        .json({ message: "Employee updated", data: employee });
                }
            }
            catch (error) {
                return res.status(400);
            }
        });
        this.deleteEmployee = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                yield EmployeeModel_1.EmployeeModel.findByIdAndDelete({ _id: id });
                return res.status(200).json({ message: "Employee deleted" });
            }
            catch (error) {
                return res.status(400);
            }
        });
    }
}
exports.EmployeeController = EmployeeController;
exports.default = new EmployeeController();
//# sourceMappingURL=EmployeeController.js.map