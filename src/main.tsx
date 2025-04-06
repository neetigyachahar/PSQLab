import './index.css';

import { createRoot } from 'react-dom/client';

import App from './App.tsx';
import { DBProvider } from './contexts/DBContext.tsx';

createRoot(document.getElementById("root")!).render(
  <DBProvider>
    <App />
  </DBProvider>
)
