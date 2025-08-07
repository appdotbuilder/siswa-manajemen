import React from 'react';
import { Link } from '@inertiajs/react';
import { StudentForm } from '@/components/student-form';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, GraduationCapIcon } from 'lucide-react';

interface Student {
    id: number;
    nis: string;
    nama_lengkap: string;
    kelas: string;
    jenis_kelamin: string;
    tanggal_lahir: string;
    alamat: string;
    nomor_telepon: string;
    foto?: string;
}

interface Props {
    student: Student;
    [key: string]: unknown;
}

export default function EditStudent({ student }: Props) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <Button variant="outline" size="sm" asChild>
                            <Link href={route('students.index')}>
                                <ArrowLeftIcon className="w-4 h-4 mr-2" />
                                Kembali ke Daftar
                            </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                            <Link href={route('students.show', student.id)}>
                                Lihat Detail
                            </Link>
                        </Button>
                    </div>
                    
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <GraduationCapIcon className="w-10 h-10 text-indigo-600" />
                            <h1 className="text-3xl font-bold text-gray-900">
                                ✏️ Edit Data Siswa
                            </h1>
                        </div>
                        <p className="text-gray-600">
                            Perbarui informasi siswa: <strong>{student.nama_lengkap}</strong> (NIS: {student.nis})
                        </p>
                    </div>
                </div>

                {/* Form */}
                <StudentForm
                    student={student}
                    title="Form Edit Data Siswa"
                    submitRoute="students.update"
                    method="put"
                />
            </div>
        </div>
    );
}