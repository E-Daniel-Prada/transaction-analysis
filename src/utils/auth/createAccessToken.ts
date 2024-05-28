import { v4 as uuidv4 } from 'uuid';
import redis from './redis';
import { cookies } from 'next/headers';

export const createAccessToken = async (email: string, password: string) => {
  const cookiesPay = cookies();

  
  const accessToken = uuidv4();
  
  
  const expiresIn = 60 * 60 * 24;

  
  await redis.set(`token:${accessToken}`, email, 'EX', expiresIn);

  
  const expiresAt = new Date(Date.now() + expiresIn * 1000);

  
  cookiesPay.set("accessToken", accessToken, {
    path: "/",
    expires: expiresAt,
    httpOnly: true,
    sameSite: "strict",
  });

  return accessToken;
};
