import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/get-event.ts
import { z } from "zod";
async function GetEvent(app) {
  app.withTypeProvider().get("/events/:eventId", {
    schema: {
      summary: "Get an event",
      tags: ["events"],
      params: z.object({
        eventId: z.string().uuid()
      }),
      response: {
        200: z.object({
          event: z.object({
            id: z.string(),
            title: z.string(),
            slug: z.string(),
            details: z.string().nullable(),
            maximunAttendees: z.number().int().nullable(),
            attendeesCount: z.number().int()
          })
        })
      }
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
            attendees: true
          }
        }
      },
      where: {
        id: eventId
      }
    });
    if (event === null) {
      throw new BadRequest("Event n\xE3o encontrado");
    }
    return res.send({ event: {
      id: event.id,
      title: event.title,
      slug: event.slug,
      details: event.details,
      maximunAttendees: event.maximunAttendees,
      attendeesCount: event._count.attendees
    } });
  });
}

export {
  GetEvent
};
