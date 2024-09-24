const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const PORT = 5000;

// Configuração do pool de conexão
const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'vendas',
  password: '123',
  port: 5432,
});

// Middleware
app.use(cors());
app.use(express.json());

// Rota para obter dados das vendas mensais
app.get('/api/vendas-mensais', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        EXTRACT(YEAR FROM DataPedido) AS Ano,
        EXTRACT(MONTH FROM DataPedido) AS Mes,
        SUM(ip.Quantidade * ip.PrecoUnitario) AS TotalVendas
      FROM Pedidos p
      JOIN ItensPedido ip ON p.PedidoID = ip.PedidoID
      GROUP BY EXTRACT(YEAR FROM DataPedido), EXTRACT(MONTH FROM DataPedido);
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter dados.' });
  }
});

// Rota para obter dados da view vw_estoquebaixo
app.get('/api/estoquebaixo', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vw_estoquebaixo'); // Consulta a view
    res.json(result.rows); // Enviar os dados da view como JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter dados da view vw_estoquebaixo.' });
  }
});

// Rota para obter dados da view vw_pedidoscompletos
app.get('/api/pedidos-completos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vw_pedidoscompletos'); // Consulta a view
    res.json(result.rows); // Enviar os dados da view como JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter dados da view vw_pedidoscompletos.' });
  }
});

// Rota para obter dados da view vw_vendasmensais
app.get('/api/vendasmensais', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM vw_vendasmensais'); // Consulta a view
    res.json(result.rows); // Enviar os dados da view como JSON
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Erro ao obter dados da view vw_vendasmensais.' });
  }
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
