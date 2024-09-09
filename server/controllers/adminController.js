import Order from '../models/Order.js';
import Product from '../models/Product.js';
import Cart from '../models/Cart.js';
import User from '../models/User.js';

// Get total sales, revenue, and growth over time
export const getSalesAnalytics = async (req, res) => {
    
  try {
    const salesData = await Order.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },  // Group by month
          totalRevenue: { $sum: "$total" },
          totalOrders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }  // Sort by month
    ]);

    res.json({ success: true, salesData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// User behavior analytics (most viewed products, abandoned carts, conversion rates)
export const getUserBehaviorAnalytics = async (req, res) => {
    console.log('user behaviour');
  try {
    const mostViewedProducts = await Product.find().sort({ views: -1 }).limit(5);

    const abandonedCarts = await Cart.aggregate([
      { $match: { items: { $ne: [] } } },
      { $group: { _id: "$user", cartCount: { $sum: 1 } } }
    ]);

    // Conversion rate logic
    const totalOrders = await Order.countDocuments();
    const totalCarts = await Cart.countDocuments();
    const conversionRate = ((totalOrders / totalCarts) * 100).toFixed(2);

    res.json({
      success: true,
      mostViewedProducts,
      abandonedCarts,
      conversionRate,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getInventoryManagement = async (req, res) => {
    console.log('inventory');
    try {
      // Populate seller information when fetching products
      // const lowStockProducts = await Product.find({ stock: { $lte: 5 } }).populate('seller', 'name');
      const lowStockProducts = await Product.find().populate('seller', 'name');
      
      console.log("lowStock:", lowStockProducts);
      
      res.json({
        success: true,
        lowStockProducts,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };

// Generate custom reports based on selected metrics and timeframes

export const generateCustomReports = async (req, res) => {
    const { startDate, endDate, metric } = req.body;
  
    try {
      let reportData = {};
  
      // Handle sales metric
      if (metric === 'sales') {
        const salesReport = await Order.aggregate([
          {
            $match: {
              createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
            },
          },
          {
            $group: {
              _id: null,
              totalSales: { $sum: 1 },
              totalQuantity: { $sum: '$quantity' },
            },
          },
          {
            $project: {
              _id: 0,
              totalSales: 1,
              totalQuantity: 1,
            },
          },
        ]);
  
        reportData = salesReport.length > 0 ? salesReport[0] : { totalSales: 0, totalQuantity: 0 };
      }
  
      // Handle revenue metric
      if (metric === 'revenue') {
        const revenueReport = await Order.aggregate([
          {
            $match: {
              createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
            },
          },
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: '$total' },
            },
          },
          {
            $project: {
              _id: 0,
              totalRevenue: 1,
            },
          },
        ]);
  
        reportData = revenueReport.length > 0 ? revenueReport[0] : { totalRevenue: 0 };
      }
  
      // Handle new users metric (unchanged)
      if (metric === 'users') {
        const buyers = await User.find({
          role: 'buyer',
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        }).select('name email');
  
        const sellers = await User.find({
          role: 'seller',
          createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
        }).select('name email');
  
        reportData = {
          buyers,
          sellers,
        };
      }
  
      console.log(reportData);
      res.json({
        success: true,
        reports: reportData,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  