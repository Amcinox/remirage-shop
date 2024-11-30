'use server';

import { cookies as getCookies } from 'next/headers';

type Data = {
  response: any;
  error?: string;
};

export async function getToken(): Promise<Data> {
 
  try {

    const username = '2001400';
    const encryptedPassword = 'cSrpWpWnubGJT3TNPR+xKxQHAVE6ozZ1y3YGw+7Kcj0sUzXppv+JIr7aZiodE+hflkH4Hl0QsyOVLhV8uGBEeruz+h4Pj9WgXEhDb/RHKFs6KNqDW21ybuVQPfC0TMfK7zvG4cB0NgIWzvor40QU0Rs0co6tBGT1+GVsNSqKP6A=';
    const captcha2 = '8EADF2FD7671DA82E205945A801F85BDCE565A3BB2C574D4457CDB029A5B0DACFA5A968B35CEAAF6';
    const baseUrlToken = 'https://crm.deliworld.com/token';

    // Prepare the payload
    const payload = new URLSearchParams();
    payload.append('grant_type', 'password');
    payload.append('username', username);
    payload.append('password', encryptedPassword);
    payload.append('captcha1', '');
    payload.append('captcha2', captcha2);

    // Make the POST request to the token endpoint
    const tokenResponse = await fetch(baseUrlToken, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: payload.toString(),
    });

    const responseData = await tokenResponse.json();

    if (!tokenResponse.ok) {
      return {  response : responseData, error: 'Token request failed.' };
    }

    // Set the token in cookies
    const cookieStore = await getCookies();
    cookieStore.set('token', responseData.access_token, { httpOnly: true, secure: true });

    return { response: responseData };
  } catch (error: any) {
    console.error('Encryption or Token Request Error:', error);
    return { response: null, error: 'Internal Server Error' };
  }
}
