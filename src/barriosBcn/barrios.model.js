import { MongoClient } from "mongodb";

const DATABASE_URL = 'mongodb+srv://immo_company:Q2DfwuJLeS3cyZld@immosensingapp.xxx32.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const BASE_IMG_PATH = '/static/img/';
// function getRandomNumber(max) {
//    return Math.round(Math.random() * max);
// }

// let tresBarrios = []

export const getInfoBarriosBcn = async () =>{
   const client = await MongoClient.connect(DATABASE_URL);
   const infoBarriosBcn = await client.db('immosensingddbb')
   .collection('barriosBcn')
   .find()
   .toArray();
   client.close();
   infoBarriosBcn.forEach((e,i,arr)=>{
     arr[i].img = BASE_IMG_PATH + arr[i].img;
   });
   console.log(infoBarriosBcn);
   return infoBarriosBcn;
};

// for(let i = 0; i<=3; i++){ 
//    tresBarrios.push(infoBarriosBcn[getRandomNumber(infoBarriosBcn.length-1)])
//  }

export const getNeighborhoodInfoByName= async (name) =>{
   const client = await MongoClient.connect(DATABASE_URL);
   const query = {name}
   const data = await client.db('immosensingddbb')
   .collection('barriosBcn')
   .findOne(query)
   client.close();
   console.log(data);
   return data;
};