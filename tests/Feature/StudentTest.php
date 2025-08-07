<?php

namespace Tests\Feature;

use App\Models\Student;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class StudentTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_view_students_index_page(): void
    {
        Student::factory(3)->create();

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('welcome')
                 ->has('students.data', 3)
        );
    }

    public function test_can_search_students(): void
    {
        $student1 = Student::factory()->create(['nama_lengkap' => 'John Doe']);
        $student2 = Student::factory()->create(['nama_lengkap' => 'Jane Smith']);

        $response = $this->get('/?search=John');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->has('students.data', 1)
        );
    }

    public function test_can_filter_students_by_class(): void
    {
        Student::factory()->create(['kelas' => 'X']);
        Student::factory()->create(['kelas' => 'XI']);
        Student::factory()->create(['kelas' => 'XII']);

        $response = $this->get('/?kelas=X');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->has('students.data', 1)
        );
    }

    public function test_can_view_create_student_page(): void
    {
        $response = $this->get('/students/create');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('students/create')
        );
    }

    public function test_can_create_student(): void
    {
        Storage::fake('public');

        $studentData = [
            'nis' => '1234567890',
            'nama_lengkap' => 'Test Student',
            'kelas' => 'X',
            'jenis_kelamin' => 'L',
            'tanggal_lahir' => '2005-01-01',
            'alamat' => 'Test Address',
            'nomor_telepon' => '08123456789',
        ];

        $response = $this->post('/students', $studentData);

        $response->assertRedirect('/');
        $this->assertDatabaseHas('students', [
            'nis' => '1234567890',
            'nama_lengkap' => 'Test Student',
            'kelas' => 'X',
            'jenis_kelamin' => 'L',
            'alamat' => 'Test Address',
            'nomor_telepon' => '08123456789',
        ]);
    }

    public function test_can_create_student_with_photo(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('student.jpg');

        $studentData = [
            'nis' => '1234567890',
            'nama_lengkap' => 'Test Student',
            'kelas' => 'X',
            'jenis_kelamin' => 'L',
            'tanggal_lahir' => '2005-01-01',
            'alamat' => 'Test Address',
            'nomor_telepon' => '08123456789',
            'foto' => $file,
        ];

        $response = $this->post('/students', $studentData);

        $response->assertRedirect('/');
        $student = Student::first();
        $this->assertNotNull($student->foto);
        Storage::disk('public')->assertExists($student->foto);
    }

    public function test_validates_required_fields_when_creating_student(): void
    {
        $response = $this->post('/students', []);

        $response->assertSessionHasErrors([
            'nis',
            'nama_lengkap',
            'kelas',
            'jenis_kelamin',
            'tanggal_lahir',
            'alamat',
            'nomor_telepon',
        ]);
    }

    public function test_validates_unique_nis_when_creating_student(): void
    {
        Student::factory()->create(['nis' => '1234567890']);

        $studentData = [
            'nis' => '1234567890',
            'nama_lengkap' => 'Test Student',
            'kelas' => 'X',
            'jenis_kelamin' => 'L',
            'tanggal_lahir' => '2005-01-01',
            'alamat' => 'Test Address',
            'nomor_telepon' => '08123456789',
        ];

        $response = $this->post('/students', $studentData);

        $response->assertSessionHasErrors(['nis']);
    }

    public function test_can_view_student_detail(): void
    {
        $student = Student::factory()->create();

        $response = $this->get("/students/{$student->id}");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('students/show')
                 ->has('student')
                 ->where('student.id', $student->id)
        );
    }

    public function test_can_view_edit_student_page(): void
    {
        $student = Student::factory()->create();

        $response = $this->get("/students/{$student->id}/edit");

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('students/edit')
                 ->has('student')
                 ->where('student.id', $student->id)
        );
    }

    public function test_can_update_student(): void
    {
        $student = Student::factory()->create();

        $updateData = [
            'nis' => $student->nis,
            'nama_lengkap' => 'Updated Name',
            'kelas' => 'XI',
            'jenis_kelamin' => 'P',
            'tanggal_lahir' => '2005-02-02',
            'alamat' => 'Updated Address',
            'nomor_telepon' => '08987654321',
        ];

        $response = $this->put("/students/{$student->id}", $updateData);

        $response->assertRedirect("/students/{$student->id}");
        $this->assertDatabaseHas('students', [
            'nis' => $student->nis,
            'nama_lengkap' => 'Updated Name',
            'kelas' => 'XI',
            'jenis_kelamin' => 'P',
            'alamat' => 'Updated Address',
            'nomor_telepon' => '08987654321',
        ]);
    }

    public function test_can_update_student_photo(): void
    {
        Storage::fake('public');

        $student = Student::factory()->create(['foto' => 'students/old-photo.jpg']);
        Storage::disk('public')->put('students/old-photo.jpg', 'old content');

        $newFile = UploadedFile::fake()->image('new-student.jpg');

        $updateData = [
            'nis' => $student->nis,
            'nama_lengkap' => $student->nama_lengkap,
            'kelas' => $student->kelas,
            'jenis_kelamin' => $student->jenis_kelamin,
            'tanggal_lahir' => $student->tanggal_lahir,
            'alamat' => $student->alamat,
            'nomor_telepon' => $student->nomor_telepon,
            'foto' => $newFile,
        ];

        $response = $this->put("/students/{$student->id}", $updateData);

        $response->assertRedirect("/students/{$student->id}");
        
        $student->refresh();
        $this->assertNotNull($student->foto);
        $this->assertNotEquals('students/old-photo.jpg', $student->foto);
        
        Storage::disk('public')->assertExists($student->foto);
        Storage::disk('public')->assertMissing('students/old-photo.jpg');
    }

    public function test_can_delete_student(): void
    {
        Storage::fake('public');

        $student = Student::factory()->create(['foto' => 'students/photo.jpg']);
        Storage::disk('public')->put('students/photo.jpg', 'content');

        $response = $this->delete("/students/{$student->id}");

        $response->assertRedirect('/');
        $this->assertDatabaseMissing('students', ['id' => $student->id]);
        Storage::disk('public')->assertMissing('students/photo.jpg');
    }

    public function test_student_display_name_attribute(): void
    {
        $student = Student::factory()->create([
            'nama_lengkap' => 'John Doe',
            'nis' => '1234567890'
        ]);

        $this->assertEquals('John Doe (1234567890)', $student->display_name);
    }

    public function test_student_gender_label_attribute(): void
    {
        $maleStudent = Student::factory()->create(['jenis_kelamin' => 'L']);
        $femaleStudent = Student::factory()->create(['jenis_kelamin' => 'P']);

        $this->assertEquals('Laki-laki', $maleStudent->gender_label);
        $this->assertEquals('Perempuan', $femaleStudent->gender_label);
    }
}