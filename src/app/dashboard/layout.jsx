import { DashboardSideBar } from '@/Components/dashboard/DashboardSideBar';
import React from 'react';

const DashBoardlayout = ({children}) => {
    return (
        <div className='flex gap-5 min-h-screen'>
            <DashboardSideBar />
            <div className='flex-1'>{children}</div>
        </div>
    );
};

export default DashBoardlayout;