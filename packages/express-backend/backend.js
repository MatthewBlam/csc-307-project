import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import {
    getUsers,
    findUserByName,
    findUserByJob,
    findUserByNameAndJob,
    findUserById,
    addUser,
    deleteUserById,
} from "./services/user-service.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../../.env"), quiet: true });
dotenv.config({ path: path.resolve(__dirname, ".env"), override: true, quiet: true });

const { MONGO_CONNECTION_STRING } = process.env;

if (!MONGO_CONNECTION_STRING) {
    throw new Error("MONGO_CONNECTION_STRING is not defined.");
}

mongoose.set("debug", true);
mongoose
    .connect(MONGO_CONNECTION_STRING, { dbName: "csc307", authSource: "admin" })
    .catch((error) => console.log(error));

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.get("/users", (req, res) => {
    const { name, job } = req.query;
    let userPromise;

    if (name !== undefined && job !== undefined) {
        userPromise = findUserByNameAndJob(name, job);
    } else if (name !== undefined) {
        userPromise = findUserByName(name);
    } else if (job !== undefined) {
        userPromise = findUserByJob(job);
    } else {
        userPromise = getUsers();
    }

    userPromise
        .then((users) => res.send({ users_list: users }))
        .catch((error) => res.status(500).send(error));
});

app.get("/users/:id", (req, res) => {
    const id = req.params["id"];
    findUserById(id)
        .then((result) => {
            if (result === null) {
                res.status(404).send("Resource not found.");
            } else {
                res.send(result);
            }
        })
        .catch(() => res.status(404).send("Resource not found."));
});

app.post("/users", (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd)
        .then((savedUser) => res.status(201).send(savedUser))
        .catch((error) => res.status(400).send(error));
});

app.delete("/users/:id", (req, res) => {
    const id = req.params["id"];
    deleteUserById(id)
        .then((deletedUser) => {
            if (deletedUser === null) {
                res.status(404).send("Resource not found.");
            } else {
                res.status(204).send();
            }
        })
        .catch(() => res.status(404).send("Resource not found."));
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
