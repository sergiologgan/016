const express = require('express');
const app = express();
const port = process.env.PORT || 8080; // Porta que a API vai escutar
const fs = require('fs');
const path = require('path'); // Módulo path para manipulação de caminhos

app.get('/api/dados/:numero', (req, res) => {
  const numero = req.params.numero; // Obtém o número da URL
  const arquivo = path.join(__dirname, `${numero}.json`); // Caminho do arquivo
  console.log(`Tentando ler o arquivo de dados: ${arquivo}`);
  
  // Restante do código para a rota de dados

  // Verifique se o arquivo existe antes de tentar lê-lo
  fs.access(arquivo, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`O arquivo ${arquivo} não foi encontrado.`);
      res.status(404).send('Arquivo não encontrado.');
    } else {
      // O arquivo existe, leia e retorne os dados
      fs.readFile(arquivo, 'utf8', (err, data) => {
        if (!err) {
          try {
            const dados = JSON.parse(data);
            res.json(dados); // Retorna os dados JSON
          } catch (e) {
            console.error('Erro ao analisar os dados JSON:', e);
            res.status(500).send('Erro ao analisar os dados JSON.');
          }
        } else {
          console.error('Erro ao ler o arquivo JSON:', err);
          res.status(500).send('Erro ao ler o arquivo JSON.');
        }
      });
    }
  });
});

app.get('/api/contrato/:numero', (req, res) => {
  const numero = req.params.numero; // Obtém o número da URL
  const arquivoContrato = path.join(__dirname, 'contrato', `${numero}.json`); // Caminho do arquivo de contrato
  console.log(`Tentando ler o arquivo de contrato: ${arquivoContrato}`);
  
  // Restante do código para a rota de contrato

  // Verifique se o arquivo de contrato existe antes de tentar lê-lo
  fs.access(arquivoContrato, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`O arquivo de contrato ${arquivoContrato} não foi encontrado.`);
      res.status(404).send('Arquivo de contrato não encontrado.');
    } else {
      // O arquivo de contrato existe, leia e retorne os dados
      fs.readFile(arquivoContrato, 'utf8', (err, data) => {
        if (!err) {
          try {
            const dados = JSON.parse(data);
            res.json(dados); // Retorna os dados JSON
          } catch (e) {
            console.error('Erro ao analisar os dados JSON do contrato:', e);
            res.status(500).send('Erro ao analisar os dados JSON do contrato.');
          }
        } else {
          console.error('Erro ao ler o arquivo JSON do contrato:', err);
          res.status(500).send('Erro ao ler o arquivo JSON do contrato.');
        }
      });
    }
  });
});

// Inicie o servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
