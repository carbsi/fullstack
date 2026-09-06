const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')



// tama on koko backendin kaynnistyspiste
app.listen(config.PORT, () => {
  logger.info(`server running on port ${config.PORT}`)
})
