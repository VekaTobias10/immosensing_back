import { MongoClient } from "mongodb";

const DATABASE_URL = 'mongodb+srv://immo_company:Q2DfwuJLeS3cyZld@immosensingapp.xxx32.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';


export const getInfoBcn = async () =>{
   const client = await MongoClient.connect(DATABASE_URL);
   const InfoBcn = await client.db('immosensingddbb')
   .collection('districtBcn')
   .find()
   .toArray();
   client.close();
   console.log(InfoBcn);
   return InfoBcn;
};