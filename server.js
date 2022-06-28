// Saga Edition Player Toolset
// Author: Olivia
// Github: https://github.com/Olive251

//INCLUDES
const express = require("express");
const handlebars = require('express-handlebars');
const path = require("path");
//route includes
const homeRoute = require('./routes/homeRoute.js');
const publicRoute = require('./routes/public.js');
const characterSheetRoute = require('./routes/characterSheet.js');
//handlebars setup
const hbs = handlebars.create({
    ext: '.hbs',
    helpers:{
    }
})

//express setup
const app = express();
app.engine('.hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static(path.join(__dirname,'/public')));
app.use(express.urlencoded({extended: true}));
app.use((req,res,next) => {
    let route = req.path.substring(1);
    app.locals.activeRoute = (route == "/") ? "/" : "/" + route.replace(/\/(.*)/,"");
    app.locals.viewingCategory = req.query.category;
    next();
})
const port = process.env.PORT || 8080;

app.use('/', homeRoute);
app.use('/characterSheet', characterSheetRoute);


app.listen(port, () =>{
    console.log(`App is listening at ${port}`);
})

//storage for data
//const cFile = (path.join(__dirname, "data", "characters.json"));