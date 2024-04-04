import {
  GenerateSlug
} from "./chunk-C44QJAY3.mjs";
import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/createEvent.ts
import { z } from "zod";
async function CreateEvent(app) {
  app.withTypeProvider().post("/events", {
    schema: {
      summary: "Create an event",
      tags: ["events"],
      body: z.object({
        title: z.string().min(4),
        details: z.string().nullable(),
        maximunAttendees: z.number().int().positive().nullable()
      }),
      response: {
        201: z.object({
          eventId: z.string().uuid()
        })
      }
    }
  }, async (req, res) => {
    const { title, details, maximunAttendees } = req.body;
    const slug = GenerateSlug(title);
    const sameSlug = await prisma.event.findUnique({
      where: {
        slug
      }
    });
    if (sameSlug !== null) {
      throw new BadRequest("Este slug j\xE1 est\xE1 em uso");
    }
    const event = await prisma.event.create({
      data: {
        title,
        details,
        maximunAttendees,
        slug
      }
    });
    return res.status(201).send({ eventId: event.id });
  });
}

export {
  CreateEvent
};
