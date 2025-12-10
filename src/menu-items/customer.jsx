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
    },
    {
      id: 'upload-customer',
      title: 'Upload Customers',
      type: 'item',
      url: '/customer/upload',
      icon: icons.UploadOutlined,
      breadcrumbs: false
    },
    {
      id: 'map',
      title: 'map-DUR',
      type: 'item',
      url: '/customer/map-DUR',
      icon: icons.UploadOutlined,
      breadcrumbs: false
    },
    {
      id: 'map-pac',
      title: 'map-pac',
      type: 'item',
      url: '/customer/map-pac',
      icon: icons.UploadOutlined,
      breadcrumbs: false
    }
  ]
};

export default customer;
