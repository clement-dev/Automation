## Requirements

Node >= 8.9.4

**One of the server's plugin is using sensors on Raspberry PI. If you are running the server on another environment, remove the
`server/plugins/sensor` before launching it.**

## Getting started

Clone the repository :

```sh
git clone https://github.com/clement-dev/Automation/
```

You'll need to edit `.env` files in both the server and the client.
Copy the `.env.dist` and change the parameters according to your environment.

As the server uses `firebase-admin` you'll need to add a `key.json` file in the `server` directory.

When you're done with that, you'll need to install the dependencies. Open a first terminal and run :

```sh
cd server
npm install
npm start
```

open another one and do the sape with the client :

```sh
cd client
npm install
npm start
```
This should open your browser to `localhost:3000`.
Now you can test adding notes by saying with your best french accent : "Écris une note : Aujourd'hui je suis content".
This will automatically add the the note and display it.

You can pin some of them, or delete them.

You can open another tab in your browser to see the updates in real time.
<!--stackedit_data:
eyJoaXN0b3J5IjpbMzMzMzYzNTI1XX0=
-->