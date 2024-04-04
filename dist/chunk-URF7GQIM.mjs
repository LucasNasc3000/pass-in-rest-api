import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/event-register.ts
import { z } from "zod";
async function EventRegister(app) {
  app.withTypeProvider().post("/events/:eventId/attendees", {
    schema: {
      summary: "Register an attendee",
      tags: ["attendees"],
      body: z.object({
        name: z.string().min(4),
        email: z.string().email()
      }),
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        201: z.object({
          attendeeId: z.number()
        })
      }
    }
  }, async (request, reply) => {
    const { eventId } = request.params;
    const { name, email } = request.body;
    const sameEmailVerify = await prisma.attendee.findUnique({
      where: {
        eventId_email: {
          email,
          eventId
        }
      }
    });
    if (sameEmailVerify !== null) {
      throw new BadRequest("Este email j\xE1 est\xE1 cadastrado para este evento");
    }
    const [event, attendeesCountForEvent] = await Promise.all([
      await prisma.event.findUnique({
        where: {
          id: eventId
        }
      }),
      await prisma.attendee.count({
        where: {
          eventId
        }
      })
    ]);
    if (event?.maximunAttendees && attendeesCountForEvent >= event.maximunAttendees) {
      throw new BadRequest("O n\xFAmero m\xE1ximo de participantes foi atingido");
    }
    const attendee = await prisma.attendee.create({
      data: {
        name,
        email,
        eventId
      }
    });
    return reply.status(201).send({ attendeeId: attendee.id });
  });
}

export {
  EventRegister
};
