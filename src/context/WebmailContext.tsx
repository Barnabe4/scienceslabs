import React, { createContext, useContext, useState, ReactNode } from 'react';
import EmailService, { createEmailService } from '../services/emailService';

interface EmailAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
}

interface Email {
  id: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  isHtml: boolean;
  attachments: EmailAttachment[];
  date: string;
  read: boolean;
  starred: boolean;
  important: boolean;
  folder: 'inbox' | 'sent' | 'drafts' | 'trash' | 'spam' | 'archive';
  labels: string[];
  threadId?: string;
  replyTo?: string;
  priority: 'low' | 'normal' | 'high';
}

interface EmailFolder {
  id: string;
  name: string;
  count: number;
  unreadCount: number;
  icon: string;
  color: string;
}

interface EmailAccount {
  id: string;
  email: string;
  name: string;
  role: string;
  isActive: boolean;
  signature: string;
  autoReply: {
    enabled: boolean;
    subject: string;
    message: string;
    startDate?: string;
    endDate?: string;
  };
  settings: {
    imapServer: string;
    smtpServer: string;
    port: number;
    ssl: boolean;
    syncInterval: number;
  };
}

interface WebmailStats {
  totalEmails: number;
  unreadEmails: number;
  sentEmails: number;
  draftEmails: number;
  storageUsed: number;
  storageLimit: number;
}

interface WebmailContextType {
  emails: Email[];
  folders: EmailFolder[];
  accounts: EmailAccount[];
  stats: WebmailStats;
  currentAccount: EmailAccount | null;
  selectedEmails: string[];
  currentFolder: string;
  searchQuery: string;
  emailServices: Map<string, EmailService>;
  isConnecting: boolean;
  connectionStatus: Map<string, 'connected' | 'disconnected' | 'error'>;
  
  // Email operations
  sendEmail: (email: Omit<Email, 'id' | 'date' | 'read' | 'folder'>) => void;
  replyToEmail: (emailId: string, reply: Partial<Email>) => void;
  forwardEmail: (emailId: string, forward: Partial<Email>) => void;
  deleteEmails: (emailIds: string[]) => void;
  moveEmails: (emailIds: string[], folder: string) => void;
  markAsRead: (emailIds: string[], read: boolean) => void;
  markAsStarred: (emailIds: string[], starred: boolean) => void;
  markAsImportant: (emailIds: string[], important: boolean) => void;
  
  // Real email operations
  sendRealEmail: (accountId: string, emailData: any) => Promise<boolean>;
  fetchRealEmails: (accountId: string, folder?: string) => Promise<void>;
  testEmailConnection: (accountId: string, password: string) => Promise<boolean>;
  syncAllAccounts: () => Promise<void>;
  
  // Account management
  addAccount: (account: Omit<EmailAccount, 'id'>) => void;
  updateAccount: (id: string, updates: Partial<EmailAccount>) => void;
  deleteAccount: (id: string) => void;
  setCurrentAccount: (accountId: string) => void;
  
  // UI state
  setSelectedEmails: (emailIds: string[]) => void;
  setCurrentFolder: (folder: string) => void;
  setSearchQuery: (query: string) => void;
  
  // Utility functions
  getEmailsByFolder: (folder: string) => Email[];
  searchEmails: (query: string) => Email[];
  getEmailThread: (threadId: string) => Email[];
}

const WebmailContext = createContext<WebmailContextType | undefined>(undefined);

