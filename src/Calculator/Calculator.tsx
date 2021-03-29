// "Calculator.tsx"
// Highest level component for Nutrition Estimator
// Most Nutrition Estimator State Logic is handled here
// Displays the Nutrition Estimator Form and the Nutrition Results Data

import * as React from 'react';
import { weightUnits } from './data';
import ErrorModal from './Nutrition Estimator Components/ErrorModal';
import NutritionEstimator from './Nutrition Estimator Components/NutritionEstimator';
import NutritionResults from './Nutrition Result Components/NutritionResults';
import { Container, Row } from 'react-bootstrap';

type Props = {
    initialShowError: boolean;
    initialShowResult: boolean;
}

const Calculator = (Props: Props) => {
    // State Hooks
    /////////////////////////////////////////////////////////////////////////////
    const [ingredientCount, setIngredientCount] = React.useState(1 as number);
    const [changeCount, setChangeCount] = React.useState(0 as number); 

    // Ingredient Information
    const [indexArray, setIndexArray] = React.useState([1] as Array<number>);
    const [namesArray, setNamesArray] = React.useState([' '] as Array<string>);
    const [unitsArray, setUnitsArray] = React.useState([weightUnits[0]] as Array<string>);
    const [quantitiesArray, setQuantitiesArray] = React.useState([NaN] as Array<number>);
    const [idArray, setIdArray] = React.useState([NaN] as Array<number>);// ID from DB
    const [validArray, setValidArray] = React.useState([false] as Array<boolean>);// If name is from DB
    const [disabledNamesArray, setDisabledNamesArray] = React.useState([false] as Array<boolean>);// disable named Input
    const [showResult, setShowResult] = React.useState(Props.initialShowResult);
    const [showError, setShowError] = React.useState(Props.initialShowError);

    // Callback Hooks
    //////////////////////////////////////////////////////////

    // CALLBACK: onSubmit
    // If valid inputs, show result; if not show error
    const onSubmit = React.useCallback((event) => {
        event.preventDefault();

        const newChangeCount = changeCount + 1;
        let i = 0;
        let validForm = true;

        // Check names and quantities for each ingredient
        while (i < ingredientCount) {
            // check quantity
            if (isNaN(quantitiesArray[i])) {
                validForm = false;
            }
            // check name
            if (namesArray[i].length < 2) {
                validForm = false;
            }

            i++;
        }

        setShowResult(validForm);
        setShowError(!validForm);
        setChangeCount(newChangeCount);

    }, [changeCount, showResult, showError, ingredientCount,
        indexArray, namesArray, quantitiesArray]);

    // CALLBACK: onReset
    // Reset form to starting states
    const onCalculatorReset = React.useCallback(() => {
        const newChangeCount = changeCount + 1;

        setChangeCount(newChangeCount);
        setShowResult(false);
        setShowError(false);
        setIngredientCount(1);
        setIndexArray([1]);
        setNamesArray([" "]);
        setUnitsArray([weightUnits[0]]);
        setQuantitiesArray([0 as number]);
        setIdArray([NaN as number]);
        setValidArray([false]);
        setDisabledNamesArray([false]);

    }, [changeCount, showResult, showError, ingredientCount,
        indexArray, namesArray, unitsArray, quantitiesArray,
        idArray, validArray, disabledNamesArray]);

    // CALLBACK: onIngredientDelete
    // Remove Last Ingredient 
    // Can only be called on the last ingredient 
    // when there is more than one ingredient
    const onIngredientDelete = React.useCallback(() => {
        const newIndeces = indexArray;
        const newNames = namesArray;
        const newUnits = unitsArray;
        const newQuanitities = quantitiesArray;
        const newIds = idArray;
        const newValids = validArray;
        const newDisabledNames = disabledNamesArray;

        const newIngredientCount = ingredientCount - 1;
        const newChangeCount = changeCount - 1;

        // Remove the last index from the ingredient info arrays
        newIndeces.splice(newIngredientCount,1);
        newNames.splice(newIngredientCount, 1);
        newUnits.splice(newIngredientCount, 1);
        newQuanitities.splice(newIngredientCount, 1);
        newIds.splice(newIngredientCount, 1);
        newValids.splice(newIngredientCount, 1);
        newDisabledNames.splice(newIngredientCount, 1);


        setChangeCount(newChangeCount);
        setIngredientCount(newIngredientCount);
        setIndexArray(newIndeces);
        setNamesArray(newNames);
        setUnitsArray(newUnits);
        setIdArray(newIds);
        setQuantitiesArray(newQuanitities);
        setValidArray(newValids);
        setDisabledNamesArray(newDisabledNames);

    }, [ingredientCount, changeCount, indexArray, namesArray, unitsArray,
        quantitiesArray, idArray, validArray, disabledNamesArray]);


    // CALLBACK: onIngredientAdd
    // Add new empty ingredient to form
    const onIngredientAdd = React.useCallback((event) => {
        const newIndeces = indexArray;
        const newNames = namesArray;
        const newUnits = unitsArray;
        const newQuanitities = quantitiesArray;
        const newIds = idArray;
        const newValids = validArray;
        const newDisabledNames = disabledNamesArray;
        const newIngredientCount = ingredientCount + 1;
        const newChangeCount = changeCount + 1;

        // Add new object at the end of the ingredient info arrays
        newIndeces.push(newIngredientCount);
        newNames.push(' ');
        newUnits.push(weightUnits[0]);
        newQuanitities.push(0 as number);
        newIds.push(NaN as number);
        newValids.push(false as boolean);
        newDisabledNames.push(false as boolean);

        setChangeCount(newChangeCount);
        setIngredientCount(newIngredientCount);
        setIndexArray(newIndeces);
        setNamesArray(newNames);
        setUnitsArray(newUnits);
        setIdArray(newIds);
        setQuantitiesArray(newQuanitities);
        setValidArray(newValids);
        setDisabledNamesArray(newDisabledNames);

    }, [ingredientCount, changeCount, indexArray, namesArray, unitsArray,
        quantitiesArray, idArray, validArray, disabledNamesArray]);


    // CALLBACK: onIngredientNameChange
    // Set the ingredient name for the given index ingredient
    const onIngredientNameChange = React.useCallback(index => (event) => {
        const newNames = namesArray
        const newChangeCount = changeCount + 1;

        newNames[index] = event.target.value;

        setNamesArray(newNames);
        setChangeCount(newChangeCount);

    }, [changeCount, namesArray]);


     // CALLBACK: onIngredientQuantityChange
    // Set the ingredient quantity for the given index ingredient
    const onIngredientQuantityChange = React.useCallback(index => (event) => {
        const newQuantities = quantitiesArray;
        const newChangeCount = changeCount + 1;

        newQuantities[index] = Number(event.target.value);

        setQuantitiesArray(newQuantities);
        setChangeCount(newChangeCount);

    }, [changeCount, quantitiesArray]);


    // CALLBACK: onIngredientNameChange
    // Set the ingredient Unit:
    // Parse the eventKey string for the ingredient index and the weightUnits array index
    const onIngredientUnitsChange = React.useCallback((eventKey: string) => {
        // Parse eventKey
        const parsedArray = eventKey.split("_");

        // Use parsedArray to derive indeces  
        // Then update unitsArray
        const ingredientIndex = Number(parsedArray[0]) - 1;
        const selectedUnits = weightUnits[Number(parsedArray[1])];
        const newUnits = unitsArray
        const newChangeCount = changeCount + 1;
        newUnits[ingredientIndex] = selectedUnits;

        setUnitsArray(newUnits);
        setChangeCount(newChangeCount);

    }, [changeCount, unitsArray]);



    // CALLBACK: onNameCheck
    // (NOTE: Does not query name from DB here.
    // See 'SearchResultComponent' for GET call)
    // Sets disabled names for the given index to true
    // which mounts a SearchResultComponent calling the GET(/names)
    const onNameCheck = React.useCallback(index => (event) => {
        const newDisabledNames = disabledNamesArray;
        const newChangeCount = changeCount + 1;

        newDisabledNames[index] = true;

        setDisabledNamesArray(newDisabledNames);
        setChangeCount(newChangeCount);

    }, [changeCount, disabledNamesArray]);

    // CALLBACK: onNameSuggestionSelect
    // Called when a name is selected from the name suggestions 
    // dropdown in the SearchResultComponent.
    //
    // The eventKey string is parsed into an array and
    // used to assign the ingredient's index, name selected,
    // and the selected name's database identifier.
    // Then the  name is marked as valid.
    const onNameSuggestionSelect = React.useCallback((eventKey: string) => {
        const newDisabledNames = disabledNamesArray;
        const newValids = validArray;
        const newIds = idArray
        const newNames = namesArray;
        const newChangeCount = changeCount + 1;

        // Parse the eventKey string
        const parseArray = eventKey.split("_");

        // assign the array's object to the index, selected name, and ID
        const ingredientIndex = Number(parseArray[0]) - 1;
        const selectedName = parseArray[1];
        const dbID = Number(parseArray[2]);
        
        newDisabledNames[ingredientIndex] = true;
        newValids[ingredientIndex] = true;
        newIds[ingredientIndex] = dbID;
        newNames[ingredientIndex] = selectedName;

        setChangeCount(newChangeCount);
        setDisabledNamesArray(newDisabledNames);
        setValidArray(newValids);
        setIdArray(newIds);
        setNamesArray(newNames);

    }, [changeCount, disabledNamesArray, validArray, idArray, namesArray]);

    // CALLBACK: onOneNameFound
    // Called if only one matching name is received from the 
    // GET(/names) in the SearchResultComponent 
    //
    // Assigns the foundName and foundID to the ingredient name and ID 
    // and set the name as valid.
    const onOneNameFound = React.useCallback((ingredientId: number, foundName: string, foundId: number) => {
        const newDisabledNames = disabledNamesArray;
        const newValids = validArray;
        const newIds = idArray
        const newNames = namesArray;
        const ingredientIndex = ingredientId - 1;
        const newChangeCount = changeCount + 1;

        newDisabledNames[ingredientIndex] = true;
        newValids[ingredientIndex] = true;
        newIds[ingredientIndex] = foundId;
        newNames[ingredientIndex] = foundName;

        setChangeCount(newChangeCount);
        setDisabledNamesArray(newDisabledNames);
        setValidArray(newValids);
        setIdArray(newIds);
        setNamesArray(newNames);
    }, [changeCount, disabledNamesArray, validArray, idArray, namesArray]);

    // CALLBACK: onIngredientNameReset
    // Reset ingredient states for the matching ingredient index to start states.
    // Called in Name Search Results to unmount Name Search Results .
    const onIngredientNameReset = React.useCallback((index: number) => (event) => {
        const newDisabledNames = disabledNamesArray;
        const newValids = validArray;
        const newIds = idArray
        const newNames = namesArray;
        const ingredientIndex = index;
        const newChangeCount = changeCount + 1;

        newDisabledNames[ingredientIndex] = false;
        newValids[ingredientIndex] = false;
        newIds[ingredientIndex] = NaN as number;
        newNames[ingredientIndex] = " ";

        setChangeCount(newChangeCount);

        setDisabledNamesArray(newDisabledNames);
        setValidArray(newValids);
        setIdArray(newIds);
        setNamesArray(newNames);
    }, [changeCount, disabledNamesArray, validArray, idArray, namesArray]);


    // Function: handleClose
    // Close error modal
    const handleClose = () => setShowError(false);

    // RENDER VIEW
    /////////////////////////////////////////////////////////////////////////
    if (showResult) {
        return (
            <Container fluid data-testid="CalculatorResultsViewContainer">
                <Row className="justify-content-center" xs={1} sm={2} md={2} lg={3}>
                    <Container>
                        <NutritionResults
                            indeces={indexArray}
                            names={namesArray}
                            IDs={idArray}
                            quantities={quantitiesArray}
                            units={unitsArray}
                            onReset={onCalculatorReset}
                        ></NutritionResults>
                    </Container>
                </Row>
            </Container>
        );
    } else {
        return (
            <Container fluid data-testid="CalculatorEstimatorViewContainer">
                <Row className="justify-content-center" xs={1} sm={2} md={2} lg={3}>
                    <Container>
                        <ErrorModal isError={showError} onClose={handleClose} />
                        
                        <NutritionEstimator
                            count={ingredientCount}
                            indeces={indexArray}
                            names={namesArray}
                            isValids={validArray}
                            units={unitsArray}
                            quantities={quantitiesArray}
                            disabledNames={disabledNamesArray}
                            onDelete={onIngredientDelete}
                            onAdd={onIngredientAdd}
                            onMealSubmit={onSubmit}
                            onCheck={onNameCheck}
                            onSuggestionSelect={onNameSuggestionSelect}
                            onFound={onOneNameFound}
                            onNameChange={onIngredientNameChange}
                            onUnitsChange={onIngredientUnitsChange}
                            onQuantityChange={onIngredientQuantityChange}
                            onResetName={onIngredientNameReset}
                        ></NutritionEstimator>
                    </Container>
                </Row>
            </Container>
        );
    };
}

export default Calculator;