import  Log4js  from "log4js";
import * as dotenv from "dotenv"; 
dotenv.config();

log4js.configure({
    appenders: {
        consola: {type: 'console'}, 
        archivoErrores : {type:'file', filename: 'errores.log'},
        archivoDebug: {type: 'file', filename: 'debug.log'},    
        loggerConsola: {type: 'logLevelFilter', appender: 'consola', level: 'info'},    
        loggerArchivoErrores: {type: 'logLevelFilter', appender: 'archivoErrores', level: 'error'},    
        loggerArchivoDebug: {type: 'logLevelFilter', appender: 'archivoDebug', level: 'debug'},             
    },
    categories: {
        default: {
            appenders: ['loggerConsola'], level :'all'
        },
        prod: {
            appenders: [`loggerArchivoErrores`, 'loggerArchivoDebug'], level: 'all'
        }
    }
})

let logger = null
//Si logger es produccion obtenemos prod (categories) sino va a default
if (process.env.NODE_ENV === 'PROD'){
    logger = Log4js.getLogger('prod');
} else {
    logger = Log4js.getLogger();
}
module.exports = logger