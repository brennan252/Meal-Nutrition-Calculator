// import "jest";
// error_modal.test.js

import React from 'react';
import ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import ErrorModal from './../../src/Calculator/Nutrition Estimator Components/ErrorModal';


// Mock Module
jest.mock("react-bootstrap/Modal", () => {
    return function DummyModal(props) {
        return (
            <div>
                <button data-testid={"ErrorModalButton"} onClick={props.onHide}>hide: {props.show.toString()}</button>
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
it("Error Modal renders successfully and props are passed ", () => {
    // Mock Functions
    const onCloseModal = jest.fn();

    act(() => {
        ReactDOM.render(<ErrorModal
            onClose={onCloseModal}
            isError={true}
        ></ErrorModal>, container);
    });


    // Check function onClose Call
    const exitFunctionButton = document.querySelector("[data-testid='ErrorModalButton']");
    act(() => {
        exitFunctionButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
        exitFunctionButton.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    });

    expect(onCloseModal).toHaveBeenCalledTimes(2);

    // check variable isError
    expect(container.querySelector("[data-testid='ErrorModalButton']").textContent).toBe("hide: true");

});