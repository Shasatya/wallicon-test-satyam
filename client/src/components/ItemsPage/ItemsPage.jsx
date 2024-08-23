import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../../redux/cart/cartSlice"; // Import the action
import "./ItemsPage.css";
import Nav from "../Nav/Nav";

const ItemsPage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const userId = currentUser._id;

  console.log(currentUser);
  console.log(userId);
  const handleAddItem = async (item) => {
    try {
      dispatch(addItemToCart({ ...item, quantity: 1 }));

      const response = await fetch("/api/auth/addToCart", {
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
        const data = await response.json();
        console.log("Item added to cart:", data.cart);
      } else {
        const errorData = await response.json();
        console.error("Failed to add item to cart:", errorData.message);
      }
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  return (
    <>
      <Nav />
      <div className="items-page">
        <h2>Add Items</h2>
        <div className="items">
          {itemData.map((item) => (
            <div className="item-card" key={item.itemId}>
              <img src={item.image_url} alt={item.name} />
              <div className="item-card-text">
                <p>{item.name}</p>
                <p>{item.price}</p>
                <p>{item.category}</p>
              </div>
              <button onClick={() => handleAddItem(item)}>Add</button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const itemData = [
  {
    itemId: "1",
    name: "Wireless Bluetooth Headphones",
    category: "Electronics",
    price: 49.99,
    quantity: 1,
    image_url:
      "https://img.freepik.com/free-photo/elegance-bags-handbag-stylish-male_1203-6454.jpg?t=st=1724400103~exp=1724403703~hmac=daf64bddb02aeafa995e61b78f34261cb371ca770f87bd6e258204f7ddfc8f0f&w=1480",
  },
  {
    itemId: "2",
    name: "Stainless Steel Water Bottle",
    category: "Home & Kitchen",
    price: 19.99,
    quantity: 2,
    image_url:
      "https://img.freepik.com/free-photo/elegance-bags-handbag-stylish-male_1203-6454.jpg?t=st=1724400103~exp=1724403703~hmac=daf64bddb02aeafa995e61b78f34261cb371ca770f87bd6e258204f7ddfc8f0f&w=1480",
  },
  {
    itemId: "3",
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: 24.99,
    quantity: 3,
    size: "M",
    color: "Blue",
    image_url:
      "https://img.freepik.com/free-photo/elegance-bags-handbag-stylish-male_1203-6454.jpg?t=st=1724400103~exp=1724403703~hmac=daf64bddb02aeafa995e61b78f34261cb371ca770f87bd6e258204f7ddfc8f0f&w=1480",
  },
  {
    itemId: "4",
    name: "Running Shoes",
    category: "Footwear",
    price: 79.99,
    quantity: 1,
    size: "9",
    color: "Black",
    image_url:
      "https://img.freepik.com/free-photo/elegance-bags-handbag-stylish-male_1203-6454.jpg?t=st=1724400103~exp=1724403703~hmac=daf64bddb02aeafa995e61b78f34261cb371ca770f87bd6e258204f7ddfc8f0f&w=1480",
  },
  {
    itemId: "5",
    name: "Smartphone",
    category: "Electronics",
    price: 699.99,
    quantity: 1,
    image_url:
      "https://img.freepik.com/free-photo/elegance-bags-handbag-stylish-male_1203-6454.jpg?t=st=1724400103~exp=1724403703~hmac=daf64bddb02aeafa995e61b78f34261cb371ca770f87bd6e258204f7ddfc8f0f&w=1480",
  },
];

export default ItemsPage;
