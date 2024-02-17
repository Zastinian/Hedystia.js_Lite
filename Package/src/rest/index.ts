import Client from "../client";

export default class Rest {
  client: Client;
  constructor(client: Client) {
    this.client = client;
  }
  get(endpoint: string) {
    return new Promise((resolve, reject) => {
      fetch(this.client.root + endpoint, {
        method: "GET",
        headers: {
          Authorization: `Bot ${this.client.token}`,
          "User-Agent": "Hedystia.js",
        },
      })
        .then((data) => data.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
  post(
    endpoint: string,
    data: {
      reason: string | undefined;
      body: Object;
    },
  ) {
    return new Promise((resolve, reject) => {
      fetch(this.client.root + endpoint, {
        method: "POST",
        headers: {
          Authorization: `Bot ${this.client.token}`,
          "User-Agent": "Hedystia.js",
          "Content-Type": "application/json",
          "X-Audit-Log-Reason": data.reason || "",
        },
        body: JSON.stringify(data.body),
      })
        .then((data) => data.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
  put(
    endpoint: string,
    data: {
      reason: string | undefined;
      body: Object;
    },
  ) {
    return new Promise((resolve, reject) => {
      fetch(this.client.root + endpoint, {
        method: "PUT",
        headers: {
          Authorization: `Bot ${this.client.token}`,
          "User-Agent": "Hedystia.js",
          "Content-Type": "application/json",
          "X-Audit-Log-Reason": data.reason || "",
        },
        body: JSON.stringify(data.body),
      })
        .then((data) => data.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
  patch(
    endpoint: string,
    data: {
      reason: string | undefined;
      body: Object;
    },
  ) {
    return new Promise((resolve, reject) => {
      fetch(this.client.root + endpoint, {
        method: "PATCH",
        headers: {
          Authorization: `Bot ${this.client.token}`,
          "User-Agent": "Hedystia.js",
          "Content-Type": "application/json",
          "X-Audit-Log-Reason": data.reason || "",
        },
        body: JSON.stringify(data.body),
      })
        .then((data) => data.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
  delete(
    endpoint: string,
    data: {
      reason: string | undefined;
      body: Object;
    },
  ) {
    return new Promise((resolve, reject) => {
      fetch(this.client.root + endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bot ${this.client.token}`,
          "User-Agent": "Hedystia.js",
          "Content-Type": "application/json",
          "X-Audit-Log-Reason": data.reason || "",
        },
        body: JSON.stringify(data.body),
      })
        .then((data) => data.json())
        .then((data) => resolve(data))
        .catch((error) => reject(error));
    });
  }
}
