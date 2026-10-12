require("dotenv").config();
var express = require("express");
var mongoose = require("mongoose");
var cors = require("cors");

var app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
.then(function() {
    console.log("MongoDB Connected");
})
.catch(function(err) {
    console.log(err);
});

var Record = mongoose.model("Record", {
    name: String,
    category: String,
    details: String
});

app.get("/records", async function(req, res) {
    res.json(await Record.find());
});

app.post("/records", async function(req, res) {
    res.json(await Record.create(req.body));
});

app.put("/records/:id", async function(req, res) {
    res.json(await Record.findByIdAndUpdate(
        req.params.id, req.body, {new: true}
    ));
});

app.delete("/records/:id", async function(req, res) {
    await Record.findByIdAndDelete(req.params.id);
    res.json({message: "Deleted"});
});

app.listen(5000, function() {
    console.log("Server running on port 5000");
});