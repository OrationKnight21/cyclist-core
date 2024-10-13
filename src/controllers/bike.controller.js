import Bike from "../models/bike.model.js";
import { positiveNumberSchema } from "../validations/misc.validation.js";

const getAllBikes = async (req, res) => {
  const page = positiveNumberSchema.safeParse(req.params.page);
  if (!page.success) {
    return res.status(400).json({ error: page.error });
  }

  // paginate results, 20 at a time
  Bike.find()
    .skip((page.data - 1) * 20)
    .limit(20)
    .then((bikes) => {
      if (bikes.length === 0) {
        return res.status(404).json({ error: "end of content" });
      }

      res.status(200).json({
        page: page.data,
        bikes: bikes,
      });
    })
    .catch((error) =>
      res.status(500).json({ error: `Failed to get bikes: ${error}` })
    );
};

export { getAllBikes };
