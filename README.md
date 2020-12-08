# realize

The [hello-express](https://github.com/glitchdotcom/hello-express) template was used for creating this project. 
The current views/index.html contains a basic 360 demo from https://aframe.io/docs/1.0.0/guides/building-a-360-image-gallery.html

You can view this app at 
https://frost-silly-cosmos.glitch.me/

## Your Project

On the front-end,

- Edit `views/index.html` to change the content of the webpage
- `public/script.js` is the javascript that runs when you load the webpage
- `public/style.css` is the styles for `views/index.html`

On the back-end,

- your app starts at `server.js`
- add frameworks and packages in `package.json`

## Local dev

start with a port
`PORT 3000 node server.js`

Create a ngrok account, and follow the steps: https://dashboard.ngrok.com/get-started/setup

Eventually, connect ngrok to your local server.
`./ngrok http 3000`
