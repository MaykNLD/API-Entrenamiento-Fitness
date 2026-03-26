const express = require("express"); 
const bodyParser = require("body-parser");
const rutasEntrenamientoV1 = require("./v1/routes/entrenamientoRutas");

const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use(express.json());
app.use("/api/v1/entrenamientos", rutasEntrenamientoV1);

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});