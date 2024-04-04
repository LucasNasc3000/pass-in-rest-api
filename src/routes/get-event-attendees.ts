import { FastifyInstance } from "fastify";
import { number, z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";

export async function GetEventAttendees(app: FastifyInstance) {
   app
      .withTypeProvider<ZodTypeProvider>()
      .get('/events/:eventId/attendees', {
        schema: {
           summary: 'Get event attendees',
           tags: ['events'],
           params: z.object({
                eventId: z.string().uuid(),
            }),
           querystring: z.object({
                query: z.string().nullish(),
                pageIndex: z.string().nullish().default('0').transform(Number),
           }),
           response: {
            200: z.object({
                attendees: z.array(
                    z.object({
                        id: z.number(),
                        name: z.string(),
                        email: z.string().email(),
                        createdAt: z.date(),
                        checkedInAt: z.date().nullable(), 
                    })
                )
            })
           },
        }
      }, async (req, res) => {
        const { eventId } = req.params;
        const { pageIndex, query } = req.query;

        const attendees = await prisma.attendee.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                createdAt: true,
                checkIn: {
                    select: {
                        createdAt: true,
                    }
                }
            },
            where: query ? {
                eventId,
                name: {
                    contains: query,
                }
            } : {
                eventId,
            },
            take: 10,
            skip: pageIndex * 10,
            orderBy: {
                createdAt: 'desc',
            }
        })

        return res.send({ attendees: attendees.map((att) => {
            return {
                id: att.id,
                name: att.name,
                email: att.email,
                createdAt: att.createdAt,
                checkedInAt: att.checkIn?.createdAt ?? null
            }
        }) });
    })
}