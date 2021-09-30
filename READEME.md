# catto_discord
### A very basic discord library.

## Code example:
```js
import Client from "https://deno.land/x/catto_discord;

const client = new Client();

client.login("token");

client.on('ready', () => {
    console.log("Logged In.");
})

client.on('message', async (message: any) => {
    console.log(message.content)
    await createMessage("Hey", message.channel_id)
})

//COPY THIS FUNCTION AS IT, DO NOT CHANGE
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
}
```

### Let's break down the above example!
- Let's first import the client class, this can be done as destructuring or importing it as Client. Then let's make a new instance of the class.
```js
import Client from "https://deno.land/x/catto_discord;

const client = new Client();
```

- Logging in. Now let's get your bot online! To do so, use the Client#login method and pass in the token as a string.
```js
client.login("token");
```

- Getting a ready event setup, let's use the on method and listen for the ready event. then add a callback, for our example we are logging "Logged In." when the bot comes online.
```js
client.on('ready', () => {
    console.log("Logged In.");
})
```

- Getting a message event setup, let's use the on method and listen for the message event. then add a callback with a message parameter, for our example we are sending Hey.
```js
client.on('message', async (message: any) => {
    console.log(message.content)
    await createMessage("Hey", message.channel_id)
})
```

- The last line of code is important for sending messages as that is what sends the discord api the request.
```js
//COPY THIS FUNCTION AS IT, DO NOT CHANGE
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
}
```

