import * as React from 'react';
import * as ReactDOM from 'react-dom';
import "../style.scss";
import { Container, Navbar, Spinner } from 'react-bootstrap';
import { Suspense } from 'react';
const Calculator = React.lazy(() => import('./Calculator/Calculator'));




function App() {
    return (
        <Container fluid="true" className="bgColor">
            <Navbar className="navbarBg" fluid="true">
                <Container className="m-0">
                    <Navbar.Brand className="m-0">
                    </Navbar.Brand>
                </Container>
            </Navbar>
            <Suspense fallback=
                {<Container fluid className="justify-content-center">
                    <Spinner variant="success" />
                </Container>}>
                <Calculator initialShowResult={false} initialShowError={false} />
            </Suspense>

        </Container>
    );
}


ReactDOM.render(
    <App />,
    document.getElementById('root'));