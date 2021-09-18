import express from 'express'; // importamos express para crear el router
import {RetrieveBarriosInfo} from './barrios.controller.js'; // importo el controller de los districtos


const router = express.Router(); // Creamos el router desde express

router.route('/barriosBcn') // defino una ruta en el router con su path
.get(RetrieveBarriosInfo) // asocio al get de ese path un controller
    

// exportamos el router para que la app lo pueda consumir
export default router;