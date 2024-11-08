import { z } from "zod";

const updateServerUrlSchema = z.object({
  serverUrl: z.string().url(),
  bikeId: z.string(),
});

export { updateServerUrlSchema };
