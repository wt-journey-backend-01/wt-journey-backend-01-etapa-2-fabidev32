//o server.js é o responsável por receber as requisições dos usuários
//ou seja, sempre que o usuário solicita por exemplo o salvamento de dados, o server.js é o responsável por solicitar ao meu servidor e, exbir as informações
//nesse caso, o express me permitiu criar um servidor remoto, ou seja, não acesso os dados de um servidor do google, mas sim um servidor remoto
//o app.listen permite que a requisição que o usuário realizou seja escutada pelo servivor, buscada e, por fim, fornecida ao usuário

const express = require("express");
//aqui estou acessando o middwalre express do meu node.js, que me permite trabalhar melhor com o gerenciamento de rotas
const agentesRoutes = require("./routes/agentesRoutes");
//aqui, através do require, consigo acessar o meu arquivo js agenteRoutes, preciso acessar esse arquivo para servir ele para o servidor
//aqui, o require é um middwalre
const path = require("path");
const swaggerUi = require("swagger-ui-express");
//aqui, a documentação da minha API
const errorHandler = require("./utils/errorHandler");

const server = express();
//aqui acessei o middwalre express
//por fim, acesso o express. Mas porque, aqui, eu preciso do "()", e lá em cima, quando fiz o require para o express não o utilizei?

const PORT = process.env.PORT || 3000;
//aqui estou usando uma função que cria uma porta automaticamente ou então uso a porta 3000
//a porta define onde o meu servidor vai rodar, ou seja, como posso localizá-lo na internet
//no meu arquivo .env eu posso configurar a minha porta
//caso eu esteja trabalhando com uma porta mais sigilosa

const swaggerDocument = require("./docs/swagger.json");
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

server.use(express.static("public"));

server.use(express.json());
//Preciso do use para informar ao meu express que ele pode utilizar JSON
//ou seja, independente da rota que eu estiver, vou conseguir ler esse arquivo json

server.use(errorHandler);
//se eu tenho uma função que serve para toda a aplicação, como , nesse caso, o tratamento de erros
//preciso sempre utilizar o use para que o meu servidor tenha acesso independente da rota que ele estiver
//preciso servir a função, se não meu servidor não acessa nem escuta

server.get("/departamento", (req, res) => {
  {
    res.sendFile(path.join(__dirname, "public/index.html"));
  }
});

server.use(express.urlencoded({ extended: true }));
//me permite interpretar os dados que são enviados pelo meu body via json

//AGENTES ----

server.use("/agentes", agentesRoutes);
//Na rota agentes, vou servir as rotas que estão disponíveis dentro do meu arquivo agentesRoutes
//ou seja, digo que na rota /agentes, será possível acessar todos os endpoints definidos no meu arquivo agenteRoutes
//todas as requisições realizadas para /agentes serão mapeadas para as minhas rotas
server.post("/agentes", (req, res) => {
  res.send("Novo agente salvo com sucesso!");
});
//aqui, meu post é responsável por enviar os arquivos. Isso é um endpoint
//na rota agentes, quando minha requisição for realizada, ou seja, preciso linkar essa requisição com um button no meu html
//meu onClick vai disparar a função que chama essa requisição e envia como resposta a mensagem
server.get("/agentes", (req, res) => {
  res.sendFile(path.join(__dirname, "public/agentes.html"));
});
//aqui, eu sirvo a minha pasta que já foi definido como pasta estatica, servindo o arquivo index.html
//como estou fazendo o send file, quero que a página seja servida automaticamente assim que meu usuário clicar
//path.join fornece um caminho seguro até o meu arquivo e compatível com qualquer sistema operacional
//dirname representa o caminho absoluto da pasta onde está o server.js
//ou seja, essa função permite que meu servidor encontre o caminho correto

//CASOS ----

server.post("/cases", (req, res) => {
  res.send("Novo caso salvo com sucesso!");
});

server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
//passo como função para o servidor a arrow function que só mostra que o servidor está rodando
//PORT é o meu parâmetro

/*
  O app.use("/agentes", router) define que todas as rotas que começam com "/agentes"
  serão tratadas dentro do arquivo de rotas importado como 'router'.

  Quando o navegador envia dados via POST para "/agentes", essa requisição será
  tratada pela rota router.post("/") definida dentro desse router, executando assim
  a função responsável por criar um novo agente.

  O action de um formulário HTML não precisa apontar para uma página específica —
  ele pode apontar para qualquer rota do servidor. A resposta da rota pode ser um
  HTML renderizado, um redirecionamento, ou até mesmo um JSON (como no caso da
  função que retorna o novo agente criado).

  É possível ter várias rotas usando o mesmo método HTTP (por exemplo, POST),
  desde que os caminhos sejam diferentes. Exemplo:

    router.post("/", controller.createAgente);          // POST /agentes
    router.post("/buscar", controller.buscarAgente);    // POST /agentes/buscar
    router.post("/deletar", controller.deletarAgente);  // POST /agentes/deletar

  Assim, cada rota POST atende a uma finalidade diferente, com base no caminho
  definido, mesmo estando todas sob o mesmo prefixo "/agentes".
*/
