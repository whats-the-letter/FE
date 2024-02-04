import axios from "axios";

let lock = false;
let subscribers: Array<() => void> = [];

function subscribeTokenRefresh(cb: () => void) {
  subscribers.push(cb);
}

function onRrefreshed() {
  subscribers.forEach((cb) => {
    cb();
  });
}

const getRefreshToken = async () => {
  try {
    await client.get("/api/auth/renew");

    lock = false;
    onRrefreshed();
    subscribers = [];
  } catch (e) {
    lock = false;
    subscribers = [];
  }
};

axios.interceptors.response.use(
  (res) => res,
  async (err) => {
    const {
      config,
      response: { status },
    } = err;
    const originalRequest = config;

    if (status !== 401) return await Promise.reject(err);

    if (lock) {
      return await new Promise((resolve) => {
        subscribeTokenRefresh(() => {
          resolve(axios(originalRequest));
        });
      });
    }
    lock = true;
    await getRefreshToken();
    return await Promise.reject(err);
  }
);

export const client = axios.create({
  baseURL: "/",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
});

export interface MutationRes {
  message: string;
}

export interface ServerErrorRes {
  status: string;
  code: string;
  message: string;
}
