// "IngredientInput.tsx"
// IngredientInput component rendered in NutritionEstimator.tsx when not showing result.
// Display Ingredient Input in Nutrition Estimator

import * as React from 'react';
import { weightUnits } from '../data';
import NameCheckInterface from './NameCheckInterface';
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
    const controlIDstring = Props.inputIndex.toString().concat('IngredientInputGroup');
    const units = Props.units;
    const quantityInputKey = Props.inputIndex.toString().concat("quantityInputKey");

    let lastOfManyIngredients = false as boolean;

    if ((Props.inputCount === Props.inputIndex) && (Props.inputCount > 1) ) {
        lastOfManyIngredients = true;
    }

    if (lastOfManyIngredients) {
        return (
            <div>
                <Card className="shadow" text="dark" bg="light">
                    <Card.Header className="align-items-center">
                        <Card.Title data-testid={"IngredientInput".concat(Props.inputIndex.toString())} className={"font-weight-bold"} style={{ textAlign: "center" }}>Ingredient {(Props.inputIndex).toString()}</Card.Title>
                    </Card.Header>
                    <Card.Body className="justify-content-center align-items-center">
                        <NameCheckInterface controlIDstring={controlIDstring} interfaceIndex={Props.inputIndex}
                            interfaceName={Props.name}
                            onIngredientIsValidCheck={Props.onIsValidCheck}
                            onIngredientNameChange={Props.onNameChange}
                            onIngredientResetName={Props.onResetName}
                            interfaceNamesDisabled={Props.inputDisabledNamesArray[Props.inputIndex - 1]}
                            isValid={Props.valid} nameSuggestionSelect={Props.onNameSuggestionSelect}
                            onMatch={Props.onOneNameMatch}
                        ></NameCheckInterface>
                    </Card.Body>
                    <Card.Footer className="justify-content-center align-items-center">
                        <Form.Row className="justify-content-center  align-items-center" >
                            <InputGroup>
                                <FormControl data-testid={"quantityInput"} className="shadow" key={quantityInputKey} onChange={Props.onQuantityChange} placeholder="Enter Quantity" />
                            </InputGroup>
                        </Form.Row>
                        <br />
                        <Form.Row className="justify-content-center  align-items-center" >
                            <DropdownButton variant="success" text="light" title={units.charAt(0).toUpperCase() + units.slice(1)} >
                                {weightUnits.map((unitName) =>
                                    <Dropdown.Item data-testid={unitName} key={'dropdownUnit'.concat(Props.inputIndex.toString(), '_', (weightUnits.indexOf(unitName)).toString())}
                                        eventKey={Props.inputIndex.toString().concat('_', weightUnits.indexOf(unitName).toString())}
                                        onSelect={Props.onUnitsChange}>{unitName.charAt(0).toUpperCase() + unitName.slice(1)}</Dropdown.Item>)}
                            </DropdownButton>
                        </Form.Row>
                        <br />
                        <Form.Row className="justify-content-center align-items-center" >                            
                            <Button data-testid={"onRemove"} className="shadow" variant="danger" onClick={Props.onRemoveIngredient}>
                                Remove
                            </Button>
                        </Form.Row>
                    </Card.Footer>
                </Card>
            </div>
        );

    } else {
        return (
            <div>
                <Card className="shadow" text="dark" bg="light">
                    <Card.Header className="align-items-center">
                        <Card.Title data-testid={"IngredientInput".concat(Props.inputIndex.toString())} className={"font-weight-bold"} style={{ textAlign: "center" }}>Ingredient {(Props.inputIndex).toString()}</Card.Title>
                    </Card.Header>
                    <Card.Body className="justify-content-center align-items-center">
                        <NameCheckInterface controlIDstring={controlIDstring} interfaceIndex={Props.inputIndex}
                            interfaceName={Props.name}
                            onIngredientIsValidCheck={Props.onIsValidCheck}
                            onIngredientNameChange={Props.onNameChange}
                            onIngredientResetName={Props.onResetName}
                            interfaceNamesDisabled={Props.inputDisabledNamesArray[Props.inputIndex - 1]}
                            isValid={Props.valid} nameSuggestionSelect={Props.onNameSuggestionSelect}
                            onMatch={Props.onOneNameMatch}
                        ></NameCheckInterface>
                    </Card.Body>
                    <Card.Footer className="justify-content-center align-items-center">
                        <Form.Row className="justify-content-center  align-items-center" >
                            <InputGroup>
                                <FormControl data-testid={"quantityInput"} className="shadow" key={quantityInputKey} onChange={Props.onQuantityChange} placeholder="Enter Quantity" />
                            </InputGroup>
                        </Form.Row>
                        <br />
                        <Form.Row className="justify-content-center  align-items-center" >
                            <DropdownButton variant="success" text="light" title={units.charAt(0).toUpperCase() + units.slice(1)} >
                                {weightUnits.map((unitName) =>
                                    <Dropdown.Item data-testid={unitName.toLowerCase()} key={'dropdownUnit'.concat(Props.inputIndex.toString(), '_', (weightUnits.indexOf(unitName)).toString())}
                                        eventKey={Props.inputIndex.toString().concat('_', weightUnits.indexOf(unitName).toString())}
                                        onSelect={Props.onUnitsChange}>{unitName.charAt(0).toUpperCase() + unitName.slice(1)}</Dropdown.Item>)}
                            </DropdownButton>
                        </Form.Row>
                        <br />
                        <Form.Row className="justify-content-center align-items-center" >
                        </Form.Row>
                    </Card.Footer>
                </Card>
                <br />
            </div>
        );
    }
};

export default IngredientInput;