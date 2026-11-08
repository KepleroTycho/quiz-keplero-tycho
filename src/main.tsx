import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";
import { Layout } from "./layout";
import { HomePage } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Layout>
      <HomePage />
    </Layout>
  </StrictMode>,
);
