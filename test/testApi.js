import PocketBase from 'pocketbase';
import { config } from 'dotenv';
config();


const pb = new PocketBase(process.env.dbip);


// example create data
const data = {
  time: new Date(),
  current: Number((Math.random()*5).toFixed(2)),
  critical: false,
  pole: "vkeyhhpgwlrlzix",
};

const record = await pb.collection('leakagePoleData').create(data);
console.log(record);