import Express from "express";
const router = Express.Router();

// Create a GET endpoint
router.get("/hello", (req, res) => {
    res.send({
        msg: "Hello from server",
        time: new Date().toISOString()
    });
});

// Create a POST endpoint which responds by using data from request body
router.post("/name", (req, res) => {
    // let body = {
    //     "name": "Saurabh",
    //     "city": "Delhi",
    //     "hobby": "Cricket"
    // };

    let name = req.body.name;
    let city = req.body.city;
    let hobby = req.body.hobby;

    if(!name || !city || !hobby) {
        res.status(400).send({ // Change status code to 400 if mandatory properties were not found.
            msg: "Name, City or Hobby property not found in request body"
        });
    } else {
        // By default HTTP status code is 200
        res.send(`Hello. My name is ${name}. My city is ${city}. My hobby is ${hobby}`);
    }
});

// Create a PUT endpoint
router.put("/date", (req, res) => {
    res.send(new Date().toLocaleString());
});

// Create a DELETE endpoint
router.delete("/remove", (req, res) => {
    res.status(201).send({
        msg: "Object deleted",
        txnId: 123456
    });
});

export default router;