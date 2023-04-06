// This file will provide me all the routes for my heroes.

import Express from "express";
const router = Express.Router();

import { 
    getAllRecords, 
    getRecordById, 
    insertRecord, 
    updateRecord, 
    deleteRecord 
} from "./db.utils.js";

import ModelHero from "./hero.model.js";
const tableName = ModelHero.TABLE_NAME;

// Get all heroes
router.get("/heroes", async (req, res) => {
    let dbUsers = await getAllRecords(tableName);
    res.send(dbUsers);
});

// Get hero by id
router.get("/heroById/:id", async (req, res) => {
    console.log("Getting user with id", req.params.id);

    let user = await getRecordById(tableName, req.params.id);

    if(!user) {
        res.status(404).send({
            msg: `No user found with id - ${req.params.id}`
        });
    } else {
        res.send(user);
    }
});

// Create new DB user
router.post("/create", async (req, res) => {
    let newHero = req.body; // {userName: "Bob"}

    if (!newHero.name || !newHero.power || !newHero.full_name) {
        console.error("name or power or full name property not found");
        res.status(400).send({"msg": "name or power or full_name property not found"});
        return;
    } else {
        let newRowNum = await insertRecord(tableName, newHero);

        if(newRowNum && newRowNum.length) {
            res.status(201).send({
                msg: "New hero created",
                user: newHero
            });
        } else {
            res.status(200).send({
                msg: "New hero not created",
                user: newHero
            });
        }
    }
});

// Update existing DB user
router.put("/update", async (req, res) => {
    let updatedUser = req.body;

    console.log(updatedUser);

    if(!updatedUser.empId) {
        console.error("empId property not found");
        res.status(400).send({"msg": "empId property not found"});
        return;
    } else {
        let rowNum = await updateRecord(tableName, updatedUser);

        if(rowNum && rowNum > 0) {
            res.status(200).send({
                msg: "User updated",
                user: updatedUser
            });
        } else {
            res.status(404).send({
                msg: "User not updated",
                user: updatedUser
            });
        }
    }
});

// Delete existing DB user
router.delete("/delete/:id", async (req, res) => {
    let id = req.params.id;

    if(!id) {
        console.log("deletion - id param not found");
        res.status(400).send({"msg": "id param not found"});
    } else {
        let deleteIndex = await deleteRecord(tableName, id);

        if(deleteIndex && deleteIndex > 0) {
            res.status(200).send({"msg": "User deleted"});
        } else {
            res.status(404).send({"msg": "User not found"});
        }
    }
});

export default router;