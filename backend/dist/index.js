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
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("express-async-errors");
const dotenv_1 = __importDefault(require("dotenv"));
const errors_middleware_1 = require("./middlewares/errors.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)({
    credentials: true,
    origin: process.env.CORS_ORIGIN,
}));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use(errors_middleware_1.errorHandler);
app.use("/api/v1/admin/quizes", quiz_route_1.default);
app.use("/api/v1/admin/auth", auth_route_1.default);
app.use("/api/v1/openai", openai_route_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
