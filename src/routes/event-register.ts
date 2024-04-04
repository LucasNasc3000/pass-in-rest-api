import { FastifyInstance } from "fastify";
import { z } from "zod";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { prisma } from "../lib/prisma";
import { BadRequest } from "./_errors/bad-request";

//50:42

export async function EventRegister(app: FastifyInstance) {
   app
      .withTypeProvider<ZodTypeProvider>()
      .post('/events/:eventId/attendees', {
        schema: {
            summary: 'Register an attendee',
            tags: ['attendees'],
            body: z.object({
                name: z.string().min(4),
                email: z.string().email(),
            }),
            params: z.object({
                eventId: z.string().uuid(),
            }),
            response: {
                201: z.object({
                  attendeeId: z.number(),
                })
            },
        }
      }, async (request, reply) => {
       const { eventId } = request.params;
       const { name, email } = request.body;

       const sameEmailVerify = await prisma.attendee.findUnique({
        where: {
            eventId_email: {
                email,
                eventId,
            }
        }
       })

       if(sameEmailVerify !== null) {
        throw new BadRequest("Este email já está cadastrado para este evento");
       }

       const [event, attendeesCountForEvent] = await Promise.all([
            await prisma.event.findUnique({
              where: {
                id: eventId,
              }
            }),

           await prisma.attendee.count({
            where: {
                eventId,
            }
           })   
       ])

       if(event?.maximunAttendees && attendeesCountForEvent >= event.maximunAttendees) {
        throw new BadRequest("O número máximo de participantes foi atingido");
       }

       const attendee = await prisma.attendee.create({
        data: {
            name,
            email,
            eventId,
        }
       })
       return reply.status(201).send({ attendeeId: attendee.id })  
    })
}