import express from 'express'; // importo express para hacer una app
import cors from 'cors'; // importo el cors para que los navegadores me puedan llamar
import userRouter from './src/user/user.router.js';
import authRouter from './src/auth/auth.router.js';
import infoBcnRouter from './src/districtsBcn/district.router.js';
import infoBcnBarriosRouter from './src/barriosBcn/barrios.router.js';
import infoBcnBarriosByNameRouter from './src/barriosBcn/barrios.router.js';

const app = express(); // creo una app


app.use(cors()); // librería que implementa el cors en mi backend
app.use(express.json()) // permito al app que formatee el body en JSON

// le indico a la app que el path /user va a ser gestionado por userRouter
app.use('/user', userRouter); 
// Le indico a la app que en el path /login hay un router que lo gestiona
app.use('/auth', authRouter);

app.use('/infoBcn', infoBcnRouter);

app.use('/preferences', infoBcnBarriosRouter);

app.use('/preferences/barrios', infoBcnBarriosByNameRouter);


app.use('/static', express.static('public-static'));

// if (process.env.NODE_ENV === 'production') {
//     // Exprees will serve up production assets
//     app.use(express.static('client/build'));
  
//     // Express serve up index.html file if it doesn't recognize route
//     const path = require('path');
//     app.get('*', (req, res) => {
//       res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
//     });
//   }


 // levanto el servidor en el puerto 3001
app.listen(process.env.PORT || 3001, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});