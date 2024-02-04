import { Route, BrowserRouter, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./authentication/ProtectedRoute";
import { ProfilePage, RegisterPage, LoginPage } from "./pages";
import { AuthProvider } from "./authentication/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
