type Tweet = {
  createdAt: String;
  text: String;
  retweetCount: Number;
};

export type Twitter = {
  tweetsCount: Number;
  tweets: [Tweet];
};
