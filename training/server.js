const express = require("express");
const path = require("path");
var cors = require('cors');

const app = express();
app.use(cors()); // to handle preflight OPTIONS request

/**
* Controllers (route handlers).
*/
const clientSecretController = require('./src/app/ui-services/controllers/client.secret.controller');
const cacfController = require('./src/app/ui-services/controllers/cacf.controller');
const specialtyController = require('./src/app/ui-services/controllers/specialties.controller');
const caqhController = require('./src/app/ui-services/controllers/caqh.controller');
const pesNpiController = require('./src/app/ui-services/controllers/pes.npi.controller');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => { console.log("port -->", PORT); });

app.get('/v1/fetchClientSecret', clientSecretController.getClientSecret);
app.get('/v1/cacf/*', cacfController.getCacf);
app.get('/v1/fetchSpecialties', specialtyController.getSpecialties);
app.get('/v1/caqh/status', caqhController.getCAQHStatus);
app.get('/v1/pes/npi', pesNpiController.getPESNPIData);

//  ------------------------------------------- keep this at the last -----------------------------------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/build")));

  app.get("*", (req, res) => {
    res.sendfile(path.join(__dirname + "/build/index.html"));
  });
}
