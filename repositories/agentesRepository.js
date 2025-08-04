const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const agentes = [
  {
    id: "401bccf5-cf9e-489d-8412-446cd169a0f1",
    nome: "Rommel Carneiro",
    dataDeIncorporacao: "1992/10/04",
    cargo: "delegado",
  },

  {
    id: "bdaeb44b-0bc5-4adc-a2d7-e975d75cf91d",
    nome: "Higino",
    dataDeIncorporacao: "2000/03/10",
    cargo: "delegado",
  },
];

const findAll = () => agentes;

const findById = (id) => agentes.find((a) => a.id == id);

const createNewAgente = (data) => {
  const newAgente = { id: uuidv4(), ...data };
  agentes.push(newAgente);
  return newAgente;
};

//aqui, eu recebo um dado, nesse caso data, e digo que meu novo agente vai receber um novo id e todo o resto de data
//adiciono no meu array de agentes
//qual a diferença de usar arrow function ou so function?

const updateAgente = (id, data) => {
  const index = agentes.findIndex((agente) => agente.id == id);
  if (index != -1) {
    agentes[index] = { ...agentes[index], ...data };
    return agentes[index];
  }
  return null;
};

//aqui, eu recebo o id, pois preciso do id para achar qual objeto eu preciso atualizar
//dessa forma, falo que o agente nessa posição, eu vou pegar todos os seus dados e vou substiruri todos eles por data
//esse "..." significa isso? definir que vou mudar tudo
//mas, meu id não é uma string e o index de um array é um int? isso não da erro?

const deleteAgente = (id) => {
  const index = agentes.findIndex((agente) => agente.id === id);
  if (index != -1) {
    agentes.splice(index, 1);
    return true;
  }
  return false;
};

//aqui, eu acho o id correspondente convertido, ou seja, percorro o meu array agentes
// a cada agente, eu confiro se o id da minha url é igual ao id do meu objeto da posição atual do array
//se for, vai pegar esse id e converter de acordo com o indice do array, ou seja, um numero inteiro
// o findIndex serve para realizar essa conversão
//o método splice pelo o que eu entendi vai manter todos os elementos menos o elemento com o oid que eu achei
//não poderia fazer de outra forma? por exemplo, usando a função findById, achando o objeto correspondente
//e depois utilizando uma função js que vai mapear todos os objetos menos esse que eu achei
//faltou so testar a requisição com DELETE, deu problema

module.exports = {
  findAll,
  createNewAgente,
  updateAgente,
  deleteAgente,
};

//module.exports é um middwale do node.js?
