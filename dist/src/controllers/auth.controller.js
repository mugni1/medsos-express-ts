"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postLogin = exports.postRegister = void 0;
const validations_1 = require("../validations");
const services_1 = require("../services");
const response_1 = require("../../utils/response");
const jwt_1 = require("../../utils/jwt");
const bcrypt_1 = require("../../utils/bcrypt");
const postRegister = async (req, res) => {
    const reqBody = req.body;
    // validate
    const { success: validateSuccess, error: validateError, data: userData } = validations_1.registerSchema.safeParse(reqBody);
    if (!validateSuccess) {
        const errors = validateError.issues.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
        }));
        return (0, response_1.response)({ res, status: 400, message: 'Invalid input', errors });
    }
    // check if user already exists
    const emailExist = await (0, services_1.getUserByEmailService)(userData.email);
    if (emailExist) {
        return (0, response_1.response)({ res, status: 409, message: 'User already exists', data: { ...emailExist, password: "" } });
    }
    const usernameExist = await (0, services_1.getUserByUsernameService)(userData.username);
    if (usernameExist) {
        return (0, response_1.response)({ res, status: 409, message: 'User already exists', data: { ...usernameExist, password: "" } });
    }
    // bcrypt password
    const hashPassword = (0, bcrypt_1.hashedPassword)(userData.password);
    // save user to database
    const newUser = { ...userData, password: hashPassword };
    try {
        const savedUser = await (0, services_1.postRegisterService)(newUser);
        return (0, response_1.response)({ res, status: 201, message: 'User registered successfully', data: { ...savedUser, password: "" } });
    }
    catch (error) {
        return (0, response_1.response)({ res, status: 500, message: 'Internal server error' });
    }
};
exports.postRegister = postRegister;
const postLogin = async (req, res) => {
    const reqBody = req.body;
    // validate
    const { data: userData, error: validateError, success: validateSuccess } = validations_1.loginSchema.safeParse(reqBody);
    if (!validateSuccess) {
        const errors = validateError.issues.map((err) => ({
            path: err.path.join('.'),
            message: err.message,
        }));
        return (0, response_1.response)({ res, status: 400, message: 'Invalid input', errors });
    }
    // check email
    const emailExist = await (0, services_1.getUserByEmailService)(reqBody.email);
    if (!emailExist) {
        return (0, response_1.response)({ res, status: 400, message: 'Invalid email or password' });
    }
    // check password
    const isPasswordValid = await (0, bcrypt_1.comparePassword)(userData.password, emailExist.password);
    if (!isPasswordValid) {
        return (0, response_1.response)({ res, status: 400, message: 'Invalid email or password' });
    }
    // generate token 
    const token = (0, jwt_1.generateToken)({ id: emailExist.id, name: emailExist.name });
    (0, response_1.response)({ res, status: 200, message: 'User login successfully', data: { user: { ...emailExist, password: "" }, token } });
};
exports.postLogin = postLogin;
