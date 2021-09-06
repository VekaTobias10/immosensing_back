/**
 * MODELO DE AUTENTICACION Y AUTORIZACION
 */

/**
 * COLLECTION EMAIL_VERIFICATION ({token, email})
 */

import { MongoClient } from "mongodb";

const DATABASE_URL = 'mongodb+srv://immo_company:Q2DfwuJLeS3cyZld@immosensingapp.xxx32.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'



/**
 * Obtener el email por token
 */
// export const retrieveEmailByToken = (token) => {
//     return EMAIL_VERIFICATION.find(e => e.token === token)?.email; // si no existe devolvemos undefined
// }


export async function retrieveEmailByToken(token) {
    const client = await MongoClient.connect(DATABASE_URL);
    const token_verification = { token }
    const data = await client.db('immosensingddbb')
        .collection('EMAIL_VERIFICATION')
        .findOne(token_verification)
    client.close();
    return data?.email;
}

/**
 * registrar token asociado al email
 */

export async function registerToken(token, email) {

    console.log("token registration" + token + email);
    const client = await MongoClient.connect(DATABASE_URL);

    const verification = { token, email }

    const data = await client.db('immosensingddbb')
        .collection('EMAIL_VERIFICATION')
        .insertOne(verification)
    client.close();
    if (data !== null) return true;

}

// export const registerToken = (token, email) => {
//     EMAIL_VERIFICATION.push({
//         token,
//         email
//     });
// }

// insert one en el email_verification

/**
 * Borramos el token de nuestro modelo
//  */
// export const deleteToken = (token) => {
//     const i = EMAIL_VERIFICATION.findIndex(e => e.token === token);
//     if (i >= 0) EMAIL_VERIFICATION.splice(i, 1); // solo borramos si existe
// }


export async function  deleteToken (token) {

    const client = await MongoClient.connect(DATABASE_URL);

    const token_verification = {token}

    const data = await client.db('immosensingddbb')
        .collection('EMAIL_VERIFICATION')
        .deleteOne(token_verification)
    client.close();
    return data;
}
/**
 * intentamos obtener el token si es valido devolvemos el email y borramos el token
 */
// export const validateToken = (token) => {
//     const email = retrieveEmailByToken(token);
//     if (email) deleteToken(token);
//     console.log('email', email);
//     return email;
// }


export async function validateToken(token) {
    const email = await retrieveEmailByToken(token); //email
    if (email !== null) await deleteToken(token);
    return email;
}