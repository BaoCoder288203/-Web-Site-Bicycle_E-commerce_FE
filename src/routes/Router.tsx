import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginTemplate from "@/pages/auth/Login/index";
import RegisterTemplate from "@/pages/auth/Register";
import AuthLayout from "@/layouts/AuthLayout";
import HomeLayout from "@/layouts/HomeLayout";
import UserProfile from "@/pages/auth/Profile";
import HomeTemplate from "@/pages/home";
import ServiceLayout from "@/layouts/ServiceLayout";
import CheckoutPage from "@/components/Shared/YourCart/index";
import ServiceTemplate from "@/pages/service";
import PaymentLayout from "@/layouts/PaymentLayout";
import PaymentTemplate from "@/pages/payment";
import AboutLayout from "@/layouts/AboutLayout";
import AboutTemplate from "@/pages/about";
import ContactLayout from "@/layouts/ContactLayout";
import ContactTemplate from "@/pages/contact";
import ProductDetailLayout from "@/layouts/ProductDetailLayout";
import ProductDetailTemplate from "@/pages/productDetail";
import NewsLayout from "@/layouts/NewsLayout";
import NewsTemplate from "@/pages/news";
import NewsDetailsTemplate from "@/pages/news/NewsDetail";
import ShopLayout from "@/layouts/ShopLayout";
import ShopTemplate from "@/pages/shop";
import NotFoundPage from "@/pages/404/index";
import { APP_ROUTES } from "@/constants";
import AdminLayout from "@/layouts/Admin/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";
import PromotionTemplate from "@/pages/admin/Promotion";
import OrderList from "@/pages/admin/Order";
import SupplierList from "@/components/Shared/SupplierList";
import StatisticTemplate from "@/pages/admin/Statistics";
import ProductManagement from "@/pages/admin/Product";
import OrderLayout from "@/layouts/OrderLayout";
import OrderHistoryPage from "@/pages/order";
import GoogleCallbackLayout from "@/layouts/GoogleCallbackLayout";

const ErrorPage = () => (
  <div>
    <h1>Đã xảy ra lỗi</h1>
    <p>Vui lòng thử lại sau hoặc liên hệ hỗ trợ.</p>
  </div>
);

const router = createBrowserRouter([
  // Redirect root to dashboard
  {
    path: "/",
    element: <Navigate to={APP_ROUTES.DASHBOARD} replace />,
  },

  // Auth Routes
  {
    Component: AuthLayout,
    path: APP_ROUTES.AUTH_ROUTE,
    children: [
      {
        path: "login",
        element: <LoginTemplate />,
        errorElement: <ErrorPage />,
      },
      {
        path: "register",
        Component: RegisterTemplate,
      },
      {
        path: "profile",
        Component: UserProfile,
      },
      {
        path: "google-callback",
        element: <GoogleCallbackLayout />,
        errorElement: <ErrorPage />,
      },
    ],
  },

  // Product Routes
  {
    Component: ProductDetailLayout,
    path: APP_ROUTES.PRODUCT_ROUTE,
    children: [
      {
        path: "detail/:productId",
        Component: ProductDetailTemplate,
      },
    ],
  },

  // Home Routes
  {
    path: APP_ROUTES.DASHBOARD,
    Component: HomeLayout,
    children: [
      { path: "", Component: HomeTemplate },
      { path: APP_ROUTES.CART, Component: CheckoutPage },
    ],
  },

  {
    path: APP_ROUTES.USER_ORDER_HISTORY,
    Component: OrderLayout,
    children: [{ path: "", Component: OrderHistoryPage }],
  },

  // Service Route
  {
    path: APP_ROUTES.SERVICE,
    Component: ServiceLayout,
    children: [
      {
        path: "",
        Component: ServiceTemplate,
      },
    ],
  },

  // Payment Route
  {
    path: APP_ROUTES.PAYMENT,
    Component: PaymentLayout,
    children: [
      {
        path: "",
        Component: PaymentTemplate,
      },
    ],
  },

  // About Route
  {
    path: APP_ROUTES.ABOUT,
    Component: AboutLayout,
    children: [
      {
        path: "",
        Component: AboutTemplate,
      },
    ],
  },

  // Contact Route
  {
    path: APP_ROUTES.CONTACT,
    Component: ContactLayout,
    children: [
      {
        path: "",
        Component: ContactTemplate,
      },
    ],
  },

  // News Routes
  {
    path: APP_ROUTES.NEWS,
    Component: NewsLayout,
    children: [
      { path: "", Component: NewsTemplate },
      { path: ":id", Component: NewsDetailsTemplate },
    ],
  },

  // Shop Route
  {
    path: APP_ROUTES.SHOP,
    Component: ShopLayout,
    children: [
      {
        path: "",
        Component: ShopTemplate,
      },
    ],
  },
  // Admin Route
  {
    path: APP_ROUTES.ADMIN_ROUTE,
    Component: AdminLayout,
    children: [
      {
        path: APP_ROUTES.ADMIN.DASHBOARD,
        Component: Dashboard,
      },
      {
        path: APP_ROUTES.ADMIN.PROMOTION,
        Component: PromotionTemplate,
      },
      {
        path: APP_ROUTES.ADMIN.ORDER,
        Component: OrderList,
      },
      {
        path: APP_ROUTES.ADMIN.SUPLIER,
        Component: SupplierList,
      },
      {
        path: APP_ROUTES.ADMIN.STATISTIC,
        Component: StatisticTemplate,
      },
      {
        path: APP_ROUTES.ADMIN.PRODUCT,
        Component: ProductManagement,
      },
    ],
  },
  // 404 Route
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;
