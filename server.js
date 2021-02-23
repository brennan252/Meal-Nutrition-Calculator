// "server.js"
// Serve Static app and respond to Endpoints for GET 'names' and GET 'mealdata'
'use strict';

const path = require('path');
const express = require('express');
const mariadb = require('mariadb');


// staticBundle
const staticPath = path.join(__dirname, '/');
const app = express();
app.use(express.static(staticPath));


// Allows you to set port in the project properties.
app.set('port', process.env.PORT || 3000);


const server = app.listen(app.get('port'), function () {
    console.log('listening');
});


// #########################################################
// Query data from a Mariadb database,'fed_food_data', 
// which is a subset of the US's Federal Food Data 


// Keep as env variables in real use
const DBhost = 'localhost'; 
const DBuser = 'dbnodejsuser';
const DBpassword = 'password';
const DBdatabase = `fed_food_data`;
const DBport = 3306;


// Endpoints for GET requests

// GET 'names':
//  Search the union of all words in the "foodNameSearch" string
//  Respond with JSON containing: 
//      1) the number of matches
//      2) an array containing each match's unique ID in the database
//      3) an array containing each match's name in the database
app.get('/names/:foodNameSearch', function (req, res) {
    // Split foodNameSearch into individual words
    let words = req.params.foodNameSearch.split(" ");
    
    // Create string for query 
    let queryString = "";
    let conditionString = "%\" AND !(CARBS LIKE \"%NA%\") AND !(PROTEINS LIKE \"%NA%\") AND!(FATS LIKE \"%NA%\") AND!(CALORIES LIKE \"%NA%\") )";
    let selectString = "(SELECT NAME, ID FROM `legacyfoodsmacrodata` WHERE NAME LIKE \"%";

    // Add "INTERSECT" at the end of each select query for each word until the last ingredient
    words.map((word) => {
        if (words.indexOf(word) === (words.length - 1)) {
            queryString = queryString.concat(selectString, word, conditionString);
        } else {
            queryString = queryString.concat(selectString, word, conditionString, " INTERSECT ");
        }
    });   

    // Connect to database
    mariadb.createConnection({
        host: DBhost,
        user: DBuser,
        password: DBpassword,
        database: DBdatabase,
        port: DBport
    })
        .then(conn => {
            conn.query(queryString)
                .then(rows => {
                    // Read Query Response into javascript arrays, eliminating metadata
                    let matchPage = [];
                    let matchIDs = [];
                    rows.map((i) => matchPage.push(i.NAME));
                    rows.map((i) => matchIDs.push(i.ID));
                    let totalMatches = matchPage.length;

                    // Send JSON response
                    res.json({
                        matchCount: totalMatches,
                        idMatches: matchIDs,
                        nameMatches: matchPage
                    });

                    console.log("Name Check Response sent");
                    conn.end();
                })
                .catch(err => {
                    res.json(err);
                    conn.end();
                })
        });
    
   
});


// GET 'mealdata'
//  Parse the 'ingredients' string for the ingredients
//  Search the union of all words in each string in 'ingredients'
//  Respond with JSON containing arrays for the following
//      1) each ingredients' first matching name if an ID is not given
//      2) each ingredients' carbs per 100 g serving
//      3) each ingredients' fats per 100 g serving
//      4) each ingredients' proteins per 100 g serving
//      5) each ingredients' calories per 100 g serving
app.get('/mealdata/:ingredients', function (req, res) {

    // Read all ingredients into an array 
    let names = req.params.ingredients.split('_');
    names.pop();

    // Create Query String
    let queryString = "";
    let conditionString = "%\" AND !(CARBS LIKE \"%NA%\") AND !(PROTEINS LIKE \"%NA%\") AND!(FATS LIKE \"%NA%\") AND!(CALORIES LIKE \"%NA%\") LIMIT 1)";
    let conditionIDString = " AND !(CARBS LIKE \"%NA%\") AND !(PROTEINS LIKE \"%NA%\") AND!(FATS LIKE \"%NA%\") AND!(CALORIES LIKE \"%NA%\") LIMIT 1)";
    let selectNameString = "(SELECT * FROM `legacyfoodsmacrodata` WHERE NAME LIKE \"%";
 
    let selectIDString = "(SELECT * FROM `legacyfoodsmacrodata` WHERE ID LIKE ";

    // For each ingredient: If the index is included, search by index. 
    // Otherwise search by the full the string given for the ingredient.
    // Add "UNION" statement at the end of all the Select queries except the last.
    names.map((ingredientName) => {
        if (names.indexOf(ingredientName) === (names.length - 1)) {
            if (ingredientName.match(/INDEX/g)) {
                let ID = ingredientName.replace("INDEX", "");
                queryString = queryString.concat(selectIDString, ID, conditionIDString);

            } else {
                queryString = queryString.concat(selectNameString, ingredientName, conditionString);

            }

        } else {
            if (ingredientName.match(/INDEX/g)) {
                let ID = ingredientName.replace("INDEX", "");
                queryString = queryString.concat(selectIDString, ID, conditionIDString, " UNION ");
            } else {
                queryString = queryString.concat(selectNameString, ingredientName, conditionString, " UNION ");

            }

        } 
    });   

    // Connect to database
    mariadb.createConnection({
        host: DBhost,
        user: DBuser,
        password: DBpassword,
        database: DBdatabase,
        port: DBport
    })
        .then(conn => {
            conn.query(queryString)
                .then((rows) => {
                    // Read Query Response into javascript arrays, eliminating metadata
                    let namesArray = [];
                    let carbsArray = [];
                    let proteinsArray = [];
                    let fatsArray = [];
                    let caloriesArray = [];

                    rows.map((i) => {
                        namesArray.push(i.Name);
                        carbsArray.push(i.carbs);
                        proteinsArray.push(i.proteins);
                        fatsArray.push(i.fats);
                        caloriesArray.push(i.calories);
                    });

                    // Send JSON response
                    res.json({
                        retreivedNames: namesArray,
                        retreivedCarbs: carbsArray,
                        retreivedFats: fatsArray,
                        retreivedProteins: proteinsArray,
                        retreivedCalories: caloriesArray,
                    });

                    console.log("Meal Data Response sent");
                    conn.end();
                })
                .catch(err => {
                    res.json(err);
                    conn.end;
                })
        });
});

