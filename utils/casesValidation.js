const { z } = require("zod");

const agenteSchema = z.object({
  titulo: z
    .string({ required_error: "Título é obrigatório" })
    .min(1, "Título não pode ser vazio"),

  descricao: z
    .string({ required_erro: "Descrição é obrigatória" })
    .min(1, "Descrição não pode ser vazia"),

  status: z.enum(["aberto", "fechado"], {
    required_error: "Status é obrigatório",
    invalid_type_error: 'Status deve ser "aberto" ou "fechado"',
  }),
  agenteId: z
    .string({ required_error: "Id do agente é obrigatório" })
    .min(1, "Identificador do agente não pode ser vazio"),
});

module.exports = { agenteSchema };
