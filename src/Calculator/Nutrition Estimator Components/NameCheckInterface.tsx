// "NameCheckInterface.tsx"
// NameCheckInterface component rendered in IngredientInput.tsx 
// Renders the name with input enabled until checked. 
// During checking, mounts Search Result Component.
// If a name in Search Result Component is selected, 
// disabled input and shows success.

import * as React from 'react';
import { SearchResultComponent } from './SearchResultComponent';
import { Alert, FormControl, Button,  Form, InputGroup } from 'react-bootstrap';

type Props = {
    interfaceNamesDisabled: boolean;
    interfaceName: string;
    interfaceIndex: number;
    isValid: boolean;

    onMatch: any;
    nameSuggestionSelect: any;
    onIngredientNameChange: any;
    onIngredientIsValidCheck: any;
    onIngredientResetName: any;
};

export const NameCheckInterface = (Props: Props) => {
    let inputEnabled = true;
    let showSuccess = false;
    let showSearchResult = false;
    
    // Fix Logic For double display issues
    if (Props.interfaceNamesDisabled) {
        inputEnabled = false;

        if (Props.isValid) {
            showSuccess = true;
        } else {
            showSearchResult = true;
        }
    };

    return (
        <div>
            {inputEnabled &&
                <InputGroup className="justify-content-center">
                <FormControl className="" onChange={Props.onIngredientNameChange} placeholder="Enter Food Name" />
                <InputGroup.Append>
                    <Button onClick={Props.onIngredientIsValidCheck} className="" variant="success" text="light">Check</Button>
                </InputGroup.Append>
                </InputGroup>}

            {showSuccess &&
                <Form.Row className="justify-content-center">
                    <Alert variant="success">Ingredient Found</Alert>
                </Form.Row>}
            {showSuccess &&
                <InputGroup className="justify-content-center">
                    <FormControl  type="text" placeholder={Props.interfaceName} readOnly/>
                    <InputGroup.Append>
                        <Button onClick={Props.onIngredientResetName} variant="danger">Reset</Button>
                    </InputGroup.Append>
                </InputGroup>}

            {showSearchResult &&
                <SearchResultComponent
                name={Props.interfaceName}
                index={Props.interfaceIndex}
                onResetName={Props.onIngredientResetName}
                onSuggestionSelect={Props.nameSuggestionSelect}
                onSuccessSuggestion={Props.onMatch}
                ></SearchResultComponent>}
        </div>
    )
};

/*


*/