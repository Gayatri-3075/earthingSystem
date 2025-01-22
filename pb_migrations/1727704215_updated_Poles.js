/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vl6yi1gkadqohgg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v7vynkij",
    "name": "warn",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vl6yi1gkadqohgg")

  // remove
  collection.schema.removeField("v7vynkij")

  return dao.saveCollection(collection)
})
