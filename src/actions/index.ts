"use server"

import { createAccessToken } from "app/utils/auth/createAccessToken"
import { validateAccessToken } from "app/utils/auth/validateAccessToken"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import bcrypt from 'bcryptjs';
import redis from "app/utils/auth/redis"
import { NextApiRequest, NextApiResponse } from 'next';
import { getPayments } from 'app/services/postgres/consulta';
import { v4 as uuidv4 } from 'uuid';

export const handleCreateUser = async (formData: FormData) => {
  const formDataObject = Object.fromEntries(formData);
  delete formDataObject["password_confirmation"];


  const hashedPassword = await bcrypt.hash(formDataObject.password as string, 10);


  const secondary_id = uuidv4();


  const userData = {
    ...formDataObject,
    phone: '+57' + formDataObject.phone,
    password: hashedPassword,
    secondary_id
  };


  const userKey = `user:${formDataObject.email}`;
  await redis.hset(userKey, userData);


  await createAccessToken(formDataObject.email as string, formDataObject.password as string);


  redirect('/my-account');
};

export const handleLogin = async (formData: FormData) => {
  const formDataObject = Object.fromEntries(formData);
  const email = formDataObject.email as string;
  const password = formDataObject.password as string;


  const userKey = `user:${email}`;
  const user = await redis.hgetall(userKey);

  if (!user) {
    throw new Error('User not found');
  }


  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    throw new Error('Invalid credentials');
  }


  const accessToken = await createAccessToken(email, password);

  if (accessToken) {
    console.log('entre');


    redirect('/my-account')
  }
};

export const handleLogOut = async () => {
  const cookiepayment = cookies();
  const accessToken = cookiepayment.get('accessToken')?.value || '';

  if (accessToken) {

    await redis.del(`token:${accessToken}`);


    cookiepayment.set('accessToken', '', {
      path: '/',
      expires: new Date(0),
      httpOnly: true,
      sameSite: 'strict',
    });
  }


  redirect('/login');
};

export const handleQueryClick = async (query: string) => {
  try {
    const result = await getPayments(query);
    return result;
  } catch (error) {
    console.error('Error executing query:', error);
    throw new Error('Error executing query');
  }
};

