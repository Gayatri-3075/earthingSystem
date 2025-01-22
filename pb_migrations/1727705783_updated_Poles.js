/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vl6yi1gkadqohgg")

  // remove
  collection.schema.removeField("rthglz03")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ljmufm2v",
    "name": "AreaName",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "um3bcp2ubnr7wrc",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("vl6yi1gkadqohgg")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rthglz03",
    "name": "Area",
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

  // remove
  collection.schema.removeField("ljmufm2v")

  return dao.saveCollection(collection)
})
