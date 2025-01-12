<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

/**
 * @OA\Schema(
 *     schema="Job",
 *     @OA\Property(property="id", type="integer", example=1),
 *     @OA\Property(property="title", type="string", example="Software Developer"),
 *     @OA\Property(property="description", type="string", example="Develop web applications."),
 *     @OA\Property(property="user_id", type="integer", example=1),
 *     @OA\Property(property="location", type="string", example="New York, NY"),
 *     @OA\Property(property="job_type", type="string", example="full-time"),
 *     @OA\Property(property="salary", type="string", example="$70,000 - $80,000"),
 *     @OA\Property(property="created_at", type="string", format="date-time", example="2023-01-01T12:00:00Z"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", example="2023-01-02T12:00:00Z")
 * )
 */
class Job extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * Allows to assign data directly to the model when creating or updating a record.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'description',
        'user_id',
        'location',
        'job_type',
        'salary'
    ];

    /**
     * The user that owns the job. Every job has an owner.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}