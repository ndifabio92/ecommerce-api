import swaggerJsdoc from "swagger-jsdoc";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "E-commerce API",
      version: "1.0.0",
      description: "API de e-commerce con gestión de productos y carritos",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor de desarrollo",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            id: { type: "string" },
            title: { type: "string" },
            description: { type: "string" },
            price: { type: "number" },
            thumbnail: { type: "string" },
            code: { type: "string" },
            stock: { type: "number" },
            status: { type: "boolean" },
          },
        },
        Cart: {
          type: "object",
          properties: {
            id: { type: "string" },
            products: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  product: { type: "string" },
                  quantity: { type: "number" },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: ["./src/infrastructure/swagger/*.swagger.ts"],
};

export const swaggerSpec = swaggerJsdoc(options);
