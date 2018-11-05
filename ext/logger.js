let winston= require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      coloricolorize : 'true',
      label: new Date()
    }),
    new winston.transports.File({ 
      filename: './ext/errors.json',
      level: 'error'
    })
  ]
});

module.exports= logger;