type OrderItem = {
  name: string;
  quantity: number;
};

export const orderConfirmationTemplate = ({
  orderId,
  total,
  items,
}: {
  orderId: string;
  total: number;
  items: OrderItem[];
}) => `
  <h2>Order Confirmed 🎉</h2>
  <p>Your order <strong>#${orderId}</strong> has been placed successfully.</p>

  <h3>Items</h3>
  <ul>
    ${items.map((item) => `<li>${item.name} × ${item.quantity}</li>`).join("")}
  </ul>

  <p><strong>Total:</strong> $${total}</p>
  <p>Thank you for shopping with us.</p>
`;
