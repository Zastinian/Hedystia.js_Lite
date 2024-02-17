export default class WebsocketError extends Error {
  code: number;
  constructor(error: {message: string, code: number}) {
    super(error.message);
    this.code = error.code;
  }
}
