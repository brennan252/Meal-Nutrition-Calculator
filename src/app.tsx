import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "../style.scss";
import { Container, Navbar, Spinner } from 'react-bootstrap';
import { Suspense } from 'react';
const Calculator = React.lazy(() => import('./Calculator/Calculator'));




function App() {
    return (
        <Container fluid="true" className="bg">
            <Navbar variant="dark" bg="dark" fluid="true">
                <Container className="m-0">
                    <Navbar.Brand className="m-0">
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Suspense fallback=
                {<Container fluid className="justify-content-center">
                    <Spinner variant="success" />
                </Container>}>
                <Calculator/>
            </Suspense>

            <Container fluid="true" className="container_footer">
            </Container>
        </Container>
    );
};


ReactDOM.render(
    <App />,
    document.getElementById('root'));