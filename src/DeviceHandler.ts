import { Mill } from "./mill";
import { Device } from "./types/Device";

export class DeviceHandler {
  private mill: Mill;
  devices: Device[] = [];

  constructor(mill: Mill) {
    this.mill = mill;
  }

  readonly getDevices = async () => {
    const res = await this.mill.api.doRequest<{ deviceList: Device[] }>(
      "get",
      `uds/selectDevicebyRoom?roomId=${this.mill.roomHandler.room?.roomId}`,
      { auth: true }
    );
    this.devices = res.deviceList;
  };

  readonly setDevice = async (
    temperature: number,
    operation: number,
    status: number
  ) => {
    const promises = [];

    for (const device of this.devices) {
      promises.push(
        this.mill.api.doRequest(
          "post",
          `uds/deviceControlForOpenApi?deviceId=${device?.deviceId}&holdTemp={${temperature}&operation=${operation}&status=${status}`,
          { auth: true }
        )
      );
    }

    await Promise.all(promises);
  };
}
