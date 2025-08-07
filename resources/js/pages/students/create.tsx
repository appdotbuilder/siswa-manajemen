import React from 'react';
import { Link } from '@inertiajs/react';
import { StudentForm } from '@/components/student-form';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, GraduationCapIcon } from 'lucide-react';

export default function CreateStudent() {
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
                    </div>
                    
                    <div className="text-center">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <GraduationCapIcon className="w-10 h-10 text-indigo-600" />
                            <h1 className="text-3xl font-bold text-gray-900">
                                ➕ Tambah Siswa Baru
                            </h1>
                        </div>
                        <p className="text-gray-600">
                            Lengkapi form di bawah untuk menambahkan data siswa baru
                        </p>
                    </div>
                </div>

                {/* Form */}
                <StudentForm
                    title="Form Data Siswa Baru"
                    submitRoute="students.store"
                    method="post"
                />
            </div>
        </div>
    );
}