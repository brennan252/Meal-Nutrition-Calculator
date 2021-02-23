// "NutritionResults.tsx"
// Nutrition component rendered in Calculator.tsx 
// when submission successful.
// On mounting calls get(/mealData/) and uses received data to 
// derive values for the table

import * as React from 'react';
import { get } from 'jquery';
import {poundsToGrams, ouncesToGrams} from '../data'
import { Table, Button, Card, Spinner, Modal, Row } from 'react-bootstrap';

type Props = {
    indeces: Array<number>;
    names: Array<string>;
    IDs: Array<number>;
    quantities: Array<number>;
    units: Array<string>;

    onReset: any;
};

const NutritionResults = (Props: Props) => {
    const [ingredientNames, setIngredientNames] = React.useState(Props.names);
    const [ingredientCount, setIngredientCount] = React.useState(Props.indeces.length);
    const [carbs, setCarbs] = React.useState([1] as Array<number>);
    const [fats, setFats] = React.useState([1] as Array<number>);
    const [proteins, setProteins] = React.useState([1] as Array<number>);
    const [calories, setCalories] = React.useState([100] as Array<number>);
    const [grams, setGrams] = React.useState([1] as Array<number>);
    const [isLoading, setIsLoading] = React.useState(true);
    const [showError, setShowError] = React.useState(false);

    const handleClose = () => setShowError(false);



    React.useEffect(() => {
        // Convert weights to grams
        const convertedWeights = [];
        let j = 0;
        while (j < ingredientCount) {
            if (Props.units[j].toUpperCase() === 'POUNDS') {
                convertedWeights.push(poundsToGrams(Props.quantities[j]) / 100);
            }
            if (Props.units[j].toUpperCase() === 'OUNCES') {
                convertedWeights.push(ouncesToGrams(Props.quantities[j]) / 100);
            }
            if (Props.units[j].toUpperCase() === 'GRAMS') {
                convertedWeights.push(Props.quantities[j] / 100);
            }

            j++;
        }

        setGrams(convertedWeights);

        // Send JQuery Get request for data
        let namesArrayString = '';
        Props.names.map((name) => {
            if (isNaN(Props.IDs[Props.names.indexOf(name)])) {
                namesArrayString = namesArrayString.concat(name, "_")
            } else {
                namesArrayString = namesArrayString.concat("INDEX", Props.IDs[Props.names.indexOf(name)].toString(), "_")
            }
        }); 


        const urlString = "http://localhost:1337/mealdata/".concat(namesArrayString);
        let newCarbs = [];
        let newFats = [];
        let newProteins = [];
        let newCalories = [];
        let newNames = [];
        let newError = false as boolean;
        
        get(urlString)
            .then(
                (result) => {
                    if (result.retreivedNames.length === Props.names.length) {
                        newError = false;
                    } else {
                        newError = true;
                    }

                    let newNames = result.retreivedNames;
                    let newCarbs = result.retreivedCarbs;
                    let newFats = result.retreivedFats;
                    let newProteins = result.retreivedProteins;
                    let newCalories = result.retreivedCalories;

                     // Get unweighted data (nutrition per 100g)
                    // Push true value by multiplying weights
                    Props.indeces.map((i) => {
                        newCarbs[i - 1] = Number(newCarbs[i - 1]) * convertedWeights[i - 1];
                        newFats[i - 1] = Number(newFats[i - 1]) * convertedWeights[i - 1];
                        newProteins[i - 1] = Number(newProteins[i - 1]) * convertedWeights[i - 1];
                        newCalories[i - 1] = Number(newCalories[i - 1]) * convertedWeights[i - 1];
                    });

                    setShowError(newError);
                    setIngredientNames(newNames);
                    setCarbs(newCarbs);
                    setFats(newFats);
                    setProteins(newProteins);
                    setCalories(newCalories);
                },
                (error) => {
                    setShowError(true);
                })
            .then((res) => {
                setIsLoading(false)
            });
    }, []);

    // Derive Acculumative values
    let totalGrams = 0 as number;
    let totalCarbs = 0 as number;
    let totalFats = 0 as number;
    let totalProteins = 0 as number;
    let totalCalories = 0 as number;

    grams.map((gram) => totalGrams = totalGrams + gram);
    carbs.map((carb) => totalCarbs = totalCarbs + carb);
    fats.map((fat) => totalFats = totalFats + fat);
    proteins.map((protein) => totalProteins = totalProteins + protein);
    calories.map((calorie) => totalCalories = totalCalories + calorie);

    // Render based on loading state
    if (isLoading) {
        return <Spinner animation="border" variant="primary" />
    } else {
        return (
            <Card text="success" bg="light">
                <Card.Body>
                    <Card.Title className={"font-weight-bolder"} style={{ textAlign: "center" }}>Nutrition Estimator</Card.Title>
                    <Modal show={showError} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Error!</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Make sure all names and quantity fields are valid.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                        </Button>
                        </Modal.Footer>
                    </Modal>
                    
                    {!showError &&
                        <Table striped bordered hover size="sm" variant="success" responsive>
                            <thead>
                                <tr>
                                    <th>Ingredient</th>
                                    <th>Weight (100 g)</th>
                                    <th>Carbs (g)</th>
                                    <th>Proteins (g)</th>
                                    <th>Fats (g)</th>
                                    <th>Calories (kcal)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Props.indeces.map((i) =>
                                    <tr>
                                        <td>{ingredientNames[i - 1]}</td>
                                        <td>{grams[i - 1].toFixed(2)}</td>
                                        <td>{carbs[i - 1].toFixed(2)}</td>
                                        <td>{proteins[i - 1].toFixed(2)}</td>
                                        <td>{fats[i - 1].toFixed(2)}</td>
                                        <td>{calories[i - 1].toFixed(2)}</td>
                                    </tr>)}
                                <tr>
                                    <td>Totals</td>
                                    <td>{totalGrams.toFixed(2)}</td>
                                    <td>{totalCarbs.toFixed(2)}</td>
                                    <td>{totalProteins.toFixed(2)}</td>
                                    <td>{totalFats.toFixed(2)}</td>
                                    <td>{totalCalories.toFixed(2)}</td>
                                </tr>

                            </tbody>
                        </Table>
                    }

                    <br />
                    <Row className="justify-content-center" >
                        <Button variant="danger" onClick={Props.onReset}>
                            Reset
                        </Button>
                    </Row>

                </Card.Body>
            </Card>

        )
    }
};

export default NutritionResults;