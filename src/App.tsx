import { Route, Routes, HashRouter } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./authentication/ProtectedRoute";
import { ProfilePage, RegisterPage, LoginPage, TouristsPage } from "./pages";
import { AuthProvider } from "./authentication/AuthProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage/HomePage";
import TouristDetailPage from "./pages/TouristDetailPage";
import { Toaster } from "./components/ui/toaster";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/tourist" element={<TouristsPage />} />
              <Route
                path="/tourist/:id/detail"
                element={<TouristDetailPage />}
              />
              <Route path="/profile" element={<ProfilePage />} />
            </Route>
          </Routes>
        </AuthProvider>
        <Toaster />
      </HashRouter>
    </QueryClientProvider>
  );
}

export default App;
