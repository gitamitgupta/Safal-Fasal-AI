import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import i18n from './i18n'; // Import the i18n instance you created
import { I18nextProvider } from 'react-i18next'; // 👈 Import the provider

const container = document.getElementById("root");
const root = createRoot(container);

// 👇 Wrap your App component with the I18nextProvider
root.render(
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
);