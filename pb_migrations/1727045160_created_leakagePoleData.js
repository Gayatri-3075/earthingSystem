/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "z7xstgk0985bwkf",
    "created": "2024-09-22 22:46:00.254Z",
    "updated": "2024-09-22 22:46:00.254Z",
    "name": "leakagePoleData",
    "type": "base",
    "system": false,
    "schema": [
      {
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
      },
      {
        "system": false,
        "id": "jyconolw",
        "name": "current",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "dpbbjir4",
        "name": "critical",
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
  const collection = dao.findCollectionByNameOrId("z7xstgk0985bwkf");

  return dao.deleteCollection(collection);
})
