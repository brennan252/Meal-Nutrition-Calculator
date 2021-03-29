// import "jest";
// ingredient_estimator.test.js

import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import IngredientInput from './../../src/Calculator/Nutrition Estimator Components/IngredientInput';
import { weightUnits } from './../../src/Calculator/data';

// Mocked Modules

jest.mock("./../../src/Calculator/Nutrition Estimator Components/NameCheckInterface", () => {
    return function DummyNameCheckInterface(props) {
        const key = "NameCheckInterface".concat(props.interfaceIndex.toString());
        return (
            <div data-testid={key}>
                <h4 data-testid={key + ("Index")}>Index: {props.interfaceIndex.toString()}</h4>
                <h4 data-testid={key + ("Name")}>Name: {props.interfaceName}</h4>
                <h4 data-testid={key + ("isValid")}>isValids: {props.isValid.toString()}</h4>
                <h4 data-testid={key + ("isDisabledName")}>disabled: {props.interfaceNamesDisabled.toString()}</h4>

                <button data-testid={key + ("onIngredientNameChange")} onClick={props.onIngredientNameChange}>Check Name Change callback </button>
                <button data-testid={key + ("onIngredientResetName")} onClick={props.onIngredientResetName}>Check Reset Name callback</button>
                <button data-testid={key + ("onIngredientIsValidCheck")} onClick={props.onIngredientIsValidCheck}>Check Valid Check callback</button>
                <button data-testid={key + ("onNameSuggestionSelect")} onClick={props.nameSuggestionSelect}>Check Name Suggestion Selection callback</button>
                <button data-testid={key + ("onMatch")} onClick={props.onMatch}>Check one name Match callback</button>
            </div>
        );
    }
});

jest.mock("react-bootstrap/DropdownButton", () => {
    return function DummyDropdownButton(props) {

        return (
            <div>
                <button data-testid={"DropdownButton"}>{props.title}</button >
                {props.children}
            </div>
        );
    }
});

jest.mock("react-bootstrap/DropdownItem", () => {
    return function DummyDropdownItem(props) {

        return (
            <button data-testid={"DropdownItem".concat(props.eventKey)} onClick={ props.onSelect }></button >
        );
    }
});

