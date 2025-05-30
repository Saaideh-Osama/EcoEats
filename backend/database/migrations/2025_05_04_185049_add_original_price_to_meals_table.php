<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('meals', function (Blueprint $table) {
            Schema::table('meals', function (Blueprint $table) {
                $table->decimal('original_price', 8, 2)->after('price');
            });
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('meals', function (Blueprint $table) {
            Schema::table('meals', function (Blueprint $table) {
                $table->dropColumn('original_price');
            });
        });
    }
};
