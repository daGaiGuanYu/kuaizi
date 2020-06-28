// @ts-check
const Http = require("http");
const AbstractRequestContext = require("../ctx/abstract-request-context");
const Router = require("../handler/router");
const Exception = require("../exception/base");
const Bug = require("../exception/bug");
const NBug = require("../exception/n-bug");

const { IsProduction, Nothing } = require("../ctx/constant");

let port;
function start(val) {
  port = val || "8080";

  let server = Http.createServer(handle);
  server.listen(port, () => {
    console.log(`started on ${port}`);
  });
  server.on("error", onError);
  return server;
}

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }

  const bind = typeof port === "string" ? `管道 ${port}` : `端口 ${port}`;

  // 以友好的方式提示没有 root 权限运行的进程不能绑定到低于 1024 的端口、端口占用等错误
  switch (error.code) {
    case "EACCES":
      throw Error(`${bind} 需要提升权限`);
      process.exit(1);
      break;
    case "EADDRINUSE":
      throw Error(`${bind} 地址正被使用`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

async function handle(req, res) {
  let result;
  try {
    result = await Router.get(req)({
      __proto__: AbstractRequestContext,
      req,
      res,
    });
  } catch (e) {
    // 三种 error，nbug、bug、原生
    if (!(e instanceof NBug))
      // nbug 不需要打印调用栈
      console.error(e);
    result = e instanceof Exception ? e : Bug.Unknown; // 原生 error，判定为“未知错误”
  }
  if (result != Nothing) writeJson(res, result);
}

function stop() {
  // TODO
}

function writeJson(response, data) {
  if (!(data instanceof Exception))
    data = {
      code: 0,
      data,
    };
  response.setHeader("Content-type", "application/json");
  let result = JSON.stringify(data);
  if (!IsProduction) {
    console.log("响应：");
    console.log(result);
  }
  response.end(result);
}

module.exports = {
  start,
};
