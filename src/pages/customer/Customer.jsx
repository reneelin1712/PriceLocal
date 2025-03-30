
// material-ui
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// for the table
import { useEffect, useState } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


// project imports
import MainCard from 'components/MainCard';
import AnalyticEcommerce from 'components/cards/statistics/AnalyticEcommerce';
import MonthlyBarChart from 'sections/dashboard/default/MonthlyBarChart';
import ReportAreaChart from 'sections/dashboard/default/ReportAreaChart';
import UniqueVisitorCard from 'sections/dashboard/default/UniqueVisitorCard';
import SaleReportCard from 'sections/dashboard/default/SaleReportCard';
import OrdersTable from 'sections/dashboard/default/OrdersTable';

// assets
import GiftOutlined from '@ant-design/icons/GiftOutlined';
import MessageOutlined from '@ant-design/icons/MessageOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';

import avatar1 from 'assets/images/users/avatar-1.png';
import avatar2 from 'assets/images/users/avatar-2.png';
import avatar3 from 'assets/images/users/avatar-3.png';
import avatar4 from 'assets/images/users/avatar-4.png';

// avatar style
const avatarSX = {
  width: 36,
  height: 36,
  fontSize: '1rem'
};

// action style
const actionSX = {
  mt: 0.75,
  ml: 1,
  top: 'auto',
  right: 'auto',
  alignSelf: 'flex-start',
  transform: 'none'
};

// ==============================|| DASHBOARD - DEFAULT ||============================== //

export default function Customer() {
  const [customers, setCustomers] = useState([]);
  const columns = [
    "Customer Name",
    "Type",
    "Move In",
    "Move Out",
    "Unit #",
    "Unit Size",
    "Rate",
    "City",
    "State",
    "Stay Days"
  ];
  // const columns = [
  //   "Customer Name",
  //   "Type",
  //   "Move In",
  //   "Move Out",
  //   "Unit #",
  //   "Unit Size",
  //   "Width",
  //   "Length",
  //   "Rate",
  //   "Suggest Rate",
  //   "City",
  //   "State",
  //   "Stay Days"
  // ];
  

  // useEffect(() => {
  //   fetch("https://customerstorel.azurewebsites.net/api/customers")
  //     .then(async (res) => {
  //       if (!res.ok) {
  //         const errorData = await res.json();
  //         throw new Error(errorData.error || "Unknown error");
  //       }
  //       return res.json();
  //     })
  //     .then((data) => setCustomers(data))
  //     .catch((err) => console.error("Error fetching customers:", err));
  // }, []);
  const [summary, setSummary] = useState({
    totalUsers: 0,
    totalRent: 0,
    avgRate: 0,
    avgStayDays: 0,
    avgYield: 0
  });
  
  useEffect(() => {
    fetch("https://customerstorel.azurewebsites.net/api/customers")
      .then((res) => res.json())
      .then((data) => {
        setCustomers(data);
  
        const totalUsers = data.length;
        const totalRent = data.reduce((sum, c) => sum + (Number(c.Rate) || 0), 0);
        const avgRate = totalUsers ? totalRent / totalUsers : 0;
  
        const totalStayDays = data.reduce((sum, c) => sum + (Number(c.StayDays) || 0), 0);
        const avgStayDays = totalUsers ? totalStayDays / totalUsers : 0;
  
        const yields = data.map(c => {
          const rate = Number(c.Rate) || 0;
          const unitSize = (c.UnitSize || "").split("x");
          const width = parseFloat(unitSize[0]);
          const length = parseFloat(unitSize[1]);
          const area = width * length;
          return area ? (rate / area) * 12 : 0;
        });
        const avgYield = yields.reduce((sum, y) => sum + y, 0) / totalUsers;
  
        setSummary({
          totalUsers,
          totalRent: totalRent.toFixed(2),
          avgRate: avgRate.toFixed(2),
          avgStayDays: avgStayDays.toFixed(1),
          avgYield: avgYield.toFixed(2)
        });
      })
      .catch((err) => console.error("Error fetching customers:", err));
  }, []);
  
  


  return (
    <Grid container rowSpacing={4.5} columnSpacing={2.75}>
      {/* row 1 */}
      <Grid sx={{ mb: -2.25 }} size={12}>
        <Typography variant="h5">Customer</Typography>
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
      <AnalyticEcommerce title="Total Users" count={summary.totalUsers} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Total Rent" count={`$${summary.totalRent}`} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Avg Rate" count={`$${summary.avgRate}`} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Avg Stay Days" count={summary.avgStayDays} />
      </Grid>
      <Grid item xs={12} sm={6} md={4} lg={3}>
        <AnalyticEcommerce title="Yield (avg)" count={`${summary.avgYield} / m² / yr`} />
      </Grid>
      <Grid sx={{ display: { sm: 'none', md: 'block', lg: 'none' } }} size={{ md: 8 }} />
    
      {/* row 3 */}
      {/* <Grid size={{ xs: 12, md: 7, lg: 8 }}> */}
      <Grid item xs={12}>
      <Typography variant="h6" sx={{ mb: 2 }}>Customer Data</Typography>

      <Box sx={{ maxHeight: 400, overflow: 'auto' }}>
        <Table stickyHeader sx={{ minWidth: 1000 }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col}
                  sx={{
                    backgroundColor: '#fff',
                    position: 'sticky',
                    top: 0,
                    zIndex: 100,
                    fontWeight: 'bold'
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
  {customers.map((c, idx) => (
    <TableRow key={idx}>
      <TableCell>{c.CustomerName}</TableCell>
      <TableCell>{c.Type}</TableCell>
      <TableCell>{c.MoveInDate}</TableCell>
      <TableCell>{c.MoveOutDate}</TableCell>
      <TableCell>{c.UnitNum}</TableCell>
      <TableCell>{c.UnitSize}</TableCell>
      {/* <TableCell>{c.Width?.toFixed(1) ?? "—"}</TableCell>
      <TableCell>{c.Length?.toFixed(1) ?? "—"}</TableCell> */}
      <TableCell>{c.Rate}</TableCell>
      {/* <TableCell>{c.SuggestRate !== null ? `$${c.SuggestRate.toFixed(2)}` : "—"}</TableCell> */}
      <TableCell>{c.City}</TableCell>
      <TableCell>{c.State}</TableCell>
      <TableCell>{c.StayDays}</TableCell>
    </TableRow>
  ))}
</TableBody>

        </Table>
      </Box>
    </Grid>

      <Grid item xs={12}>
      </Grid>
  
    </Grid>
  );
}