export const WebmailProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentAccount, setCurrentAccountState] = useState<EmailAccount | null>(null);
  const [selectedEmails, setSelectedEmails] = useState<string[]>([]);
  const [currentFolder, setCurrentFolder] = useState('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [emailServices, setEmailServices] = useState<Map<string, EmailService>>(new Map());
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<Map<string, 'connected' | 'disconnected' | 'error'>>(new Map());

  const [accounts, setAccounts] = useState<EmailAccount[]>([
    {
      id: '1',
      email: 'admin@scienceslabs.com',
      name: 'Administrateur Système',
      role: 'admin',
      isActive: true,
      signature: `
Cordialement,
Administrateur Système
Sciences Labs
Équipements Scientifiques Éducatifs
Bamako, Mali
Tél: +223 XX XX XX XX
Email: admin@scienceslabs.com
      `,
      autoReply: {
        enabled: false,
        subject: 'Réponse automatique',
        message: 'Merci pour votre message. Je vous répondrai dans les plus brefs délais.'
      },
      settings: {
        imapServer: 'mail.scienceslabs.com',
        smtpServer: 'mail.scienceslabs.com',
        port: 587,
        ssl: true,
        syncInterval: 5
      }
    },
    {
      id: '2',
      email: 'directeur@scienceslabs.com',
      name: 'Directeur Général',
      role: 'director',
      isActive: true,
      signature: `
Cordialement,
Directeur Général
Sciences Labs
Équipements Scientifiques Éducatifs
      `,
      autoReply: {
        enabled: false,
        subject: 'Réponse automatique',
        message: 'Merci pour votre message. Je vous répondrai dans les plus brefs délais.'
      },
      settings: {
        imapServer: 'mail.scienceslabs.com',
        smtpServer: 'mail.scienceslabs.com',
        port: 587,
        ssl: true,
        syncInterval: 5
      }
    },
    {
      id: '3',
      email: 'secretaire@scienceslabs.com',
      name: 'Secrétaire',
      role: 'secretary',
      isActive: true,
      signature: `
Cordialement,
Secrétaire
Sciences Labs
      `,
      autoReply: {
        enabled: false,
        subject: 'Réponse automatique',
        message: 'Merci pour votre message. Je vous répondrai dans les plus brefs délais.'
      },
      settings: {
        imapServer: 'mail.scienceslabs.com',
        smtpServer: 'mail.scienceslabs.com',
        port: 587,
        ssl: true,
        syncInterval: 10
      }
    },
    {
      id: '4',
      email: 'partenaire@scienceslabs.com',
      name: 'Partenaire Commercial',
      role: 'partner',
      isActive: true,
      signature: `
Cordialement,
Partenaire Commercial
Sciences Labs
      `,
      autoReply: {
        enabled: false,
        subject: 'Réponse automatique',
        message: 'Merci pour votre message. Je vous répondrai dans les plus brefs délais.'
      },
      settings: {
        imapServer: 'mail.scienceslabs.com',
        smtpServer: 'mail.scienceslabs.com',
        port: 587,
        ssl: true,
        syncInterval: 15
      }
    }
  ]);

  const [folders, setFolders] = useState<EmailFolder[]>([
    { id: 'inbox', name: 'Boîte de réception', count: 25, unreadCount: 8, icon: '📥', color: 'text-blue-600' },
    { id: 'sent', name: 'Envoyés', count: 45, unreadCount: 0, icon: '📤', color: 'text-green-600' },
    { id: 'drafts', name: 'Brouillons', count: 3, unreadCount: 0, icon: '📝', color: 'text-yellow-600' },
    { id: 'trash', name: 'Corbeille', count: 12, unreadCount: 0, icon: '🗑️', color: 'text-red-600' },
    { id: 'spam', name: 'Spam', count: 5, unreadCount: 2, icon: '⚠️', color: 'text-orange-600' },
    { id: 'archive', name: 'Archives', count: 156, unreadCount: 0, icon: '📦', color: 'text-gray-600' }
  ]);

  const [emails, setEmails] = useState<Email[]>([
    {
      id: '1',
      from: 'hounkpatibarnabe@gmail.com',
      to: ['admin@scienceslabs.com'],
      subject: 'Demande d\'information sur vos produits',
      body: `Bonjour Sciences Labs,

Je suis intéressé par vos équipements de laboratoire pour notre établissement scolaire.

Pourriez-vous me faire parvenir des informations sur :
- Vos microscopes binoculaires
- Les équipements de sécurité
- Les conditions de livraison au Mali

Merci d'avance pour votre réponse.

Cordialement,
Barnabé Hounkpati
Email: hounkpatibarnabe@gmail.com`,
      isHtml: false,
      attachments: [],
      date: '2024-01-20T10:30:00Z',
      read: false,
      starred: false,
      important: true,
      folder: 'inbox',
      labels: ['prospect', 'demande-info'],
      priority: 'high'
    },
    {
      id: '4',
      from: 'contact@lyceetechnique.ml',
      to: ['admin@scienceslabs.com'],
      subject: 'Demande de devis pour équipement laboratoire',
      body: `Bonjour,

Nous souhaitons équiper notre nouveau laboratoire de chimie et aimerions recevoir un devis pour les équipements suivants :
- 25 béchers en verre borosilicate
- 2 microscopes binoculaires
- 1 armoire de sécurité

Merci de nous faire parvenir votre proposition.

Cordialement,
Dr. Amadou Traoré
Directeur - Lycée Technique de Bamako`,
      isHtml: false,
      attachments: [],
      date: '2024-01-19T08:15:00Z',
      read: true,
      starred: false,
      important: false,
      folder: 'inbox',
      labels: ['client', 'devis'],
      priority: 'normal'
    },
    {
      id: '2',
      from: 'marie@scienceslabs.com',
      to: ['admin@scienceslabs.com'],
      subject: 'Rapport mensuel des ventes',
      body: `Bonjour,

Veuillez trouver en pièce jointe le rapport mensuel des ventes pour janvier 2024.

Points saillants :
- Chiffre d'affaires : 2,850,000 FCFA
- Nouvelles commandes : 45
- Clients satisfaits : 98%

Cordialement,
Marie Traoré`,
      isHtml: false,
      attachments: [
        {
          id: 'att1',
          name: 'rapport_ventes_janvier_2024.pdf',
          size: 245760,
          type: 'application/pdf',
          url: '/attachments/rapport_ventes_janvier_2024.pdf'
        }
      ],
      date: '2024-01-19T14:15:00Z',
      read: true,
      starred: true,
      important: false,
      folder: 'inbox',
      labels: ['rapport', 'interne'],
      priority: 'normal'
    },
    {
      id: '3',
      from: 'admin@scienceslabs.com',
      to: ['fournisseur@equipements.com'],
      subject: 'Commande urgente - Microscopes',
      body: `Bonjour,

Nous avons besoin de 5 microscopes binoculaires pour une livraison urgente.

Pouvez-vous confirmer la disponibilité et les délais ?

Merci,
Administrateur Sciences Labs`,
      isHtml: false,
      attachments: [],
      date: '2024-01-18T16:45:00Z',
      read: true,
      starred: false,
      important: false,
      folder: 'sent',
      labels: ['fournisseur', 'urgent'],
      priority: 'high'
    }
  ]);

  const stats: WebmailStats = {
    totalEmails: emails.length,
    unreadEmails: emails.filter(e => !e.read).length,
    sentEmails: emails.filter(e => e.folder === 'sent').length,
    draftEmails: emails.filter(e => e.folder === 'drafts').length,
    storageUsed: 2.4, // GB
    storageLimit: 15 // GB
  };

  const sendEmail = (emailData: Omit<Email, 'id' | 'date' | 'read' | 'folder'>) => {
    const newEmail: Email = {
      ...emailData,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      read: true,
      folder: 'sent'
    };
    setEmails(prev => [...prev, newEmail]);
  };

  // Envoyer un vrai email via SMTP
  const sendRealEmail = async (accountId: string, emailData: any): Promise<boolean> => {
    try {
      setIsConnecting(true);
      const service = emailServices.get(accountId);
      
      if (!service) {
        throw new Error('Service email non configuré pour ce compte');
      }

      const success = await service.sendEmail({
        to: emailData.to,
        cc: emailData.cc,
        bcc: emailData.bcc,
        subject: emailData.subject,
        text: emailData.body,
        html: emailData.isHtml ? emailData.body : undefined,
        attachments: emailData.attachments
      });

      if (success) {
        // Ajouter l'email aux envoyés
        const sentEmail: Email = {
          ...emailData,
          id: Date.now().toString(),
          date: new Date().toISOString(),
          read: true,
          folder: 'sent'
        };
        setEmails(prev => [...prev, sentEmail]);
      }

      return success;
    } catch (error) {
      console.error('Erreur envoi email:', error);
      throw error;
    } finally {
      setIsConnecting(false);
    }
  };

  // Récupérer les vrais emails via IMAP
  const fetchRealEmails = async (accountId: string, folder: string = 'INBOX'): Promise<void> => {
    try {
      setIsConnecting(true);
      const service = emailServices.get(accountId);
      
      if (!service) {
        throw new Error('Service email non configuré pour ce compte');
      }

      const fetchedEmails = await service.fetchEmails(folder);
      
      // Convertir et ajouter les nouveaux emails
      const newEmails = fetchedEmails.map(email => ({
        ...email,
        folder: folder.toLowerCase() as Email['folder'],
        starred: false,
        important: false,
        labels: [],
        replyTo: email.from,
        priority: 'normal' as const
      }));

      setEmails(prev => {
        // Éviter les doublons
        const existingIds = prev.map(e => e.id);
        const uniqueNewEmails = newEmails.filter(e => !existingIds.includes(e.id));
        return [...prev, ...uniqueNewEmails];
      });

      setConnectionStatus(prev => new Map(prev.set(accountId, 'connected')));
    } catch (error) {
      console.error('Erreur récupération emails:', error);
      setConnectionStatus(prev => new Map(prev.set(accountId, 'error')));
    } finally {
      setIsConnecting(false);
    }
  };

  // Tester la connexion email
  const testEmailConnection = async (accountId: string, password: string): Promise<boolean> => {
    try {
      setIsConnecting(true);
      const account = accounts.find(a => a.id === accountId);
      
      if (!account) {
        throw new Error('Compte non trouvé');
      }

      const service = createEmailService(account.email, password);
      const isConnected = await service.testSMTPConnection();
      
      if (isConnected) {
        setEmailServices(prev => new Map(prev.set(accountId, service)));
        setConnectionStatus(prev => new Map(prev.set(accountId, 'connected')));
      } else {
        setConnectionStatus(prev => new Map(prev.set(accountId, 'error')));
      }

      return isConnected;
    } catch (error) {
      console.error('Erreur test connexion:', error);
      setConnectionStatus(prev => new Map(prev.set(accountId, 'error')));
      return false;
    } finally {
      setIsConnecting(false);
    }
  };

  // Synchroniser tous les comptes
  const syncAllAccounts = async (): Promise<void> => {
    try {
      setIsConnecting(true);
      const syncPromises = Array.from(emailServices.entries()).map(([accountId, service]) => 
        service.syncEmails().catch(error => 
          console.error(`Erreur sync compte ${accountId}:`, error)
        )
      );
      
      await Promise.all(syncPromises);
    } catch (error) {
      console.error('Erreur synchronisation globale:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const replyToEmail = (emailId: string, reply: Partial<Email>) => {
    const originalEmail = emails.find(e => e.id === emailId);
    if (originalEmail) {
      const replyEmail: Email = {
        id: Date.now().toString(),
        from: currentAccount?.email || '',
        to: [originalEmail.from],
        cc: reply.cc || [],
        bcc: reply.bcc || [],
        subject: `Re: ${originalEmail.subject}`,
        body: reply.body || '',
        isHtml: reply.isHtml || false,
        attachments: reply.attachments || [],
        date: new Date().toISOString(),
        read: true,
        starred: false,
        important: false,
        folder: 'sent',
        labels: [],
        threadId: originalEmail.threadId || originalEmail.id,
        priority: 'normal'
      };
      setEmails(prev => [...prev, replyEmail]);
    }
  };

  const forwardEmail = (emailId: string, forward: Partial<Email>) => {
    const originalEmail = emails.find(e => e.id === emailId);
    if (originalEmail) {
      const forwardEmail: Email = {
        id: Date.now().toString(),
        from: currentAccount?.email || '',
        to: forward.to || [],
        cc: forward.cc || [],
        bcc: forward.bcc || [],
        subject: `Fwd: ${originalEmail.subject}`,
        body: forward.body || `\n\n---------- Message transféré ----------\nDe: ${originalEmail.from}\nDate: ${new Date(originalEmail.date).toLocaleString('fr-FR')}\nObjet: ${originalEmail.subject}\n\n${originalEmail.body}`,
        isHtml: forward.isHtml || false,
        attachments: [...(originalEmail.attachments || []), ...(forward.attachments || [])],
        date: new Date().toISOString(),
        read: true,
        starred: false,
        important: false,
        folder: 'sent',
        labels: [],
        priority: 'normal'
      };
      setEmails(prev => [...prev, forwardEmail]);
    }
  };

  const deleteEmails = (emailIds: string[]) => {
    setEmails(prev => prev.map(email => 
      emailIds.includes(email.id) 
        ? { ...email, folder: 'trash' as const }
        : email
    ));
  };

  const moveEmails = (emailIds: string[], folder: string) => {
    setEmails(prev => prev.map(email => 
      emailIds.includes(email.id) 
        ? { ...email, folder: folder as Email['folder'] }
        : email
    ));
  };

  const markAsRead = (emailIds: string[], read: boolean) => {
    setEmails(prev => prev.map(email => 
      emailIds.includes(email.id) 
        ? { ...email, read }
        : email
    ));
  };

  const markAsStarred = (emailIds: string[], starred: boolean) => {
    setEmails(prev => prev.map(email => 
      emailIds.includes(email.id) 
        ? { ...email, starred }
        : email
    ));
  };

  const markAsImportant = (emailIds: string[], important: boolean) => {
    setEmails(prev => prev.map(email => 
      emailIds.includes(email.id) 
        ? { ...email, important }
        : email
    ));
  };

  const addAccount = (accountData: Omit<EmailAccount, 'id'>) => {
    const newAccount: EmailAccount = {
      ...accountData,
      id: Date.now().toString()
    };
    setAccounts(prev => [...prev, newAccount]);
  };

  const updateAccount = (id: string, updates: Partial<EmailAccount>) => {
    setAccounts(prev => prev.map(account => 
      account.id === id ? { ...account, ...updates } : account
    ));
  };

  const deleteAccount = (id: string) => {
    setAccounts(prev => prev.filter(account => account.id !== id));
  };

  const setCurrentAccount = (accountId: string) => {
    const account = accounts.find(a => a.id === accountId);
    setCurrentAccountState(account || null);
  };

  const getEmailsByFolder = (folder: string) => {
    return emails.filter(email => email.folder === folder);
  };

  const searchEmails = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return emails.filter(email => 
      email.subject.toLowerCase().includes(lowercaseQuery) ||
      email.body.toLowerCase().includes(lowercaseQuery) ||
      email.from.toLowerCase().includes(lowercaseQuery) ||
      email.to.some(to => to.toLowerCase().includes(lowercaseQuery))
    );
  };

  const getEmailThread = (threadId: string) => {
    return emails.filter(email => email.threadId === threadId || email.id === threadId)
                 .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  };

  return (
    <WebmailContext.Provider
      value={{
        emails,
        folders,
        accounts,
        stats,
        currentAccount,
        selectedEmails,
        currentFolder,
        searchQuery,
        emailServices,
        isConnecting,
        connectionStatus,
        sendEmail,
        sendRealEmail,
        fetchRealEmails,
        testEmailConnection,
        syncAllAccounts,
        replyToEmail,
        forwardEmail,
        deleteEmails,
        moveEmails,
        markAsRead,
        markAsStarred,
        markAsImportant,
        addAccount,
        updateAccount,
        deleteAccount,
        setCurrentAccount,
        setSelectedEmails,
        setCurrentFolder,
        setSearchQuery,
        getEmailsByFolder,
        searchEmails,
        getEmailThread,
      }}
    >
      {children}
    </WebmailContext.Provider>
  );
};

export const useWebmail = () => {
  const context = useContext(WebmailContext);
  if (context === undefined) {
    throw new Error('useWebmail must be used within a WebmailProvider');
  }
  return context;
};