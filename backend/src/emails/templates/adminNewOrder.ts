export const adminNewOrderTemplate = ({
  orderId,
  userEmail,
  total,
}: {
  orderId: string;
  userEmail: string;
  total: number;
}) => `
  <h2>New Order Received 🛒</h2>
  <p><strong>Order ID:</strong> ${orderId}</p>
  <p><strong>Customer:</strong> ${userEmail}</p>
  <p><strong>Total:</strong> $${total}</p>
`;
