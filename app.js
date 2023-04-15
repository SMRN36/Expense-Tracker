const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./utils/database");
const expenseRouter = require("./routes/expenseRoute");

const cors = require('cors');


const app = express();

app.use(cors())

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : false}));

app.set('views', 'views');

app.use(expenseRouter);

sequelize.sync()
.then(() => {
    app.listen('3000', () => {
        console.log("listening on port 3000");
    })
})
.catch(err => {
    console.log(err);
})

