import Cookies from "js-cookie";

class User {
  private _accessToken: string | null;
  private _refreshToken: string | null;
  private _isAdmin: boolean;

  constructor() {
    this._accessToken = Cookies.get("accessToken") || null;
    this._refreshToken = Cookies.get("refreshToken") || null;
    this._isAdmin = false;
  }

  getAccessToken() {
    return this._accessToken;
  }

  setAccessToken(newAccessToken: string) {
    Cookies.set("accessToken", newAccessToken);
    this._accessToken = newAccessToken;
  }

  deleteAccessToken() {
    Cookies.remove("accessToken");
    this._accessToken = null;
  }

  getRefreshToken() {
    return this._refreshToken;
  }

  setRefreshToken(newRefreshToken: string) {
    Cookies.set("refreshToken", newRefreshToken);
    this._refreshToken = newRefreshToken;
  }

  deleteRefreshToken() {
    Cookies.remove("refreshToken");
    this._refreshToken = null;
  }

  // isAdmin() {
  //   return this._isAdmin;
  // }

  // setIsAdmin(isAdmin: boolean) {
  //   this._isAdmin = isAdmin;
  // }
}

export const user = new User();
