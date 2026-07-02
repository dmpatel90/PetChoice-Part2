"use strict";

const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 5500;

/* ==========================================
   LOAD JSON DATA
========================================== */

const breeds = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "data", "breeds.json"),
        "utf8"
    )
);

/* ==========================================
   APP CONFIGURATION
========================================== */

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

/* ==========================================
   HOME
========================================== */

app.get("/", (req, res) => {

    res.render("index", {

        title: "Pet Choice",

        breeds

    });

});

/* ==========================================
   ABOUT
========================================== */

app.get("/about", (req, res) => {

    res.render("about", {

        title: "About Pet Choice"

    });

});

/* ==========================================
   ALL CATS
========================================== */

app.get("/breeds", (req, res) => {

    res.render("breeds", {

        title: "Browse Cats",

        breeds

    });

});

/* ==========================================
   SINGLE CAT
========================================== */

app.get("/breeds/:id", (req, res) => {

    const breed = breeds.find(cat =>

        String(cat.id) === req.params.id

    );

    if (!breed) {

        return res.status(404).render("error", {

            title: "Cat Not Found",

            message: "The requested cat could not be found."

        });

    }

    res.render("breed", {

        title: breed.breed,

        breed

    });

});

/* ==========================================
   SEARCH
========================================== */

app.get("/search", (req, res) => {

    res.render("search", {

        title: "Search Cats",

        keyword: "",

        results: []

    });

});

app.post("/search", (req, res) => {

    const keyword = req.body.keyword.toLowerCase();

    const results = breeds.filter(breed =>

        breed.name.toLowerCase().includes(keyword)

        ||

        breed.origin.toLowerCase().includes(keyword)

        ||

        breed.temperament.toLowerCase().includes(keyword)

        ||

        breed.details.coatType.toLowerCase().includes(keyword)

        ||

        breed.tags.join(" ").toLowerCase().includes(keyword)

    );

    res.render("search", {

        title: "Search",

        keyword,

        results

    });

});
/* ==========================================
   API
========================================== */

app.get("/api/breeds", (req, res) => {

    res.json(breeds);

});

app.get("/api/breeds/:id", (req, res) => {

    const breed = breeds.find(cat =>

        String(cat.id) === req.params.id

    );

    if (!breed) {

        return res.status(404).json({

            message: "Cat not found"

        });

    }

    res.json(breed);

});

/* ==========================================
   404
========================================== */

app.use((req, res) => {

    res.status(404).render("error", {

        title: "404",

        message: "Page Not Found"

    });

});

/* ==========================================
   SERVER
========================================== */

app.listen(PORT, () => {

    console.log(`Server running at http://localhost:${PORT}`);

});