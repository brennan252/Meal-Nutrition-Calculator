// import "jest";
// name_check_interface.test.js

import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import NameCheckInterface from './../../src/Calculator/Nutrition Estimator Components/NameCheckInterface';

// Mocked Modules

jest.mock("./../../src/Calculator/Nutrition Estimator Components/SearchResultComponent", () => {
    return function DummySearchResultComponent(Props) {
        return (
            <div>
                <h4 data-testid="name">name: {Props.name}</h4>
                <h4 data-testid="index">index: {Props.index}</h4>

                <button onClick={Props.onResetName} data-testid="onReset"></button>
                <button onClick={Props.onSuggestionSelect} data-testid="onSelect"></button>
                <button onClick={Props.onSuccessSuggestion} data-testid="onSuccess"></button>
            </div>
        );
    }
});


jest.mock("react-bootstrap/FormControl", () => {
    return function DummyFormControl(props) {

        return (
            <button data-testid={"nameInput"} onClick={props.onChange}></button>
        );
    }
});

// CLean up and Setup

let container = null;

beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
});

afterEach(() => {
    // cleanup on exiting
    ReactDOM.unmountComponentAtNode(container);
    container.remove();
    container = null;
});


// Tests
it("Name Check Interface intial renders successfully", () => {
    // Mock Functions
    const onMatch = jest.fn();
    const nameSuggestionSelect = jest.fn();
    const onIngredientNameChange = jest.fn();
    const onIngredientIsValidCheck = jest.fn();
    const onIngredientResetName = jest.fn();


    act(() => {
        ReactDOM.render(<NameCheckInterface
            interfaceNamesDisabled={false}
            interfaceName={"brocolli"}
            interfaceIndex={1}
            isValid={false}
            controlIDstring={"testcontrolID"}
            onMatch={onMatch}
            nameSuggestionSelect={nameSuggestionSelect}
            onIngredientNameChange={onIngredientNameChange}
            onIngredientIsValidCheck={onIngredientIsValidCheck}
            onIngredientResetName={onIngredientResetName}
        ></NameCheckInterface>, container);
    });

    expect(container.querySelector("[data-testid='NameCheckInterface']")).toBeTruthy;
    expect(container).toBeDefined();
});


it("SearchResultComponent renders and passes props", () => {
    // Mock Functions
    const onMatch = jest.fn();
    const nameSuggestionSelect = jest.fn();
    const onIngredientNameChange = jest.fn();
    const onIngredientIsValidCheck = jest.fn();
    const onIngredientResetName = jest.fn();


    act(() => {
        ReactDOM.render(<NameCheckInterface
            interfaceNamesDisabled={true}
            interfaceName={"brocollini"}
            interfaceIndex={1}
            isValid={false}
            controlIDstring={"testcontrolID"}
            onMatch={onMatch}
            nameSuggestionSelect={nameSuggestionSelect}
            onIngredientNameChange={onIngredientNameChange}
            onIngredientIsValidCheck={onIngredientIsValidCheck}
            onIngredientResetName={onIngredientResetName}
        ></NameCheckInterface>, container);
    });

    // simulate Ingredient Input component function calls
    const onResetButton = document.querySelector("[data-testid='onReset']");
    const onSelectButton = document.querySelector("[data-testid='onSelect']");
    const onSuccessButton = document.querySelector("[data-testid='onSuccess']");

    act(() => {
        onResetButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onSelectButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onSuccessButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // make expect calls on passed variables and function call counts

    // functions
    expect(onIngredientResetName).toHaveBeenCalledTimes(1);
    expect(onMatch).toHaveBeenCalledTimes(1);
    expect(nameSuggestionSelect).toHaveBeenCalledTimes(1);

    // variables
    expect(container.querySelector("[data-testid='name']").textContent).toBe("name: brocollini");
    expect(container.querySelector("[data-testid='index']").textContent).toBe("index: 1");
});


it("Render Input Enabled view and passes props", () => {
    // Mock Functions
    const onMatch = jest.fn();
    const nameSuggestionSelect = jest.fn();
    const onIngredientNameChange = jest.fn();
    const onIngredientIsValidCheck = jest.fn();
    const onIngredientResetName = jest.fn();


    act(() => {
        ReactDOM.render(<NameCheckInterface
            interfaceNamesDisabled={false}
            interfaceName={"brocollini"}
            interfaceIndex={1}
            isValid={false}
            controlIDstring={"testcontrolID"}
            onMatch={onMatch}
            nameSuggestionSelect={nameSuggestionSelect}
            onIngredientNameChange={onIngredientNameChange}
            onIngredientIsValidCheck={onIngredientIsValidCheck}
            onIngredientResetName={onIngredientResetName}
        ></NameCheckInterface>, container);
    });

    

    // simulate Ingredient Input component function calls
    const onNameChangeButton = document.querySelector("[data-testid='nameInput']");
    const onCheckButton = document.querySelector("[data-testid='isValidCheck']");

    act(() => {
        onNameChangeButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onCheckButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // make expect calls on passed variables and function call counts

    // functions
    expect(onIngredientNameChange).toHaveBeenCalledTimes(1);
    expect(onIngredientIsValidCheck).toHaveBeenCalledTimes(1);

});


it("Renders NameCheck success View and passes props", () => {
    // Mock Functions
    const onMatch = jest.fn();
    const nameSuggestionSelect = jest.fn();
    const onIngredientNameChange = jest.fn();
    const onIngredientIsValidCheck = jest.fn();
    const onIngredientResetName = jest.fn();


    act(() => {
        ReactDOM.render(<NameCheckInterface
            interfaceNamesDisabled={true}
            interfaceName={"brocollini"}
            interfaceIndex={1}
            isValid={true}
            controlIDstring={"testcontrolID"}
            onMatch={onMatch}
            nameSuggestionSelect={nameSuggestionSelect}
            onIngredientNameChange={onIngredientNameChange}
            onIngredientIsValidCheck={onIngredientIsValidCheck}
            onIngredientResetName={onIngredientResetName}
        ></NameCheckInterface>, container);
    });

    // simulate Ingredient Input component function calls
    const onResetButton = document.querySelector("[data-testid='resetName']");

    act(() => {
        onResetButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // make expect calls on passed variables and function call counts

    // functions
    expect(onIngredientResetName).toHaveBeenCalledTimes(1);
    expect(container.querySelector("[data-testid='foundName']"));
});
