import {
  GetEvent
} from "./chunk-2ILOXQ4W.mjs";
import {
  errorHandler
} from "./chunk-72HEJ7EF.mjs";
import {
  CheckIn
} from "./chunk-RV2YLDFJ.mjs";
import {
  CreateEvent
} from "./chunk-7FOUMJUV.mjs";
import "./chunk-C44QJAY3.mjs";
import {
  EventRegister
} from "./chunk-URF7GQIM.mjs";
import {
  GetAttendeeBadge
} from "./chunk-6XIYK5I6.mjs";
import "./chunk-JRO4E4TH.mjs";
import {
  GetEventAttendees
} from "./chunk-YCASUXA7.mjs";
import "./chunk-JV6GRE7Y.mjs";

// src/index.ts
import fastify from "fastify";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";
import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
var app = fastify();
app.register(fastifyCors, {
  origin: "*"
});
app.register(fastifySwagger, {
  swagger: {
    consumes: ["application/json"],
    produces: ["application/json"],
    info: {
      title: "pass.in",
      description: "Especifica\xE7\xF5es da API que \xE9 o back-end da aplica\xE7\xE3o pass.in, constru\xEDda durante o NLW unite da rocketseat em 04/2024",
      version: "1.0.0"
    }
  },
  transform: jsonSchemaTransform
});
app.register(fastifySwaggerUi, {
  routePrefix: "/docs"
});
app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.register(CreateEvent);
app.register(EventRegister);
app.register(GetEvent);
app.register(GetAttendeeBadge);
app.register(CheckIn);
app.register(GetEventAttendees);
app.setErrorHandler(errorHandler);
app.listen({ port: 3001, host: "0.0.0.0" }).then(() => {
  console.log("Server rodando.");
});
export {
  app
};
