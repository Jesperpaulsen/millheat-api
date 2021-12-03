import { API } from "./API";
import { Authenticator } from "./Authenticator";
import { DeviceHandler } from "./DeviceHandler";
import { HomeHandler } from "./HomeHandler";
import { RoomHandler } from "./RoomHandler";
import { Secrets } from "./Secrets";

export class Mill {
  readonly secrets: Secrets;
  readonly api: API;
  readonly authenticator: Authenticator;
  readonly homeHandler: HomeHandler;
  readonly roomHandler: RoomHandler;
  readonly deviceHandler: DeviceHandler;

  constructor() {
    this.secrets = new Secrets();
    this.api = new API(this);
    this.authenticator = new Authenticator(this);
    this.homeHandler = new HomeHandler();
    this.roomHandler = new RoomHandler(this);
    this.deviceHandler = new DeviceHandler(this);
  }

  readonly setTemp = async (roomName: string, temperature: number) => {
    console.log(temperature);
    await this.authenticator.authenticate();
    await this.roomHandler.getRoom(roomName);
    await this.deviceHandler.getDevices();
    await this.deviceHandler.setDevice(temperature, 1, 1);
  };
}
