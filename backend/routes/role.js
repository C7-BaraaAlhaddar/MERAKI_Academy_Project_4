const express = require("express");

//

const { createRole } = require("../controllers/role");

//

const rolesRouter = express.Router();

//
rolesRouter.post("/", createRole);

//
module.exports = rolesRouter;
