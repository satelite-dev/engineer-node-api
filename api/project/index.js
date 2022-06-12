const api = require('@satelite/api')
module.exports = api.allowCors(api.controllers.projects)
