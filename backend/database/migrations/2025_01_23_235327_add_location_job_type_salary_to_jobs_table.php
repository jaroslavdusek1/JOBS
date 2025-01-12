<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddLocationJobTypeSalaryToJobsTable extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->string('location')->nullable(); // might be null
            $table->enum('job_type', ['full-time', 'part-time', 'contract', 'freelance', 'temporary'])->default('full-time');
            $table->string('salary', 10, 2)->nullable(); // might be null
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jobs', function (Blueprint $table) {
            $table->dropColumn(['location', 'job_type', 'salary']);
        });
    }
}