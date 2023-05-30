db = db.getSiblingDB('statistics-db');
db.createUser(
  {
    user: 'root',
    pwd: 'root',
    roles: [{ role: 'readWrite', db: 'api_prod_db' }],
  },
);
db = db.getSiblingDB('library-db');
db.createUser(
  {
    user: 'root',
    pwd: 'root',
    roles: [{ role: 'readWrite', db: 'api_prod_db' }],
  },
);