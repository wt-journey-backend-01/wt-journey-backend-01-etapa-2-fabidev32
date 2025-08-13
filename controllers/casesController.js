const repository = require("../repositories/casesRepository");
const { agenteSchema } = require("../utils/casesValidation");

class ApiError extends Error {
  constructor(message, statusCode = 500) {
    super(message);
    this.name = "ApiError";
    this.statusCode = statusCode;
  }
}

const getCases = (req, res, next) => {
  try {
    const cases = repository.findAll();
    res.status(200).json(cases);
  } catch (error) {
    next(new ApiError("Error ao listar agentes"));
  }
};

const createCase = (req, res, next) => {
  try {
    const { titulo, descricao, status, agenteId } = req.body;
    const dataReceived = {
      titulo,
      descricao,
      status,
      agenteId,
    };

    const data = agenteSchema.parse(dataReceived);
    const newCase = repository.createNewCase(data);
    res.status(201).json(newCase);
  } catch (error) {
    console.log("Erro:", error);

    next(new ApiError(error.message, 400));
  }
};

const updateCase = (req, res, next) => {
  const { id } = req.params;
  try {
    const caseUptade = repository.updateCase(id, req.body);
    if (!caseUptade) return next(new ApiError("Caso não encontrado", 400));
    res.status(200).json(caseUptade);
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

const deletedCase = (req, res, next) => {
  const { id } = req.params;
  try {
    const caseDeleted = repository.deleteCase(id);
    if (!caseDeleted) return next(ApiError("Caso não encontrado", 400));
    res.status(200).json(caseDeleted);
  } catch (error) {
    next(new ApiError(error.message, 400));
  }
};

module.exports = { getCases, createCase, updateCase, deletedCase };
