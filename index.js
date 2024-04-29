const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = process.env.PORT || 4000;

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'harrypottah',
  password: 'ds564',
  port: 7007,
});

app.use(express.json());

app.post('/bruxos', async (req, res) => {
  try{
    const { nome, idade, casa, habilidade, status_sangue, patrono } = req.body
    await pool.query('INSERT INTO bruxos (nome, idade, casa, habilidade, status_sangue, patrono) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
    [nome, idade, casa, habilidade, status_sangue, patrono]
  );

  res.status(201).send({ mensagem: 'Bruxo adicionado com sucesso'});
  
  }catch(error){
    console.error('Erro ao adicionar bruxo:', error);
    res.status(500).send('Erro ao adicionar bruxo');
  }
})

app.post('/varinhas', async (req, res) => {
  try{
    const { material, comprimento, nucleo, data_fabricacao } = req.body
    await pool.query('INSERT INTO varinhas (material, comprimento, nucleo, data_fabricacao) VALUES ($1, $2, $3, $4) RETURNING *',
    [material, comprimento, nucleo, data_fabricacao]
  );

  res.status(201).send({ mensagem: 'Varinha adicionado com sucesso'});
  
  }catch(error){
    console.error('Erro ao adicionar varinha:', error);
    res.status(500).send('Erro ao adicionar varinha');
  }
});

app.get('/bruxos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM bruxos');
    res.json({
        total: result.rowCount,
        usuarios: result.rows,
    });
  } catch (error) {
    console.error('Erro ao obter bruxos:', error);
    res.status(500).send('Erro ao obter bruxos');
  }
});

app.get('/varinhas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM varinhas');
    res.json({
        total: result.rowCount,
        usuarios: result.rows,
    });
  } catch (error) {
    console.error('Erro ao obter varinhas:', error);
    res.status(500).send('Erro ao obter varinhas');
  }
});

app.get('/bruxos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM bruxos WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).send({ mensagem: 'Usuário não encontrado' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Erro ao obter bruxo por ID:', error);
    res.status(500).send('Erro ao obter bruxo por ID');
  }
});

app.get('/varinhas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM varinhas WHERE id = $1', [id]);
    if (result.rowCount === 0) {
      res.status(404).send({ mensagem: 'Usuário não encontrado' });
    } else {
      res.json(result.rows[0]);
    }
  } catch (error) {
    console.error('Erro ao obter varinha por ID:', error);
    res.status(500).send('Erro ao obter varinha por ID');
  }
});

app.put('/bruxos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, idade, casa, habilidade, status_sangue, patrono } = req.body;
    await pool.query('UPDATE bruxos SET nome=$1, idade=$2, casa=$3, habilidade=$4, status_sangue=$5, patrono=$6 WHERE id=$7',
     [nome, idade, casa, habilidade, status_sangue, patrono, id]);
    res.status(200).send({ mensagem: 'bruxo atualizado com sucesso'});
  } catch (error) {
    console.error('Erro ao atualizar bruxo:', error);
    res.status(500).send('Erro ao atualizar bruxo');
  }
});

app.put('/varinhas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { material, comprimento, nucleo, data_fabricacao } = req.body;
    await pool.query('UPDATE varinhas SET material=$1, comprimento=$2, nucleo=$3, data_fabricacao=$4 WHERE id=$5',
     [material, comprimento, nucleo, data_fabricacao, id]);
    res.status(200).send({ mensagem: 'varinha atualizado com sucesso'});
  } catch (error) {
    console.error('Erro ao atualizar varinha:', error);
    res.status(500).send('Erro ao atualizar varinha');
  }
});

app.delete('/bruxos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM bruxos WHERE id = $1', [id]);
    res.status(200).send({ mensagem: 'bruxo excluído com sucesso'});
  } catch (error) {
    console.error('Erro ao excluir bruxo:', error);
    res.status(500).send('Erro ao excluir bruxo');
  }
});

app.delete('/varinhas/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM varinhas WHERE id = $1', [id]);
    res.status(200).send({ mensagem: 'varinha excluído com sucesso'});
  } catch (error) {
    console.error('Erro ao excluir varinha:', error);
    res.status(500).send('Erro ao excluir varinha');
  }
});

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}🧙🪄✨🏳️‍⚧️`);
  });