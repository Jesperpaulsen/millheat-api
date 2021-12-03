import * as functions from "firebase-functions";

export class Secrets {
  readonly accessKey: string;
  readonly secretToken: string;
  readonly username: string;
  readonly password: string;

  constructor() {
    this.accessKey = this.getKeyFromEnvironment("access_key");
    this.secretToken = this.getKeyFromEnvironment("secret_token");
    this.username = this.getKeyFromEnvironment("username");
    this.password = this.getKeyFromEnvironment("password");
  }

  private getKeyFromEnvironment = (key: string) => {
    let loadedKey = process.env[key];
    if (!loadedKey) {
      loadedKey = functions.config().mill[key];
    }
    if (!loadedKey) {
      throw new Error(`No key loaded from environment for ${key}`);
    }
    return loadedKey;
  };
}
