const { z } = require("zod");

const agenteSchema = z.object({
  // valido inicialmente se é uma string
  // depois, valido se o meu campo tem no mínimo 1 caractere, se não tiver, a mensagem que eu defini é enviada
  nome: z
    .string({ required_error: "Nome é obrigatório" })
    .min(1, "Nome não pode ser vazio"),

  // validação number (comentado)
  /*
  dataDeIncorporacao: z
    .number({ required_error: "Somente números são permitidos" })
    .int({ required_error: "Digite somente valores inteiros" })
    .nonnegative({ required_error: "Data não pode ser valor negativo" })
    .min(1, "Preenchimento obrigatório"),
  */

  dataDeIncorporacao: z.coerce.date().min(new Date("1900-01-01"), {
    message: "Data inválida",
  }),

  cargo: z.enum(
    ["delegado", "agente", "policial", "investigador", "perito criminal"],
    {
      required_error: "Cargo é obrigatório",
      invalid_type_error:
        'Cargo deve ser "agente", "delegado", "policial", "investigador" ou "perito criminal"',
    }
  ),

  // se não estiver vazio mas tiver com dados diferentes dos tipos obrigatórios
  // tenho ainda validações como z.boolean
});

module.exports = { agenteSchema };
