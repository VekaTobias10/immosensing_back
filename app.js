import express from 'express'; // importo express para hacer una app
import cors from 'cors'; // importo el cors para que los navegadores me puedan llamar
import userRouter from './src/user/user.router.js';
import authRouter from './src/auth/auth.router.js';



const app = express(); // creo una app

app.use(cors()); // librería que implementa el cors en mi backend
app.use(express.json()) // permito al app que formatee el body en JSON

// le indico a la app que el path /user va a ser gestionado por userRouter
app.use('/user', userRouter); 
// Le indico a la app que en el path /login hay un router que lo gestiona
app.use('/auth', authRouter);

 // levanto el servidor en el puerto 4567
app.listen(4567, () => console.log('Server Started'))