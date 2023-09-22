export class User {
  constructor(
    private _token: string,
    private _refreshToken: string,
    private _tokenExpirationDate: Date,
    private _refreshTokenExpirationDate: Date
  ) {}

  get token() {
    return this._token;
  }

  get refreshToken() {
    return this._refreshToken;
  }

  get tokenExpirationDate() {
    return this._tokenExpirationDate;
  }

  get refreshTokenExpirationDate() {
    return this._refreshTokenExpirationDate;
  }
}
