import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';
import './components/index';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    }
]);

const RootElement = document.getElementById('root') as HTMLDivElement;

ReactDOM.createRoot(RootElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

window.WhoaRootContainer = RootElement;
