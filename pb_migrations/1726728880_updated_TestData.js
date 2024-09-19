/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vl6yi1gkadqohgg")

  collection.name = "Poles"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vl6yi1gkadqohgg")

  collection.name = "TestData"

  return dao.saveCollection(collection)
})
