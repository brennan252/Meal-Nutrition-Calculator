import "jest";
// 
import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import Calculator from '../src/Calculator/Calculator';

// Mock Children Components

import MockedErrorModal from '../src/Calculator/Nutrition Estimator Components/ErrorModal';
import MockedNutritionResults from '../src/Calculator/Nutrition Result Components/NutritionResults';


jest.mock("../src/Calculator/Nutrition Estimator Components/ErrorModal", () => {
    return function DummyErrorModal(props) {
        if (props.isError) {
            return (
                <div data-testid="SubmissionErrorModal"  >
                    <h1 data-testid="SubmissionErrorModalTitle">Error Occurred</h1>
                    <button data-testid="SubmissionErrorModalButton" onClick={props.onClose}></button>
                </div>
            );
        } else {
            return <h1>No Error</h1>;
        };
    };
});

jest.mock("../src/Calculator/Nutrition Result Components/NutritionResults", () => {
    return function DummyNutritionResults(props) {
        return (
            <div data-testid="NutritionResults">
                <h1 data-testid="NutritionResultsTitle">Nutrition Results! {props.units[0]}</h1>
            </div>
        );
    };
});

// Set-up and Clean Up

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

it("Calculator Shows Result", () => {

    act(() => {
        ReactDOM.render(<Calculator  initialShowResult={true} initialShowError={false} />, container);
    });

    expect(container.querySelector("[data-testid='NutritionResultsTitle']")).toBeTruthy();
    expect(container.querySelector("[data-testid='NutritionEstimator']")).toBeNull();
    expect(container.querySelector("[data-testid='SubmissionErrorModalButton']")).toBeNull();
});


it("Calculator Component Renders To Nutrition Estimator View", () => {

    act(() => {
        ReactDOM.render(<Calculator initialShowError={false} initialShowResult={false} />, container);
    });

    expect(container.querySelector("[data-testid='NutritionEstimator']")).toBeTruthy();
    expect(container.querySelector("[data-testid='NutritionResultsTitle']")).toBeNull();
    expect(container.querySelector("[data-testid='SubmissionErrorModalButton']")).toBeNull();
});



it("Calculator Shows Error", () => {

    act(() => {
        ReactDOM.render(<Calculator initialShowError={true} initialShowResult={false} />, container);
    });

    expect(container.querySelector("[data-testid='SubmissionErrorModalButton']")).toBeTruthy();
    expect(container.querySelector("[data-testid='NutritionEstimator']")).toBeTruthy();
    expect(container.querySelector("[data-testid='NutritionResultsTitle']")).toBeNull();
});

