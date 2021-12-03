export interface Device {
  maxTemperature: number;
  maxTemperatureMsg: string;
  changeTemperature: number;
  canChangeTemp: number;
  deviceId: number;
  deviceName: string;
  changeTemperatureMsg: string;
  mac: string;
  deviceStatus: number;
  heaterFlag: number;
  subDomainId: number;
  controlType: number;
  currentTemp: number;
}
