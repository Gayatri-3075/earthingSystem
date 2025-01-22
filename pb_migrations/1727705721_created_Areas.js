/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "um3bcp2ubnr7wrc",
    "created": "2024-09-30 14:15:21.063Z",
    "updated": "2024-09-30 14:15:21.063Z",
    "name": "Areas",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sv3e5tyu",
        "name": "AreaName",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ldovbbh2",
        "name": "field",
        "type": "relation",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "vl6yi1gkadqohgg",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": null,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("um3bcp2ubnr7wrc");

  return dao.deleteCollection(collection);
})
