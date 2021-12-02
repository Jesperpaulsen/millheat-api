export class Secrets {
  readonly accessKey: string;
  readonly secretToken: string;
  readonly username: string;
  readonly password: string;

  constructor() {
    this.accessKey = this.getKeyFromEnvironment("accessKey");
    this.secretToken = this.getKeyFromEnvironment("secretToken");
    this.username = this.getKeyFromEnvironment("username");
    this.password = this.getKeyFromEnvironment("password");
  }

  private getKeyFromEnvironment = (key: string) => {
    const loadedKey = process.env[key];
    if (!loadedKey) {
      throw new Error(`No key loaded from environment for ${key}`);
    }
    return loadedKey;
  };
}
