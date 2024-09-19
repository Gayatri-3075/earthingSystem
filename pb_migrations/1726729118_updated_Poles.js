/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vl6yi1gkadqohgg")

  // remove
  collection.schema.removeField("yvfuxcd4")

  // remove
  collection.schema.removeField("e54zbizh")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "sslkemuo",
    "name": "Coordinates",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vl6yi1gkadqohgg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yvfuxcd4",
    "name": "head",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "e54zbizh",
    "name": "there",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("sslkemuo")

  return dao.saveCollection(collection)
})
