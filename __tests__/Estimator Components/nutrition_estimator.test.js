import "jest";
// nutrition_estimator.test.js

import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import NutritionEstimator from './../../src/Calculator/Nutrition Estimator Components/NutritionEstimator';

// Mocked Modules
import MockedIngredientInput from './../../src/Calculator/Nutrition Estimator Components/IngredientInput';


jest.mock("./../../src/Calculator/Nutrition Estimator Components/IngredientInput", () => {
    // props.key = "IngredientInput".concat(index)
    return function DummyIngredientInput(props) {
        const key = "IngredientInput".concat(props.inputIndex.toString());
        return (
            <div data-testid={key}>
                <h4 data-testid={key + ("Count")}>Count: {props.inputCount.toString()}</h4>
                <h4 data-testid={key + ("Index")}>Index: {props.inputIndex.toString()}</h4>
                <h4 data-testid={key + ("Name")}>Name: {props.name}</h4>
                <h4 data-testid={key + ("isValid")}>isValids: {props.valid.toString()}</h4>
                <h4 data-testid={key + ("Units")}>Units: {props.units}</h4>
                <h4 data-testid={key + ("Quantity")}>Quantity: {props.quantity.toString()}</h4> 
                
                <h4 data-testid={key + ("disabledNamesArray")}>disabled: {props.inputDisabledNamesArray.toString()}
                </h4>
                
                <button data-testid={key + ("onNameChange")} onClick={props.onNameChange}>Check Name Change callback </button>
                <button data-testid={key + ("onResetName")} onClick={props.onResetName}>Check Reset Name callback</button>
                <button data-testid={key + ("onIsValidCheck")} onClick={props.onIsValidCheck}>Check Valid Check callback</button>
                <button data-testid={key + ("onQuantityChange")} onClick={props.onQuantityChange}>Check Quantity change callback</button>
                <button data-testid={key + ("onUnitsChange")} onClick={props.onUnitsChange}>Check Units Change callback</button>
                <button data-testid={key + ("onNameSuggestionSelect")} onClick={props.onNameSuggestionSelect}>Check Name Suggestion Selection callback</button>
                <button data-testid={key + ("onDelete")} onClick={props.onRemoveIngredient}>Check remove ingredient callback</button>
                <button data-testid={key + ("onOneNameMatch")} onClick={props.onOneNameMatch}>Check one name Match callback</button>
            </div>
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

const dummyFunction = function () { };


// Tests
it("Nutrition Estimator Renders Initially To Nutrition Estimator View", () => {
    // Mock Functions

    const onDelete = jest.fn();
    const onAdd = jest.fn();
    const onMealSubmit = jest.fn();
    const onCheck = jest.fn();
    const onSuggestionSelect = jest.fn();
    const onFound = jest.fn();
    const onNameChange = jest.fn();
    const onUnitsChange = jest.fn();
    const onQuantityChange = jest.fn();
    const onResetName = jest.fn();


    act(() => {

        ReactDOM.render(<NutritionEstimator
            count={1}
            indeces={[1]}
            names={[""]}
            isValids={[false]}
            units={["ounces"]}
            quantities={[NaN]}
            disabledNames={[false]}
            onDelete={onDelete}
            onAdd={onAdd}
            onMealSubmit={onMealSubmit}
            onCheck={onCheck}
            onSuggestionSelect={onSuggestionSelect}
            onFound={onFound}
            onNameChange={onNameChange}
            onUnitsChange={onUnitsChange}
            onQuantityChange={onQuantityChange}
            onResetName={onResetName}
        ></NutritionEstimator>, container);
    });

    expect(container).toBeDefined();
    expect(container.querySelector("[data-testid=EstimatorTitle]").textContent).toBe("Nutrition Calculator");
    expect(container.querySelector("[data-testid='NutritionEstimator']")).toBeTruthy();
});


it("Nutrition Estimator passes variables and functions to IngredientInput", () => {
    // Mock Functions

    const onDelete = jest.fn();
    const onAdd = jest.fn();
    const onMealSubmit = jest.fn();
    const onCheck = jest.fn();
    const onSuggestionSelect = jest.fn();
    const onFound = jest.fn();
    const onNameChange = jest.fn();
    const onUnitsChange = jest.fn();
    const onQuantityChange = jest.fn();
    const onResetName = jest.fn();

    act(() => {
        ReactDOM.render(<NutritionEstimator
            count={5}
            indeces={[1, 2, 3, 4, 5]}
            names={[" ", "lima beans", " ", "roasted beef", " "]}
            isValids={[false, true, false, true, false]}
            units={["ounces", "grams", "pounds", "grams", "pounds"]}
            quantities={[NaN, 72, NaN, 12, NaN]}
            disabledNames={[true, true, false, true, false]}
            onDelete={onDelete}
            onAdd={onAdd}
            onMealSubmit={onMealSubmit}
            onCheck={() => onCheck}
            onSuggestionSelect={onSuggestionSelect}
            onFound={onFound}
            onNameChange={() => onNameChange}
            onUnitsChange={onUnitsChange}
            onQuantityChange={() => onQuantityChange}
            onResetName={() => onResetName}
        ></NutritionEstimator>, container);
    });


    // simulate Ingredient Input component function calls
    const onDeleteButton = document.querySelector("[data-testid='IngredientInput1onDelete']");
    const onCheckButton = document.querySelector("[data-testid='IngredientInput1onIsValidCheck']");
    const onSuggestionSelectButton = document.querySelector("[data-testid='IngredientInput1onNameSuggestionSelect']");
    const onFoundButton = document.querySelector("[data-testid='IngredientInput1onOneNameMatch']");
    const onNameChangeButton = document.querySelector("[data-testid='IngredientInput1onNameChange']");
    const onUnitsChangeButton = document.querySelector("[data-testid='IngredientInput1onUnitsChange']");
    const onQuantityChangeButton = document.querySelector("[data-testid='IngredientInput1onQuantityChange']");
    const onResetNameButton = document.querySelector("[data-testid='IngredientInput1onResetName']");

    act(() => {
        onDeleteButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onCheckButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onSuggestionSelectButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onFoundButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onNameChangeButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onUnitsChangeButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onQuantityChangeButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onResetNameButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // make expect calls on passed variables and function call counts

    // functions
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onCheck).toHaveBeenCalledTimes(1);
    expect(onSuggestionSelect).toHaveBeenCalledTimes(1);
    expect(onFound).toHaveBeenCalledTimes(1);
    expect(onNameChange).toHaveBeenCalledTimes(1);
    expect(onUnitsChange).toHaveBeenCalledTimes(1);
    expect(onQuantityChange).toHaveBeenCalledTimes(1);
    expect(onResetName).toHaveBeenCalledTimes(1);

    // variables
    expect(container.querySelector("[data-testid='IngredientInput1Count']").textContent).toBe("Count: 5");
    expect(container.querySelector("[data-testid='IngredientInput2Count']").textContent).toBe("Count: 5");
    expect(container.querySelector("[data-testid='IngredientInput3Count']").textContent).toBe("Count: 5");
    expect(container.querySelector("[data-testid='IngredientInput4Count']").textContent).toBe("Count: 5");
    expect(container.querySelector("[data-testid='IngredientInput5Count']").textContent).toBe("Count: 5");

    expect(container.querySelector("[data-testid='IngredientInput1Index']").textContent).toBe("Index: 1");
    expect(container.querySelector("[data-testid='IngredientInput2Index']").textContent).toBe("Index: 2");
    expect(container.querySelector("[data-testid='IngredientInput3Index']").textContent).toBe("Index: 3");
    expect(container.querySelector("[data-testid='IngredientInput4Index']").textContent).toBe("Index: 4");
    expect(container.querySelector("[data-testid='IngredientInput5Index']").textContent).toBe("Index: 5");

    expect(container.querySelector("[data-testid='IngredientInput1Name']").textContent).toBe("Name:  ");
    expect(container.querySelector("[data-testid='IngredientInput2Name']").textContent).toBe("Name: lima beans");
    expect(container.querySelector("[data-testid='IngredientInput3Name']").textContent).toBe("Name:  ");
    expect(container.querySelector("[data-testid='IngredientInput4Name']").textContent).toBe("Name: roasted beef");
    expect(container.querySelector("[data-testid='IngredientInput5Name']").textContent).toBe("Name:  ");

    expect(container.querySelector("[data-testid='IngredientInput1Quantity']").textContent).toBe("Quantity: NaN");
    expect(container.querySelector("[data-testid='IngredientInput2Quantity']").textContent).toBe("Quantity: 72");
    expect(container.querySelector("[data-testid='IngredientInput3Quantity']").textContent).toBe("Quantity: NaN");
    expect(container.querySelector("[data-testid='IngredientInput4Quantity']").textContent).toBe("Quantity: 12");
    expect(container.querySelector("[data-testid='IngredientInput5Quantity']").textContent).toBe("Quantity: NaN");

    expect(container.querySelector("[data-testid='IngredientInput1isValid']").textContent).toBe("isValids: false");
    expect(container.querySelector("[data-testid='IngredientInput2isValid']").textContent).toBe("isValids: true");
    expect(container.querySelector("[data-testid='IngredientInput3isValid']").textContent).toBe("isValids: false");
    expect(container.querySelector("[data-testid='IngredientInput4isValid']").textContent).toBe("isValids: true");
    expect(container.querySelector("[data-testid='IngredientInput5isValid']").textContent).toBe("isValids: false");

    expect(container.querySelector("[data-testid='IngredientInput1Units']").textContent).toBe("Units: ounces");
    expect(container.querySelector("[data-testid='IngredientInput2Units']").textContent).toBe("Units: grams");
    expect(container.querySelector("[data-testid='IngredientInput3Units']").textContent).toBe("Units: pounds");
    expect(container.querySelector("[data-testid='IngredientInput4Units']").textContent).toBe("Units: grams");
    expect(container.querySelector("[data-testid='IngredientInput5Units']").textContent).toBe("Units: pounds");

    expect(container.querySelector("[data-testid='IngredientInput1disabledNamesArray']").textContent).toBe("disabled: true,true,false,true,false");           
    expect(container.querySelector("[data-testid='IngredientInput2disabledNamesArray']").textContent).toBe("disabled: true,true,false,true,false");           
    expect(container.querySelector("[data-testid='IngredientInput3disabledNamesArray']").textContent).toBe("disabled: true,true,false,true,false");           
    expect(container.querySelector("[data-testid='IngredientInput4disabledNamesArray']").textContent).toBe("disabled: true,true,false,true,false");           
    expect(container.querySelector("[data-testid='IngredientInput5disabledNamesArray']").textContent).toBe("disabled: true,true,false,true,false");           
    
});


it("Nutrition Estimator Registers Add Ingredient Button and Submit Button Click", () => {
    // Mock Functions

    const onDelete = jest.fn();
    const onAdd = jest.fn();
    const onMealSubmit = jest.fn();
    const onCheck = jest.fn();
    const onSuggestionSelect = jest.fn();
    const onFound = jest.fn();
    const onNameChange = jest.fn();
    const onUnitsChange = jest.fn();
    const onQuantityChange = jest.fn();
    const onResetName = jest.fn();

    act(() => {

        ReactDOM.render(<NutritionEstimator
            count={1}
            indeces={[1]}
            names={[""]}
            isValids={[false]}
            units={["ounces"]}
            quantities={[NaN]}
            disabledNames={[false]}
            onDelete={onDelete}
            onAdd={onAdd}
            onMealSubmit={onMealSubmit}
            onCheck={onCheck}
            onSuggestionSelect={onSuggestionSelect}
            onFound={onFound}
            onNameChange={onNameChange}
            onUnitsChange={onUnitsChange}
            onQuantityChange={onQuantityChange}
            onResetName={onResetName}
        ></NutritionEstimator>, container);
    });

    // simulate clicks
    const onAddButton = document.querySelector("[data-testid='onAddIngredient']");
    const onMealSubmitButton = document.querySelector("[data-testid='onSubmitMeal']");

    act(() => {
        onAddButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        onMealSubmitButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    // make expect call

    expect(onAdd).toHaveBeenCalledTimes(1);
    expect(onMealSubmit).toHaveBeenCalledTimes(1);
});
