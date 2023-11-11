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

const RootElement = document.getElementById('root') as HTMLDivElement;

ReactDOM.createRoot(RootElement).render(
    <React.StrictMode>
        <FluentProvider id="fluent" theme={teamsLightTheme}>
            <RouterProvider router={router} />
        </FluentProvider>
    </React.StrictMode>
);

window.WhoaRootContainer = RootElement;
