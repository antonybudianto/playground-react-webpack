import fs from "fs";
import path from "path";

let __segments;
export const getHTMLSegments = () => {
  if (__segments) {
    return __segments;
  }
  const indexFile = path.resolve("./build/client/index.html");
  const html = fs.readFileSync(indexFile, "utf8").toString();
  const segments = html.split(`<div id="root">`);
  __segments = segments;
  return __segments;
};

export const processStream = ({ res, stream, error, segments, streaming }) => {
  res.statusCode = error ? 500 : 200;
  res.setHeader("Content-type", "text/html");

  const errorScript = error
    ? '<script type="text/javascript">window.__ssrError=true;</script>'
    : "";

  res.write(
    segments[0] +
      errorScript +
      `<div id="root" data-streaming="${streaming ? 1 : 0}">`
  );

  stream.pipe(res);
};
