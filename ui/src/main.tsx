import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import 'normalize.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import App from './App';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <FluentProvider theme={teamsLightTheme}>
            <RouterProvider router={router} />
        </FluentProvider>
    </React.StrictMode>
);
