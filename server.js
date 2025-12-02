const express = require("express");
const app = express();
const clientesRoutes = require("./routes/clientes");
const produtosRoutes = require("./routes/produtos");
const pedidosRoutes = require("./routes/pedidos");

app.use(express.json());

app.use("/clientes", clientesRoutes);
app.use("/produtos", produtosRoutes);
app.use("/pedidos", pedidosRoutes);

app.listen(3000, () => {
  console.log("API rodando na porta 3000");
});
