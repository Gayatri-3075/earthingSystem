/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z7xstgk0985bwkf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "7bvfmi0c",
    "name": "pole",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "vl6yi1gkadqohgg",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z7xstgk0985bwkf")

  // remove
  collection.schema.removeField("7bvfmi0c")

  return dao.saveCollection(collection)
})
