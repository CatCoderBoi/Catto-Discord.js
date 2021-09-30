import Client from "../client/Client.ts";
import { Payload } from "../interfaces/Payloads.ts";

export default function (client: Client, payload: Payload){
    console.log(payload)
}

//NOT A EVENT TO USE. JUST TO PREVENT GATEWAY ERRORS.