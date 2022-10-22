import { MAIN_PAGE_CONTENT } from 'consts';
import type { NextApiRequest, NextApiResponse } from 'next';
import { MainPageContent } from 'types/mainPage';
import { config } from './firebase/config';

type Data = {
  data: MainPageContent | null;
};
let cachedData: MainPageContent | null = null;
let lastRefreshTime: number | null = null;

async function fetchData() {
  const response = await fetch(`${config.database}/${MAIN_PAGE_CONTENT}.json`);
  const data = (await response.json()) as MainPageContent;
  return data;
}
export const getData = async (refresh = false): Promise<MainPageContent> => {
  if (lastRefreshTime == null || lastRefreshTime + 604800 < Date.now()) {
    lastRefreshTime = Date.now();
    return (cachedData = await fetchData());
  }
  if (!refresh) {
    return (cachedData ??= await fetchData());
  }
  lastRefreshTime = Date.now();
  return (cachedData = await fetchData());
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> {
  const resultData: Data = { data: null };
  if (req.method === 'POST') {
    resultData.data = await getData(true);
  } else if (req.method === 'GET') {
    resultData.data = await getData();
  }
  return res.status(200).json(resultData);
}
