import { Offcanvas, Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import { CartItem } from "./CartItem";

type ShoppingCartProps = {
    isOpen: boolean;
};

export function ShoppingCart({ isOpen }: ShoppingCartProps) {
    const { closeCart, cartItems } = useShoppingCart();

    //bootstrap offcanvas component (slide effect)
    return (
        <Offcanvas show={isOpen} onHide={closeCart} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Shopping Cart</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
                <Stack gap={3}>
                    {
                        cartItems.map((item) => (
                            <CartItem key={item.id} {...item} />
                        )) //map through cartItems and return CardItem component for each item
                    }
                </Stack>
            </Offcanvas.Body>
        </Offcanvas>
    );
}
