// import "jest";
// search_result_component.test.js

import React from 'react';
import ReactDOM from 'react-dom';
import jQuery from 'jquery';
import { act } from 'react-dom/test-utils';


import SearchResultComponent from './../../src/Calculator/Nutrition Estimator Components/SearchResultComponent';


// Mock Module
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
            <button data-testid={"Select".concat(props.eventKey)} onClick={props.onSelect}>{props.eventKey}</button >
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
it("Search Result Component handles reset click while loading", async () => {
    // Mock Functions

    const reset = jest.fn();
    const select = jest.fn();
    const success = jest.fn();

    const fakeResolve = {
        matchCount: 1,
        idMatches: [980],
        nameMatches: ['burnt chair']
    };

    // Simulate permament loading state
    jest.spyOn(jQuery, "get").mockImplementation(
        () => {
            return Promise.resolve({
                 then: () => {  fakeResolve }
            })
        });

    await act(async () => {
        ReactDOM.render(<SearchResultComponent
            name={"chair"}
            index={1}
            onResetName={reset}
            onSuggestionSelect={select}
            onSuccessSuggestion={success}
        ></SearchResultComponent>, container);
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



// Tests
it("Search Result Component correctly recognizes and processes accordingly when only one name matched on GET(name) call", async () => {
    // Mock Functions

    const reset = jest.fn();
    const select = jest.fn();
    const success = jest.fn();

    const fakeResolve = {
        matchCount: 1,
        idMatches: [980],
        nameMatches: ['burnt chair']
    };

    jest.spyOn(jQuery, "get").mockImplementation(
        () => {
            return Promise.resolve(fakeResolve)
        });

    await act(async () => {
        ReactDOM.render(<SearchResultComponent
            name={"chair"}
            index={1}
            onReset={reset}
            onSuggestionSelect={select}
            onSuccessSuggestion={success}
        ></SearchResultComponent>, container);
    });

   
    expect(container.querySelector("[data-testid='OneNameMatch']")).toBeDefined();
    expect(success).toHaveBeenCalledTimes(1);

    // remove the mock to ensure tests are completely isolated
    jQuery.get.mockRestore();
});

// Tests
it("Search Result Component correctly recognizes and processes accordingly when 0 names matched on GET(name) call", async () => {
    // Mock Functions

    const reset = jest.fn();
    const select = jest.fn();
    const success = jest.fn();

    const fakeResolve = {
        matchCount: 0,
        idMatches: [],
        nameMatches: []
    };

    jest.spyOn(jQuery, "get").mockImplementation(
        () => {
            return Promise.resolve(fakeResolve)
        });

    await act(async () => {
        ReactDOM.render(<SearchResultComponent
            name={"chair"}
            index={1}
            onResetName={reset}
            onSuggestionSelect={select}
            onSuccessSuggestion={success}
        ></SearchResultComponent>, container);
    });


    // Test Reset button
    await act(async () => {
        const resetButton = document.querySelector("[data-testid='NoNamesMatchButton']");
        resetButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });
    

    expect(container.querySelector("[data-testid='NoNamesMatch']")).toBeDefined();
    expect(reset).toHaveBeenCalledTimes(1);
    // remove the mock to ensure tests are completely isolated
    jQuery.get.mockRestore();
});


// Tests
it("Search Result Component correctly recognizes and processes accordingly when multiple names matched on GET(name) call", async () => {
    // Mock Functions

    const reset = jest.fn();
    const select = jest.fn();
    const success = jest.fn();

    const fakeResolve = {
        matchCount: 5,
        idMatches: [102,190,490,1099,4000],
        nameMatches: ['fried egg','boiled egg', 'scrambled egg', 'poached egg', 'raw egg']
    };

    jest.spyOn(jQuery, "get").mockImplementation(
        () => {
            return Promise.resolve(fakeResolve)
        });

    await act(async () => {
        ReactDOM.render(<SearchResultComponent
            name={"egg"}
            index={1}
            onResetName={reset}
            onSuggestionSelect={select}
            onSuccessSuggestion={success}
        ></SearchResultComponent>, container);
    });


    // Test Reset button
    await act(async () => {
        const resetButton = document.querySelector("[data-testid='ResetMultipleMatch']");
        resetButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));

        const selectButton1 = document.querySelector("[data-testid='Select1_fried egg_102']");
        selectButton1.dispatchEvent(new MouseEvent("click", { bubbles: true }));

        const selectButton2 = document.querySelector("[data-testid='Select1_boiled egg_190']");
        selectButton2.dispatchEvent(new MouseEvent("click", { bubbles: true }));

        const selectButton3 = document.querySelector("[data-testid='Select1_scrambled egg_490']");
        selectButton3.dispatchEvent(new MouseEvent("click", { bubbles: true }));

        const selectButton4 = document.querySelector("[data-testid='Select1_poached egg_1099']");
        selectButton4.dispatchEvent(new MouseEvent("click", { bubbles: true }));

        const selectButton5 = document.querySelector("[data-testid='Select1_raw egg_4000']");
        selectButton5.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(reset).toHaveBeenCalledTimes(1);
    expect(select).toHaveBeenCalledTimes(5);
    // remove the mock to ensure tests are completely isolated
    jQuery.get.mockRestore();
});



// test multiple matches

// test one match