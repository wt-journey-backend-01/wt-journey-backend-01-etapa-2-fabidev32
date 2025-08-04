const { z } = require("zod");

const agenteSchema = z.object({
  //valido inicialmente se é uma string
  //depois, valido se o meu campo tem no mínimo 1 caractere, se não tiver, a mensagem que eu defini é enviada
  nome: z
    .string({ required_erro: "Nome é obrigatório" })
    .min(1, "Nome não pode ser vazio"),
  dataDeIncorporacao: z
    .number({ required_error: "Somente números são permitidos" })
    .int({ required_error: "Digite somente valores inteiros" })
    .nonnegative({ required_error: "Data não pode ser valor negativo" })
    .min(1, "Preenchimento obrigatório"),
  cargo: z.enum(["Delegado", "Agente de Trânsito", "Policial civil"], {
    required_error: "Cargo é obrigatório",
    invalid_type_error:
      'Cargo deve ser "Agente de Trânsito", "Delegado" ou "Policial Civil"',
  }),

  //se não estiver vazio mas tiver com dados diferentes dos tipos obrigatórios
  //tenho ainda validações como z.boolean
});

module.exports = { agenteSchema };
//porque preciso exportar entre chaves?
