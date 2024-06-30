import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function Analytics() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalSales, setTotalSales] = useState(0);
  const [salesByProduct, setSalesByProduct] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/order/getAllAdminOrders`);
        setOrders(response.data.orders);
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  useEffect(() => {
    if (orders.length > 0) {
      calculateAnalytics();
    }
  }, [orders]);

  const calculateAnalytics = () => {
    let total = 0;
    const productSales = {};

    orders.forEach(order => {
      total += order.products.reduce((sum, product) => sum + product.price, 0);
      order.products.forEach(product => {
        if (!productSales[product.name]) {
          productSales[product.name] = 0;
        }
        productSales[product.name] += product.price;
      });
    });

    setTotalSales(total);
    setSalesByProduct(Object.entries(productSales).map(([name, sales]) => ({ name, sales })));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  return (
    <div className="container mx-auto p-4 font-poppins">
      <h1 className="text-2xl font-bold mb-4">Analytics</h1>
      <div className="mb-4">
        <h2 className="text-xl">Total Sales: ₹{totalSales.toFixed(2)}</h2>
      </div>
      <div className="flex flex-wrap mb-8">
        <div className="w-full md:w-1/2 p-2">
          <h2 className="text-xl mb-2">Sales by Product</h2>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={salesByProduct}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="w-full md:w-1/2 p-2">
          <h2 className="text-xl mb-2">Sales Distribution</h2>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={salesByProduct}
                dataKey="sales"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
              >
                {salesByProduct.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
