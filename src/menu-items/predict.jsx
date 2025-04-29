// menu-items/predict.jsx

import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - PREDICT ||============================== //

const predict = {
  id: 'group-predict',
  title: 'Pricing Tools',
  type: 'group',
  children: [
    {
      id: 'predict-prices',
      title: 'Predict Prices',
      type: 'item',
      url: '/predict-prices',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

export default predict;
