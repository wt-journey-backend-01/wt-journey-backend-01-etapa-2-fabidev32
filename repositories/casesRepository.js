const { v4: uuidv4 } = require("uuid");
const fs = require("fs");

const cases = [
  {
    id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
    titulo: "Homicídio",
    descricao:
      "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
    status: "aberto",
    agenteId: "401bccf5-cf9e-489d-8412-446cd169a0f1",
  },

  {
    id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d47",
    titulo: "Assalto",
    descricao:
      "Uma agência bancária foi incendiada e caixas eletrônicos foram destruídos",
    status: "fechado",
    agenteId: "401bccf5-cf9e-489d-8412-446cd169a0f2",
  },
];

function findAll() {
  return cases;
}

const findByid = (id) => cases.find((a) => a.id == id);

const createNewCase = (data) => {
  const newCase = { id: uuidv4(), ...data };
  cases.push(newCase);
  return newCase;
};

const updateCase = (id, data) => {
  const index = cases.findIndex((c) => c.id == id);
  if (index != -1) {
    cases[index] = { ...cases[index], ...data };
    return cases[index];
  }
  return null;
};

const deleteCase = (id) => {
  const index = cases.findIndex((c) => c.id == id);
  if (index != -1) {
    const [deleted] = cases.splice(index, 1);
    return deleted;
  }
  return false;
};

module.exports = {
  findAll,
  createNewCase,
  updateCase,
  deleteCase,
};
