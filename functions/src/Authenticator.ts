import { Mill } from "./mill";

export class Authenticator {
  accessToken?: string;
  mill: Mill;

  constructor(mill: Mill) {
    this.mill = mill;
  }

  authenticate = async (): Promise<void> => {
    const authorizationCode = await this.getAuthorizationCode();
    const accessToken = await this.getAccessToken(authorizationCode);
    console.log(accessToken);
    this.accessToken = accessToken;
  };

  private getAuthorizationCode = async () => {
    const headers = {
      access_key: this.mill.secrets.accessKey,
      secret_token: this.mill.secrets.secretToken,
    };

    const res = await this.mill.api.doRequest<{ authorization_code: string }>(
      "get",
      "share/applyAuthCode",
      { headers }
    );
    return res?.authorization_code;
  };

  private getAccessToken = async (authorizationCode: string) => {
    const res = await this.mill.api.doRequest<{ access_token: string }>(
      "get",
      `share/applyAccessToken?password=${this.mill.secrets.password}&username=${this.mill.secrets.username}`,
      { headers: { authorization_code: authorizationCode } }
    );

    return res?.access_token;
  };
}
