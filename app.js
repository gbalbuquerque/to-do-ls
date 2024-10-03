const express = require('express');
const path = require('path')

const checkListRouter = require('./src/routes/checklist')

require('./config/database')

const app = express();
app.use(express.json());

app.set('views', path.join(__dirname,'src/views'));
app.set('view engine' , 'ejs');

app.use('/checklists', checkListRouter);


app.listen(3000, () => {
  console.log('O servidor foi iniciado');
})