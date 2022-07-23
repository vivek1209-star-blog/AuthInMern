const express = require('express');
 const app = express();


 app.use('/', (req, res, next) => {
    console.log("Hello Friend");
 })

 app.listen(5000, () => {
    console.log("Listening to localhost 5000")
 })