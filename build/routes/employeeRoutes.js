"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const EmployeeController_1 = __importDefault(require("../controllers/EmployeeController"));
const router = express_1.default.Router();
router.get('/employee', EmployeeController_1.default.getAllEmployee);
router.get('/employee/:id', EmployeeController_1.default.getEmployee);
router.post('/employee', EmployeeController_1.default.createEmployee);
router.put('/employee/:id', EmployeeController_1.default.updateEmployee);
router.delete('/employee/:id', EmployeeController_1.default.deleteEmployee);
exports.default = router;
//# sourceMappingURL=employeeRoutes.js.map