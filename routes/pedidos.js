const express = require("express");
const router = express.Router();
const controller = require("../controllers/pedidosController");

router.get("/", controller.listar);
router.get("/:id", controller.buscar);
router.post("/", controller.criar);
router.delete("/:id", controller.deletar);

module.exports = router;
