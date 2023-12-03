import {httpClient} from '@/libs/axios';

export const getUserLinks = async (username: string) => {
  const res = await httpClient.get(`/${username}`);

  console.log({res});
  return res;
};