jest.mock("react-bootstrap/FormControl", () => {
    return function DummyFormControl(props) {

        return (
            <button data-testid={"quantityInput"} onClick={props.onChange}></button>
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

it("Ingredient Input intial renders successfully", () => {
    // Mock Functions

    const onDelete = jest.fn();
    const onCheck = jest.fn();
    const onSuggestionSelect = jest.fn();
    const onFound = jest.fn();
    const onNameChange = jest.fn();
    const onUnitsChange = jest.fn();
    const onQuantityChange = jest.fn();
    const onResetName = jest.fn();

    act(() => {
        ReactDOM.render(<IngredientInput
            inputIndex={1}
            name={" "}
            inputCount={1}
            valid={false}
            units={"ounces"}
            quantity={NaN}
            inputDisabledNamesArray={[false]}
            onNameChange={() => onNameChange}
            onResetName={() => onResetName}
            onIsValidCheck={() => onCheck}
            onQuantityChange={() => onQuantityChange}
            onUnitsChange={onUnitsChange}
            onNameSuggestionSelect={onSuggestionSelect}
            onRemoveIngredient={onDelete}
            onOneNameMatch={onFound}
        ></IngredientInput>, container);
    });

    expect(container).toBeDefined();
    expect(container.querySelector("[data-testid='IngredientInput1']")).toBeTruthy();
});


// TODO 
it("Ingredient Input passes variables and functions to Name Check Interface", () => {
    // Mock Functions

    const onDelete = jest.fn();
    const onCheck = jest.fn();
    const onSuggestionSelect = jest.fn();
    const onFound = jest.fn();
    const onNameChange = jest.fn();
    const onUnitsChange = jest.fn();
    const onQuantityChange = jest.fn();
    const onResetName = jest.fn();

    act(() => {
        ReactDOM.render(<IngredientInput
            inputIndex={1}
            name={"broccoli"}
            inputCount={1}
            valid={false}
            units={"ounces"}
            quantity={NaN}
            inputDisabledNamesArray={[false]}
            onNameChange={onNameChange}
            onResetName={onResetName}
            onIsValidCheck={onCheck}
            onQuantityChange={onQuantityChange}
            onUnitsChange={onUnitsChange}
            onNameSuggestionSelect={onSuggestionSelect}
            onRemoveIngredient={onDelete}
            onOneNameMatch={onFound}
        ></IngredientInput>, container);
    });


    // simulate Ingredient Input component function calls
    const onCheckButton = document.querySelector("[data-testid='NameCheckInterface1onIngredientIsValidCheck']");
    const onSuggestionSelectButton = document.querySelector("[data-testid='NameCheckInterface1onNameSuggestionSelect']");
    const onFoundButton = document.querySelector("[data-testid='NameCheckInterface1onMatch']");
    const onNameChangeButton = document.querySelector("[data-testid='NameCheckInterface1onIngredientNameChange']");
    const onResetNameButton = document.querySelector("[data-testid='NameCheckInterface1onIngredientResetName']");

    act(() => {
        onCheckButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onSuggestionSelectButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onFoundButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onNameChangeButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onResetNameButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // make expect calls on passed variables and function call counts

    // functions
    expect(onCheck).toHaveBeenCalledTimes(1);
    expect(onSuggestionSelect).toHaveBeenCalledTimes(1);
    expect(onFound).toHaveBeenCalledTimes(1);
    expect(onNameChange).toHaveBeenCalledTimes(1);
    expect(onResetName).toHaveBeenCalledTimes(1);

    // variables
    expect(container.querySelector("[data-testid='NameCheckInterface1Index']").textContent).toBe("Index: 1");
    expect(container.querySelector("[data-testid='NameCheckInterface1Name']").textContent).toBe("Name: broccoli");
    expect(container.querySelector("[data-testid='NameCheckInterface1isValid']").textContent).toBe("isValids: false");
    expect(container.querySelector("[data-testid='NameCheckInterface1isDisabledName']").textContent).toBe("disabled: false");
});


it("Nutrition Estimator Registers Remove button and units dropdown Button Click", () => {
    // Mock Functions
    const onDelete = jest.fn();
    const onCheck = jest.fn();
    const onSuggestionSelect = jest.fn();
    const onFound = jest.fn();
    const onNameChange = jest.fn();
    const onUnitsChange = jest.fn();
    const onQuantityChange = jest.fn();
    const onResetName = jest.fn();

    act(() => {
        ReactDOM.render(<IngredientInput
            inputIndex={2}
            name={"broccoli"}
            inputCount={2}
            valid={false}
            units={"ounces"}
            quantity={NaN}
            inputDisabledNamesArray={[false, false]}
            onNameChange={onNameChange}
            onResetName={onResetName}
            onIsValidCheck={onCheck}
            onQuantityChange={onQuantityChange}
            onUnitsChange={onUnitsChange}
            onNameSuggestionSelect={onSuggestionSelect}
            onRemoveIngredient={onDelete}
            onOneNameMatch={onFound}
        ></IngredientInput>, container);
    });


    // simulate clicks
    
    const onClickGramsButton = document.querySelector("[data-testid='DropdownItem2_0']");
    const onClickOuncesButton = document.querySelector("[data-testid='DropdownItem2_1']");
    const onClickPoundsButton = document.querySelector("[data-testid='DropdownItem2_2']");
    const onQuantityInput = document.querySelector("[data-testid='quantityInput']");
    const onRemoveButton = document.querySelector("[data-testid='onRemove']");

    act(() => {
        onClickGramsButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onClickOuncesButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onClickPoundsButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onRemoveButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onQuantityInput.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // make expect call
    expect(onUnitsChange).toHaveBeenCalledTimes(3);
    expect(onQuantityChange).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledTimes(1);
});

it("Ingredient Input Does not render remove button when there is only one ingredient", () => {
    // Mock Functions
    const onDelete = jest.fn();
    const onCheck = jest.fn();
    const onSuggestionSelect = jest.fn();
    const onFound = jest.fn();
    const onNameChange = jest.fn();
    const onUnitsChange = jest.fn();
    const onQuantityChange = jest.fn();
    const onResetName = jest.fn();

    act(() => {
        ReactDOM.render(<IngredientInput
            inputIndex={1}
            name={"broccoli"}
            inputCount={1}
            valid={false}
            units={"ounces"}
            quantity={NaN}
            inputDisabledNamesArray={[false]}
            onNameChange={onNameChange}
            onResetName={onResetName}
            onIsValidCheck={onCheck}
            onQuantityChange={onQuantityChange}
            onUnitsChange={onUnitsChange}
            onNameSuggestionSelect={onSuggestionSelect}
            onRemoveIngredient={onDelete}
            onOneNameMatch={onFound}
        ></IngredientInput>, container);
    });

    expect(container.querySelector("[data-testid='onRemove']")).toBeNull();
});
