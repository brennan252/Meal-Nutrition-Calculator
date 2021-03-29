// "NutritionEstimator.tsx"
// Nutrition Estimator Component rendered in Calculator.tsx when not showing result
// Display Nutrition Estimator Form

import * as React from 'react';
import { Suspense } from 'react';
const IngredientInput = React.lazy(() => import('./IngredientInput'));
import { Container, Button, Card, Form, Row, Spinner } from 'react-bootstrap';


type Props = {
    count: number;
    indeces: Array<number>;
    names: Array<string>;
    isValids: Array<boolean>;
    units: Array<string>;
    quantities: Array<number>;
    disabledNames: Array<boolean>;

    onDelete: any;
    onAdd: any;
    onMealSubmit: any;
    onNameChange: any;
    onCheck: any;
    onSuggestionSelect: any;
    onFound: any;
    onUnitsChange: any;
    onQuantityChange: any;
    onResetName: any;
};

const NutritionEstimator = (Props: Props) => {
    return (
        <Card bg="light" text="success" className="m-4 shadow" data-testid="NutritionEstimator">
            <Card.Body>
                <Card.Title data-testid="EstimatorTitle" className={"font-weight-bolder"}style={{ textAlign: "center" }}>Nutrition Calculator</Card.Title>
                <Form onSubmit={Props.onMealSubmit} className="justify-content-center align-items-center" >
                    <Suspense  fallback={
                        <Container key="ingredientInputSpinner" fluid="true" className="justify-content-center align-items-center">
                            <Spinner>Loading...</Spinner>
                        </Container>}>
                        {Props.indeces.map((i) => 
                            <IngredientInput  key={"IngredientInput".concat(i.toString())} inputIndex={i} inputCount={Props.count} name={Props.names[i - 1]} valid={Props.isValids[i - 1]}  units={Props.units[i - 1]} quantity={Props.quantities[i - 1]}
                                onNameChange={Props.onNameChange(i - 1)} onResetName={Props.onResetName(i-1)} onIsValidCheck={Props.onCheck(i - 1)} 
                                onQuantityChange={Props.onQuantityChange(i - 1)} onUnitsChange={Props.onUnitsChange} onNameSuggestionSelect={Props.onSuggestionSelect}
                                onRemoveIngredient={Props.onDelete} onOneNameMatch={Props.onFound}
                                inputDisabledNamesArray={Props.disabledNames}
                            ></IngredientInput>)}
                    </Suspense>
                    <br />

                    <Row className="justify-content-center  align-items-center" >
                        <Button variant="dark" className="shadow" onClick={Props.onAdd} data-testid="onAddIngredient">
                            Add Ingredient
                        </Button>
                    </Row>

                    <br />
                    <Row className="justify-content-center  align-items-center"  >
                        <Button className="shadow" variant="success" type="submit" data-testid="onSubmitMeal">
                            Submit
                        </Button>
                    </Row>   
                </Form >
            </Card.Body>
        </Card>
    )
};

export default NutritionEstimator;