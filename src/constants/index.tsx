export const APP_ROUTES = {
  DASHBOARD: "/home",
  USER: {
    MANAGEMENT: "/users",
    DETAIL: "/users/:userId",
    REGISTER: "register",
    PROFILE: "profile",
    LOGIN: "login",
    UPDATE_PASS: "profile/update-password",
    FORGOT: "forgot-password",
    ORDER: "orders",
  },
  ADMIN: {
    PROMOTION: "promotions",
    DASHBOARD: "dashboard",
    ORDER: "orders",
    SUPLIER: "suppliers",
    PRODUCT: "products",
    STATISTIC: "statistics"
  },
  USER_AUTHORIZATION: {
    MANAGEMENT: "/authorizations",
    UPDATE_ROLE: "/authorizations/change",
  },
  PRODUCT: {
    DETAIL: ":productId",
  },
  NOT_FOUND: "/404",
  AUTH_ROUTE: "/auth",
  ADMIN_ROUTE: "/admin",
  PRODUCT_ROUTE: "/product",
  SERVICE: "/service",
  PAYMENT: "/payment",
  ABOUT: "/about",
  CONTACT: "/contact",
  NEWS: "/news",
  SHOP: "/shop",
  CART: "cart",
  ORDER: "/orders",
  USER_ORDER_HISTORY: "/my-orders",

} as const;