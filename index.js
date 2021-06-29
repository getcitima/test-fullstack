const express = require("express")
const app = express()

const { findMultipleDocs, insertOneDoc, updateOneDoc } = require("./source/mongoClient.js")

app.listen(3001, () => {

  console.log("-- server started")

  console.log("-- list collection items")
  findMultipleDocs()

  var CronJob = require('cron').CronJob

  var job = new CronJob('*/5 * * * * *', function() {
    console.log('-- triggered every 5 seconds')
  }, null, true)

  job.start()

})
