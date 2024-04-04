import { FastifyInstance } from "fastify";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

export async function GetEvent(app: FastifyInstance) {
   app
      .withTypeProvider<ZodTypeProvider>()
      .get('/events/:eventId', {
        schema: {
            summary: 'Get an event',
            tags: ['events'],
           params: z.object({
                eventId: z.string().uuid(),
            }),
           response: {
            200: z.object({
                event: z.object({
                    id: z.string(),
                    title: z.string(),
                    slug: z.string(),
                    details: z.string().nullable(),
                    maximunAttendees: z.number().int().nullable(),
                    attendeesCount: z.number().int(),
                })
            })
           },
        }
      }, async (req, res) => {
        const { eventId } = req.params;
        
        const event = await prisma.event.findUnique({
            select: {
                id: true,
                title: true,
                slug: true,
                details: true,
                maximunAttendees: true,
                _count: {
                    select: {
                        attendees: true,
                    }
                }
            },
            where: {
                id: eventId,
            },
        })

        if(event === null) {
            throw new BadRequest("Event não encontrado");
        }

        return res.send({ event: {
            id: event.id,
            title: event.title,
            slug: event.slug,
            details: event.details,
            maximunAttendees: event.maximunAttendees,
            attendeesCount: event._count.attendees,
        } });

      })
}