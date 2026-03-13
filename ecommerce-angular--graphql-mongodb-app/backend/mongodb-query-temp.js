// Validation Query
db.createCollection("users", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "email", "password"],
      properties: {
        username: {
          bsonType: "string",
          description: "Username must be a string and is required",
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Email must be a valid email address and is required",
        },
        password: {
          bsonType: "string",
          description: "Password must be a string and is required",
        },
      },
    },
  },
  validationAction: "error", // "error" is default and warn"
});
// Update exist validation query
db.runCommand({
  collMod: "users",
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["username", "email", "password"],
      properties: {
        username: {
          bsonType: "string",
          description: "Username must be a string and is required",
        },
        email: {
          bsonType: "string",
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          description: "Email must be a valid email address and is required",
        },
        password: {
          bsonType: "string",
          description: "Password must be a string and is required",
        },
      },
    },
  },
  validationAction: "error", // or "warn" or "off"
});

// Read Query
db.myCollection.find({}, { name: 1, _id: 0 }); // All data will show only with name key and it called Projection In MongoDB
db.myCollection.find().forEach((element) => {
  printjson(element); // It return all data at one time
});
db.myCollection.find().toArray(); // It return all data at one time
db.myCollection.find({ $expr: { $gt: [$spent, $budget] } });

// Create Query
db.myCollection.insertMany(
  [
    { _id: "A", name: "A" },
    { _id: "A", name: "B" },
    { _id: "C", name: "C" },
  ],
  {
    ordered: false, // duplicate entry avoid and next entry will be add
  }
);

// Update Query
db.myCollection.updateOne({ item: "canvas" }, { max: { qty: 200 } });
db.myCollection.updateOne(
  { item: "canvas" },
  { $set: { qty: 200 } }, // add qty field if existing or not existing
  { upsert: true } // create new entry if filter value  is not existing
);

// Aggregate Query
db.orders.aggregate([
  {
    $match: { size: "small" },
  },
  {
    $group: { _id: "$size", sizes: { $push: "$size" } }, // represents the array of sinle field.
    $group: { _id: "$size", sizes: { $push: "$$ROOT" } }, // represents array of the complete document.
  },
]);
db.marks.aggregate([
  {
    $lookup: {
      from: "students",
      localField: "student_id",
      foreignField: "_id",
      as: "student_id",
    },
  },
  {
    $group: {
      _id: null,
      students: {
        $push: "$student_id",
      },
    },
  },
]);
// age sum and average of age
db.users.aggregate([
  [
    {
      $group: {
        _id: null,
        names: {
          $push: "$name",
        },
        ages: {
          $push: "$age",
        },
        ageSum: {
          $sum: "$age",
        },
        averageAge: {
          $avg: "$age",
        },
      },
    },
  ],
]);
// Give a count per age of male user
db.users.aggregate([
  { $match: { gender: "male" } },
  { $group: { _id: $age, number: { $sum: 1 } } },
]);
//
db.users.aggregate([
  {
    $group: {
      _id: null,
      count: { $sum: { $size: "$sizes" } },
    },
  },
]);

// Extract current doc based on sizes array
db.inventory.insertOne({ _id: 1, item: "ABC1", sizes: ["S", "M", "L"] });
db.inventory.aggregate([{ $unwind: "$sizes" }]);

// when  use same key then only last key will work and solution is $and operator
db.students.find({ age: { $lt: 11 }, age: { $gt: 5 } });
db.students.find($and[({ age: { $lt: 11 } }, { age: { $gt: 5 } })]);

// check key exist and key data type
db.myCollection.find({ age: { $exists: true, $type: "string" } });

// How many students who have worked in 3 companies
db.myCollection.find({ experience: { $size: 3 } });
db.myCollection.find({ experience: { $size: { $gt: 3 } } }); // Can't pass expression for $size
db.myCollection.find({
  $and: [
    { experience: { $exists: true } }, // without this code error will come if key is not exist
    { $expr: { $gt: [{ $size: "$experience" }, 3] } },
  ],
});

// How many students whose hobbies are walking and reading
db.myCollection.find({ hobbies: ["walking", "reading"] }); // "A B" not "B A"
db.myCollection.find({ hobbies: { $all: ["walking", "reading"] } }); // "A B" and "B A"
db.myCollection.find({ hobbies: { $in: ["walking", "reading"] } }); // "A B" and "B A" and "A" and "B"

// selects documents if element in the array field matches all the specified $elemMatch conditions.
db.myCollection.find({ results: { $elemMatch: { $gte: 80, $lt: 85 } } });

// To use the $text operator. you must create a text index on the fields you want tot search. A text index allows mongoDB to search for specific words and phrases in the indexed fields and return documents that match the search criteria.
db.myCollection.createIndex({ subject: "text" });
db.myCollection.find({ $text: { $search: "coffee" } });

// The $expr operator takes a mongoDB expression as it's argument and returns the result of the expression.
db.myCollection.find({ $expr: { $gt: [$spent, $budget] } });

// explain helps to know how find works here
db.myCollection.find({ field: value }).explain();

// executionStats tells count of total doc examined and return data
db.myCollection.find({ field: value }).explain("executionStats");

// To know winning plan
db.myCollection.find({ field: value }).explain("allPlansExecution");

// A multi-key index is an index that can be created on an array field
// MongoDB will create a separate index entry for each value in each array, so it can quickly look up documents that match a specific value.
db.myCollection.find({ hobbies: "walk" }).explain("executionStats");

//
db.myCollection.createIndex({ name_of_field: 1 });
db.myCollection.getIndexes();
db.myCollection.dropIndexe(name_of_field);
db.myCollection.dropIndexe({ name_of_field: 1 });

// when don't use indexing in mongoDB
// collection is small
// collection is frequently updated
// Queries are complex (multiple fields)
// collection is large (make less indices)

// Types of Indexes
// 1. Single field indexes
// 2. Compound indexes
// 3. Text indexes

// Sort data first age and then name
db.myCollection.find(), sort({ name_of_field: 1, name_of_field: 1 });

// Unique used stop duplicate entry
db.myCollection.createIndex({ name_of_field: 1 }, { unique: true });

// indexing will work if only name_of_field greater than 20
db.myCollection.createIndex(
  { name_of_field: 1 },
  { partialFilterExpression: { name_of_field: { $gt: 20 } } }
);
db.myCollection.createIndex(
  { name: 1 },
  { partialFilterExpression: { gender: { $exists: true } } }
);

// Covered query means indexing on name, filter on name and return name only
db.myCollection.createIndex({ name: 1 });
db.myCollection.find({ name: "india" }, { _id: 0, name: 1 });

// Only indexing collection will lock
db.myCollection.createIndex({ name: "text" }, { background: true });

// Capped collection
db.myCollection.createCollection("order_logs", {
  capped: true,
  max: 4,
  size: 1000,
});
