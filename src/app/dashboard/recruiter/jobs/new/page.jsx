import React from 'react';
import PostJobForm from './PostJobForm';
import { getRecruiterCompany } from '@/lib/api/companies';
import { getLoggedInRecruiterCompany } from '@/lib/api/companies';

const PostJobPage =async () => {
    const company = await getLoggedInRecruiterCompany();
    return (
        <div>
            <PostJobForm company={company} />
        </div>
    );
};

export default PostJobPage;