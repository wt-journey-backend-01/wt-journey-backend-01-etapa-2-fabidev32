const express = require("express");
const router = express.Router();
const controller = require("../controllers/agentesController");

//cada router determina um middare que intercepta funções.
//ou seja, quando a minha rota /agente for acessada, eu intercepto os controllers responsáveis por intercepta as funções
//que vão realizar o desejo do usuário
//o que é um endpoint? É uma ponte?
//porque utilizo o router?
//ele esta aqui na pasta de rotas pois o meu server js precisa de todas essas rotas
//essa é a pasta por fornecer todas as rotas e caminhos possíveis, que o usuário pode escolher, em /agentes
//esses são todos endpoints?

router.get("/", controller.getAgentes);
router.post("/", controller.createAgente);
router.put("/:id", controller.updateAgente);
router.delete("/:id", controller.deleteAgente);

//como funciona a estrutura?
// então o meu repositorio armazena as minhas informações e faz o gerenciamento
// eu envio para o meu controller que vai ser responsável por gerenciar acessando as informações do meu params e body
// tentando entender a importancia do controller. eu entendi que o controller que é responsável por acesssar e enviar as informações via rotas
//e rotas so chama, uma forma de deixar o codigo mais modularizado
//mas ainda não entendi completamente porque a estrutura é feita dessa forma

module.exports = router;
