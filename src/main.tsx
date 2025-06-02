import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import theme from "./themes/ThemeMUI.ts";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router.tsx";
import { Provider } from "react-redux";
import store from "./store/index.tsx";
import { SnackbarProvider } from "notistack";
import { themeSnackbar } from "./themes/ThemeSnackbar.ts";
import { ThemeProvider, Zoom } from "@mui/material";
import { GoogleOAuthProvider } from "@react-oauth/google";

const GOOGLE_CLIENT_ID =
  "645395717431-u9b1d2r1tfh6mhlei2uaf66qltcoqkkd.apps.googleusercontent.com";

createRoot(document.getElementById("root")!).render(
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <SnackbarProvider
            maxSnack={5}
            TransitionComponent={Zoom}
            Components={themeSnackbar}
            autoHideDuration={2000}
            anchorOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <RouterProvider router={router} />
          </SnackbarProvider>
        </Provider>
      </ThemeProvider>
    </GoogleOAuthProvider>
);
