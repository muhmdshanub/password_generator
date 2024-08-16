import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import store from './store.js';
import StyledErrorBoundary from './components/HOC/ErrorBoundary.jsx'; 
import LoadingModal from './components/LoadingModal.jsx'; 
import NotFound from './screens/NotFound.jsx';


const HomeScreen = lazy(() => import('./screens/HomeScreen.jsx'));


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} element={
        <Suspense fallback={<LoadingModal open={true} />}>
          <HomeScreen />
        </Suspense>
      } />
      {/* Fallback route for 404 */}
      <Route path='*' element={<NotFound />} />
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById('root')).render(
  <StyledErrorBoundary>
    <Provider store={store}>
      <React.StrictMode>
        <RouterProvider router={router} />
      </React.StrictMode>
    </Provider>
  </StyledErrorBoundary>
);
