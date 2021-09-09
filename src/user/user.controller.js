/**
 * Este archivo implementa todos los handlers (controladores) propios de las rutas del usuario
 */
import { getUserInfoById, updatedUserInfo,updateUserFinishedRegister } from './user.model.js';

/**
 * Este es el controller (handler) de la request
 * que obtiene la información de un usuario
 */
export const retrieveUserInfoCtrl = (req, res) => {
    // Obtengo el user info por id, 
    // recogiendo el id del email de la request que puso el JWT Middleware
    const userInfo = getUserInfoById(req.email);
    // borro la passwod para no exponerla en mi API y no enviarsela a los clientes
    delete userInfo.password;
    // Envio al cliente que realizo la petición los datos del usuario
    res.send(userInfo);
}


export const updateUserSecondRegisterController = async (req, res) => {
    // Obtengo el user info por id, 
    // recogiendo el id del email de la request que puso el JWT Middleware
    const updatedUser = await updatedUserInfo(req.email, req.body);
    console.log(updatedUser);
    if (updatedUser) {
        // actualizo el estado del usuario en BBDD a SUCCESS con el email dado por el middlewareJWT
        await updateUserFinishedRegister(req.email);
        res.send('User updated');
    } else {
        // si el usuario ya ha completado previamente el segundo registro (status: 'SUCCESS')
        //se devuelve error por conflicto
        res.status(404).send('User no encontrado');
    }
}






