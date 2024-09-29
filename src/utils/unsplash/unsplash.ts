import { createApi } from 'unsplash-js';

// if (process.env.NODE_ENV === 'production') return null;

// on your node server
export const unsplash = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY!,

  fetch: fetch,
});
