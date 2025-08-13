const express = require("express");
const router = express.Router();
//Retorna o objeto de um roteador (um middware - qualquer função que recebe 3 parametros, uma funçãoq ue o express executa automaticamente quando uma requisição é feita) que o server.use consegue utilizar, ous eja, ocnsegue acessar as rotas que eu guardei em ROUTES
//Se coloco entre parenteses. signifca que quero qeu a função eja executada no momenro que ela for chamada
const controller = require("../controllers/agentesController");

//cada router determina um middare que intercepta funções.
//ou seja, quando a minha rota /agente for acessada, eu intercepto os controllers responsáveis por intercepta as funções
//que vão realizar o desejo do usuário
//o que é um endpoint? É uma ponte?
//porque utilizo o router?
//ele esta aqui na pasta de rotas pois o meu server js precisa de todas essas rotas
//essa é a pasta por fornecer todas as rotas e caminhos possíveis, que o usuário pode escolher, em /agentes
//esses são todos endpoints?

/**
 * @swagger
 * tags:
 *   - name: Agentes
 *     description: Gerenciamento de todos os agentes do departamento de polícia
 */

/**
 * @swagger
 * /agentes:
 *   get:
 *     summary: Lista de todos os agentes
 *     tags: [Agentes]
 *     responses:
 *       200:
 *         description: Lista de agentes retornada com sucesso
 */

router.get("/", controller.getAgentes);

/**
 * @swagger
 * /agentes:
 *   post:
 *     summary: Criar um novo agente
 *     tags: [Agentes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, dataDeIncorporacao, cargo]
 *             properties:
 *               nome:
 *                 type: string
 *               dataDeIncorporacao:
 *                 type: string
 *                 format: date
 *               cargo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Agente criado com sucesso
 */

//required significa que algo é obrigatório
//content, o que vai ter dentro do meu objeto que vai ser enviado, ou seja, vou enviar json no formato tal (dados descritos no schema)
router.post("/", controller.createAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   put:
 *     summary: Atualizar um agente existente
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, dataDeIncorporacao, cargo]
 *             properties:
 *               nome:
 *                 type: string
 *               dataDeIncorporacao:
 *                 type: string
 *                 format: date
 *               cargo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Agente atualizado com sucesso
 *       404:
 *         description: Agente não encontrado
 */

router.put("/:id", controller.updateAgente);

/**
 * @swagger
 * /agentes/{id}:
 *   delete:
 *     summary: Remover um agente a partir do ID
 *     tags: [Agentes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do agente
 *     responses:
 *       200:
 *         description: Agente deletado com sucesso
 *       404:
 *         description: Agente não encontrado
 */

router.delete("/:id", controller.deleteAgente);

//A API DEVE DEVOLVER JSON, E NÃO HTML

//se rotas tiverem o mesmo caminho, será considerada somente a última

//o idela seria esta no meu arquivo routes, junto com os outros, e tudo seria servido em agentesRoutes
//aqui, meu post é responsável por enviar os arquivos. Isso é um endpoint
//na rota agentes, quando minha requisição for realizada, ou seja, preciso linkar essa requisição com um button no meu html
//meu onClick vai disparar a função que chama essa requisição e envia como resposta a mensagem

//aqui, eu sirvo a minha pasta que já foi definido como pasta estatica, servindo o arquivo index.html
//como estou fazendo o send file, quero que a página seja servida automaticamente assim que meu usuário clicar
//path.join fornece um caminho seguro até o meu arquivo e compatível com qualquer sistema operacional
//dirname representa o caminho absoluto da pasta onde está o server.js
//ou seja, essa função permite que meu servidor encontre o caminho correto

//como funciona a estrutura?
// então o meu repositorio armazena as minhas informações e faz o gerenciamento
// eu envio para o meu controller que vai ser responsável por gerenciar acessando as informações do meu params e body
// tentando entender a importancia do controller. eu entendi que o controller que é responsável por acesssar e enviar as informações via rotas
//e rotas so chama, uma forma de deixar o codigo mais modularizado
//mas ainda não entendi completamente porque a estrutura é feita dessa forma

//SWAGGER: cuidado com a formatação da identação, porque isso pode dar erro

module.exports = router;
//router é uma instância do módulo express
