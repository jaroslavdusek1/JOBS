<?php

namespace App\Services;

use App\Models\Job;

class JobService
{
    /**
     * Get all jobs.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllJobs()
    {
        return Job::all();
    }

    /**
     * Get a single job by ID.
     *
     * @param  int  $id
     * @return \App\Models\Job
     */
    public function getJobById($id)
    {
        return Job::findOrFail($id);
    }

    /**
     * Create a new job.
     *
     * @param  array  $data
     * @return \App\Models\Job
     */
    public function createJob(array $data)
    {
        return Job::create($data);
    }

    /**
     * Update an existing job.
     *
     * @param  \App\Models\Job  $job
     * @param  array  $data
     * @return \App\Models\Job
     */
    public function updateJob(Job $job, array $data)
    {
        $job->update($data);
        return $job;
    }

    /**
     * Delete a job.
     *
     * @param  \App\Models\Job  $job
     * @return bool|null
     */
    public function deleteJob(Job $job)
    {
        return $job->delete();
    }
}
