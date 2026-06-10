'use client';
import React from 'react';
import { authClient } from '@/lib/auth-client';
import { useSession } from '@/lib/auth-client';
import { Briefcase,Person,Thunderbolt,CircleCheck } from '@gravity-ui/icons';
import { DashboardStats } from '@/Components/dashboard/DashboardStats';

const RecruiterDashboardHomePage = () => {
    const { data: session , isPending } = authClient.useSession();
    if (isPending) {
        return <div>Loading...</div>;
    }

    const recruiterStats = [
        {title: 'Total Job Postings', value: 12, icon: Briefcase},
        {title: 'Active Job Postings', value: 8, icon: Thunderbolt},
        {title: 'Job Applications', value: 5, icon: Person},
        {title: 'Interviews Scheduled', value: 3, icon: CircleCheck},
    ]

    const user = session?.user;
    console.log("User session data:", session);
    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Welcome Back, {user?.name}!</h1>

            <DashboardStats statsData={recruiterStats} />
        </div>
    );
};

export default RecruiterDashboardHomePage;