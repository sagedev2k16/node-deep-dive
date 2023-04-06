import knex from "knex";

import ModelHero from "./hero.model.js";

let db;

const initDb = async () => {
    // DB config
    db = knex({
        client: "sqlite3", // What kind of DB you are using - Oracle, Postgres, MySQL
        connection: {
            filename: "./db.sqlite"
        },
        useNullAsDefault: true
    });

    // Initialize DB
    try {
        if (!await db.schema.hasTable(ModelHero.TABLE_NAME)) {
            console.log(`Creating ${ModelHero.TABLE_NAME} table`);

            await db.schema.createTable(ModelHero.TABLE_NAME, ModelHero.createTable);
            
            console.log(`${ModelHero.TABLE_NAME} table created`);
        } else {
            console.log(`${ModelHero.TABLE_NAME} table exists already`);
        }

        let initialHeroes = await getAllRecords(ModelHero.TABLE_NAME);

        if(initialHeroes && initialHeroes.length && initialHeroes.length >= 4) {
            console.log("Heroes already exist", initialHeroes);
        } else {
            await db(ModelHero.TABLE_NAME).insert(ModelHero.sampleData);
        }
    } catch(e) {
        console.log(e);
    }
};

// Insert one record
const insertRecord = async (tableName, record) => {
    let insertResult = await db(tableName).insert(record);
    console.log("insert result", insertResult);
    return insertResult;
}

// Insert multiple records
const insertRecords = async (tableName, records) => {
    let insertResult = await db(tableName).insert(records);
    console.log("insert result", insertResult);
    return insertResult;
}

// Get all records from a table
const getAllRecords = async (tableName) => {
    // This will translate to "select * from <tableName>". Handled by Knex (ORM).
    let dbUsers = await db.select().table(tableName);
    return dbUsers;
}

// Get a record by id from a table
const getRecordById = async (tableName, id) => {
    let user = await db(tableName).where("id", id).first();
    console.log("Hero by id", user);
    return user;
}

// Update a record in a table (needs id)
const updateRecord = async (tableName, newRecord) => {
    let updateResult = await db(tableName)
        .where({id: newRecord.id})
        .update(newRecord);

    console.log("update result", updateResult);

    return updateResult;
}

// Delete a record in the table by id
const deleteRecord = async (tableName, id) => {
    let deleteResult = await db(tableName).where({id: id}).delete();
    console.log("delete result", deleteResult);
    return deleteResult;
}

export {
    initDb,
    insertRecord,
    insertRecords,
    getAllRecords,
    getRecordById,
    updateRecord,
    deleteRecord
};