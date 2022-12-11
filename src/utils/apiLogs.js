import Log4js from "log4js";

Log4js.configure({
    appenders: {
        app: { type: "stdout" },
        warn: { type: "file", filename: "src/logs/warn.log"},
        error: { type: "file", filename: "src/logs/error.log"},
    },
    categories: {
        default: { appenders: ["app"], level: "info" },
        warn: { appenders: ["warn"], level: "warn" },
        error: { appenders: ["error"], level: "error" },
    },
});

export const logApp = Log4js.getLogger("app");

export const logWarn = Log4js.getLogger("warn");

export const logError = Log4js.getLogger("error");