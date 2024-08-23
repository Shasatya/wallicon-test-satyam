import "./UserProfile.css";
import Nav from "../Nav/Nav";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
} from "../../redux/user/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeItemFromCart, clearCart } from "../../redux/cart/cartSlice";
import { useEffect, useState } from "react";

const UserProfile = () => {
  const [cart, setCart] = useState();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userId = currentUser._id;

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await fetch(`/api/auth/getFromCart/${userId}`);
        if (response.ok) {
          const data = await response.json();
          setCart(data.cart);
        } else {
          console.error("Cart maybe empty");
        }
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    };

    fetchCart();
  }, [cart, userId]);

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };
  const handleClick = () => {
    navigate("/itemsPage");
  };

  const handleRemoveItem = async (item) => {
    dispatch(removeItemFromCart(item));
    try {
      dispatch(removeItemFromCart({ ...item, quantity: 1 }));

      const response = await fetch("/api/auth/removeFromCart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          item: { ...item, quantity: 1 },
        }),
      });

      if (response.ok) {
        console.log("Item remover from cart:");
      } else {
        const errorData = await response.json();
        console.error("Failed to remove item from cart:", errorData.message);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  const handleClearCart = async () => {
    dispatch(clearCart());

    try {
      const response = await fetch(`/api/auth/emptyCart/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Cart set to empty");
      } else {
        console.error("Cart maybe already empty");
      }
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  console.log(cart);
  return (
    <>
      <Nav />
      <div className="user-profile">
        <p>Welcome {currentUser.username}</p>
        <button onClick={handleSignOut}>Logout</button>
        <div>
          <button id="item" onClick={handleClick}>
            Select Items
          </button>
        </div>
        <div className="items-to-show">
          <ul>
            {cart !== undefined &&
              cart.map((item) => (
                <li key={item.itemId}>
                  {item.quantity > 0 && (
                    <p>
                      {item.name} - ${item.price} x {item.quantity}
                      <button onClick={() => handleRemoveItem(item)}>
                        Remove
                      </button>
                    </p>
                  )}
                </li>
              ))}
          </ul>
          <button onClick={handleClearCart}>Clear Cart</button>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
