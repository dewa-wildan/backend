const express = require("express");
const { get } = require("express/lib/response");
const res = require("express/lib/response");
// const { where } = require("sequelize/types");
const app = express();
const db = require("./config/db");

app.get("/", (req,res) => res.send("respon node js berhasil"));

app.use(express.urlencoded({ extended: true}));

db.authenticate().then(() => console.log("berhasil terkonek dengan database"));

const User = require("./models/user")

app.post("/crud", async (req, res) => {
    try{
        const {username, email, password} = req.body;

        const newUser = new User({
            username, email, password
        })

        await newUser.save();
        res.json(newUser);

    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error")

    }
});

app.get("/crud", async (req,res) => {
    try {
        const getAllUser = await User.findAll({})
        res.json(getAllUser)
    }catch (err) {
        console.error(err.message);
        res.status(500).send("server error")

    }
});

app.get("/crud/:id", async (req, res) => {
    try{
        const id = req.params.id

        const getUser = await User.findOne({
        where: {id: id}
        });

        res.json(getUser);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.delete("/crud/:id", async (req, res) => {
    try{
        const id = req.params.id

        const deletUser = await User.destroy({
        where: {id: id}
        });

        await deletUser;

        res.json("berhsil di hapus");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.put("/crud/:id", async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const id = req.params.id;

        const updateUser = await User.update({
        username,
        email,
        password
        }, {where : { id : id } }
        );

        await updateUser;

        res.json("berhsil di update");
    } catch (err) {
        console.error(err.message);
        res.status(500).send("server error");
    }
});

app.listen(4500, () => console.log("port berjalan di router 4500"));
