const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const member = require("./models/member");

const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Eigen Backend API",
      version: "1.0.0",
      description: "Book Repository Management API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      schemas: {
        Book: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              format: "int64",
            },
            code: {
              type: "string",
            },
            title: {
              type: "string",
            },
            author: {
              type: "string",
            },
            stock: {
              type: "integer",
              format: "int64",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        Login: {
          type: "object",
          properties: {
            code: {
              type: "string",
            },
            name: {
              type: "string",
            },
            password: {
              type: "string",
            },
          },
        },
        Member: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              format: "int64",
            },
            code: {
              type: "string",
            },
            name: {
              type: "string",
            },
            password: {
              type: "string",
            },
            penaltyStatus: {
              type: "boolean",
            },
            penaltyDate: {
              type: "string",
              format: "date-time",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
        BookLending: {
          type: "object",
          properties: {
            id: {
              type: "integer",
              format: "int64",
            },
            MemberId: {
              type: "integer",
              format: "int64",
            },
            BookId: {
              type: "integer",
              format: "int64",
            },
            borrowedAt: {
              type: "string",
              format: "date-time",
            },
            returnedAt: {
              type: "string",
              format: "date-time",
            },
            createdAt: {
              type: "string",
              format: "date-time",
            },
            updatedAt: {
              type: "string",
              format: "date-time",
            },
          },
        },
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["./src/api/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

module.exports = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};
