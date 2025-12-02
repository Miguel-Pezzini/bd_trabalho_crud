const db = require("../db");

exports.listar = (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.buscar = (req, res) => {
  db.query(
    "SELECT * FROM clientes WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results[0] || {});
    }
  );
};

exports.criar = (req, res) => {
  const { nome, telefone } = req.body;
  db.query(
    "INSERT INTO clientes (nome, telefone) VALUES (?, ?)",
    [nome, telefone],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, nome, telefone });
    }
  );
};

exports.atualizar = (req, res) => {
  const { nome, telefone } = req.body;
  db.query(
    "UPDATE clientes SET nome = ?, telefone = ? WHERE id = ?",
    [nome, telefone, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ id: req.params.id, nome, telefone });
    }
  );
};

exports.deletar = (req, res) => {
  db.query("DELETE FROM clientes WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ mensagem: "Cliente removido" });
  });
};
