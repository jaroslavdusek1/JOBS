<?php

namespace App\Services;

use App\Models\Job;
use Illuminate\Support\Facades\Validator;

class JobService
{
    /**
     * Get all jobs.
     *
     * @return \Illuminate\Database\Eloquent\Collection
     */
    public function getAllJobs()
    {
        try {
            return Job::all();
        } catch (\Throwable $e) {
            \Log::error('Error fetching all jobs:', ['error' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Get a single job by ID.
     *
     * @param int $id
     * @return \App\Models\Job
     * @throws \Exception
     */
    public function getJobById($id)
    {
        try {
            // Validate ID
            $validator = Validator::make(['id' => $id], [
                'id' => 'required|integer|min:1',
            ]);

            if ($validator->fails()) {
                throw new \Exception('Invalid job ID: ' . implode(', ', $validator->errors()->all()));
            }

            return Job::findOrFail($id);
        } catch (\Throwable $e) {
            \Log::error('Error fetching job by ID:', ['id' => $id, 'error' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Create a new job.
     *
     * @param array $data
     * @return \App\Models\Job
     * @throws \Exception
     */
    public function createJob(array $data)
    {
        try {
            // Validate and sanitize input data
            $validator = Validator::make($data, [
                'title' => 'required|string|max:255',
                'description' => 'required|string|max:500',
                'salary' => 'required|string|max:50',
                'location' => 'required|string|max:255',
                'job_type' => 'required|string|in:full-time,part-time,contract,freelance,temporary',
                'user_id' => 'required|integer|exists:users,id',
            ]);

            if ($validator->fails()) {
                throw new \Exception('Invalid job data: ' . implode(', ', $validator->errors()->all()));
            }

            $validatedData = $validator->validated();

            // Sanitize strings
            foreach (['title', 'description', 'salary', 'location'] as $field) {
                $validatedData[$field] = htmlspecialchars(trim($validatedData[$field]));
            }

            return Job::create($validatedData);
        } catch (\Throwable $e) {
            \Log::error('Error creating job:', ['data' => $data, 'error' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Update an existing job.
     *
     * @param \App\Models\Job $job
     * @param array $data
     * @return \App\Models\Job
     * @throws \Exception
     */
    public function updateJob(Job $job, array $data)
    {
        try {
            // Validate and sanitize input data
            $validator = Validator::make($data, [
                'title' => 'sometimes|required|string|max:255|trim',
                'description' => 'sometimes|required|string|max:1000|trim',
                'salary' => 'sometimes|required|string|max:50|trim',
                'location' => 'sometimes|required|string|max:255|trim',
                'job_type' => 'sometimes|required|string|in:full-time,part-time,contract,freelance,temporary',
            ]);

            if ($validator->fails()) {
                throw new \Exception('Invalid job data: ' . implode(', ', $validator->errors()->all()));
            }

            $validatedData = $validator->validated();

            // Sanitize strings
            foreach (['title', 'description', 'salary', 'location'] as $field) {
                if (isset($validatedData[$field])) {
                    $validatedData[$field] = htmlspecialchars(trim($validatedData[$field]));
                }
            }

            $job->update($validatedData);

            return $job;
        } catch (\Throwable $e) {
            \Log::error('Error updating job:', ['job_id' => $job->id, 'data' => $data, 'error' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Delete a job.
     *
     * @param \App\Models\Job $job
     * @return bool
     */
    public function deleteJob(Job $job)
    {
        try {
            return $job->delete();
        } catch (\Throwable $e) {
            \Log::error('Error deleting job:', ['job_id' => $job->id, 'error' => $e->getMessage()]);
            throw $e;
        }
    }

    /**
     * Get jobs by user ID.
     *
     * @param int $userId
     * @return \Illuminate\Database\Eloquent\Collection
     * @throws \Exception
     */
    public function getJobsByUserId($userId)
    {
        try {
            // Validate user ID
            $validator = Validator::make(['user_id' => $userId], [
                'user_id' => 'required|integer|exists:users,id',
            ]);

            if ($validator->fails()) {
                throw new \Exception('Invalid user ID: ' . implode(', ', $validator->errors()->all()));
            }

            return Job::where('user_id', $userId)->get();
        } catch (\Throwable $e) {
            \Log::error('Error fetching jobs by user ID:', ['user_id' => $userId, 'error' => $e->getMessage()]);
            throw $e;
        }
    }
}