import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StudentCard } from '@/components/student-card';
import { PlusIcon, SearchIcon, UsersIcon, GraduationCapIcon, BookOpenIcon } from 'lucide-react';

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

interface PaginationData {
    data: Student[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    students: PaginationData;
    filters: {
        search: string;
        kelas: string;
    };
    [key: string]: unknown;
}

export default function Welcome({ students, filters }: Props) {
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const search = formData.get('search') as string;
        const kelas = formData.get('kelas') as string;
        
        router.get('/', { search, kelas }, { preserveState: true });
    };

    const handleFilterChange = (field: string, value: string) => {
        router.get('/', { ...filters, [field]: value }, { preserveState: true });
    };

    const getClassStats = () => {
        const stats = { X: 0, XI: 0, XII: 0 };
        students.data.forEach(student => {
            if (student.kelas in stats) {
                stats[student.kelas as keyof typeof stats]++;
            }
        });
        return stats;
    };

    const classStats = getClassStats();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <div className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="text-center mb-8">
                        <div className="flex items-center justify-center gap-3 mb-4">
                            <GraduationCapIcon className="w-12 h-12 text-indigo-600" />
                            <h1 className="text-4xl font-bold text-gray-900">
                                📚 Sistem Manajemen Data Siswa
                            </h1>
                        </div>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Kelola data siswa dengan mudah dan efisien. Tambah, edit, lihat, dan hapus informasi siswa dalam satu platform yang terintegrasi.
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <Card>
                            <CardContent className="p-4 text-center">
                                <UsersIcon className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                                <h3 className="font-semibold text-2xl">{students.total}</h3>
                                <p className="text-sm text-gray-600">Total Siswa</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <BookOpenIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                                <h3 className="font-semibold text-2xl">{classStats.X}</h3>
                                <p className="text-sm text-gray-600">Kelas X</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <BookOpenIcon className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                                <h3 className="font-semibold text-2xl">{classStats.XI}</h3>
                                <p className="text-sm text-gray-600">Kelas XI</p>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <BookOpenIcon className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                                <h3 className="font-semibold text-2xl">{classStats.XII}</h3>
                                <p className="text-sm text-gray-600">Kelas XII</p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Search and Filter */}
                    <Card className="mb-8">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <SearchIcon className="w-5 h-5" />
                                Pencarian & Filter
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
                                <div className="flex-1">
                                    <Input
                                        name="search"
                                        placeholder="Cari berdasarkan nama atau NIS..."
                                        defaultValue={filters.search}
                                        className="w-full"
                                    />
                                </div>
                                <div className="w-full md:w-48">
                                    <Select 
                                        name="kelas" 
                                        defaultValue={filters.kelas}
                                        onValueChange={(value) => handleFilterChange('kelas', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Semua Kelas" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">Semua Kelas</SelectItem>
                                            <SelectItem value="X">Kelas X</SelectItem>
                                            <SelectItem value="XI">Kelas XI</SelectItem>
                                            <SelectItem value="XII">Kelas XII</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button type="submit" className="w-full md:w-auto">
                                    <SearchIcon className="w-4 h-4 mr-2" />
                                    Cari
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Add Button */}
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-900">
                            Daftar Siswa ({students.total} siswa)
                        </h2>
                        <Button asChild size="lg">
                            <Link href={route('students.create')}>
                                <PlusIcon className="w-5 h-5 mr-2" />
                                Tambah Siswa Baru
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Students List */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {students.data.length === 0 ? (
                    <Card className="text-center py-12">
                        <CardContent>
                            <UsersIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                {filters.search || filters.kelas !== 'all' ? 'Tidak ada siswa yang ditemukan' : 'Belum ada data siswa'}
                            </h3>
                            <p className="text-gray-600 mb-4">
                                {filters.search || filters.kelas !== 'all' 
                                    ? 'Coba ubah kriteria pencarian atau filter'
                                    : 'Mulai dengan menambahkan siswa pertama'
                                }
                            </p>
                            <Button asChild>
                                <Link href={route('students.create')}>
                                    <PlusIcon className="w-4 h-4 mr-2" />
                                    Tambah Siswa
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <>
                        <div className="grid gap-6">
                            {students.data.map((student) => (
                                <StudentCard key={student.id} student={student} />
                            ))}
                        </div>

                        {/* Pagination */}
                        {students.last_page > 1 && (
                            <div className="flex justify-center mt-8">
                                <nav className="flex items-center gap-1">
                                    {students.links.map((link, index) => (
                                        <Link
                                            key={index}
                                            href={link.url || '#'}
                                            className={`px-3 py-2 rounded-md text-sm font-medium ${
                                                link.active
                                                    ? 'bg-indigo-600 text-white'
                                                    : link.url
                                                    ? 'bg-white text-gray-700 hover:bg-gray-50 border'
                                                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                            }`}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </nav>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}