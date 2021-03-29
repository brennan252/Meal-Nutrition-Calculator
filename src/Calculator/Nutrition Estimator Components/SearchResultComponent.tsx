// "SearchResultComponent.tsx"
// Search Result component rendered in NameCheckInterface.tsx 
// on mounting calls get(/names/).
// If one match is returned, add the ID and name and unmount the component.
// Otherwise, show multiple match display or no match display based on the match count

import * as React from 'react';
import { get } from 'jquery';
import { Alert, Button, Spinner, Dropdown, DropdownButton, Form } from 'react-bootstrap';

type Props = {
    name: string;
    index: number;

    onResetName: any;
    onSuggestionSelect: any;
    onSuccessSuggestion: any;
};


const SearchResultComponent = (Props: Props) => {
    const [noMatch, setNoMatch] = React.useState(false);
    const [multipleMatch, setMultipleMatch] = React.useState(false);
    const [matchCount, setMatchCount] = React.useState(0 as number);
    
    const [matchNames, setMatchNames] = React.useState([]);
    const [matchIDs, setMatchIDs] = React.useState([] as Array<number>);
    const [isLoading, setIsLoading] = React.useState(true);


    React.useEffect(() => {
        if (Props.name) {
            const urlString = "http://localhost:1337/names/".concat(Props.name);

            get(urlString)
                .then((result) => {
                    setMatchCount(result.matchCount);
                    setMatchNames(result.nameMatches);
                    setMatchIDs(result.idMatches);

                    let newMultipleMatch = false;
                    let newNoMatch = false;

                    // Multiple Matches
                    if (result.matchCount > 1) {
                        newMultipleMatch = true;
                    }

                    // One Match -> exit SearchResultComponent
                    if (result.matchCount === 1) {
                        Props.onSuccessSuggestion(Props.index, result.nameMatches[0], result.idMatches[0]);
                    }

                    // Zero Matches
                    if (result.matchCount === 0) {
                        newNoMatch = true;
                    };

                    setMultipleMatch(newMultipleMatch);
                    setNoMatch(newNoMatch);
                })
                .then(() => {
                    setIsLoading(false);
                });
        }
    }, []);

    
    if (isLoading) {
        return (
            <div>
                <Form.Row className="justify-content-center" >
                    <Spinner animation="border" variant="primary" />
                </Form.Row>
                <Form.Row className="justify-content-center" >
                    <Button data-testid={"LoadingButton"} onClick={Props.onResetName} variant="danger">Cancel</Button>
                </Form.Row>
            </div>)
    } else if (noMatch) {
        return (
            <div>
                <Form.Row className="justify-content-center align-items-center" >
                    <Alert data-testid={"NoNamesMatch"}   variant="danger">No Matches Found for {Props.name} </Alert>
                </Form.Row>
                <Form.Row className="justify-content-center align-items-center" >
                    <Button data-testid={"NoNamesMatchButton"}   onClick={Props.onResetName} variant="danger">Reset</Button>
                </Form.Row>
            </div>) 
    } else if (multipleMatch) {
        return (
            <div>
                <Form.Row className="justify-content-center align-items-center" >
                    <Alert variant="info">Multiple Matches Found for {Props.name} </Alert>
                </Form.Row>
                <Form.Row className="justify-content-center align-items-center">
                    <DropdownButton variant="secondary" text="light" title="Select A Name" >
                        {matchNames.map((name) =>
                            <Dropdown.Item key={Props.index.toString().concat('_', name)}
                                eventKey={Props.index.toString().concat('_', name, '_', matchIDs[matchNames.indexOf(name)].toString())}
                                onSelect={Props.onSuggestionSelect}>{name}</Dropdown.Item>)}
                    </DropdownButton>
                </Form.Row>
                <br />
                <Form.Row className="justify-content-center align-items-center" >
                    <Button data-testid={"ResetMultipleMatch"}onClick={Props.onResetName} variant="danger">Reset</Button>
                </Form.Row>
            </div>)
    } else {
        return (
            <div>
                <Form.Row className="justify-content-center align-items-center" >
                    <Alert data-testid={"OneNameMatch"}  variant="danger">Something Went Wrong... Refresh Page.</Alert>
                </Form.Row>
            </div>)
    }
};

export default SearchResultComponent;