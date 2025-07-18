import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  FileText, Plus, Search, Filter, Edit, Trash2, Eye, Image, 
  Calendar, User, Tag, ChevronDown, MoreHorizontal, 
  Download, Upload, Printer, Star, Clock, CheckCircle,
  XCircle, AlertTriangle, Settings, Send, Copy, BarChart3
} from 'lucide-react';
import { useBlog } from '../context/BlogContext';

const BlogManagement = () => {
  const {
    articles,
    stats,
    addArticle,
    updateArticle,
    deleteArticle,
    duplicateArticle,
    getArticlesByCategory,
    searchArticles
  } = useBlog();

  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedArticles, setSelectedArticles] = useState<number[]>([]);
  const [showAddArticle, setShowAddArticle] = useState(false);
  const [editingArticle, setEditingArticle] = useState<number | null>(null);

  const [newArticle, setNewArticle] = useState({
    title: '',
    category: 'education',
    excerpt: '',
    content: '',
    author: '',
    image: '',
    tags: [] as string[],
    status: 'draft' as 'draft' | 'published' | 'archived',
    featured: false,
    publishDate: new Date().toISOString().split('T')[0],
    seoTitle: '',
    seoDescription: '',
    readTime: 5
  });

  const categories = [
    { id: 'all', name: 'Toutes les catégories', color: 'bg-gray-100 text-gray-800' },
    { id: 'education', name: 'Éducation', color: 'bg-green-100 text-green-800' },
    { id: 'technology', name: 'Technologie', color: 'bg-blue-100 text-blue-800' },
    { id: 'safety', name: 'Sécurité', color: 'bg-red-100 text-red-800' },
    { id: 'news', name: 'Actualités', color: 'bg-purple-100 text-purple-800' }
  ];

  const statuses = [
    { id: 'all', name: 'Tous les statuts' },
    { id: 'draft', name: 'Brouillon' },
    { id: 'published', name: 'Publié' },
    { id: 'archived', name: 'Archivé' }
  ];

  const filteredArticles = articles.filter(article => {
    const matchesSearch = searchTerm === '' || searchArticles(searchTerm).includes(article);
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || article.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleArticleSelect = (articleId: number) => {
    setSelectedArticles(prev => 
      prev.includes(articleId) 
        ? prev.filter(id => id !== articleId)
        : [...prev, articleId]
    );
  };

  const handleSelectAll = () => {
    setSelectedArticles(
      selectedArticles.length === filteredArticles.length 
        ? [] 
        : filteredArticles.map(article => article.id)
    );
  };

  const handleStatusChange = (articleId: number, newStatus: 'draft' | 'published' | 'archived') => {
    updateArticle(articleId, { status: newStatus });
  };

  const handleDeleteArticle = (articleId: number) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) {
      deleteArticle(articleId);
    }
  };

  const handleAddArticle = () => {
    if (!newArticle.title.trim() || !newArticle.content.trim()) {
      alert('Le titre et le contenu sont requis');
      return;
    }

    addArticle({
      ...newArticle,
      readTime: Math.ceil(newArticle.content.split(' ').length / 200) // Estimation temps de lecture
    });

    setNewArticle({
      title: '',
      category: 'education',
      excerpt: '',
      content: '',
      author: '',
      image: '',
      tags: [],
      status: 'draft',
      featured: false,
      publishDate: new Date().toISOString().split('T')[0],
      seoTitle: '',
      seoDescription: '',
      readTime: 5
    });
    setShowAddArticle(false);
    alert('Article créé avec succès !');
  };

  const handleUpdateArticle = () => {
    if (editingArticle && newArticle.title.trim() && newArticle.content.trim()) {
      updateArticle(editingArticle, {
        ...newArticle,
        readTime: Math.ceil(newArticle.content.split(' ').length / 200)
      });
      setEditingArticle(null);
      setNewArticle({
        title: '',
        category: 'education',
        excerpt: '',
        content: '',
        author: '',
        image: '',
        tags: [],
        status: 'draft',
        featured: false,
        publishDate: new Date().toISOString().split('T')[0],
        seoTitle: '',
        seoDescription: '',
        readTime: 5
      });
      alert('Article mis à jour avec succès !');
    }
  };

  const startEditArticle = (article: any) => {
    setNewArticle({
      title: article.title,
      category: article.category,
      excerpt: article.excerpt,
      content: article.content,
      author: article.author,
      image: article.image,
      tags: article.tags || [],
      status: article.status,
      featured: article.featured,
      publishDate: article.publishDate,
      seoTitle: article.seoTitle || '',
      seoDescription: article.seoDescription || '',
      readTime: article.readTime
    });
    setEditingArticle(article.id);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-4 h-4" />;
      case 'draft': return <Clock className="w-4 h-4" />;
      case 'archived': return <XCircle className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (categoryId: string) => {
    const category = categories.find(c => c.id === categoryId);
    return category?.color || 'bg-gray-100 text-gray-800';
  };

  const handleExportCSV = () => {
    const headers = ['Titre', 'Catégorie', 'Auteur', 'Statut', 'Date de publication', 'Temps de lecture'];
    const csvContent = [
      headers.join(','),
      ...filteredArticles.map(article => [
        `"${article.title}"`,
        article.category,
        `"${article.author}"`,
        article.status,
        article.publishDate,
        `${article.readTime} min`
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `articles_blog_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !newArticle.tags.includes(tag.trim())) {
      setNewArticle(prev => ({
        ...prev,
        tags: [...prev.tags, tag.trim()]
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setNewArticle(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gestion du Blog</h1>
          <p className="text-gray-600">Gérez vos articles de blog et actualités</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4 mr-2" />
            Import
          </button>
          <button
            onClick={() => setShowAddArticle(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nouvel article
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Articles</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalArticles}</p>
            </div>
            <FileText className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Articles Publiés</p>
              <p className="text-2xl font-bold text-green-600">{stats.publishedArticles}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Brouillons</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.draftArticles}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Articles Vedettes</p>
              <p className="text-2xl font-bold text-purple-600">{stats.featuredArticles}</p>
            </div>
            <Star className="w-8 h-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filtres
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-600">
              {selectedArticles.length} sélectionné{selectedArticles.length > 1 ? 's' : ''}
            </span>
            {selectedArticles.length > 0 && (
              <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 transition-colors">
                Actions groupées
              </button>
            )}
          </div>
        </div>

        {/* Advanced Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>{category.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Statut</label>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  {statuses.map(status => (
                    <option key={status.id} value={status.id}>{status.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Auteur</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="all">Tous les auteurs</option>
                  <option value="amadou">Dr. Amadou Traoré</option>
                  <option value="fatoumata">Mme Fatoumata Sidibé</option>
                  <option value="ibrahim">Prof. Ibrahim Koné</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Articles Table */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedArticles.length === filteredArticles.length && filteredArticles.length > 0}
                    onChange={handleSelectAll}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Article
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Catégorie
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Auteur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredArticles.map((article) => (
                <tr key={article.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedArticles.includes(article.id)}
                      onChange={() => handleArticleSelect(article.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden mr-4">
                        <img
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{article.title}</div>
                        <div className="text-sm text-gray-500">{article.excerpt.substring(0, 50)}...</div>
                        {article.featured && (
                          <div className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800 mt-1">
                            <Star className="w-3 h-3 mr-1" />
                            Vedette
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                      {categories.find(c => c.id === article.category)?.name}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-900">{article.author}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={article.status}
                      onChange={(e) => handleStatusChange(article.id, e.target.value as any)}
                      className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusColor(article.status)}`}
                    >
                      <option value="draft">Brouillon</option>
                      <option value="published">Publié</option>
                      <option value="archived">Archivé</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(article.publishDate).toLocaleDateString('fr-FR')}
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {article.readTime} min de lecture
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => navigate(`/blog/article/${article.id}`)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Voir l'article"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => startEditArticle(article)}
                        className="text-green-600 hover:text-green-900"
                        title="Modifier"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => duplicateArticle(article.id)}
                        className="text-purple-600 hover:text-purple-900"
                        title="Dupliquer"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteArticle(article.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Supprimer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" title="Plus d'actions">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Article Modal */}
      {(showAddArticle || editingArticle) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingArticle ? 'Modifier l\'article' : 'Nouvel article'}
              </h2>
              <button
                onClick={() => {
                  setShowAddArticle(false);
                  setEditingArticle(null);
                  setNewArticle({
                    title: '',
                    category: 'education',
                    excerpt: '',
                    content: '',
                    author: '',
                    image: '',
                    tags: [],
                    status: 'draft',
                    featured: false,
                    publishDate: new Date().toISOString().split('T')[0],
                    seoTitle: '',
                    seoDescription: '',
                    readTime: 5
                  });
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Contenu principal */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Titre de l'article *
                    </label>
                    <input
                      type="text"
                      value={newArticle.title}
                      onChange={(e) => setNewArticle(prev => ({ ...prev, title: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Titre accrocheur de votre article"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Extrait/Résumé *
                    </label>
                    <textarea
                      value={newArticle.excerpt}
                      onChange={(e) => setNewArticle(prev => ({ ...prev, excerpt: e.target.value }))}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Résumé de l'article qui apparaîtra dans la liste"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Contenu de l'article *
                    </label>
                    <textarea
                      value={newArticle.content}
                      onChange={(e) => setNewArticle(prev => ({ ...prev, content: e.target.value }))}
                      rows={15}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Contenu complet de votre article..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Temps de lecture estimé: {Math.ceil(newArticle.content.split(' ').length / 200)} minutes
                    </p>
                  </div>

                  {/* SEO */}
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Optimisation SEO</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Titre SEO
                        </label>
                        <input
                          type="text"
                          value={newArticle.seoTitle}
                          onChange={(e) => setNewArticle(prev => ({ ...prev, seoTitle: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Titre optimisé pour les moteurs de recherche"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description SEO
                        </label>
                        <textarea
                          value={newArticle.seoDescription}
                          onChange={(e) => setNewArticle(prev => ({ ...prev, seoDescription: e.target.value }))}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Description pour les moteurs de recherche (160 caractères max)"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Paramètres de publication</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Statut
                        </label>
                        <select
                          value={newArticle.status}
                          onChange={(e) => setNewArticle(prev => ({ ...prev, status: e.target.value as any }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="draft">Brouillon</option>
                          <option value="published">Publié</option>
                          <option value="archived">Archivé</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Catégorie
                        </label>
                        <select
                          value={newArticle.category}
                          onChange={(e) => setNewArticle(prev => ({ ...prev, category: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          {categories.slice(1).map(category => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Auteur
                        </label>
                        <input
                          type="text"
                          value={newArticle.author}
                          onChange={(e) => setNewArticle(prev => ({ ...prev, author: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Nom de l'auteur"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date de publication
                        </label>
                        <input
                          type="date"
                          value={newArticle.publishDate}
                          onChange={(e) => setNewArticle(prev => ({ ...prev, publishDate: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={newArticle.featured}
                            onChange={(e) => setNewArticle(prev => ({ ...prev, featured: e.target.checked }))}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">Article vedette</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Image de couverture</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        URL de l'image
                      </label>
                      <input
                        type="url"
                        value={newArticle.image}
                        onChange={(e) => setNewArticle(prev => ({ ...prev, image: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="https://example.com/image.jpg"
                      />
                      {newArticle.image && (
                        <div className="mt-2">
                          <img
                            src={newArticle.image}
                            alt="Aperçu"
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Tags</h3>
                    <div className="space-y-2">
                      {newArticle.tags.map((tag, index) => (
                        <div key={index} className="flex items-center justify-between bg-white px-3 py-1 rounded-lg">
                          <span className="text-sm">{tag}</span>
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                      <div className="flex">
                        <input
                          type="text"
                          placeholder="Nouveau tag"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') {
                              handleAddTag(e.currentTarget.value);
                              e.currentTarget.value = '';
                            }
                          }}
                        />
                        <button
                          onClick={(e) => {
                            const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                            handleAddTag(input.value);
                            input.value = '';
                          }}
                          className="px-3 py-2 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 p-6 border-t">
              <button
                onClick={() => {
                  setShowAddArticle(false);
                  setEditingArticle(null);
                }}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={editingArticle ? handleUpdateArticle : handleAddArticle}
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Send className="w-4 h-4 mr-2" />
                {editingArticle ? 'Mettre à jour' : 'Publier l\'article'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => alert('Fonctionnalité de planification en cours de développement')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Calendar className="w-8 h-8 text-blue-600 mr-4" />
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Planifier publication</h4>
              <p className="text-sm text-gray-600">Programmer la publication d'articles</p>
            </div>
          </button>
          <button 
            onClick={() => alert('Fonctionnalité de newsletter en cours de développement')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Send className="w-8 h-8 text-green-600 mr-4" />
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Newsletter</h4>
              <p className="text-sm text-gray-600">Envoyer les derniers articles</p>
            </div>
          </button>
          <button 
            onClick={() => alert('Fonctionnalité d\'analytics en cours de développement')}
            className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BarChart3 className="w-8 h-8 text-purple-600 mr-4" />
            <div className="text-left">
              <h4 className="font-medium text-gray-900">Analytics</h4>
              <p className="text-sm text-gray-600">Statistiques de lecture</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogManagement;