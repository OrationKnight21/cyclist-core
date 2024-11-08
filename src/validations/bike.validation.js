import { z } from "zod";

const updateServerUrlSchema = z.object({
  serverUrl: z.string(),
  bikeId: z.string(),
});

export { updateServerUrlSchema };
