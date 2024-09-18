"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quiz_route_1 = __importDefault(require("./routes/quiz.route"));
const cors_1 = __importDefault(require("cors"));
const openai_route_1 = __importDefault(require("./routes/openai.route"));
const auth_route_1 = __importDefault(require("./routes/auth.route"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use("/api/v1/admin/quizes", quiz_route_1.default);
app.use("/api/v1/admin/auth", auth_route_1.default);
app.use("/api/v1/openai", openai_route_1.default);
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
