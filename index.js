// const Express = require("express");
import Express from "express"; // import express as an ES module
import path from "path";
import cors from "cors";
import compression from "compression";
import helmet from "helmet";

const PORT = process.env.PORT || 8888; // Use PORT env var or 8888 if the env var is not defined.

import { initDb } from "./db.utils.js";

await initDb();

import testRoutes from "./test.router.js";
import heroRoutes from "./hero.router.js";
import { log } from "console";

const app = Express(); // Create express application

app.use(cors()); // Handle CORS issue so that we can access the REST APIs from UI.
app.use(Express.json()); // Tell express that we are expecting JSON body in our request.
app.use(compression()); // Compress your response sizes.
// Serve static files from the "public" folder
app.use(Express.static(path.join("public")));
app.use(helmet({
    contentSecurityPolicy: false
}));

app.get("/divide/:a/:b", function (req, res) {
    let a = req.params.a;
    let b = req.params.b;

    if(true) {
        let abc = 0;
        console.log(abc);
    }

    var f; // Scope is the innermost enclosing function
    let g; // Scope is the block - {}
    const h = ""; // Scope is the block - {}. Declares a constant variable. It cannot be reassigned later on.

    h = "abc";

    try {
        let c = a / b;

        res.send({
            result: c
        });
    } catch(e) {
        res.send({
            result: "Error occrurred"
        });
    }
});

app.use("/test", testRoutes);
app.use("/hero", heroRoutes);

app.listen(PORT, afterListen);

function afterListen() {
    console.log("Now my server is listening.");
}