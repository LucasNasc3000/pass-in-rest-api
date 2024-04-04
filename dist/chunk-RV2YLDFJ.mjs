import {
  BadRequest
} from "./chunk-JRO4E4TH.mjs";
import {
  prisma
} from "./chunk-JV6GRE7Y.mjs";

// src/routes/check-in.ts
import { z } from "zod";
async function CheckIn(app) {
  app.withTypeProvider().get("/attendees/:attendeeId/check-in", {
    schema: {
      summary: "Check-in an attendee",
      tags: ["check-ins"],
      params: z.object({
        attendeeId: z.coerce.number().int()
      }),
      response: {
        201: z.string()
      }
    }
  }, async (req, res) => {
    const { attendeeId } = req.params;
    const attendeeCheckIn = await prisma.checkIn.findUnique({
      where: {
        attendeeId
      }
    });
    if (attendeeCheckIn !== null) {
      throw new BadRequest("Este participante j\xE1 realizou check-in");
    }
    await prisma.checkIn.create({
      data: {
        attendeeId
      }
    });
    return res.status(201).send("Check-in criado");
  });
}

export {
  CheckIn
};
