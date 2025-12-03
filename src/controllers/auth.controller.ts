import { Request, Response } from 'express';
import { registerSchema, loginSchema } from '@/validations';
import { getUserByEmailService, postRegisterService, getUserByUsernameService } from '@/services';
import { response } from 'utils/response';
import { generateToken } from 'utils/jwt';
import { comparePassword, hashedPassword } from 'utils/bcrypt';

export const postRegister = async (req: Request, res: Response) => {
  const reqBody = req.body;

  // validate
  const { success: validateSuccess, error: validateError, data: userData } = registerSchema.safeParse(reqBody);
  if (!validateSuccess) {
    const errors = validateError.issues.map(err => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    return response({ res, status: 400, message: 'Invalid input', errors });
  }

  // check if user already exists
  const emailExist = await getUserByEmailService(userData.email);
  if (emailExist) {
    return response({ res, status: 409, message: 'User already exists', data: { ...emailExist, password: "" } });
  }
  const usernameExist = await getUserByUsernameService(userData.username);
  if (usernameExist) {
    return response({ res, status: 409, message: 'User already exists', data: { ...usernameExist, password: "" } });
  }

  // bcrypt password
  const hashPassword = hashedPassword(userData.password);

  // save user to database
  const newUser = { ...userData, password: hashPassword };
  try {
    const savedUser = await postRegisterService(newUser);
    return response({ res, status: 201, message: 'User registered successfully', data: { ...savedUser, password: "" } });
  } catch (error) {
    return response({ res, status: 500, message: 'Internal server error' });
  }
};

export const postLogin = async (req: Request, res: Response) => {
  const reqBody = req.body;

  // validate
  const { data: userData, error: validateError, success: validateSuccess } = loginSchema.safeParse(reqBody)
  if (!validateSuccess) {
    const errors = validateError.issues.map(err => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    return response({ res, status: 400, message: 'Invalid input', errors });
  }

  // check email
  const emailExist = await getUserByEmailService(reqBody.email);
  if (!emailExist) {
    return response({ res, status: 400, message: 'Invalid email or password' });
  }

  // check password
  const isPasswordValid = await comparePassword(userData.password, emailExist.password);
  if (!isPasswordValid) {
    return response({ res, status: 400, message: 'Invalid email or password' });
  }

  // generate token 
  const token = generateToken({ id: emailExist.id, name: emailExist.name });
  response({ res, status: 200, message: 'User login successfully', data: { user: { ...emailExist, password: "" }, token } });
};
