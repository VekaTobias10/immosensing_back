/**
 * Este archivo implementa todos los handlers (controladores) propios de las rutas del usuario
 */
import { getUserInfoById } from './user.model.js';

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