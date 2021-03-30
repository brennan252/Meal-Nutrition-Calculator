# Meal Nutrition Calculator

## About
This is a React.js App that estimates the nutrition data for an inputted meal.
The user enters ingredient names and the weights of the ingredients in grams, ounces, or pounds.

Once a collection of ingredients(or a "meal") is submitted, a table is displayed showing each ingredient's nutrition data
as well as the nutrition data totals for the entire meal.

If a user is unsure if an ingredient will be found in the database, they are given the option to check for close matches and then choose 
the most accurate match. 
 
## Demo
A static version of the app can be accessed here: https://brennan252.github.io/Meal-Nutrition-Calculator-Demo/. 
It is only meant to give an idea of the app's user interface experience.
This demo app is not connected to any database so ALL data is computer generated. 

## Code
### React
The app's code is in React.js and uses React-Bootstrap components. All of the React code is in the './src' folder. 

### Server
All server code is in the './server.js' file. It uses Express.js and the Mariadb Connector Promise API.
This handles serving the static app bundle as well as responding to the two GET request endpoints.

### Styling
The app's styling is contained in the './style.scss' file. 

## Database
### SQL setup file
The exported Mariadb .sql file that has the setup commands and data to recreate the database is in the './database/fed_food_data__db_backup.sql' file.

### Data
The data is a small subset of the USDA October 2020 data downloaded from this link: https://fdc.nal.usda.gov/download-datasets.html. 
The R code used to manipulate and subset the source csv files is in './database/R' folder. This subsetted data was used to create the database.
Add the USDA downloaded csv files to the 'R' folder before changing R code.

## Usage
### Build App Bundle
To rebuild the './dist/app-bundle.js' for production enter:
**npm run-script build**

To rebuild the './dist/app-bundle.js' for development enter:
**npm run-script start**

### Serve
Serve the highest level folder with a valid './dist/appbundle.js' build.

One way to do that is with the 'http-server' package. Install the package and enter:
**http-server**

Then access the app at the given url.

## Future Improvements
**1. Server Best Practices**
- Some validation should be added to ensure SQL queries are safe. 
- If many people are going to use the API, steps should be taken to ensure high availability. 
- The API endpoints for the GET requests could be refactored into seperate express routers in new files. 

**2. Expanded Nutritional Data Fields**
Sodium and a couple other nutritional data fields could be added and ultimately lead to realistic nutrition and ingredient label generation.

**3. Expanded Quantity Options**
Since not everyone is comfortable estimating the weight of their food, a volume or single serving option may be a good feature.
Converting all volumes into weight with the same conversion factor for all foods would give innaccurate results. 
This feature would require some sort of density variable for all foods in the database to accurately be achieved.

**4. Meal Tracking**
Adding historical meal tracking would allow this app to be used as a personal diet journal.
