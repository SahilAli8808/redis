const express = require("express");
const client = require("./client")
const app = express();
const axios = require("axios");

app.get("/", async (req, res) => {

    try {
        
        const cacheValue = await client.get("todos")
        if (cacheValue) return res.json(JSON.parse(cacheValue))
        const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
        await client.set("todos", JSON.stringify(data));
        await client.expire("todos", 30)

        res.json({ alldata: data });
    } catch (error) {
        res.status(500).json({ error: "Error fetching data" });
    }
});

app.listen(9000, () => {
    console.log("Server is running on port 9000");
});
