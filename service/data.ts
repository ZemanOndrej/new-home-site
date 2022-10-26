import { MainPageContent } from 'types/mainPage';

export async function updateDataCache(): Promise<MainPageContent> {
  const res = await fetch('/api/data', { method: 'post' });

  const json = await res.json();
  return json.data as MainPageContent;
}
