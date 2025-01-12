<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateJobsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('jobs', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->string('title'); // Job title
            $table->text('description'); // Job description
            $table->unsignedBigInteger('user_id'); // Foreign key linking to the users table
            $table->timestamps(); // Automatically generates `created_at` and `updated_at` columns

            // Cascade delete: if the user is deleted, their jobs are also deleted
            $table->foreign('user_id') // Defines the foreign key
                  ->references('id')
                  ->on('users')
                  ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down()
    {
        Schema::dropIfExists('jobs'); // Drops the jobs table if it exists
    }
}
