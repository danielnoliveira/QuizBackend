
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

const routes = require('./src/routes/index');
const router = express.Router();

app.use('/quiz/api/v1',routes(router));

app.listen(process.env.PORT || 3000,()=>{
    console.log('Servidor iniciado');
});