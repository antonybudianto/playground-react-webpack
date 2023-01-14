import expressStaticGzip from "express-static-gzip";

export const initStaticMiddleware = (app) => {
  app.use(
    expressStaticGzip("./build/client", {
      index: false
    })
  );
  app.use(
    expressStaticGzip("./public", {
      index: false
    })
  );
};
