import UserDaoMongoDb from "../daos/mongodb/user.dao.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserDao = new UserDaoMongoDb();
export const createUser = async (user) => {
  try {
    const saltRounds = 10;
    user.password = await bcrypt.hash(user.password, saltRounds);
    return await UserDao.create(user);
  } catch (error) {
    console.log(error);
  }
};

export const loginUser= async (email, password) => {
    const user = await UserDao.getByEmail(email);
    if (!user) throw new Error('User not found');
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');
    const payload = { id: user._id, email: user.email };
    const token = jwt.sign(payload, 's3cr3t', { expiresIn: '1h' }); 
    return { token, user };
}
