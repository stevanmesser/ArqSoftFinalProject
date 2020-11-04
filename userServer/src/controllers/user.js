import jwt from 'jsonwebtoken';
import authConfig from '~/configs/auth';
import User from '~/database/models/User';

async function create(req, res) {
  const user = await User.create(req.body);

  return res.json(user);
}

async function update(req, res) {
  const user = await User.findByIdAndUpdate(req.userId, req.body);

  return res.json(user);
}

async function getOwn(req, res) {
  const user = await User.findById(req.userId);

  return res.json({
    ...user,
    needPassword: !user.password,
    password: undefined,
  });
}

async function login(req, res) {
  const { email, password } = req.body;

  const user = await User.findOne({
    email,
  });

  if (!user) return res.status(401).json({ error: 'User not found' });

  if (!(await user.checkPassword(password)))
    return res.status(401).json({ error: 'Password does not match' });

  const { id } = user;

  return res.json({
    user: { id },
    token: jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    }),
  });
}

export default {
  create,
  update,
  getOwn,
  login,
};
