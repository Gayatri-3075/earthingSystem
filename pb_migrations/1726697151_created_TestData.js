/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "vl6yi1gkadqohgg",
    "created": "2024-09-18 22:05:51.786Z",
    "updated": "2024-09-18 22:05:51.786Z",
    "name": "TestData",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "e54zbizh",
        "name": "there",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("vl6yi1gkadqohgg");

  return dao.deleteCollection(collection);
})
