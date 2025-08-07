<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Student::query();

        // Search functionality
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('nama_lengkap', 'like', '%' . $search . '%')
                  ->orWhere('nis', 'like', '%' . $search . '%');
            });
        }

        // Filter by class
        if ($request->has('kelas') && $request->kelas && $request->kelas !== 'all') {
            $query->where('kelas', $request->kelas);
        }

        $students = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('welcome', [
            'students' => $students,
            'filters' => [
                'search' => $request->search ?? '',
                'kelas' => $request->kelas ?? 'all',
            ]
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('students/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        $data = $request->validated();

        // Handle file upload
        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('students', 'public');
        }

        Student::create($data);

        return redirect()->route('students.index')
            ->with('success', 'Data siswa berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Student $student)
    {
        return Inertia::render('students/show', [
            'student' => $student
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        return Inertia::render('students/edit', [
            'student' => $student
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $data = $request->validated();

        // Handle file upload
        if ($request->hasFile('foto')) {
            // Delete old photo if exists
            if ($student->foto) {
                Storage::disk('public')->delete($student->foto);
            }
            $data['foto'] = $request->file('foto')->store('students', 'public');
        }

        $student->update($data);

        return redirect()->route('students.show', $student)
            ->with('success', 'Data siswa berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        // Delete photo if exists
        if ($student->foto) {
            Storage::disk('public')->delete($student->foto);
        }

        $student->delete();

        return redirect()->route('students.index')
            ->with('success', 'Data siswa berhasil dihapus.');
    }
}