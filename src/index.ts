import * as functions from "firebase-functions";
import { Mill } from "./mill";

export const millTemperature = functions
  .region("europe-west1")
  .https.onRequest(async (req, res) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    const roomName = req.params.roomName;
    const temperature = req.params.temperature;
    console.log(roomName, temperature);
    const mill = new Mill();
    try {
      if (!roomName || !temperature)
        throw Error("Missing RoomName or Temperature");
      await mill.setTemp(roomName, Number(temperature));
      res.send(`Success! All devices in ${roomName} was set to ${temperature}`);
    } catch (e) {
      console.log(e);
      // @ts-ignore
      res.send({ message: e.message });
    }
  });
