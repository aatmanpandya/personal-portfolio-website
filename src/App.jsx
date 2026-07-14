import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import AnimatedRoutes from "./components/AnimatedRoutes.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  );
}
