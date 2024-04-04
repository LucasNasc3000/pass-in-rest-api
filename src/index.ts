import fastify from "fastify";

import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifyCors from "@fastify/cors";

import { jsonSchemaTransform, serializerCompiler, validatorCompiler } from "fastify-type-provider-zod";
import { CreateEvent } from "./routes/createEvent";
import { EventRegister } from "./routes/event-register";
import { GetEvent } from "./routes/get-event";
import { GetAttendeeBadge } from "./routes/get-attendee-badge";
import { CheckIn } from "./routes/check-in";
import { GetEventAttendees } from "./routes/get-event-attendees";
import { errorHandler } from "./error-handler";

export const app = fastify();

app.register(fastifyCors, {
    origin: '*',
})

app.register(fastifySwagger, {
    swagger: {
        consumes: ['application/json'],
        produces: ['application/json'],
        info: {
            title: 'pass.in',
            description: 'Especificações da API que é o back-end da aplicação pass.in, construída durante o NLW unite da rocketseat em 04/2024',
            version: '1.0.0',
        },
    },
    transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
    routePrefix: '/docs',
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

app.listen({port: 3001, host: '0.0.0.0'}).then(() => {
    console.log("Server rodando.");
}) 