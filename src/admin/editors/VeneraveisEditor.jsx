import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';

const STORAGE_BUCKET = 'veneraveis';
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE_MB = 5;

const normalizeFileName = (value) => {
    const normalized = (value || 'veneravel')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return normalized || 'veneravel';
};

const getImageExtension = (file) => {
    const extensionByType = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/webp': 'webp'
    };

    return extensionByType[file.type] || file.name.split('.').pop()?.toLowerCase() || 'jpg';
};

const VeneraveisEditor = ({ content, onUpdate }) => {
    const [data, setData] = useState(content || {
        tag: 'Patrimônio da Loja',
        title: 'Galeria Histórica dos Veneráveis Mestres',
        description: 'Registro permanente dos Irmãos que conduziram os trabalhos da Loja ao longo de sua história.',
        members: []
    });
    const [uploadingIndex, setUploadingIndex] = useState(null);

    const handleItemChange = (index, field, value) => {
        const newItems = [...(data.members || [])];
        newItems[index] = { ...newItems[index], [field]: value };
        setData({ ...data, members: newItems });
    };

    const handlePhotoUpload = async (index, file) => {
        if (!file) return;

        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
            alert('Formato inválido. Envie uma imagem JPG, PNG ou WebP.');
            return;
        }

        if (file.size > MAX_IMAGE_SIZE_MB * 1024 * 1024) {
            alert(`Imagem muito grande. O limite atual é ${MAX_IMAGE_SIZE_MB} MB.`);
            return;
        }

        const member = data.members?.[index] || {};
        const extension = getImageExtension(file);
        const fileName = `${normalizeFileName(member.name)}-${Date.now()}.${extension}`;
        const storagePath = `fotos/${fileName}`;

        setUploadingIndex(index);

        try {
            const { error: uploadError } = await supabase
                .storage
                .from(STORAGE_BUCKET)
                .upload(storagePath, file, {
                    cacheControl: '3600',
                    contentType: file.type,
                    upsert: false
                });

            if (uploadError) {
                throw uploadError;
            }

            const { data: publicUrlData } = supabase
                .storage
                .from(STORAGE_BUCKET)
                .getPublicUrl(storagePath);

            const publicUrl = publicUrlData?.publicUrl;

            if (!publicUrl) {
                throw new Error('Upload realizado, mas não foi possível gerar a URL pública da imagem.');
            }

            handleItemChange(index, 'photo', publicUrl);
            alert('Foto enviada ao Supabase. Clique em "Salvar Alterações" para publicar a foto na galeria.');
        } catch (error) {
            console.error('Erro ao enviar foto para o Supabase Storage:', error);
            alert(`Falha ao enviar a foto: ${error.message || 'verifique o bucket e as permissões do Supabase Storage.'}`);
        } finally {
            setUploadingIndex(null);
        }
    };

    const handleAdd = () => {
        setData({
            ...data,
            members: [...(data.members || []), { role: 'Venerável Mestre', name: 'Nome do Irmão', year: '', photo: '' }]
        });
    };

    const handleSave = async () => {
        try {
            await onUpdate(data);
            alert('Galeria Histórica dos Veneráveis Mestres atualizada com sucesso!');
        } catch (error) {
            console.error('Erro ao salvar Veneráveis:', error);
            alert('Falha ao salvar a Galeria Histórica dos Veneráveis Mestres. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className="editor-container">
            <div className="admin-page-header">
                <h1>Editor: Galeria Histórica dos Veneráveis Mestres</h1>
                <button className="btn-save" onClick={handleSave}>Salvar Alterações</button>
            </div>

            <div className="admin-card">
                <div style={{ marginBottom: '24px', padding: '18px', border: '1px solid var(--admin-border)', borderRadius: '12px', background: 'rgba(212, 175, 55, 0.08)' }}>
                    <h2 style={{ margin: '0 0 12px', fontSize: '1.15rem', color: 'var(--admin-text)' }}>
                        Ações para você iniciar o carregamento
                    </h2>
                    <ol style={{ margin: 0, paddingLeft: '22px', color: 'var(--admin-muted)', lineHeight: 1.7 }}>
                        <li>Entrar no painel administrativo.</li>
                        <li>Acessar <strong>Galeria Veneráveis</strong>.</li>
                        <li>Clicar em <strong>Adicionar Irmão</strong>.</li>
                        <li>Preencher <strong>Cargo</strong>, <strong>Nome do Irmão</strong> e <strong>Ano/Período</strong>.</li>
                        <li>Clicar em <strong>Enviar Foto para o Supabase</strong> e selecionar uma imagem JPG, PNG ou WebP.</li>
                        <li>Conferir a prévia da imagem e clicar em <strong>Salvar Alterações</strong>.</li>
                    </ol>
                </div>
                <div className="editor-form">
                    <div className="form-group">
                        <label>Título da Seção</label>
                        <input
                            type="text"
                            value={data.title}
                            onChange={(e) => setData({ ...data, title: e.target.value })}
                        />
                    </div>
                    <div className="form-group">
                        <label>Descrição</label>
                        <textarea
                            value={data.description}
                            onChange={(e) => setData({ ...data, description: e.target.value })}
                            rows={3}
                        />
                    </div>
                </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <button className="btn-save" onClick={handleAdd} style={{ width: 'auto', padding: '12px 18px' }}>
                    Adicionar Irmão
                </button>
            </div>

            <div className="admin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                {(data.members || []).map((member, index) => (
                    <div key={index} className="admin-card member-edit-card">
                        <div className="member-edit-header" style={{ marginBottom: '15px', borderBottom: '1px solid var(--admin-border)', paddingBottom: '10px' }}>
                            <span className="badge" style={{ background: 'var(--admin-gold)', color: '#000', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                                {member.role}
                            </span>
                        </div>
                        <div className="editor-form">
                            <div className="form-group">
                                <label>Cargo</label>
                                <input
                                    type="text"
                                    value={member.role}
                                    onChange={(e) => handleItemChange(index, 'role', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Nome do Irmão</label>
                                <input
                                    type="text"
                                    value={member.name}
                                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Ano/Período</label>
                                <input
                                    type="text"
                                    placeholder="Ex.: 2024, 2024–2025 ou 1998/1999"
                                    value={member.year || ''}
                                    onChange={(e) => handleItemChange(index, 'year', e.target.value)}
                                />
                            </div>
                            <div className="form-group">
                                <label>Foto do Venerável Mestre</label>
                                {member.photo ? (
                                    <div style={{ marginBottom: '12px' }}>
                                        <img
                                            src={member.photo}
                                            alt={member.name || 'Prévia da foto'}
                                            style={{ width: '100%', maxHeight: '220px', objectFit: 'cover', borderRadius: '12px', border: '1px solid var(--admin-border)' }}
                                        />
                                    </div>
                                ) : null}
                                <input
                                    type="file"
                                    accept="image/jpeg,image/png,image/webp"
                                    disabled={uploadingIndex === index}
                                    onChange={(event) => {
                                        const file = event.target.files?.[0];
                                        handlePhotoUpload(index, file);
                                        event.target.value = '';
                                    }}
                                />
                                <small style={{ display: 'block', marginTop: '8px', color: 'var(--admin-muted)', lineHeight: 1.5 }}>
                                    {uploadingIndex === index
                                        ? 'Enviando foto para o Supabase...'
                                        : 'A imagem será salva no bucket público veneraveis do Supabase Storage.'}
                                </small>
                            </div>
                            <div className="form-group">
                                <label>URL pública da Foto</label>
                                <input
                                    type="text"
                                    placeholder="A URL será preenchida após o upload"
                                    value={member.photo || ''}
                                    onChange={(e) => handleItemChange(index, 'photo', e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default VeneraveisEditor;
