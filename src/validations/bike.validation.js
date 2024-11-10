import { z } from "zod";

const updateServerUrlSchema = z.object({
  serverUrl: z.string(),
  bikeId: z.string(),
});

const updateLocationSchema = z.object({
  bikeId: z.string(),
  longitude: z.string(),
  latitude: z.string(),
});

export { updateLocationSchema, updateServerUrlSchema };
