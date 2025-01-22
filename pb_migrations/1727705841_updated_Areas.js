/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("um3bcp2ubnr7wrc")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7g1jh0ql",
    "name": "State",
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
  const collection = dao.findCollectionByNameOrId("um3bcp2ubnr7wrc")

  // remove
  collection.schema.removeField("7g1jh0ql")

  return dao.saveCollection(collection)
})
