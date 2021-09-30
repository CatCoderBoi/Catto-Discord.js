import Client from "./src/client/Client.ts";
import {Constants} from './src/constants/Constants.ts'

const client = new Client();

client.login("ODQ3NzE3MTMyOTM0MTg1MDIx.YLCIGg.VmprlvfeYiINx0Tb08i-IvpqQ0c");

client.on('ready', () => {
    console.log("Logged In.");
})

client.on('message', async (message: any) => {
    console.log(message.content)
    await createMessage("Hey", message.channel_id)
})

async function createMessage(content:string, channelid: string) {
    const data = {
        "content": content,
        "tts": false
    };
    const headers = {"Content-Type": "application/json", "Authorization": "Bot " + client.token}
    const response = await fetch(`${Constants.API}/channels/${channelid}/messages`, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
    })
    const json = response.json();
    console.log(json)
}
