const db = require("../db");

exports.listar = (req, res) => {
  db.query("SELECT * FROM produtos", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.buscar = (req, res) => {
  db.query(
    "SELECT * FROM produtos WHERE id = ?",
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results[0] || {});
    }
  );
};

exports.criar = (req, res) => {
  const { nome, preco } = req.body;
  db.query(
    "INSERT INTO produtos (nome, preco) VALUES (?, ?)",
    [nome, preco],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, nome, preco });
    }
  );
};

exports.atualizar = (req, res) => {
  const { nome, preco } = req.body;
  db.query(
    "UPDATE produtos SET nome = ?, preco = ? WHERE id = ?",
    [nome, preco, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ id: req.params.id, nome, preco });
    }
  );
};

exports.deletar = (req, res) => {
  db.query("DELETE FROM produtos WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ mensagem: "Produto removido" });
  });
};
