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

//Mongoose setup
const mongoose = require("mongoose");
mongoose.connect(
    "mongodb://localhost/SEcharacters",
    () => {console.log("connectred to database...")},
    (err) => console.error(err)
)
const Character = require("./character.js");

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
    console.log(`App is listening at ${port}`,
    async function testCharacter() {
        const character = await Character.create({name: "Arma", classLvl: {class: "soldier", level: 5}});
        await character.save();
    
        console.log(character);
    });
})

//testing character db

async function testCharacter() {
    const character = await Character.create({name: "Arma", classLvl: {class: "soldier", level: 5}});
    await character.save();

    console.log(character);
}