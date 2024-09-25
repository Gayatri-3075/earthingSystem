/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z7xstgk0985bwkf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ksafxba7",
    "name": "time",
    "type": "date",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "2024-09-23 12:00:00.000Z",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z7xstgk0985bwkf")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ksafxba7",
    "name": "time",
    "type": "date",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": "",
      "max": ""
    }
  }))

  return dao.saveCollection(collection)
})
