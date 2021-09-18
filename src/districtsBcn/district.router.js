import express from 'express'; // importamos express para crear el router
import {RetrieveDistrictInfo} from './district.controller.js'; // importo el controller de los districtos


const router = express.Router(); // Creamos el router desde express

router.route('/districtBcn') // defino una ruta en el router con su path
.get(RetrieveDistrictInfo) // asocio al get de ese path un controller
    

// exportamos el router para que la app lo pueda consumir
export default router;