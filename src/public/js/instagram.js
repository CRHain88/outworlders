import Instafeed from 'instafeed.js';

const feed = new Instafeed({
  get: 'user',
  // userId: '4852418106',
  userId: '21872566',
  accessToken: '21872566.1677ed0.09bcb89bd81342af9fa281ad03628e73',
  limit: 8,
});

feed.run();

export default feed;
