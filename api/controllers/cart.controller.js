import { UserModel } from "../models/user.model.js";

export const addToCart = async (req, res, next) => {
  const { userId, item } = req.body;
  try {
    const user = await UserModel.findById(userId);

    if (user) {
      const existingItem = user.cart.find(
        (cartItem) => cartItem.itemId === item.itemId
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        user.cart.push(item);
      }

      await user.save();

      res
        .status(200)
        .json({ message: "Cart updated successfully", cart: user.cart });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req, res, next) => {
  const { userId, item } = req.body;
  try {
    const user = await UserModel.findById(userId);

    if (user) {
      const existingItem = user.cart.find(
        (cartItem) => cartItem.itemId === item.itemId
      );

      if (existingItem) {
        existingItem.quantity -= item.quantity;
      } else {
        user.cart.pop(item);
      }

      await user.save();

      res
        .status(200)
        .json({ message: "Cart updated successfully", cart: user.cart });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const emptyCart = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await UserModel.findByIdAndUpdate(
      userId,
      { $set: { cart: [] } },
      { new: true, useFindAndModify: false }
    );

    if (user) {
      res
        .status(200)
        .json({ message: "Cart successfully emptied", cart: user.cart });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error emptying cart:", error);
    next(error);
  }
};

export const getFromCart = async (req, res, next) => {
  const { userId } = req.params;
  try {
    const user = await UserModel.findById(userId);

    if (user) {
      const cart = user.cart;
      res.json({
        cart,
      });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    next(error);
  }
};
