<?php

namespace App\Http\Controllers;

use App\Models\Job;
use App\Models\User;
use App\Services\JobService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
    /**
     * @OA\Get(
     *     path="/jobs",
     *     summary="Get all jobs",
     *     tags={"Jobs"},
     *     @OA\Response(
     *         response=200,
     *         description="List of jobs",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Job"))
     *     )
     * )
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
    /**
     * @OA\Get(
     *     path="/jobs/{id}",
     *     summary="Get job details",
     *     tags={"Jobs"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Job ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Job details",
     *         @OA\JsonContent(ref="#/components/schemas/Job")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Job not found"
     *     )
     * )
     */
    public function show($id)
    {
        try {
            $job = $this->jobService->getJobById($id);

            return response()->json($job, 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json(['error' => 'Job not found'], 404);
        } catch (\Exception $e) {
            \Log::error('Error fetching job details:', [
                'id' => $id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => 'An error occurred while fetching job details.'], 500);
        }
    }


    /**
     * Store a newly created job in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Post(
     *     path="/jobs",
     *     summary="Create a new job",
     *     tags={"Jobs"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Job")
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Job created successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Job")
     *     )
     * )
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'required|string',
                'user_id' => 'required|exists:users,id',
                'location' => 'required|string|max:255',
                'job_type' => 'required|in:full-time,part-time,contract,freelance,temporary',
                'salary' => 'nullable|string|min:0',
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

                    'salary.string' => 'The salary must be a string value.',
                    'salary.min' => 'The salary must be at least 0.',
                ]);

            $job = $this->jobService->createJob($validated);

            return response()->json($job, 201); // HTTP 201 Created
        } catch (\Exception $e) {
            \Log::error('Error creating job:', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json(['error' => 'An error occurred while creating the job.'], 500);
        }
    }

    /**
     * Update the specified job in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * 
     * @param  int  $id
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Put(
     *     path="/jobs/{id}",
     *     summary="Update an existing job",
     *     tags={"Jobs"},
     *     @OA\Parameter(
     *         name="id",
     *         in="path",
     *         required=true,
     *         description="Job ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/Job")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Job updated successfully",
     *         @OA\JsonContent(ref="#/components/schemas/Job")
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="Job not found"
     *     )
     * )
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
     * Get jobs by user ID.
     *
     * @param  int  $userId
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    /**
     * @OA\Get(
     *     path="/users/{userId}/jobs",
     *     summary="Get jobs by user ID",
     *     tags={"Jobs"},
     *     @OA\Parameter(
     *         name="userId",
     *         in="path",
     *         required=true,
     *         description="User ID",
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Jobs retrieved successfully",
     *         @OA\JsonContent(type="array", @OA\Items(ref="#/components/schemas/Job"))
     *     ),
     *     @OA\Response(
     *         response=404,
     *         description="No jobs found for the user"
     *     ),
     *     @OA\Response(
     *         response=500,
     *         description="Internal server error"
     *     )
     * )
     */
    public function getJobsByUser($userId)
    {
        try {
            $jobs = $this->jobService->getJobsByUserId($userId);

            if ($jobs->isEmpty()) {
                return response()->json(['message' => 'No jobs found for this user.'], 404);
            }

            return response()->json($jobs, 200);
        } catch (\Exception $e) {
            \Log::error('Error fetching jobs by user ID:', ['user_id' => $userId, 'error' => $e->getMessage()]);
            return response()->json(['error' => 'An error occurred while fetching jobs.'], 500);
        }

    }
}