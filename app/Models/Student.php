<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Student
 *
 * @property int $id
 * @property string $nis
 * @property string $nama_lengkap
 * @property string $kelas
 * @property string $jenis_kelamin
 * @property \Illuminate\Support\Carbon $tanggal_lahir
 * @property string $alamat
 * @property string $nomor_telepon
 * @property string|null $foto
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Student newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Student newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Student query()
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereAlamat($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereFoto($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereJenisKelamin($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereKelas($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereNamaLengkap($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereNis($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereNomorTelepon($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereTanggalLahir($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Student whereUpdatedAt($value)
 * @method static \Database\Factories\StudentFactory factory($count = null, $state = [])
 * @method static Student create(array $attributes = [])
 * @method static Student firstOrCreate(array $attributes = [], array $values = [])
 * 
 * @mixin \Eloquent
 */
class Student extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nis',
        'nama_lengkap',
        'kelas',
        'jenis_kelamin',
        'tanggal_lahir',
        'alamat',
        'nomor_telepon',
        'foto',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_lahir' => 'date',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * The table associated with the model.
     *
     * @var string
     */
    protected $table = 'students';

    /**
     * Get the student's full name with NIS.
     *
     * @return string
     */
    public function getDisplayNameAttribute(): string
    {
        return $this->nama_lengkap . ' (' . $this->nis . ')';
    }

    /**
     * Get the student's gender in Indonesian.
     *
     * @return string
     */
    public function getGenderLabelAttribute(): string
    {
        return $this->jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan';
    }
}