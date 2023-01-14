import express from "express";

export const initStaticMiddleware = (app) => {
  app.use(
    express.static("./build/client", {
      index: false
    })
  );
  app.use(
    express.static("./public", {
      index: false
    })
  );
};
