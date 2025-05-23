import Order from "./Order";

const ReservedOrders = ({ orders, loading, onCancel, onPickup }) => {
  if (loading) return <p>Loading orders...</p>;

  return (
    <div>
      <h2>Reserved Orders</h2>
      <div className="orders-grid">
        {orders.map((order) => (
          <Order
            key={order.id}
            order={order}
            onCancel={() => onCancel(order)}
            onPickup={() => onPickup(order)}
          />
        ))}
      </div>
    </div>
  );
};

export default ReservedOrders;
