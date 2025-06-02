// import { ReactRouterAppProvider } from "@toolpad/core/react-router";
// import { Outlet, useNavigate } from "react-router";
// import { BRANDING, NAVIGATION } from "./constants";
// import theme from "./themes/ThemeMUI";
// import { useMemo, useState } from "react";

// import Header from "./components/Shared/Header";

// const demoSession = {
//   user: {
//     name: "Demo session",
//     email: "demo@gmail.com"
//   },
// };

// export default function App() {
//   const navigate = useNavigate();
//   const [session, setSession] = useState<any | null>(demoSession);
//   const authentication = useMemo(() => {
//     return {
//       signIn: () => {
//         setSession(demoSession);
//       },
//       signOut: () => {
//         navigate("/auth/login");
//         setSession(null);
//       },
//     };
//   }, []);
//   return (
//     <ReactRouterAppProvider
//       theme={theme}
//       navigation={NAVIGATION}
//       branding={BRANDING}
//       authentication={authentication}
//       session={session}
//     >
//       <Header />
//       <Outlet />
//     </ReactRouterAppProvider>
//   );
// }
