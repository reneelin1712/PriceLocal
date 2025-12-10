import { lazy } from 'react';

// project imports
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';

// render- Dashboard
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));

// render - color
const Color = Loadable(lazy(() => import('pages/component-overview/color')));
const Typography = Loadable(lazy(() => import('pages/component-overview/typography')));
const Shadow = Loadable(lazy(() => import('pages/component-overview/shadows')));

// render - sample page
const SamplePage = Loadable(lazy(() => import('pages/extra-pages/sample-page')));

// render - Customer Page (NEW)
const Customer = Loadable(lazy(() => import("pages/customer/Customer")));
const UploadCustomer = Loadable(lazy(() => import('pages/customer/UploadCustomer')));
const CustomerMap = Loadable(lazy(() => import('pages/customer/CustomerMap')));
const MapPAC = Loadable(lazy(() => import('pages/customer/MapPAC')));
const PredictPrices = Loadable(lazy(() => import('pages/predict/PredictPrices')));


// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <DashboardLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    
    {
      path: 'typography',
      element: <Typography />
    },
    {
      path: 'color',
      element: <Color />
    },
    {
      path: 'shadow',
      element: <Shadow />
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: "customer", // NEW Route for Customer Page
      element: <Customer />
    },
    {
      path: 'customer/upload',
      element: <UploadCustomer />
    },
    {
      path: 'customer/map-DUR',
      element: <CustomerMap />
    },
    {
      path: 'customer/map-pac', 
      element: <MapPAC />
    },
    {
      path: '/predict-prices', 
      element: <PredictPrices />
    },
    
  ]
};

export default MainRoutes;
