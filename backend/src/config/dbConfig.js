import dotenv from 'dotenv';
dotenv.config();

export const config = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  GRAPH_API_KEY: process.env.GRAPH_API_KEY,
  GRAPH_API_URL: 'https://gateway.thegraph.com/api/7f0d2c9df879326ffa5399073b68e3de/subgraphs/id/C2zniPn45RnLDGzVeGZCx2Sw3GXrbc9gL4ZfL8B8Em2j'
};