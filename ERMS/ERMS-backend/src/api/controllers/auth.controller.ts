import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model';

export const login: RequestHandler = async (req, res, next) => {
  try {
    const { email,password } = req.body;
    const user = await UserModel.findOne({ email,password });

    if (!user) {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
      return;
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });
    const refreshToken = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, {
      expiresIn: '7d',
    });

    res.status(200).json({
      success: true,
      token,
      refreshToken,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        name: user.name,
      },
    }
  );
  } catch (err) {
    next(err);
  }
};
//refresh token
export const refreshToken: RequestHandler = (req, res) => {
  const { token } = req.body;
  if (!token) {
     res.status(401).json({ success: false, message: 'Refresh token is required' });
     return;
  }

  jwt.verify(token, process.env.JWT_SECRET!, (err, decoded) => {
    if (err) {
       res.status(403).json({ success: false, message: 'Invalid refresh token' });
        return;
    }

    const newToken = jwt.sign({ id: (decoded as any).id, role: (decoded as any).role }, process.env.JWT_SECRET!, {
      expiresIn: '1h',
    });

    res.json({ success: true, token: newToken });
  });
};



export const getProfile: RequestHandler = (req, res) => {
  const userDoc = (req as any).user;

  const user = userDoc.toObject ? userDoc.toObject() : userDoc;

  delete user.password;

  res.json({ success: true, user });
};
