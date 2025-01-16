import React from 'react';
import { useParams } from 'react-router-dom';

const JobDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    return (
        <div className="p-6">
            <h1>Job Detail</h1>
            <p>Details for Job ID: {id}</p>
        </div>
    );
};

export default JobDetail;
