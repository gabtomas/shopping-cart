import { Offcanvas } from "react-bootstrap";

export function ShoppingCart() {
    //bootstrap offcanvas component (slide effect)
    return (
        <Offcanvas show={true}>
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>
        </Offcanvas>
    );
}
