const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API do departamento",
      version: "1.0.0",
      description:
        "API para o gerenciamento de agentes e casos de polícia. Essa API segue o padrão REST e a arquitetura MVC, utilizando arrays para armazenamento temporário de dados",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local de desenvolvimento",
      },
    ],
    tags: [
      {
        name: "Casos",
        description:
          "Gerenciamento de todos os casos do departamento de polícia",
      },
      {
        name: "Agentes",
        description: "Gerenciamento dos agentes do departamento de polícia",
      },
    ],
  },

  apis: ["./routes/agentesRoutes.js", "./routes/casesRoutes.js"],
  //o * que posso acessar minha documnetação em qualquer arquivo js
  //nesse caso, toda a lógica da minha API vai estar no meu agentesRoutes
};

const swaggerSpec = swaggerJSDoc(options);
function setupSwagger(app) {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}

module.exports = setupSwagger;
