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
   SORT BREEDS (A-Z)
========================================== */

breeds.sort((a, b) => a.name.localeCompare(b.name));

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

        title: "About Cats"

    });

});

/* ==========================================
   ALL BREEDS
========================================== */

app.get("/breeds", (req, res) => {

    res.render("breeds", {

        title: "Browse Cat Breeds",

        breeds

    });

});

/* ==========================================
   SINGLE BREED
========================================== */

app.get("/breeds/:id", (req, res) => {

    const breed = breeds.find(

        breed => breed.id === req.params.id

    );

    if (!breed) {

        return res.status(404).render("error", {

            title: "Breed Not Found",

            message: "The requested breed could not be found."

        });

    }

    res.render("breed", {

        title: breed.name,

        breed

    });

});

/* ==========================================
   SEARCH PAGE
========================================== */

app.get("/search", (req, res) => {

    const origins = [...new Set(breeds.map(b => b.origin))].sort();

    const coatTypes = [...new Set(breeds.map(b => b.details.coatType))].sort();

    const groomingLevels = [...new Set(breeds.map(b => b.details.groomingLevel))].sort();

    res.render("search", {

        title: "Search Cat Breeds",

        keyword: "",

        origin: "",

        coatType: "",

        grooming: "",

        results: [],

        origins,

        coatTypes,

        groomingLevels,

        error: ""

    });

});

/* ==========================================
   SEARCH RESULTS
========================================== */

app.post("/search", (req, res) => {

    const keyword = (req.body.keyword || "").trim().toLowerCase();

    const origin = req.body.origin || "";

    const coatType = req.body.coatType || "";

    const grooming = req.body.grooming || "";

    const origins = [...new Set(breeds.map(b => b.origin))].sort();

    const coatTypes = [...new Set(breeds.map(b => b.details.coatType))].sort();

    const groomingLevels = [...new Set(breeds.map(b => b.details.groomingLevel))].sort();

    /* Empty Search Validation */

    if (

        keyword === "" &&

        origin === "" &&

        coatType === "" &&

        grooming === ""

    ) {

        return res.render("search", {

            title: "Search Cat Breeds",

            keyword: "",

            origin: "",

            coatType: "",

            grooming: "",

            results: [],

            origins,

            coatTypes,

            groomingLevels,

            error: "Please enter a keyword or select at least one filter."

        });

    }

    const results = breeds.filter(breed => {

        const matchKeyword =

            keyword === "" ||

            breed.name.toLowerCase().includes(keyword) ||

            breed.origin.toLowerCase().includes(keyword) ||

            breed.temperament.toLowerCase().includes(keyword) ||

            breed.tags.join(" ").toLowerCase().includes(keyword);

        const matchOrigin =

            origin === "" ||

            breed.origin === origin;

        const matchCoat =

            coatType === "" ||

            breed.details.coatType === coatType;

        const matchGrooming =

            grooming === "" ||

            breed.details.groomingLevel === grooming;

        return (

            matchKeyword &&

            matchOrigin &&

            matchCoat &&

            matchGrooming

        );

    });

    res.render("search", {

        title: "Search Cat Breeds",

        keyword,

        origin,

        coatType,

        grooming,

        results,

        origins,

        coatTypes,

        groomingLevels,

        error: ""

    });

});