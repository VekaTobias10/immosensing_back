import {getInfoBcn} from './district.model.js';


 export const RetrieveDistrictInfo = async (req, res) =>{
     const infoBcn = await getInfoBcn();
     res.send(infoBcn);
 }