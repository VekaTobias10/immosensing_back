import {getInfoBarriosBcn,getNeighborhoodInfoByName} from './barrios.model.js';


 export const RetrieveBarriosInfo = async (req, res) =>{
     let infoBarrBcn = await getInfoBarriosBcn(); // un array de 3
     const BarrBcn = infoBarrBcn.sort(() => 0.5 - Math.random());
     res.send(BarrBcn.slice(0,3));
 }

export const getNeighborhoodByNameController = async(req,res)=>{
    const name = req.params.name;
    console.log(name);
    const barrInfoBcn = await getNeighborhoodInfoByName(name);
    console.log(barrInfoBcn);
    if(barrInfoBcn!==null){
        res.send(barrInfoBcn)
    } else{
        res.status(404).send(`${req.params.name} NOT FOUND`)
    }
};

// 3 eleementos aleatorios de un array

// Shuffle array
// const shuffled = array.sort(() => 0.5 - Math.random());
// Get sub-array of first n elements after shuffled
// let selected = shuffled.slice(0, 3);