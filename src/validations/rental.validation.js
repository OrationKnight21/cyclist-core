import { z } from "zod";

const unlockCycleSchema = z.object({
  rentalId: z.string(),
});

export { unlockCycleSchema };
