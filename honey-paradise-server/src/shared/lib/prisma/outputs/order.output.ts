export const ordersDefaultOutput = {
  id: true,

  status: true,
  totalAmount: true,

  items: true,
  transaction: { select: { status: true } },

  createdAt: true,
};
