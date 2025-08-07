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
        Schema::create('students', function (Blueprint $table) {
            $table->id();
            $table->string('nis')->unique()->comment('Nomor Induk Siswa');
            $table->string('nama_lengkap')->comment('Nama lengkap siswa');
            $table->enum('kelas', ['X', 'XI', 'XII'])->comment('Kelas siswa');
            $table->enum('jenis_kelamin', ['L', 'P'])->comment('L = Laki-laki, P = Perempuan');
            $table->date('tanggal_lahir')->comment('Tanggal lahir siswa');
            $table->text('alamat')->comment('Alamat siswa');
            $table->string('nomor_telepon')->comment('Nomor telepon/HP siswa');
            $table->string('foto')->nullable()->comment('Path foto siswa');
            $table->timestamps();
            
            // Indexes for performance
            $table->index('nis');
            $table->index('nama_lengkap');
            $table->index('kelas');
            $table->index(['kelas', 'created_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('students');
    }
};