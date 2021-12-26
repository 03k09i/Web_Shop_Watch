import React from 'react';


const Dashboard = React.lazy(() => import('./views/Dashboard'));


const routes = [
  { path: '/', exact: true, name: 'Admin' },
  { path: '/admin/dashboard', name: 'Dashboard', component: Dashboard },
];

export default routes;
