import { cookies } from 'next/headers';

export const getServerToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('token')?.value || null;
};

export const getServerRefreshToken = async () => {
  const cookieStore = await cookies();
  return cookieStore.get('refreshToken')?.value || null;
};
