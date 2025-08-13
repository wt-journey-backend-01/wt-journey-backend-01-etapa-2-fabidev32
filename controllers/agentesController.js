const repository = require("../repositories/agentesRepository");
const { agenteSchema } = require("../utils/agentesValidation");
//responsável por validar os ddos, ou seja, por manter as regras de negócio e gerenciar os dados

class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}
//aqui a minha classe API Error implementa a interface erro
//tenho o construtor que sempre que eu usar essa classe em algum trecho do meu codigo preciso passar as informações do parametro
//é assim que crio uma classe em js
//o que super(message) significa?
//utilizar arrow function é ideal para funç~eos callBack, é como se minhas funções tivessem um identificador associado

const getAgentes = (req, res, next) => {
  try {
    const agentes = repository.findAll();
    res.status(200).json(agentes);
  } catch (error) {
    next(new ApiError("Erro ao listar os agentes"));
  }
};

//porque eu preciso enviar os dados como json, não posso enviar como um objeto js?
//aqui eu acesso o meu array de objetos json e envio como resposta
//dessa forma, na hora de minha rota carregar a página,
//ela ja foi poder acessar esses dados do body, que eu posso puxar a partir de req.body
//esse é um middware
//o next me diz que, caso haja algum erro que o catch não entenda, eu mando para o meu next (função responsável pelo tratamento de erros)

const createAgente = (req, res, next) => {
  try {
    const { nome, dataDeIncorporacao, cargo } = req.body;
    const dataReceived = {
      nome,
      dataDeIncorporacao,
      cargo,
    };

    const data = agenteSchema.parse(dataReceived);
    const agente = repository.createNewAgente(data);
    res.status(201).send(agente);
  } catch (error) {
    console.log("Erro:", error);
    next(new ApiError(error.message, 400));
  }
};

//precisa do req, res para usar na rota, mas ainda to confusa quanto a necessidade
//o next é pra passar para a próxima caso ocorra algum erro, estranho que não chamou na função
//chamo a função que esta no meu repositorio responsavel por criar um novo objeto

const updateAgente = (req, res, next) => {
  const { id } = req.params;
  try {
    const agenteUptade = repository.updateAgente(id, req.body);
    if (!agenteUptade) return next(new ApiError("Agente não encontrado.", 400));
    res.status(200).json(agenteUptade);
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

//parametros, como query string tambem ficam na url
//a diferença é que parametros eu diferencio a partir de "?" na url enquanto a query strig a partir de ":"

const deleteAgente = (req, res, next) => {
  const { id } = req.params;
  try {
    const agenteDeleted = repository.deleteAgente(id);
    if (!agenteDeleted)
      return next(new ApiError("Agente não encontrado.", 400));
    res.status(200).json(agenteDeleted);
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

//aqui, eu acho que precisa o parametro (req, res, next), pois controller nada mais é do que um caminho para a minha rota
//então eu vou usar a requisição da rota para acessar os dados
//res euv ou usar para enviar para a minha rota que envia para o meu servidor e que por usa vez permite o uusário acessar as informações
//o que significa next?

module.exports = { getAgentes, createAgente, updateAgente, deleteAgente };

//eu preciso desse controller para enviar os dados que as minhas funções do meu repositório precisam para serem realizadas
//se não tivesse essa pasta controller, estaria tudo dentro do server.js, tanto para casos quanto para agentes
//os controllers somente servem as funções que os repositórios fornecem, é a unica responsabilidade deles
