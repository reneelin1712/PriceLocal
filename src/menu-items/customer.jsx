// assets
import { DashboardOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const customer = {
  id: 'group-customer',
  title: 'Customer',
  type: 'group',
  children: [
    {
      id: 'customer',
      title: 'Customer',
      type: 'item',
      url: '/customer',
      icon: icons.DashboardOutlined,
      breadcrumbs: false
    }
  ]
};

export default customer;
