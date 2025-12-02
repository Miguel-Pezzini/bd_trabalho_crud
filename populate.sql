-- ============================
-- Inserir Clientes
-- ============================
INSERT INTO clientes (nome, telefone) VALUES
('João Silva', '11998765432'),
('Maria Oliveira', '11991234567'),
('Carlos Pereira', '11999887766'),
('Ana Souza', '11995553322'),
('Fernanda Costa', '11994443322');

-- ============================
-- Inserir Produtos
-- ============================
INSERT INTO produtos (nome, preco) VALUES
('Pizza Margherita', 35.90),
('Pizza Calabresa', 42.50),
('Hambúrguer Artesanal', 28.00),
('Refrigerante Lata', 6.50),
('Batata Frita', 14.00),
('Suco Natural', 8.00);

-- ============================
-- Inserir Pedidos
-- ============================
INSERT INTO pedidos (cliente_id, data_pedido) VALUES
(1, NOW()),
(2, NOW()),
(3, NOW()),
(1, NOW()),
(4, NOW());

-- ============================
-- Inserir Itens dos Pedidos
-- ============================
-- Pedido 1
INSERT INTO itens_pedido (pedido_id, produto_id, quantidade) VALUES
(1, 1, 1),
(1, 4, 2);

-- Pedido 2
INSERT INTO itens_pedido (pedido_id, produto_id, quantidade) VALUES
(2, 2, 1),
(2, 5, 1),
(2, 4, 1);

-- Pedido 3
INSERT INTO itens_pedido (pedido_id, produto_id, quantidade) VALUES
(3, 3, 2),
(3, 4, 1);

-- Pedido 4
INSERT INTO itens_pedido (pedido_id, produto_id, quantidade) VALUES
(4, 1, 1),
(4, 5, 2);

-- Pedido 5
INSERT INTO itens_pedido (pedido_id, produto_id, quantidade) VALUES
(5, 6, 1),
(5, 3, 1);