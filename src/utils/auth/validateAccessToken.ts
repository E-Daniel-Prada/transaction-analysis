import redis from './redis';
import { cookies } from 'next/headers';

export const validateAccessToken = async () => {
  try {
    const cookiepayment = cookies();
    const accessToken = cookiepayment.get('accessToken')?.value || '';

    if (!accessToken) {
      throw new Error('No access token found');
    }

    
    const email = await redis.get(`token:${accessToken}`);

    if (!email) {
      throw new Error('Invalid access token');
    }

    
    const userKey = `user:${email}`;
    const user = await redis.hgetall(userKey);

    if (!user) {
      throw new Error('User not found');
    }

    return {
      firstName: user.firstName,
      email: user.email,
      secondary_id: user?.secondary_id
    };
  } catch (error) {
    console.error(error);
    return null;
  }
};
