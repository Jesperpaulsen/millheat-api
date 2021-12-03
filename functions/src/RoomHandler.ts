import { Mill } from "./mill";
import { Room } from "./types/Room";

export class RoomHandler {
  private mill: Mill;
  room?: Room;

  constructor(mill: Mill) {
    this.mill = mill;
  }

  readonly getRoom = async (roomName: Room["roomName"]) => {
    const res = await this.mill.api.doRequest<{ roomList: Room[] }>(
      "get",
      `uds/selectRoombyHome?homeId=${this.mill.homeHandler.homeId}`,
      { auth: true }
    );
    this.room =
      res.roomList.find((room) => room.roomName === roomName) ||
      res.roomList[0];
  };
}
