import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { CalendarIcon, MapPinIcon, PhoneIcon, EyeIcon, PencilIcon, TrashIcon } from 'lucide-react';

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

interface StudentCardProps {
    student: Student;
}

export function StudentCard({ student }: StudentCardProps) {
    const handleDelete = () => {
        if (confirm('Apakah Anda yakin ingin menghapus data siswa ini?')) {
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
            day: '2-digit',
            month: 'long',
            year: 'numeric'
        });
    };

    return (
        <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
                <div className="flex items-start gap-4">
                    <Avatar className="w-16 h-16">
                        <AvatarImage 
                            src={student.foto ? `/storage/${student.foto}` : undefined} 
                            alt={student.nama_lengkap} 
                        />
                        <AvatarFallback className="text-lg font-semibold">
                            {getInitials(student.nama_lengkap)}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                        <div>
                            <h3 className="font-semibold text-lg text-gray-900">{student.nama_lengkap}</h3>
                            <p className="text-sm text-gray-600">NIS: {student.nis}</p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary" className="text-xs">
                                Kelas {student.kelas}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                                {student.jenis_kelamin === 'L' ? '👨 Laki-laki' : '👩 Perempuan'}
                            </Badge>
                        </div>

                        <div className="space-y-2 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-4 h-4" />
                                <span>{formatDate(student.tanggal_lahir)}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <PhoneIcon className="w-4 h-4" />
                                <span>{student.nomor_telepon}</span>
                            </div>
                            <div className="flex items-start gap-2">
                                <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span className="line-clamp-2">{student.alamat}</span>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button size="sm" variant="outline" asChild>
                                <Link href={route('students.show', student.id)}>
                                    <EyeIcon className="w-4 h-4 mr-1" />
                                    Lihat
                                </Link>
                            </Button>
                            <Button size="sm" variant="outline" asChild>
                                <Link href={route('students.edit', student.id)}>
                                    <PencilIcon className="w-4 h-4 mr-1" />
                                    Edit
                                </Link>
                            </Button>
                            <Button size="sm" variant="destructive" onClick={handleDelete}>
                                <TrashIcon className="w-4 h-4 mr-1" />
                                Hapus
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}