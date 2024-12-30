import axios from 'axios';
import { SignupInput } from '@/types/auth';
import { BACKEND_URL } from '@/config';

export async function authenticateUser(type: 'signin' | 'signup', data: SignupInput) {
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/user/${type}`,
    data
  );
  return response.data;
}

export async function authenticateWithGoogle(token: string) {
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/user/google-auth`,
    { token }
  );
  return response.data;
}

export async function authenticateAsGuest() {
  const response = await axios.post(
    `${BACKEND_URL}/api/v1/user/signin`,
    {
      username: "dhruv@gmail.com",
      password: "123456"
    }
  );
  return response.data;
}