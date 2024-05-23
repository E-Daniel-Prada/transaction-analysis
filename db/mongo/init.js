db.createUser({
  user: "root",
  pwd: "password",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})
db.createUser({
  user: "testuser",
  pwd: "testpassword123",
  roles: [ { role: "readWrite", db: "test" } ]
})
db.createCollection("testcollection");