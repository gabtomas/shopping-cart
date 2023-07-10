import { Stack } from "react-bootstrap";
import { useShoppingCart } from "../context/ShoppingCartContext";
import storeItems from "../data/items.json";
import { formatCurrency } from "../utilities/formatCurrency";

type CartItemProps = {
    id: number;
    quantity: number;
};

export function CartItem({ id, quantity }: CartItemProps) {
    const { removeItemFromCart } = useShoppingCart();

    //find item in storeItems array that matches id
    const item = storeItems.find((item) => item.id === id);

    //if item is not found, return null
    if (item == null) {
        return null;
    }

    return (
        <Stack
            direction="horizontal"
            gap={2}
            className="f-flex align-items-center"
        >
            <img
                src={item.imgUrl}
                style={{ width: "125px", height: "75px", objectFit: "cover" }}
            />
            <div className="me-auto">
                {/*div for quantity */}
                <div>
                    {/* if quatity > 1 then show how many times in cart, else not */}
                    {item.name}{" "}
                    {quantity > 1 && (
                        <span
                            className="text-muted"
                            style={{ fontSize: ".65rem" }}
                        >
                            x{quantity}
                        </span>
                    )}
                </div>

                <div>{formatCurrency(item.price)}</div>
            </div>
        </Stack>
    );
}
