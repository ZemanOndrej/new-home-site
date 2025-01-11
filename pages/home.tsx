import { Button } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { FirebaseContext } from 'components/context/firebase';
import { Post } from 'types/posts';
import { getPosts } from 'service/firebase/post';
import type { NextPage } from 'next';

export const Home: NextPage = () => {
  const fb = useContext(FirebaseContext);
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    if (fb) {
      getPosts(fb).then(setPosts);
    }
  }, [fb, setPosts]);

  return (
    <div className="App">
      <header className="App-header">
        {posts.map((p) => (
          <div key={p.id}>
            <h3>{p.title}</h3>
            <p>{p.body}</p>
          </div>
        ))}
        <h1>hello </h1>
        <Button onClick={() => console.log('click')}>Click me</Button>
      </header>
    </div>
  );
};

export default Home;
