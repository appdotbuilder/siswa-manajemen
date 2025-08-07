import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
    ArrowLeftIcon, 
    PencilIcon, 
    TrashIcon, 
    CalendarIcon, 
    MapPinIcon, 
    PhoneIcon,
    UserIcon,
    GraduationCapIcon,
    IdCardIcon
} from 'lucide-react';

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

export default function ShowStudent({ student }: Props) {
    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus data siswa ini? Tindakan ini tidak dapat dibatalkan.')) {
            router.delete(route('students.destroy', student.id));
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word.charAt(0))
            .join('')
            .toUpperCase()
            .slice(0, 2);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            weekday: 'long',
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    const calculateAge = (birthDate: string) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    };

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
                                👤 Detail Siswa
                            </h1>
                        </div>
                        <p className="text-gray-600">
                            Informasi lengkap data siswa
                        </p>
                    </div>
                </div>

                {/* Student Details */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Profile Card */}
                    <div className="lg:col-span-1">
                        <Card>
                            <CardHeader className="text-center pb-4">
                                <Avatar className="w-32 h-32 mx-auto mb-4">
                                    <AvatarImage 
                                        src={student.foto ? `/storage/${student.foto}` : undefined} 
                                        alt={student.nama_lengkap} 
                                    />
                                    <AvatarFallback className="text-2xl font-semibold">
                                        {getInitials(student.nama_lengkap)}
                                    </AvatarFallback>
                                </Avatar>
                                <CardTitle className="text-xl">{student.nama_lengkap}</CardTitle>
                                <p className="text-sm text-gray-600">NIS: {student.nis}</p>
                                <div className="flex justify-center gap-2 mt-4">
                                    <Badge variant="secondary">
                                        Kelas {student.kelas}
                                    </Badge>
                                    <Badge variant="outline">
                                        {student.jenis_kelamin === 'L' ? '👨 Laki-laki' : '👩 Perempuan'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-2">
                                    <Button className="flex-1" asChild>
                                        <Link href={route('students.edit', student.id)}>
                                            <PencilIcon className="w-4 h-4 mr-2" />
                                            Edit Data
                                        </Link>
                                    </Button>
                                    <Button variant="destructive" onClick={handleDelete}>
                                        <TrashIcon className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Information Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Personal Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <UserIcon className="w-5 h-5" />
                                    Informasi Personal
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Nama Lengkap</label>
                                            <p className="text-lg font-semibold text-gray-900">{student.nama_lengkap}</p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Nomor Induk Siswa</label>
                                            <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                                <IdCardIcon className="w-4 h-4" />
                                                {student.nis}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Jenis Kelamin</label>
                                            <p className="text-lg font-semibold text-gray-900">
                                                {student.jenis_kelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Kelas</label>
                                            <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                                <GraduationCapIcon className="w-4 h-4" />
                                                Kelas {student.kelas}
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Tanggal Lahir</label>
                                            <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                                <CalendarIcon className="w-4 h-4" />
                                                {formatDate(student.tanggal_lahir)}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Usia: {calculateAge(student.tanggal_lahir)} tahun
                                            </p>
                                        </div>
                                        <div>
                                            <label className="text-sm font-medium text-gray-500">Nomor Telepon</label>
                                            <p className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                                <PhoneIcon className="w-4 h-4" />
                                                <a 
                                                    href={`tel:${student.nomor_telepon}`} 
                                                    className="hover:text-blue-600 transition-colors"
                                                >
                                                    {student.nomor_telepon}
                                                </a>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Address Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <MapPinIcon className="w-5 h-5" />
                                    Alamat
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-900 leading-relaxed">
                                    {student.alamat}
                                </p>
                            </CardContent>
                        </Card>

                        {/* Quick Actions */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Aksi Cepat</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <Button variant="outline" asChild className="h-20 flex-col gap-2">
                                        <Link href={route('students.edit', student.id)}>
                                            <PencilIcon className="w-6 h-6" />
                                            <span>Edit Data</span>
                                        </Link>
                                    </Button>
                                    <Button variant="outline" asChild className="h-20 flex-col gap-2">
                                        <a href={`tel:${student.nomor_telepon}`}>
                                            <PhoneIcon className="w-6 h-6" />
                                            <span>Hubungi</span>
                                        </a>
                                    </Button>
                                    <Button 
                                        variant="outline" 
                                        onClick={() => window.print()}
                                        className="h-20 flex-col gap-2"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                        </svg>
                                        <span>Cetak</span>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}