import mongoose from "mongoose";
import db from "../utils/db";

const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    amount_shipping: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    session_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
