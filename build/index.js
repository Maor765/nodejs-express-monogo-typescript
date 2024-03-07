"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const employeeRoutes_1 = __importDefault(require("./routes/employeeRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config(); // Load environment variables from .env file
const apiKey = process.env.MONOGO_URI; // Retrieve the environment variable
console.log("API Key:", apiKey); // Use the environment variable as needed
const app = (0, express_1.default)();
app.use(express_1.default.json());
const MONOGO_URL = "mongodb://127.0.0.1:27017";
const PORT = process.env.PORT || 3000;
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(apiKey, {
    dbName: "node-typescript-app",
})
    .then((r) => {
    // console.log(`database connected ${stringify(r)}`);
    console.log(`database connected: ${r.connections[0].host}`);
})
    .catch((error) => {
    console.log(error);
    process.exit(1);
});
app.use("/", employeeRoutes_1.default);
app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
});
function stringify(obj) {
    let cache = [];
    let str = JSON.stringify(obj, function (key, value) {
        if (typeof value === "object" && value !== null) {
            if (cache.indexOf(value) !== -1) {
                // Circular reference found, discard key
                return;
            }
            // Store value in our collection
            cache.push(value);
        }
        return value;
    });
    cache = null; // reset the cache
    return str;
}
//# sourceMappingURL=index.js.map