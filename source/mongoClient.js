require('dotenv').config()
const MongoClient = require("mongodb").MongoClient
const ObjectID = require('mongodb').ObjectID
const assert = require("assert")

// connection URL
const url = "mongodb://"+process.env.DB_USER+":"+process.env.DB_PASS+"@"+process.env.DB_HOST+":"+process.env.DB_PORT+"/"+process.env.DB_NAME

// documentation
// https://docs.mongodb.com/drivers/node/current/usage-examples/

async function findMultipleDocs() {

  // client
  const client = new MongoClient(url, {
    ssl: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsAllowInvalidCertificates: true
  })

  try {

    await client.connect()
    const database = client.db(process.env.DB_NAME)
    const properties = database.collection(process.env.DB_COLLECTION)

    const query = {}
    const options = {}

    const cursor = properties.find(query, options);

    // print a message if no documents were found
    if ((await cursor.count()) === 0) {
      console.log("--- no documents found")
    }

    await cursor.forEach(function(item, index) {
      console.log(item)
    })


  } finally {

    await client.close()

  }

}

async function insertOneDoc() {

  // client
  const client = new MongoClient(url, {
    ssl: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsAllowInvalidCertificates: true
  })

  try {

    await client.connect()
    const database = client.db(process.env.DB_NAME)
    const properties = database.collection(process.env.DB_COLLECTION)

    // create a document to be inserted
    const doc = { name: "Red", town: "kanto" }
    const result = await properties.insertOne(doc)

    console.log(
      `${result.insertedCount} documents were inserted with the _id: ${result.insertedId}`,
    )

  } finally {

    await client.close()

  }

}

async function updateOneDoc(_id) {

  // client
  const client = new MongoClient(url, {
    ssl: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsAllowInvalidCertificates: true
  })

  try {

    await client.connect()
    const database = client.db(process.env.DB_NAME)
    const properties = database.collection(process.env.DB_COLLECTION)

    // create a filter for a movie to update
    const filter = { _id: ObjectID(_id) }
    const options = {}

    // create a document that sets the plot of the movie
    const updateDoc = {
      $set: {
        plot: "Blacksmith Scene is a silent film directed by William K.L. Dickson",
      },
    }

    const result = await properties.updateOne(filter, updateDoc, options)

    console.log(
      `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)`,
    )

  } finally {

    await client.close()

  }

}

module.exports = {
  findMultipleDocs,
  insertOneDoc,
  updateOneDoc
}
