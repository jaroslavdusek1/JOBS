<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Services\JobService;
use Illuminate\Http\Request;

class JobController extends Controller
{
    protected $jobService;

    /**
     * Inject JobService into the controller.
     *
     * @param  \App\Services\JobService  $jobService
     */
    public function __construct(JobService $jobService)
    {
        $this->jobService = $jobService;
    }

    /**
     * Display a list of jobs.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $jobs = $this->jobService->getAllJobs();
        return response()->json($jobs, 200);
    }

    /**
     * Display the specified job.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        try {
            $job = $this->jobService->getJobById($id);
            return response()->json($job, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Job not found'], 404);
        }
    }

    /**
     * Store a newly created job in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'user_id' => 'required|exists:users,id',
            'location' => 'required|string|max:255',
            'job_type' => 'required|in:full-time,part-time,contract,freelance,temporary',
            'salary' => 'nullable|numeric|min:0',
        ], [
                'title.required' => 'The job title is required.',
                'title.string' => 'The job title must be a string.',
                'title.max' => 'The job title must not exceed 255 characters.',

                'description.required' => 'The job description is required.',
                'description.string' => 'The job description must be a string.',

                'user_id.required' => 'The user ID is required.',
                'user_id.exists' => 'The provided user ID does not exist.',

                'location.required' => 'The job location is required.',
                'location.string' => 'The job location must be a string.',
                'location.max' => 'The job location must not exceed 255 characters.',

                'job_type.required' => 'The job type is required.',
                'job_type.in' => 'The job type must be one of the following: full-time, part-time, contract, freelance, or temporary.',

                'salary.numeric' => 'The salary must be a numeric value.',
                'salary.min' => 'The salary must be at least 0.',
            ]);

        $job = $this->jobService->createJob($validated);
        return response()->json($job, 201); // HTTP 201 Created
    }

    /**
     * Update the specified job in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        try {
            $job = Job::findOrFail($id);

            $validated = $request->validate([
                'title' => 'sometimes|string|max:255',
                'description' => 'sometimes|string',
                'user_id' => 'sometimes|exists:users,id',
                'location' => 'sometimes|string|max:255',
                'job_type' => 'sometimes|in:full-time,part-time,contract,freelance,temporary',
                'salary' => 'nullable|numeric|min:0',
            ], [
                    'title.string' => 'The job title must be a string.',
                    'title.max' => 'The job title must not exceed 255 characters.',

                    'description.string' => 'The job description must be a string.',

                    'user_id.exists' => 'The provided user ID does not exist.',

                    'location.string' => 'The job location must be a string.',
                    'location.max' => 'The job location must not exceed 255 characters.',

                    'job_type.in' => 'The job type must be one of the following: full-time, part-time, contract, freelance, or temporary.',

                    'salary.numeric' => 'The salary must be a numeric value.',
                    'salary.min' => 'The salary must be at least 0.',
                ]);


            $updatedJob = $this->jobService->updateJob($job, $validated);
            return response()->json($updatedJob, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Job not found'], 404);
        }
    }

    /**
     * Remove the specified user from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id); // Find user by ID or fail
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }
}