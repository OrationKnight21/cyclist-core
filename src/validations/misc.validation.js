import { z } from "zod";

// misc validation, currently used to validate page number given as a query param
const positiveNumberSchema = z
  .string()
  .transform((val) => parseInt(val, 10))
  .refine((val) => !isNaN(val) && val > 0, {
    message: "Value must be a positive integer",
  });

export { positiveNumberSchema };
