"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const client_1 = require("@prisma/client");
const user_validation_1 = require("./user.validation");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const router = express_1.default.Router();
router.post("/", (0, validateRequest_1.default)(user_validation_1.userValidation.registerUser), user_controller_1.userController.registerUser);
router.get('/', (0, auth_1.default)(client_1.Role.SUPER_ADMIN, client_1.Role.ADMIN, client_1.Role.MODERATOR), user_controller_1.userController.getAllUserFromDB);
router.get('/all-donors', user_controller_1.userController.getAllDonorFromDB);
router.get('/me', (0, auth_1.default)(client_1.Role.SUPER_ADMIN, client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.USER), user_controller_1.userController.getMyProfile);
router.get('/:id', 
// auth(Role.SUPER_ADMIN, Role.ADMIN, Role.MODERATOR, Role.USER),
user_controller_1.userController.getSingleProfile);
router.patch('/:id/role', 
// auth(Role.SUPER_ADMIN, Role.ADMIN),
(0, validateRequest_1.default)(user_validation_1.userValidation.changeRole), user_controller_1.userController.changeRole);
router.patch('/:id/status', (0, auth_1.default)(client_1.Role.SUPER_ADMIN, client_1.Role.ADMIN), (0, validateRequest_1.default)(user_validation_1.userValidation.changeStatus), user_controller_1.userController.changeStatus);
router.patch("/update-my-profile", (0, auth_1.default)(client_1.Role.SUPER_ADMIN, client_1.Role.ADMIN, client_1.Role.MODERATOR, client_1.Role.USER), (0, validateRequest_1.default)(user_validation_1.userValidation.updateMyProfile), user_controller_1.userController.updateMyProfile);
exports.userRoutes = router;
