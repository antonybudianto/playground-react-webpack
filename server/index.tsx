import "isomorphic-unfetch";
import express from "express";

import { renderToPipeableStream } from "react-dom/server";

import App from "../src/App";
import { getHTMLSegments, processStream } from "./ssr";
import { initStaticMiddleware } from "./middleware";

const app = express();
const PORT = process.env.PORT || 3006;

initStaticMiddleware(app);
app.get("/*", (request, response) => {
  let streaming = true;
  let didError = false;
  console.log(`GET ssr: ${request.path} (${Date.now()})`);
  const segments = getHTMLSegments();

  try {
    const stream = renderToPipeableStream(<App />, {
      onShellReady() {
        if (streaming) {
          processStream({
            res: response,
            stream,
            segments,
            streaming,
            error: didError
          });
        }
      },
      onAllReady() {
        if (!streaming) {
          processStream({
            res: response,
            stream,
            segments,
            streaming,
            error: didError
          });
        }
        response.write(segments[1]);
      },
      onError(e: { message: string }) {
        didError = true;
        console.error("ssr-on-error", e.message);
      },
      onShellError(x: { message: string }) {
        didError = true;
        console.error("ssr-on-shell-error: ", x.message);
        response.send(`${segments[0]}\n<div id="root">${segments[1]}`);
      }
    });
  } catch (error) {
    console.error("fatal", error.message);
    response.writeHead(500, {
      "content-type": "text/plain"
    });
    response.end(String((error && error.stack) || error));
    return;
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
