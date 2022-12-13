"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleSchema = void 0;
const mongoose_1 = require("mongoose");
exports.RoleSchema = new mongoose_1.Schema({
    rol: {
        type: String,
        required: [true, "El rol es obligatorio"],
    },
});
exports.default = (0, mongoose_1.model)("Usuario", exports.RoleSchema);
