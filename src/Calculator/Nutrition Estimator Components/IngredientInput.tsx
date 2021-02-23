// "IngredientInput.tsx"
// IngredientInput component rendered in NutritionEstimator.tsx when not showing result.
// Display Ingredient Input in Nutrition Estimator

import * as React from 'react';
import { weightUnits } from '../data';
import { NameCheckInterface } from './NameCheckInterface';
import { FormControl, Button, Card, Dropdown, DropdownButton, Form, InputGroup} from 'react-bootstrap';


type Props = {
    name: string;
    inputIndex: number;
    inputCount: number;
    valid: boolean;
    units: string;
    quantity: number;

    onOneNameMatch: any;
    onNameChange: any;
    onIsValidCheck: any;
    onUnitsChange: any;
    onQuantityChange: any;
    onRemoveIngredient: any;
    onResetName: any;
    onNameSuggestionSelect: any;

    inputDisabledNamesArray: Array<boolean>;
};

const IngredientInput = (Props: Props) => {

    // BAD key changing
    const controlIDstring = Props.inputIndex.toString().concat('IngredientInputGroup');
    const units = Props.units;
    const quantityInputKey = Props.inputIndex.toString().concat("quantityInputKey");

    let lastOfManyIngredients = false as boolean;
    
    let checkButtonString = " ";

    if (Props.valid) {
        checkButtonString = "secondary";
    }
    else {
        checkButtonString = "outline-secondary";
    }
    
    

    if ((Props.inputCount === Props.inputIndex) && (Props.inputCount > 1) ) {
        lastOfManyIngredients = true;
    }


    return (
        <div>
            <Card text="dark" bg="light">
                <Card.Header className="align-items-center">
                    <Card.Title className={"font-weight-bold"} style={{ textAlign: "center" }}>Ingredient {(Props.inputIndex).toString()}</Card.Title>
                </Card.Header>
                <Card.Body className="justify-content-center align-items-center">

                    <Form.Group key={controlIDstring} controlId={controlIDstring}>
                        <NameCheckInterface interfaceIndex={Props.inputIndex}
                            interfaceName={Props.name}
                            onIngredientIsValidCheck={Props.onIsValidCheck}
                            onIngredientNameChange={Props.onNameChange}
                            onIngredientResetName={Props.onResetName}
                            interfaceNamesDisabled={Props.inputDisabledNamesArray[Props.inputIndex - 1]}
                            isValid={Props.valid} nameSuggestionSelect={Props.onNameSuggestionSelect}
                            onMatch={Props.onOneNameMatch}
                            ></NameCheckInterface>
                    </Form.Group>

                </Card.Body> 
                <Card.Footer className="justify-content-center align-items-center">
                    <Form.Row className="justify-content-center  align-items-center" >
                        <InputGroup>
                            <FormControl className="" key={quantityInputKey} onChange={Props.onQuantityChange} placeholder="Enter Quantity" />
                          
                        </InputGroup>
                    </Form.Row>
                    <br />
                    <Form.Row className="justify-content-center  align-items-center" >
                            <DropdownButton className="" variant="success" text="light" title={units.charAt(0).toUpperCase() + units.slice(1)} >
                                {weightUnits.map((unitName) =>
                                    <Dropdown.Item key={'dropdownUnit'.concat(Props.inputIndex.toString(), '_', (weightUnits.indexOf(unitName)).toString())}
                                        eventKey={Props.inputIndex.toString().concat('_', weightUnits.indexOf(unitName).toString())}
                                        onSelect={Props.onUnitsChange}>{unitName.charAt(0).toUpperCase() + unitName.slice(1)}</Dropdown.Item>)}
                            </DropdownButton>
                        
                    </Form.Row>
                    <br />
                    <Form.Row className="justify-content-center align-items-center" >
                        {lastOfManyIngredients &&
                            <Button className="" variant="danger" onClick={Props.onRemoveIngredient}>
                                Remove
                            </Button>}
                    </Form.Row>
                </Card.Footer>
            </Card>
            {!lastOfManyIngredients &&
                <br />}
        </div>
        
    )
};

export default IngredientInput;