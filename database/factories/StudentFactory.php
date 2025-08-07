<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nis' => fake()->unique()->numerify('##########'),
            'nama_lengkap' => fake('id_ID')->name(),
            'kelas' => fake()->randomElement(['X', 'XI', 'XII']),
            'jenis_kelamin' => fake()->randomElement(['L', 'P']),
            'tanggal_lahir' => fake()->dateTimeBetween('-18 years', '-15 years')->format('Y-m-d'),
            'alamat' => fake('id_ID')->address(),
            'nomor_telepon' => fake('id_ID')->phoneNumber(),
        ];
    }
}