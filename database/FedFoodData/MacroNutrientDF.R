## Create Data Table for Carbs, Proteins, Fats, Calories from FDNA


####################################################################
## Create dataframe to export but no data added yet

## columns for dataframe
name = c(toString(" "))
carbs = c(toString(" "))
proteins = c(toString(" "))
fats = c(toString(" "))
calories = c(toString(" "))

## dataframe to export to csv
dfExport = data.frame(names, carbs, proteins, fats, calories)

####################################################################
####################################################################
#### Read Data from nutrient.csv, food.csv, food_nutrient.csv 

## nutrient IDS
dfNutrient = read.csv("./FDNA Data/nutrient.csv")

nutrientName = dfNutrient$name
nutrientID = dfNutrient$id

## find Id for nutrients we want: "protein", "fat", "carbs", "energy"
table(nutrientName)

fatID = dfNutrient$id[grep("Total lipid", dfNutrient$name,  ignore.case=TRUE)]
carbID = dfNutrient$id[grep("Carbohydrate, by difference", dfNutrient$name, ignore.case=TRUE)]
proteinID = dfNutrient$id[grep("Protein", dfNutrient$name, ignore.case=TRUE)]

## four choices
dfNutrient[grep("energy", dfNutrient$name,  ignore.case=TRUE),]
calorieID = 1008

############################################################################
## food IDS
dfFood = read.csv("./FDNA Data/food.csv")

## need to decide which subgroups to keep:
table(dfFood$data_type)

## for now eliminating all except 
dfFood = subset(dfFood, data_type == "sr_legacy_food")

foodNames = dfFood$description
foodID = dfFood$fdc_id


###############################################################################
## food_nutrient.csv

dfFoodNutrient = read.csv("./FDNA Data/food_nutrient.csv")
dfFoodNutrient = subset(dfFoodNutrient, fdc_id %in% foodID)

###############################################################################
###############################################################################
## search  food Nutrient fdc_id (food ID) and nutrient_id (ID for protein, carbs, 
## fats, calories)


###  For loop to generate entry for each foodName
for(i in foodNames){
  regExString = paste("(", i,")", sep="")
  searchNames = foodNames[grep(regExString, foodNames, ignore.case=TRUE)]
  searchName = searchNames[1]
  searchNameID = foodID[grep(regExString, foodNames, ignore.case=TRUE)[1]] 
  searchSubsetDF = dfFoodNutrient[grep(searchNameID, dfFoodNutrient$fdc_id, ignore.case=TRUE),]
  
  ## Carb
  subsetRowIndeces = intersect(grep(searchNameID, searchSubsetDF$fdc_id, ignore.case=TRUE), 
                               grep(carbID, searchSubsetDF$nutrient_id, ignore.case=TRUE))[1]
  
  carb = searchSubsetDF[subsetRowIndeces,]$amount
  
  ### Protein
  subsetRowIndeces = intersect(grep(searchNameID, searchSubsetDF$fdc_id, ignore.case=TRUE), 
                               grep(proteinID, searchSubsetDF$nutrient_id, ignore.case=TRUE))[1]
  
  protein = searchSubsetDF[subsetRowIndeces,]$amount
  ### Fat
  subsetRowIndeces = intersect(grep(searchNameID, searchSubsetDF$fdc_id, ignore.case=TRUE), 
                               grep(fatID, searchSubsetDF$nutrient_id, ignore.case=TRUE))[1]
  
  fat = searchSubsetDF[subsetRowIndeces,]$amount
  ### Calorie
  subsetRowIndeces = intersect(grep(searchNameID, searchSubsetDF$fdc_id, ignore.case=TRUE), 
                               grep(calorieID, searchSubsetDF$nutrient_id, ignore.case=TRUE))[1]
  
  calorie = searchSubsetDF[subsetRowIndeces,]$amount
  
  ## Make Entry
  
  Entry = data.frame(name=toString(searchName), 
                     carbs=toString(carb), 
                     proteins=toString(protein), 
                     fats=toString(fat), 
                     calories=toString(calorie))
  
  ## Bind Entry
  dfExport = rbind(dfExport, Entry)
  ## End For Loop
}


#################################################################################
## write csv file
dfExport = dfExport[-1,]
write.table(dfExport, file = "macroNutrients.csv", quote=TRUE, row.names=FALSE, sep = ",",  qmethod = "double")
