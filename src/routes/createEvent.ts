import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { GenerateSlug } from "../utils/generate-slug";
import { prisma } from "../lib/prisma";
import { FastifyInstance } from "fastify";
import { BadRequest } from "./_errors/bad-request";

// 38:42
// FastifyInstance é o tipo da variável app
export async function CreateEvent(app: FastifyInstance) {
    app
.withTypeProvider<ZodTypeProvider>()
.post('/events', {
    schema: {
        summary: 'Create an event',
        tags: ['events'],
        body: z.object({
            title: z.string().min(4),
            details: z.string().nullable(),
            maximunAttendees: z.number().int().positive().nullable(),
         }),
         response: {
            201: z.object({
                eventId: z.string().uuid(),
            })
         },
    }
}, async (req, res) => {
    const { title, details, maximunAttendees } = req.body;

    const slug = GenerateSlug(title);

    const sameSlug = await prisma.event.findUnique({
        where: {
            slug,
        }
    })

    if (sameSlug !== null) {
        throw new BadRequest("Este slug já está em uso");
    }

    const event = await prisma.event.create({
        data: {
            title,
            details,
            maximunAttendees,
            slug,
        },
    })

    // Boa prática -->
    // status http que informa que um registro foi criado co sucesso no BD
    return res.status(201).send({ eventId: event.id });
})
}

