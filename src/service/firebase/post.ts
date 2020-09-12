import app from 'firebase/app';
import 'firebase/firestore';
import { Post } from 'types/posts';

export const getPosts = async (firebase: app.app.App): Promise<Post[]> => {
  const res = await firebase.firestore().collection('posts').get();
  return Promise.resolve(
    res.docs.map((d) => {
      const { body, title } = d.data();
      return { body, title, id: d.id };
    }),
  );
};
