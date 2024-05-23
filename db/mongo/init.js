db.createUser({
    user: "user",
    pwd: "password",
    roles: [ { role: "readWrite", db: "transaction_analysis_db" } ]
  });
db.createCollection("testcollection");