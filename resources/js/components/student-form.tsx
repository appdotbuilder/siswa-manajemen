import React from 'react';
import { useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import InputError from '@/components/input-error';



interface StudentFormProps {
    student?: {
        id: number;
        nis: string;
        nama_lengkap: string;
        kelas: string;
        jenis_kelamin: string;
        tanggal_lahir: string;
        alamat: string;
        nomor_telepon: string;
        foto?: string;
    };
    title: string;
    submitRoute: string;
    method?: 'post' | 'put';
}

export function StudentForm({ student, title, submitRoute, method = 'post' }: StudentFormProps) {
    const { data, setData, post, processing, errors, transform } = useForm({
        nis: student?.nis || '',
        nama_lengkap: student?.nama_lengkap || '',
        kelas: student?.kelas || '',
        jenis_kelamin: student?.jenis_kelamin || '',
        tanggal_lahir: student?.tanggal_lahir || '',
        alamat: student?.alamat || '',
        nomor_telepon: student?.nomor_telepon || '',
        foto: null as File | null,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        transform((data) => ({
            ...data,
            _method: method === 'put' ? 'PUT' : undefined,
        }));
        
        if (method === 'put' && student) {
            post(route(submitRoute, student.id));
        } else {
            post(route(submitRoute));
        }
    };

    return (
        <Card className="max-w-2xl mx-auto">
            <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="nis">Nomor Induk Siswa (NIS) *</Label>
                            <Input
                                id="nis"
                                type="text"
                                value={data.nis}
                                onChange={e => setData('nis', e.target.value)}
                                placeholder="Masukkan NIS"
                                required
                            />
                            <InputError message={errors.nis} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nama_lengkap">Nama Lengkap *</Label>
                            <Input
                                id="nama_lengkap"
                                type="text"
                                value={data.nama_lengkap}
                                onChange={e => setData('nama_lengkap', e.target.value)}
                                placeholder="Masukkan nama lengkap"
                                required
                            />
                            <InputError message={errors.nama_lengkap} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="kelas">Kelas *</Label>
                            <Select value={data.kelas} onValueChange={value => setData('kelas', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih kelas" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="X">X</SelectItem>
                                    <SelectItem value="XI">XI</SelectItem>
                                    <SelectItem value="XII">XII</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.kelas} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="jenis_kelamin">Jenis Kelamin *</Label>
                            <Select value={data.jenis_kelamin} onValueChange={value => setData('jenis_kelamin', value)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Pilih jenis kelamin" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="L">Laki-laki</SelectItem>
                                    <SelectItem value="P">Perempuan</SelectItem>
                                </SelectContent>
                            </Select>
                            <InputError message={errors.jenis_kelamin} />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="tanggal_lahir">Tanggal Lahir *</Label>
                            <Input
                                id="tanggal_lahir"
                                type="date"
                                value={data.tanggal_lahir}
                                onChange={e => setData('tanggal_lahir', e.target.value)}
                                required
                            />
                            <InputError message={errors.tanggal_lahir} />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nomor_telepon">Nomor Telepon *</Label>
                            <Input
                                id="nomor_telepon"
                                type="tel"
                                value={data.nomor_telepon}
                                onChange={e => setData('nomor_telepon', e.target.value)}
                                placeholder="Masukkan nomor telepon"
                                required
                            />
                            <InputError message={errors.nomor_telepon} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="alamat">Alamat *</Label>
                        <Textarea
                            id="alamat"
                            value={data.alamat}
                            onChange={e => setData('alamat', e.target.value)}
                            placeholder="Masukkan alamat lengkap"
                            rows={3}
                            required
                        />
                        <InputError message={errors.alamat} />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="foto">Foto Siswa</Label>
                        <Input
                            id="foto"
                            type="file"
                            accept="image/*"
                            onChange={e => setData('foto', e.target.files?.[0] || null)}
                        />
                        <p className="text-sm text-muted-foreground">
                            Format: JPG, PNG, GIF. Maksimal 2MB.
                        </p>
                        <InputError message={errors.foto} />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <Button type="submit" disabled={processing} className="flex-1">
                            {processing ? 'Menyimpan...' : 'Simpan Data'}
                        </Button>
                        <Button 
                            type="button" 
                            variant="outline" 
                            onClick={() => window.history.back()}
                            className="flex-1"
                        >
                            Kembali
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}