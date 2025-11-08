"use client";

import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Calendar, Tag, Image, FileText, Save, X } from 'lucide-react';
import uploadImageToImgBB from '@/components/imagebbUpload/ImageBbUpload';
import useAxiosPrivate from '@/hook/useAxiosPrivate';

const ProjectManagePage = () => {
    const [projects, setProjects] = useState([]);
    const AxiosSecure = useAxiosPrivate();
    
    const fetchProject = async () => {
        try {
            const response = await AxiosSecure.get('/api/project');
            setProjects(response.data);
        } catch (error) {
            console.error('Error fetching projects:', error);
        }
    };
    
    useEffect(() => {
        fetchProject();
    }, []);

    const [showForm, setShowForm] = useState(false);
    const [editingProject, setEditingProject] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        status: 'Planning',
        startDate: '',
        endDate: '',
        coverImage: '',
        videoId: '',
        description: '',
        galleryImages: ['', '', '', ''],
        content: [{ type: 'Heading', text: '' }]
    });

    const categories = ['Education', 'Healthcare', 'Environment', 'Community', 'Technology', 'Infrastructure'];
    const statuses = ['Planning', 'Ongoing', 'Completed', 'On Hold'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleInputCoverImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        
        try {
            const imageUrl = await uploadImageToImgBB(file);
            setFormData(prev => ({ ...prev, coverImage: imageUrl }));
        } catch (error) {
            console.error('Error uploading cover image:', error);
            alert('Failed to upload cover image');
        }
    };

    const handleGalleryImageChange = async (index, e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const imageUrl = await uploadImageToImgBB(file);
            const newGalleryImages = [...formData.galleryImages];
            newGalleryImages[index] = imageUrl;
            setFormData(prev => ({ ...prev, galleryImages: newGalleryImages }));
        } catch (error) {
            console.error('Error uploading gallery image:', error);
            alert('Failed to upload gallery image');
        }
    };

    const addGalleryImageField = () => {
        setFormData(prev => ({
            ...prev,
            galleryImages: [...prev.galleryImages, '']
        }));
    };

    const removeGalleryImage = (index) => {
        setFormData(prev => ({
            ...prev,
            galleryImages: prev.galleryImages.filter((_, i) => i !== index)
        }));
    };

    const handleContentChange = (index, field, value) => {
        const newContent = [...formData.content];
        newContent[index][field] = value;
        setFormData(prev => ({ ...prev, content: newContent }));
    };

    const addContentBlock = (type) => {
        setFormData(prev => ({
            ...prev,
            content: [...prev.content, { type, text: '' }]
        }));
    };

    const removeContentBlock = (index) => {
        setFormData(prev => ({
            ...prev,
            content: prev.content.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async () => {
        if (!formData.title || !formData.category || !formData.startDate  || !formData.coverImage || !formData.description) {
            alert('Please fill in all required fields');
            return;
        }

        try {
            if (editingProject) {
                // Update existing project
                await AxiosSecure.put(`/api/project/${editingProject._id}`, formData);
            } else {
                // Create new project
                await AxiosSecure.post('/api/project', formData);
            }
            
            fetchProject(); // Refresh the projects list
            resetForm();
        } catch (error) {
            console.error('Error saving project:', error);
            alert('Failed to save project');
        }
    };

    const resetForm = () => {
        setFormData({
            title: '',
            category: '',
            status: 'Planning',
            startDate: '',
            endDate: '',
            coverImage: '',
            videoId: '',
            description: '',
            galleryImages: ['', '', '', ''],
            content: [{ type: 'Heading', text: '' }]
        });
        setShowForm(false);
        setEditingProject(null);
    };

    const handleEdit = (project) => {
        setEditingProject(project);
        setFormData({
            ...project,
            galleryImages: project.galleryImages || ['', '', '', ''],
            content: project.content || [{ type: 'Heading', text: '' }]
        });
        setShowForm(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await AxiosSecure.delete(`/api/project/${id}`);
                fetchProject(); // Refresh the projects list
            } catch (error) {
                console.error('Error deleting project:', error);
                alert('Failed to delete project');
            }
        }
    };

    const getStatusColor = (status) => {
        const colors = {
            Planning: 'bg-yellow-100 text-yellow-800',
            Ongoing: 'bg-blue-100 text-blue-800',
            Completed: 'bg-green-100 text-green-800',
            'On Hold': 'bg-gray-100 text-gray-800'
        };
        return colors[status] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <div className="bg-white shadow-md border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">Project Management Dashboard</h1>
                            <p className="text-gray-600 mt-1">Manage your projects and track progress</p>
                        </div>
                        <button
                            onClick={() => setShowForm(true)}
                            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl"
                        >
                            <Plus className="w-5 h-5" />
                            New Project
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Total Projects</p>
                                <p className="text-3xl font-bold text-gray-800 mt-1">{projects.length}</p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <FileText className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Ongoing</p>
                                <p className="text-3xl font-bold text-blue-600 mt-1">
                                    {projects.filter(p => p.status === 'Ongoing').length}
                                </p>
                            </div>
                            <div className="p-3 bg-blue-100 rounded-lg">
                                <Calendar className="w-6 h-6 text-blue-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Completed</p>
                                <p className="text-3xl font-bold text-green-600 mt-1">
                                    {projects.filter(p => p.status === 'Completed').length}
                                </p>
                            </div>
                            <div className="p-3 bg-green-100 rounded-lg">
                                <Tag className="w-6 h-6 text-green-600" />
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-xl shadow-md p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-500 text-sm">Planning</p>
                                <p className="text-3xl font-bold text-yellow-600 mt-1">
                                    {projects.filter(p => p.status === 'Planning').length}
                                </p>
                            </div>
                            <div className="p-3 bg-yellow-100 rounded-lg">
                                <Calendar className="w-6 h-6 text-yellow-600" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Project</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Category</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Timeline</th>
                                    <th className="px-6 py-4 text-right text-sm font-semibold text-gray-700">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {projects.map((project) => (
                                    <tr key={project._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                {project.coverImage && (
                                                    <img 
                                                        src={project.coverImage} 
                                                        alt={project.title}
                                                        className="w-12 h-12 rounded-lg object-cover"
                                                    />
                                                )}
                                                <div>
                                                    <p className="font-semibold text-gray-800">{project.title}</p>
                                                    <p className="text-sm text-gray-500 line-clamp-1">{project.description}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                                                {project.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                                                {project.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {project.startDate} - {project.endDate}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button
                                                    onClick={() => handleEdit(project)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(project._id)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showForm && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
                    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl my-8">
                        <div className="flex items-center justify-between p-6 border-b">
                            <h2 className="text-2xl font-bold text-gray-800">
                                {editingProject ? 'Edit Project' : 'Create New Project'}
                            </h2>
                            <button
                                onClick={resetForm}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Project Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Enter project title"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Category *
                                    </label>
                                    <select
                                        name="category"
                                        value={formData.category}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        <option value="">Select category</option>
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Status *
                                    </label>
                                    <select
                                        name="status"
                                        value={formData.status}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    >
                                        {statuses.map(status => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        Start Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="startDate"
                                        value={formData.startDate}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        End Date *
                                    </label>
                                    <input
                                        type="date"
                                        name="endDate"
                                        value={formData.endDate}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                                        YouTube Video ID
                                    </label>
                                    <input
                                        type="text"
                                        name="videoId"
                                        value={formData.videoId}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="e.g., dQw4w9WgXcQ"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Description *
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={3}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Brief project description"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    <Image className="w-4 h-4 inline mr-1" />
                                    Cover Image *
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleInputCoverImageChange}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                {formData.coverImage && (
                                    <div className="mt-2">
                                        <img 
                                            src={formData.coverImage} 
                                            alt="Cover preview" 
                                            className="w-32 h-32 object-cover rounded-lg border"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Gallery Images
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addGalleryImageField}
                                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200"
                                    >
                                        + Add Image
                                    </button>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {formData.galleryImages.map((image, index) => (
                                        <div key={index} className="flex gap-2 items-start">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => handleGalleryImageChange(index, e)}
                                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                            {formData.galleryImages.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeGalleryImage(index)}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg mt-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                            {image && (
                                                <img 
                                                    src={image} 
                                                    alt={`Gallery preview ${index + 1}`}
                                                    className="w-16 h-16 object-cover rounded-lg border mt-1"
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between mb-3">
                                    <label className="block text-sm font-semibold text-gray-700">
                                        Project Content
                                    </label>
                                    <div className="flex gap-2">
                                        <button
                                            type="button"
                                            onClick={() => addContentBlock('Heading')}
                                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-200"
                                        >
                                            + Heading
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => addContentBlock('Paragraph')}
                                            className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200"
                                        >
                                            + Paragraph
                                        </button>
                                    </div>
                                </div>
                                <div className="space-y-3">
                                    {formData.content.map((block, index) => (
                                        <div key={index} className="flex gap-2">
                                            <select
                                                value={block.type}
                                                onChange={(e) => handleContentChange(index, 'type', e.target.value)}
                                                className="px-3 py-2 border border-gray-300 rounded-lg"
                                            >
                                                <option value="Heading">Heading</option>
                                                <option value="Paragraph">Paragraph</option>
                                            </select>
                                            {block.type === 'Heading' ? (
                                                <input
                                                    type="text"
                                                    value={block.text}
                                                    onChange={(e) => handleContentChange(index, 'text', e.target.value)}
                                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                                    placeholder="Heading text"
                                                />
                                            ) : (
                                                <textarea
                                                    value={block.text}
                                                    onChange={(e) => handleContentChange(index, 'text', e.target.value)}
                                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
                                                    rows={2}
                                                    placeholder="Paragraph text"
                                                />
                                            )}
                                            {formData.content.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => removeContentBlock(index)}
                                                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-3 pt-4 border-t">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-semibold"
                                >
                                    <Save className="w-5 h-5" />
                                    {editingProject ? 'Update Project' : 'Create Project'}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all font-semibold"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectManagePage;