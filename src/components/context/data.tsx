import React from 'react';
import { Post } from 'types/posts';

interface PageData {
  posts: Post[];
}

const initState = {
  posts: [],
};

const DataContext = React.createContext<PageData>(initState);

export { DataContext };
