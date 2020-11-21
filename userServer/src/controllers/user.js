import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import authConfig from '~/configs/auth';
import User from '~/database/models/User';

async function create(req, res) {
  const { password } = req.body;

  const resUser = await User.create({
    ...req.body,
    password: password && (await bcrypt.hash(password, 8)),
  });

  const user = resUser.toJSON();

  return res.json({ ...user, password: undefined, ok: true });
}

async function update(req, res) {
  const { password, ...restBody } = req.body;

  const resUser = await User.findByIdAndUpdate(
    req.userId,
    {
      ...restBody,
    },
    { new: true }
  );

  if (password) {
    resUser.password = await bcrypt.hash(password, 8);
    await resUser.save();
  }

  const user = resUser.toJSON();

  return res.json({ ...user, password: undefined });
}

async function getOwn(req, res) {
  const resUser = await User.findById(req.userId);

  const user = resUser.toJSON();

  return res.json({
    ...user,
    needPassword: !user.password,
    password: undefined,
  });
}

async function login(req, res) {
  const { cpf, password } = req.body;

  const user = await User.findOne({
    cpf,
  });

  if (!user)
    return res.status(401).json({ ok: false, error: 'User not found' });

  if (!!user.password && !(await bcrypt.compare(password, user.password)))
    return res
      .status(401)
      .json({ ok: false, error: 'Password does not match' });

  const { id } = user;

  return res.json({
    user: { id },
    token: jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.expiresIn,
    }),
    ok: true,
  });
}

export default {
  create,
  update,
  getOwn,
  login,
};
