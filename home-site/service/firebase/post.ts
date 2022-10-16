import { FirebaseApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { Post } from 'types/posts';

export const getPosts = async (firebase: FirebaseApp): Promise<Post[]> => {
  const res = await getDocs(collection(getFirestore(firebase), 'posts'));
  return Promise.resolve(
    res.docs.map((d) => {
      const { body, title } = d.data();
      return { body, title, id: d.id };
    }),
  );
};
