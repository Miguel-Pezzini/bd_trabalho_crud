const db = require("../db");

exports.listar = (req, res) => {
  db.query(
    `SELECT p.id, p.cliente_id, p.data_pedido, c.nome AS cliente
         FROM pedidos p
         JOIN clientes c ON c.id = p.cliente_id`,
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
};

exports.buscar = (req, res) => {
  db.query(
    `
        SELECT 
            p.id AS pedido_id,
            p.cliente_id,
            p.data_pedido,
            c.nome AS cliente,
            ip.id AS item_id,
            pr.nome AS produto,
            pr.preco,
            ip.quantidade
        FROM pedidos p
        JOIN clientes c ON c.id = p.cliente_id
        LEFT JOIN itens_pedido ip ON ip.pedido_id = p.id
        LEFT JOIN produtos pr ON pr.id = ip.produto_id
        WHERE p.id = ?
        `,
    [req.params.id],
    (err, results) => {
      if (err) return res.status(500).send(err);

          if (results.length === 0) {
        return res.status(404).json({ mensagem: "Pedido não encontrado" });
      }

      // Organizar dados: pedido + array de itens
      const pedido = {
        pedido_id: results[0].pedido_id,
        cliente_id: results[0].cliente_id,
        data_pedido: results[0].data_pedido,
        cliente: results[0].cliente,
        itens: results
          .filter(row => row.item_id !== null)
          .map(row => ({
            item_id: row.item_id,
            produto_id: row.produto_id,
            produto: row.produto,
            preco: row.preco,
            quantidade: row.quantidade
          }))
      };

      res.json(pedido);
    }
  );
};

exports.criar = (req, res) => {
  const { cliente_id, itens } = req.body;

  db.query(
    "INSERT INTO pedidos (cliente_id) VALUES (?)",
    [cliente_id],
    (err, result) => {
      if (err) return res.status(500).send(err);

      const pedido_id = result.insertId;

      itens.forEach((item) => {
        db.query(
          "INSERT INTO itens_pedido (pedido_id, produto_id, quantidade) VALUES (?, ?, ?)",
          [pedido_id, item.produto_id, item.quantidade]
        );
      });

      res.json({ mensagem: "Pedido criado", pedido_id });
    }
  );
};

exports.deletar = (req, res) => {
  db.query("DELETE FROM itens_pedido WHERE pedido_id = ?", [req.params.id]);
  db.query("DELETE FROM pedidos WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ mensagem: "Pedido removido" });
  });
};
