// backend/models/Order.js
const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema({
  product: { type: String, required: true },   // product _id
  name:    { type: String, required: true },
  price:   { type: Number, required: true },
  image:   { type: String },
  quantity:{ type: Number, required: true },
})

const addressSchema = new mongoose.Schema({
  fullName:    String,
  phone:       String,
  addressLine: String,
  city:        String,
  state:       String,
  pincode:     String,
})

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    items: [orderItemSchema],
    shippingAddress: addressSchema,
    paymentMethod: {
      type: String,
      required: true,
      enum: ['cod', 'card', 'upi'],
      default: 'cod',
    },
    itemsPrice:    { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice:    { type: Number, required: true },
    isPaid:        { type: Boolean, default: false },
    isDelivered:   { type: Boolean, default: false },
    deliveredAt:   { type: Date },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)
