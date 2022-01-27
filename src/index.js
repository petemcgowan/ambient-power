import React from "react";
import ReactDOM from "react-dom";
import AmbientPlayer from "./AmbientPlayer";
import App from "./play-audio";
import tracks from "./tracks";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import PWAPrompt from "react-ios-pwa-prompt";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <AmbientPlayer tracks={tracks} />
    {/* <App tracks={tracks} /> */}
    {/* <App /> */}
    <PWAPrompt copyTitle="PWA POC" />
  </React.StrictMode>,
  rootElement
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();
