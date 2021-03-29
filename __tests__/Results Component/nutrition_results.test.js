// import "jest";
// search_result_component.test.js

import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import { act } from 'react-dom/test-utils';


import NutritionResults from './../../src/Calculator/Nutrition Result Components/NutritionResults';

// Mock Modules
jest.mock("react-bootstrap/Row", () => {
    return function DummyRow(props) {
        return (
            <div>
                {props.children}
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


// Tests
it("Nutrition Result handles reset click while loading", async () => {
    // Mock Functions

    const reset = jest.fn();

    const fakeResolve = {
        retreivedNames: ['roasted broccoli', 'fried chicken', 'grilled beef', 'raw apple'],
        retreivedCarbs: [2, 3, 5, 4],
        retreivedFats: [2, 1, 5, 3],
        retreivedProteins: [2, 7, 3, 6],
        retreivedCalories: [200, 170, 195, 180],
    };

    // Simulate permament loading state
    jest.spyOn(jQuery, "get").mockImplementation(
        () => {
            return Promise.resolve({
                then: () => { fakeResolve }
            })
        });

    await act(async () => {
        ReactDOM.render(<NutritionResults
            indeces={[1,2,3,4]}
            names={['broccoli','chicken','beef','apple']}
            IDs={[209,109,399,98]} 
            quantities={[2,7,5,6]}
            units={['ounces','grams','ounces','pounds']}
            onReset={reset}
        ></NutritionResults>, container);
    });

    // Test Reset button
    await act(async () => {
        const resetButton = document.querySelector("[data-testid='LoadingButton']");
        resetButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });


    expect(reset).toHaveBeenCalledTimes(1);
    // remove the mock to ensure tests are completely isolated
    jQuery.get.mockRestore();
});

it("Nutrition Result handles reset on Error", async () => {
    // Mock Functions

    const reset = jest.fn();

    const fakeResolve = {
        retreivedNames: ['roasted broccoli', 'fried chicken', 'grilled beef'],
        retreivedCarbs: [2, 3, 5],
        retreivedFats: [2, 1, 3],
        retreivedProteins: [7, 3, 6],
        retreivedCalories: [200, 195, 180],
    };

    // Simulate permament loading state
    jest.spyOn(jQuery, "get").mockImplementation(
        () => {
            return Promise.resolve(fakeResolve)
        });


    await act(async () => {
        ReactDOM.render(<NutritionResults
            indeces={[1, 2, 3, 4]}
            names={['broccoli', 'chicken', 'beef', 'apple']}
            IDs={[209, 109, 399, 98]}
            quantities={[2, 7, 5, 6]}
            units={['ounces', 'grams', 'ounces', 'pounds']}
            onReset={reset}
        ></NutritionResults>, container);
    });

    // Test Reset button
    await act(async () => {
        const resetButton = document.querySelector("[data-testid='ErrorResetButton']");
        resetButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(reset).toHaveBeenCalledTimes(1);
    // remove the mock to ensure tests are completely isolated
    jQuery.get.mockRestore();
});


it("Nutrition Result handles reset and display correctly on result display ", async () => {
    // Mock Functions

    const reset = jest.fn();

    const fakeResolve = {
        retreivedNames: ['roasted broccoli', 'fried chicken', 'grilled beef', 'raw apple'],
        retreivedCarbs: [2, 3, 5, 4],
        retreivedFats: [2, 1, 5, 3],
        retreivedProteins: [2, 7, 3, 6],
        retreivedCalories: [200, 170, 195, 180],
    };

    // Simulate permament loading state
    jest.spyOn(jQuery, "get").mockImplementation(
        () => {
            return Promise.resolve(fakeResolve)
        });


    await act(async () => {
        ReactDOM.render(<NutritionResults
            indeces={[1, 2, 3, 4]}
            names={['broccoli', 'chicken', 'beef', 'apple']}
            IDs={[209, 109, 399, 98]}
            quantities={[2, 7, 5, 6]}
            units={['ounces', 'grams', 'ounces', 'pounds']}
            onReset={reset}
        ></NutritionResults>, container);
    });

    // Test Reset button
    await act(async () => {
        const resetButton = document.querySelector("[data-testid='ResultsResetButton']");
        resetButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(reset).toHaveBeenCalledTimes(1);

    expect(container.textContent).toBe(
        "Nutrition EstimatorIngredientWeight (100 g)Carbs (g)Proteins (g)Fats (g)Calories (kcal)roasted broccoli0.571.131.131.13113.40fried chicken0.070.210.490.0711.90grilled beef1.427.094.257.09276.41raw apple27.22108.86163.2981.654898.79Totals29.27117.29169.1789.945300.50Reset"
    );
    // remove the mock to ensure tests are completely isolated
    jQuery.get.mockRestore();
});
