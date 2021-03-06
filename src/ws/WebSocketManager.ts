import { Constants, OPCODE } from "../constants/Constants.ts";
import { Heartbeat, Identify } from "../constants/Payloads.ts";
import { Payload } from "../interfaces/Payloads.ts";
import Client from "../client/Client.ts";

export default class WebSocketManager {
  constructor(private client: Client) {}
  private socket!: WebSocket;
  private interval: number = 0;
  async login(token: string) {
    try {
      this.socket = await new WebSocket(Constants.GATEWAY);
      this.socket.onmessage = async (m: any) => {
        const RawJsonPayload = JSON.parse(JSON.stringify(m.data));
        const payload: Payload = JSON.parse(RawJsonPayload);
        const { t: event, op } = payload;
        switch (op) {
          case OPCODE.ZERO:
            console.log("An event was fired.");
            break;
          case OPCODE.TEN:
            const { heartbeat_interval } = payload.d;
            this.interval = this.heartbeat(heartbeat_interval);
            await this.identify(token);
            break;
          case OPCODE.ELEVEN:
            break;
        }
        if (event) {
          try {
            const { default: module } = await import(`../handlers/${event}.ts`);
            module(this.client, payload);
          } catch (e) {}
        }
      };
    } catch (e) {
      console.log(e);
      return e;
    }
  }
  heartbeat(ms: number) {
    return setInterval(() => {
      this.socket.send(JSON.stringify(Heartbeat));
    }, ms);
  }

  async identify(token: string) {
    Identify.d.token = token;
    return this.socket.send(JSON.stringify(Identify));
  }
}
