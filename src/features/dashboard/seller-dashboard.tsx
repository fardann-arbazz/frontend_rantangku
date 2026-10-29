import QuickStats from "@/components/seller/dashboard/quick-stats";
import RecentOrders from "@/components/seller/dashboard/recent-orders";
import TopProduct from "@/components/seller/dashboard/top-product";
import QuickAction from "@/components/seller/dashboard/quick-action";

const SellerDashboardPage = () => {
  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Quick Stats */}
      <QuickStats />

      {/* Recent Orders & Top Products */}
      <div className="grid lg:grid-cols-2 gap-6">
        <RecentOrders />
        <TopProduct />
      </div>

      {/* Quick Actions */}
      <QuickAction />
    </div>
  );
};

export default SellerDashboardPage;
