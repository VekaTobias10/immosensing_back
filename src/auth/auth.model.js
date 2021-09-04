/**
 * MODELO DE AUTENTICACION Y AUTORIZACION
 */

/**
 * COLLECTION EMAIL_VERIFICATION ({token, email})
 */

const EMAIL_VERIFICATION = [];

/**
 * Obtener el email por token
 */
export const retrieveEmailByToken = (token) => {
    console.log(EMAIL_VERIFICATION);
    return EMAIL_VERIFICATION.find(e => e.token === token)?.email; // si no existe devolvemos undefined
}


/**
 * registrar token asociado al email
 */
export const registerToken = (token, email) => {
    EMAIL_VERIFICATION.push({
        token,
        email
    });
}

/**
 * Borramos el token de nuestro modelo
 */
export const deleteToken = (token) => {
    const i = EMAIL_VERIFICATION.findIndex(e => e.token === token);
    if (i >= 0) EMAIL_VERIFICATION.splice(i, 1); // solo borramos si existe
}

/**
 * intentamos obtener el token si es valido devolvemos el email y borramos el token
 */
export const validateToken = (token) => {
    const email = retrieveEmailByToken(token);
    if (email) deleteToken(token);
    console.log('email', email);
    return email;
}


