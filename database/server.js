const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("mock/db.json");

const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(
  jsonServer.rewriter({
    "/api/*": "/$1",
  })
);
server.use(router);

server.listen(3001, () => {
  console.log("JSON Server is running");
});

module.exports = server;
