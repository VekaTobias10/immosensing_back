/**
 * Este archivo realiza las operaciones con mis datos de usuario, es decir,
 * CRUD de BBDD o filesystem o objetos en memoria (va a ser en este caso)
 */

/** 
 * LISTA DE USUARIOS EN MEMORIA COMO SI FUESE UNA COLLECTION DE 
 * BBDD
 */

import { MongoClient } from "mongodb";

const DATABASE_URL = 'mongodb+srv://immo_company:Q2DfwuJLeS3cyZld@immosensingapp.xxx32.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

// const userList = [
//     {
//         email: 'blabla@bla.com',
//         password: '123456',
//         age: 21,
//         status: 'SUCCESS'
//     },
//     {
//         email: 'bleble@ble.com',
//         password: '1234567',
//         age: 22,
//         status: 'SUCCESS'
//     }
// ]

/**
 * Esta función va a buscar los datos a 
 * mi sistema de persistencia de datos y devuelve la entidad
 * usuario que corresponda con email y password o undefined si no lo encuentra
 */
// export const getUserInfoByIdAndPassword = (userId, password) => {
//     return userList.find(u => u.email.toLowerCase() === userId?.toLowerCase()
//         && u.password === password
//         && u.status === 'SUCCESS');
// }

export async function getUserInfoByIdAndPassword(email, password) {

    const client = await MongoClient.connect(DATABASE_URL);
    const userByIdandPassword = { email, password }
    const data = await client.db('immosensingddbb')
        .collection('user')
        .findOne(userByIdandPassword)
    client.close();
    return data;
}



/**
 * Esta función va a buscar los datos a 
 * mi sistema de persistencia de datos y devuelve la entidad
 * usuario que corresponda con email o undefined si no lo encuentra
 */
// export const getUserInfoById = (userId) => {
//     return userList.find(u => u.email.toLowerCase() === userId?.toLowerCase() && u.status === 'SUCCESS');
// }

export async function getUserInfoById(userId) {

    const client = await MongoClient.connect(DATABASE_URL);
    const userById = { email: userId, status: 'SUCCESS' }
    const data = await client.db('immosensingddbb')
        .collection('user')
        .findOne(userById)
    client.close();
    return data;
}






/**
 * Crea un usuario en donde se guardan los datos. La password ya vendra codificada
 * Tenemos que poner el status para que se sepa que está pending validation
 */
export async function registerUser(name, lastName, email, password) {

    const client = await MongoClient.connect(DATABASE_URL);

    const user = { name, lastName, email, password, status: "PENDING_EMAIL_VALIDATION" }

    const data = await client.db('immosensingddbb')
        .collection('user')
        .insertOne(user)
    client.close();
    if (data !== null) return true;

}


/**
 * Cambia el estado del usuario a SUCCESS
 */
// export const updateUserMailVerification = (email) => {
//     console.log(email);
//     const i = userList.findIndex(u => u.email.toLowerCase() === email?.toLowerCase());
//     userList[i].status = 'SUCCESS';
// }

// updateOne de ese email solo cambiando el status a pending_second_register

export async function updateUserMailVerification(email) {

    const client = await MongoClient.connect(DATABASE_URL);

    const userUpdate = {
        $set: { status: "PENDING_SECOND_REGISTER" }
    }

    const data = await client.db('immosensingddbb')
        .collection('user')
        .updateOne({ email }, userUpdate)
    client.close();
    return data;
}


// actualizando datos del usuario con el segundo registro

export async function updatedUserInfo(email, userData) {
    console.log(email + "email");
    const client = await MongoClient.connect(DATABASE_URL);

    const options = { upsert: false }; //Si no encuentra nada que coincida con el email devuelve null
    const userUpdate = {
        $set: {
            estadoCivil: userData.estadoCivil,
            hijos: userData.hijos,
            tipoDeZonaPreferido: userData.tipoDeZonaPreferido,
            modalidadTrabajo: userData.modalidadTrabajo,
            address: userData.address,
            rangoAlquiler: userData.rangoAlquiler
        }
    }
    console.log(userUpdate + "updateUser");
    const data = await client.db('immosensingddbb')
        .collection('user')
        .updateOne({ email }, userUpdate, options)
    client.close();
    console.log(data + "updateUserInfo");
    return data !== null;
}


//Cambia a success cuando hace el segundo registro

export async function updateUserFinishedRegister(email) {

    const client = await MongoClient.connect(DATABASE_URL);
    const userUpdate = {
        $set: { status: "SUCCESS" }
    }
    console.log(userUpdate);
    const data = await client.db('immosensingddbb')
        .collection('user')
        .updateOne({ email }, userUpdate)
    client.close();
    console.log(data);
    return data;
}

