import React, { useState } from 'react';
import { Mail, Inbox, Send, Edit3, Trash2, Archive, Star, Flag, Search, Filter, Plus, Settings, Paperclip, Reply, Forward, MoreHorizontal, RefreshCw, Eye, EyeOff, Download, Printer as Print, User, Calendar, Clock, ChevronDown, ChevronRight, X, AlertCircle, CheckCircle, Zap, Tag, Users, Phone, MapPin, Save, Key, Server, Shield } from 'lucide-react';
  Mail, Inbox, Send, Archive, Trash2, Star, Search, Filter, Building,
import { useAuth } from '../context/AuthContext';
  User, Building, Phone, MapPin, Save, X, Eye, ChevronDown,
  RefreshCw
const WebmailManagement = () => {
  const {
    emails,
    folders,
    accounts,
    stats,
    currentAccount,
    selectedEmails,
    currentFolder,
    searchQuery,
    addAccount,
    sendEmail,
    replyToEmail,
    forwardEmail,
    deleteEmails,
    moveEmails,
    markAsRead,
    markAsStarred,
    markAsImportant,
    setCurrentAccount,
    setSelectedEmails,
    setCurrentFolder,
    setSearchQuery,
    getEmailsByFolder,
    searchEmails
  } = useWebmail();

  const { user } = useAuth();
  const [showCompose, setShowCompose] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<string | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showAccountConfig, setShowAccountConfig] = useState(false);
  const [editingAccount, setEditingAccount] = useState<string | null>(null);
  const [composeMode, setComposeMode] = useState<'new' | 'reply' | 'forward'>('new');
  const [replyToEmailId, setReplyToEmailId] = useState<string | null>(null);

  const [composeData, setComposeData] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
    priority: 'normal' as 'low' | 'normal' | 'high',
    attachments: [] as File[]
  });

  const [accountConfig, setAccountConfig] = useState({
    email: '',
    name: '',
    role: '',
    password: '',
    imapServer: 'mail.scienceslabs.com',
    smtpServer: 'mail.scienceslabs.com',
    imapPort: 993,
    smtpPort: 587,
    ssl: true,
    signature: '',
    autoReplyEnabled: false,
    autoReplySubject: 'Réponse automatique',
    autoReplyMessage: 'Merci pour votre message. Je vous répondrai dans les plus brefs délais.',
    syncInterval: 5
  });

  // Initialiser le compte courant basé sur l'utilisateur connecté
  React.useEffect(() => {
    if (user && !currentAccount) {
      const userAccount = accounts.find(acc => 
        acc.role === user.role || acc.email.includes(user.role)
      );
      if (userAccount) {
        setCurrentAccount(userAccount.id);
      }
    }
  }, [user, currentAccount, accounts, setCurrentAccount]);

  const currentFolderEmails = searchQuery 
    ? searchEmails(searchQuery)
    : getEmailsByFolder(currentFolder);

  const selectedEmailData = selectedEmail 
    ? emails.find(e => e.id === selectedEmail)
    : null;

  const handleEmailSelect = (emailId: string) => {
    setSelectedEmails(
      selectedEmails.includes(emailId)
        ? selectedEmails.filter(id => id !== emailId)
        : [...selectedEmails, emailId]
    );
  };

  const handleSelectAll = () => {
    setSelectedEmails(
      selectedEmails.length === currentFolderEmails.length
        ? []
        : currentFolderEmails.map(email => email.id)
    );
  };

  const handleEmailClick = (emailId: string) => {
    setSelectedEmail(emailId);
    if (!emails.find(e => e.id === emailId)?.read) {
      markAsRead([emailId], true);
    }
  };

  const handleCompose = (mode: 'new' | 'reply' | 'forward', emailId?: string) => {
    setComposeMode(mode);
    setReplyToEmailId(emailId || null);
    
    if (mode === 'reply' && emailId) {
      const originalEmail = emails.find(e => e.id === emailId);
      if (originalEmail) {
        setComposeData({
          to: originalEmail.from,
          cc: '',
          bcc: '',
          subject: `Re: ${originalEmail.subject}`,
          body: `\n\n---------- Message original ----------\nDe: ${originalEmail.from}\nDate: ${new Date(originalEmail.date).toLocaleString('fr-FR')}\nObjet: ${originalEmail.subject}\n\n${originalEmail.body}`,
          priority: 'normal',
          attachments: []
        });
      }
    } else if (mode === 'forward' && emailId) {
      const originalEmail = emails.find(e => e.id === emailId);
      if (originalEmail) {
        setComposeData({
          to: '',
          cc: '',
          bcc: '',
          subject: `Fwd: ${originalEmail.subject}`,
          body: `\n\n---------- Message transféré ----------\nDe: ${originalEmail.from}\nDate: ${new Date(originalEmail.date).toLocaleString('fr-FR')}\nObjet: ${originalEmail.subject}\n\n${originalEmail.body}`,
          priority: 'normal',
          attachments: []
        });
      }
    } else {
      setComposeData({
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        body: '',
        priority: 'normal',
        attachments: []
      });
    }
    
    setShowCompose(true);
  };

  const handleSendEmail = () => {
    if (!composeData.to.trim() || !composeData.subject.trim()) {
      alert('Veuillez remplir les champs obligatoires (destinataire et objet)');
      return;
    }

    const emailData = {
      from: currentAccount?.email || '',
      to: composeData.to.split(',').map(email => email.trim()),
      cc: composeData.cc ? composeData.cc.split(',').map(email => email.trim()) : [],
      bcc: composeData.bcc ? composeData.bcc.split(',').map(email => email.trim()) : [],
      subject: composeData.subject,
      body: composeData.body + (currentAccount?.signature ? `\n\n${currentAccount.signature}` : ''),
      isHtml: false,
      attachments: [],
      starred: false,
      important: composeData.priority === 'high',
      labels: [],
      priority: composeData.priority
    };

    if (composeMode === 'reply' && replyToEmailId) {
      replyToEmail(replyToEmailId, emailData);
    } else if (composeMode === 'forward' && replyToEmailId) {
      forwardEmail(replyToEmailId, emailData);
    } else {
      sendEmail(emailData);
    }

    setShowCompose(false);
    setComposeData({
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      body: '',
      priority: 'normal',
      attachments: []
    });
    
    alert('Email envoyé avec succès !');
  };

  const handleSaveAccountConfig = () => {
    if (editingAccount) {
      updateAccount(editingAccount, {
        email: accountConfig.email,
        name: accountConfig.name,
        role: accountConfig.role,
        signature: accountConfig.signature,
        autoReply: {
          enabled: accountConfig.autoReplyEnabled,
          subject: accountConfig.autoReplySubject,
          message: accountConfig.autoReplyMessage
        },
        settings: {
          imapServer: accountConfig.imapServer,
          smtpServer: accountConfig.smtpServer,
          port: accountConfig.smtpPort,
          ssl: accountConfig.ssl,
          syncInterval: accountConfig.syncInterval
        }
      });
    } else {
      addAccount({
        email: accountConfig.email,
        name: accountConfig.name,
        role: accountConfig.role,
        isActive: true,
        signature: accountConfig.signature,
        autoReply: {
          enabled: accountConfig.autoReplyEnabled,
          subject: accountConfig.autoReplySubject,
          message: accountConfig.autoReplyMessage
        },
        settings: {
          imapServer: accountConfig.imapServer,
          smtpServer: accountConfig.smtpServer,
          port: accountConfig.smtpPort,
          ssl: accountConfig.ssl,
          syncInterval: accountConfig.syncInterval
        }
      });
    }
    
    setShowAccountConfig(false);
    setEditingAccount(null);
    setAccountConfig({
      email: '',
      name: '',
      role: '',
      password: '',
      imapServer: 'mail.scienceslabs.com',
      smtpServer: 'mail.scienceslabs.com',
      imapPort: 993,
      smtpPort: 587,
      ssl: true,
      signature: '',
      autoReplyEnabled: false,
      autoReplySubject: 'Réponse automatique',
      autoReplyMessage: 'Merci pour votre message. Je vous répondrai dans les plus brefs délais.',
      syncInterval: 5
    });
    alert('Configuration du compte sauvegardée avec succès !');
  };

  const handleEditAccount = (account: any) => {
    setAccountConfig({
      email: account.email,
      name: account.name,
      role: account.role,
      password: '',
      imapServer: account.settings.imapServer,
      smtpServer: account.settings.smtpServer,
      imapPort: 993,
      smtpPort: account.settings.port,
      ssl: account.settings.ssl,
      signature: account.signature,
      autoReplyEnabled: account.autoReply.enabled,
      autoReplySubject: account.autoReply.subject,
      autoReplyMessage: account.autoReply.message,
      syncInterval: account.settings.syncInterval
    });
    setEditingAccount(account.id);
    setShowAccountConfig(true);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'low': return 'text-gray-400';
      default: return 'text-gray-600';
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high': return <Flag className="w-4 h-4" />;
      case 'low': return <ChevronDown className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-gray-900 flex items-center">
              <Mail className="w-6 h-6 mr-2 text-blue-600" />
              Webmail
            </h1>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100"
             title="Paramètres"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => setShowAccountConfig(true)}
              className="p-2 text-blue-600 hover:text-blue-700 rounded-lg hover:bg-blue-100"
              title="Configurer les comptes"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          {/* Account Selector */}
          <div className="mb-4">
            <select
              value={currentAccount?.id || ''}
              onChange={(e) => setCurrentAccount(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            >
              <option value="">Sélectionner un compte</option>
              {accounts.map(account => (
                <option key={account.id} value={account.id}>
                  {account.email}
                </option>
              ))}
            </select>
          </div>

          <button
            onClick={() => handleCompose('new')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
          >
            <Edit3 className="w-5 h-5 mr-2" />
            Nouveau message
          </button>
        </div>

        {/* Folders */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
              Dossiers
            </h3>
            <div className="space-y-1">
              {folders.map(folder => (
                <button
                  key={folder.id}
                  onClick={() => setCurrentFolder(folder.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-left transition-colors ${
                    currentFolder === folder.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">{folder.icon}</span>
                    <span className="font-medium">{folder.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {folder.unreadCount > 0 && (
                      <span className="bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">
                        {folder.unreadCount}
                      </span>
                    )}
                    <span className="text-xs text-gray-500">{folder.count}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Storage Info */}
        <div className="p-4 border-t border-gray-200">
          <div className="text-xs text-gray-600 mb-2">
            Stockage utilisé: {stats.storageUsed} GB / {stats.storageLimit} GB
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${(stats.storageUsed / stats.storageLimit) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher dans les emails..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80"
                />
              </div>

              {/* Actions */}
              {selectedEmails.length > 0 && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => markAsRead(selectedEmails, true)}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                    title="Marquer comme lu"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => markAsRead(selectedEmails, false)}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                    title="Marquer comme non lu"
                  >
                    <EyeOff className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => markAsStarred(selectedEmails, true)}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                    title="Ajouter une étoile"
                  >
                    <Star className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => deleteEmails(selectedEmails)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg"
                    title="Supprimer"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => moveEmails(selectedEmails, 'archive')}
                    className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                    title="Archiver"
                  >
                    <Archive className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => window.location.reload()}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                title="Actualiser"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <span className="text-sm text-gray-600">
                {currentFolderEmails.length} email{currentFolderEmails.length > 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        <div className="flex-1 flex">
          {/* Email List */}
          <div className="w-1/3 bg-white border-r border-gray-200 overflow-y-auto">
            {/* Select All */}
            <div className="p-4 border-b border-gray-200">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedEmails.length === currentFolderEmails.length && currentFolderEmails.length > 0}
                  onChange={handleSelectAll}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Sélectionner tout ({currentFolderEmails.length})
                </span>
              </label>
            </div>

            {/* Email Items */}
            <div className="divide-y divide-gray-200">
              {currentFolderEmails.map(email => (
                <div
                  key={email.id}
                  className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedEmail === email.id ? 'bg-blue-50 border-r-2 border-blue-600' : ''
                  } ${!email.read ? 'bg-blue-25' : ''}`}
                  onClick={() => handleEmailClick(email.id)}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedEmails.includes(email.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        handleEmailSelect(email.id);
                      }}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center space-x-2">
                          <span className={`text-sm truncate ${!email.read ? 'font-semibold text-gray-900' : 'text-gray-700'}`}>
                            {email.folder === 'sent' ? `À: ${email.to[0]}` : email.from}
                          </span>
                          {email.starred && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                          {email.important && <Flag className="w-4 h-4 text-red-500" />}
                          {email.attachments.length > 0 && <Paperclip className="w-4 h-4 text-gray-400" />}
                        </div>
                        <span className="text-xs text-gray-500">
                          {new Date(email.date).toLocaleDateString('fr-FR')}
                        </span>
                      </div>
                      
                      <div className={`text-sm mb-1 ${!email.read ? 'font-semibold text-gray-900' : 'text-gray-600'}`}>
                        {email.subject}
                      </div>
                      
                      <div className="text-xs text-gray-500 truncate">
                        {email.body.substring(0, 100)}...
                      </div>

                      {email.labels.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {email.labels.map(label => (
                            <span key={label} className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                              {label}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {currentFolderEmails.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                <Mail className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>Aucun email dans ce dossier</p>
              </div>
            )}
          </div>

          {/* Email Content */}
          <div className="flex-1 bg-white overflow-y-auto">
            {selectedEmailData ? (
              <div className="h-full flex flex-col">
                {/* Email Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h2 className="text-xl font-semibold text-gray-900 mb-2">
                        {selectedEmailData.subject}
                      </h2>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          <span className="font-medium">{selectedEmailData.from}</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          <span>{new Date(selectedEmailData.date).toLocaleDateString('fr-FR')}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          <span>{new Date(selectedEmailData.date).toLocaleTimeString('fr-FR')}</span>
                        </div>
                        {selectedEmailData.priority !== 'normal' && (
                          <div className={`flex items-center ${getPriorityColor(selectedEmailData.priority)}`}>
                            {getPriorityIcon(selectedEmailData.priority)}
                            <span className="ml-1 capitalize">{selectedEmailData.priority}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="mt-2 text-sm text-gray-600">
                        <div>À: {selectedEmailData.to.join(', ')}</div>
                        {selectedEmailData.cc && selectedEmailData.cc.length > 0 && (
                          <div>Cc: {selectedEmailData.cc.join(', ')}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => markAsStarred([selectedEmailData.id], !selectedEmailData.starred)}
                        className={`p-2 rounded-lg transition-colors ${
                          selectedEmailData.starred 
                            ? 'text-yellow-500 hover:text-yellow-600' 
                            : 'text-gray-400 hover:text-yellow-500'
                        }`}
                      >
                        <Star className={`w-5 h-5 ${selectedEmailData.starred ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        onClick={() => handleCompose('reply', selectedEmailData.id)}
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                        title="Répondre"
                      >
                        <Reply className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleCompose('forward', selectedEmailData.id)}
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
                        title="Transférer"
                      >
                        <Forward className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteEmails([selectedEmailData.id])}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-lg"
                        title="Supprimer"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                      <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg">
                        <MoreHorizontal className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Attachments */}
                  {selectedEmailData.attachments.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-900 mb-2">
                        Pièces jointes ({selectedEmailData.attachments.length})
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedEmailData.attachments.map(attachment => (
                          <div key={attachment.id} className="flex items-center bg-gray-100 rounded-lg p-2">
                            <Paperclip className="w-4 h-4 text-gray-500 mr-2" />
                            <span className="text-sm text-gray-700 mr-2">{attachment.name}</span>
                            <span className="text-xs text-gray-500 mr-2">({formatFileSize(attachment.size)})</span>
                            <button className="text-blue-600 hover:text-blue-800">
                              <Download className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Email Body */}
                <div className="flex-1 p-6">
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap font-sans text-gray-800 leading-relaxed">
                      {selectedEmailData.body}
                    </pre>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="p-6 border-t border-gray-200 bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => handleCompose('reply', selectedEmailData.id)}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Reply className="w-4 h-4 mr-2" />
                      Répondre
                    </button>
                    <button
                      onClick={() => handleCompose('forward', selectedEmailData.id)}
                      className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Forward className="w-4 h-4 mr-2" />
                      Transférer
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="flex items-center px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Print className="w-4 h-4 mr-2" />
                      Imprimer
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">
                <div className="text-center">
                  <Mail className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p className="text-lg">Sélectionnez un email pour le lire</p>
                  <p className="text-sm">Choisissez un email dans la liste de gauche</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {composeMode === 'reply' ? 'Répondre' : 
                 composeMode === 'forward' ? 'Transférer' : 'Nouveau message'}
              </h2>
              <button
                onClick={() => setShowCompose(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">À *</label>
                    <input
                      type="email"
                      value={composeData.to}
                      onChange={(e) => setComposeData(prev => ({ ...prev, to: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="destinataire@exemple.com"
                      multiple
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                    <select
                      value={composeData.priority}
                      onChange={(e) => setComposeData(prev => ({ ...prev, priority: e.target.value as any }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="low">Faible</option>
                      <option value="normal">Normale</option>
                      <option value="high">Élevée</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Cc</label>
                    <input
                      type="email"
                      value={composeData.cc}
                      onChange={(e) => setComposeData(prev => ({ ...prev, cc: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="copie@exemple.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bcc</label>
                    <input
                      type="email"
                      value={composeData.bcc}
                      onChange={(e) => setComposeData(prev => ({ ...prev, bcc: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="copie.cachee@exemple.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Objet *</label>
                  <input
                    type="text"
                    value={composeData.subject}
                    onChange={(e) => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Objet du message"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={composeData.body}
                    onChange={(e) => setComposeData(prev => ({ ...prev, body: e.target.value }))}
                    rows={12}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Tapez votre message ici..."
                  />
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center text-gray-600 hover:text-gray-800">
                      <Paperclip className="w-5 h-5 mr-1" />
                      Joindre un fichier
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setShowCompose(false)}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      onClick={handleSendEmail}
                      className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Paramètres du Webmail</h2>
              <button
                onClick={() => setShowSettings(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Compte actuel</h3>
                  {currentAccount && (
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-700">Email:</span>
                          <p className="text-gray-900">{currentAccount.email}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Nom:</span>
                          <p className="text-gray-900">{currentAccount.name}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Rôle:</span>
                          <p className="text-gray-900 capitalize">{currentAccount.role}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-700">Statut:</span>
                          <p className={`${currentAccount.isActive ? 'text-green-600' : 'text-red-600'}`}>
                            {currentAccount.isActive ? 'Actif' : 'Inactif'}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{stats.totalEmails}</div>
                      <div className="text-sm text-blue-700">Total emails</div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">{stats.unreadEmails}</div>
                      <div className="text-sm text-green-700">Non lus</div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">{stats.sentEmails}</div>
                      <div className="text-sm text-purple-700">Envoyés</div>
                    </div>
                    <div className="bg-yellow-50 rounded-lg p-4 text-center">
                      <div className="text-2xl font-bold text-yellow-600">{stats.draftEmails}</div>
                      <div className="text-sm text-yellow-700">Brouillons</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Comptes disponibles</h3>
                  <div className="space-y-3">
                    {accounts.map(account => (
                      <div key={account.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${account.isActive ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                          <div>
                            <div className="font-medium text-gray-900">{account.email}</div>
                            <div className="text-sm text-gray-600">{account.name}</div>
                          </div>
                        </div>
                        <button
                          onClick={() => setCurrentAccount(account.id)}
                          className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                            currentAccount?.id === account.id
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {currentAccount?.id === account.id ? 'Actuel' : 'Utiliser'}
                        </button>
                        <button
                          onClick={() => handleEditAccount(account)}
                          className="ml-2 p-1 text-blue-600 hover:text-blue-800"
                          title="Configurer"
                        >
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Account Configuration Modal */}
      {showAccountConfig && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingAccount ? 'Modifier le compte email' : 'Configurer un nouveau compte email'}
              </h2>
              <button
                onClick={() => {
                  setShowAccountConfig(false);
                  setEditingAccount(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Informations générales */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Informations du compte
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Adresse email *
                        </label>
                        <input
                          type="email"
                          value={accountConfig.email}
                          onChange={(e) => setAccountConfig(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="utilisateur@scienceslabs.com"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom d'affichage *
                        </label>
                        <input
                          type="text"
                          value={accountConfig.name}
                          onChange={(e) => setAccountConfig(prev => ({ ...prev, name: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Nom Prénom"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Rôle
                        </label>
                        <select
                          value={accountConfig.role}
                          onChange={(e) => setAccountConfig(prev => ({ ...prev, role: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="">Sélectionner un rôle</option>
                          <option value="admin">Administrateur</option>
                          <option value="director">Directeur</option>
                          <option value="secretary">Secrétaire</option>
                          <option value="partner">Partenaire</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Mot de passe email *
                        </label>
                        <input
                          type="password"
                          value={accountConfig.password}
                          onChange={(e) => setAccountConfig(prev => ({ ...prev, password: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Mot de passe du compte email"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Mot de passe fourni par l'administrateur serveur
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Signature */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Edit3 className="w-5 h-5 mr-2" />
                      Signature email
                    </h3>
                    
                    <textarea
                      value={accountConfig.signature}
                      onChange={(e) => setAccountConfig(prev => ({ ...prev, signature: e.target.value }))}
                      rows={6}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Cordialement,
Nom Prénom
Sciences Labs
Équipements Scientifiques Éducatifs
Bamako, Mali
Tél: +223 XX XX XX XX
Email: ${accountConfig.email}`}
                    />
                  </div>
                </div>

                {/* Configuration serveur */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Server className="w-5 h-5 mr-2" />
                      Configuration serveur
                    </h3>
                    
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Serveur IMAP
                          </label>
                          <input
                            type="text"
                            value={accountConfig.imapServer}
                            onChange={(e) => setAccountConfig(prev => ({ ...prev, imapServer: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Port IMAP
                          </label>
                          <input
                            type="number"
                            value={accountConfig.imapPort}
                            onChange={(e) => setAccountConfig(prev => ({ ...prev, imapPort: parseInt(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Serveur SMTP
                          </label>
                          <input
                            type="text"
                            value={accountConfig.smtpServer}
                            onChange={(e) => setAccountConfig(prev => ({ ...prev, smtpServer: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Port SMTP
                          </label>
                          <input
                            type="number"
                            value={accountConfig.smtpPort}
                            onChange={(e) => setAccountConfig(prev => ({ ...prev, smtpPort: parseInt(e.target.value) }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={accountConfig.ssl}
                            onChange={(e) => setAccountConfig(prev => ({ ...prev, ssl: e.target.checked }))}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">Utiliser SSL/TLS</span>
                        </label>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Intervalle de synchronisation (minutes)
                        </label>
                        <select
                          value={accountConfig.syncInterval}
                          onChange={(e) => setAccountConfig(prev => ({ ...prev, syncInterval: parseInt(e.target.value) }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value={1}>1 minute</option>
                          <option value={5}>5 minutes</option>
                          <option value={10}>10 minutes</option>
                          <option value={15}>15 minutes</option>
                          <option value={30}>30 minutes</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Réponse automatique */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <Zap className="w-5 h-5 mr-2" />
                      Réponse automatique
                    </h3>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={accountConfig.autoReplyEnabled}
                            onChange={(e) => setAccountConfig(prev => ({ ...prev, autoReplyEnabled: e.target.checked }))}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">Activer la réponse automatique</span>
                        </label>
                      </div>
                      
                      {accountConfig.autoReplyEnabled && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Objet de la réponse automatique
                            </label>
                            <input
                              type="text"
                              value={accountConfig.autoReplySubject}
                              onChange={(e) => setAccountConfig(prev => ({ ...prev, autoReplySubject: e.target.value }))}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Message de réponse automatique
                            </label>
                            <textarea
                              value={accountConfig.autoReplyMessage}
                              onChange={(e) => setAccountConfig(prev => ({ ...prev, autoReplyMessage: e.target.value }))}
                              rows={4}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Test de connexion */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Test de connexion
                    </h4>
                    <button
                      onClick={() => alert('Test de connexion simulé - Connexion réussie !')}
                      className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                    >
                      Tester la connexion
                    </button>
                    <p className="text-xs text-gray-600 mt-2">
                      Vérifiez que les paramètres de connexion sont corrects
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-end space-x-4 p-6 border-t border-gray-200">
              <button
                onClick={() => {
                  setShowAccountConfig(false);
                  setEditingAccount(null);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveAccountConfig}
                className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingAccount ? 'Mettre à jour' : 'Ajouter le compte'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WebmailManagement;