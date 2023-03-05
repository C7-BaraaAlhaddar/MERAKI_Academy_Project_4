const express = require("express");

//

const { createRole } = require("../controllers/role");

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");
//

const rolesRouter = express.Router();

//
rolesRouter.post("/", createRole);

//
module.exports = rolesRouter;
