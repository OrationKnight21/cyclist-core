import User from "../models/user.model.js";
import Bike from "../models/bike.model.js";
import Rental from "../models/rental.model.js";

const postRentalRecord = async (req, res) => {
  try {
    // TODO: define cost per km across the app
    const email = req.body.email;
    const bikeID = req.body.bikeID;

    const startTime = new Date(req.body.startTime);
    const endTime = new Date(req.body.endTime);

    // Check if the start and end times are valid dates
    if (isNaN(startTime) || isNaN(endTime)) {
      return res.status(400).json({ error: "Invalid startTime  format" });
    }

    const interval = endTime - startTime;
    if (interval < 0) {
      return res
        .status(401)
        .json({ error: "End time is before the start time" });
    }

    // define total cost
    const costPerMinute = 1.2;
    const totalCost = Math.abs(interval / 60000) * costPerMinute;

    // parse body

    // get user from email
    const reqUser = await User.findOne({ email });
    if (!reqUser) {
      return res.status(401).json({ error: "User does not exist" });
    }

    // get bike from bikeID
    const reqBike = await Bike.findById(bikeID);
    if (!reqBike) {
      return res.status(404).json({ error: "Bike not found" });
    }

    // create new rental
    const rental = new Rental({
      user: reqUser,
      bike: reqBike,
      startTime: startTime,
      endTime: endTime,
      totalCost: totalCost,
    });
    await rental.save();

    // return postive message
    return res.status(201).json({ message: "record created" });
  } catch (error) {
    return res.status(500).json({ error: `Failed to create record: ${error}` });
  }
};

const getAvailableBikes = async (req, res) => {
  try {
    // Get bike IDs of bikes currently rented
    const currentRentals = await Rental.find({
      status: "ongoing",
      startTime: { $lte: new Date() },
      endTime: { $gte: new Date() },
    }).select("bike");

    // Extract IDs of bikes currently in use
    const rentedBikeIds = currentRentals.map((rental) => rental.bike);

    // Query for bikes not in the rentedBikeIds list
    const availableBikes = await Bike.find({
      _id: { $nin: rentedBikeIds },
    }).select("_id");

    // Return only the IDs of available bikes
    res
      .status(200)
      .json({ availableBikeIds: availableBikes.map((bike) => bike._id) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { postRentalRecord, getAvailableBikes };
