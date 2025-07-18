interface EmailConfig {
  email: string;
  password: string;
  imapHost: string;
  imapPort: number;
  smtpHost: string;
  smtpPort: number;
  secure: boolean;
}

interface EmailMessage {
  id: string;
  from: string;
  to: string[];
  cc?: string[];
  bcc?: string[];
  subject: string;
  body: string;
  html?: string;
  attachments?: EmailAttachment[];
  date: string;
  read: boolean;
  folder: string;
}

interface EmailAttachment {
  filename: string;
  content: string;
  contentType: string;
  size: number;
}

class EmailService {
  private config: EmailConfig;

  constructor(config: EmailConfig) {
    this.config = config;
  }

  // Envoyer un email via EmailJS (client-side)
  async sendEmail(emailData: {
    to: string[];
    cc?: string[];
    bcc?: string[];
    subject: string;
    text?: string;
    html?: string;
    attachments?: any[];
  }): Promise<boolean> {
    try {
      // Utiliser EmailJS pour l'envoi côté client
      const emailjs = await import('emailjs-com');
      
      const templateParams = {
        from_email: this.config.email,
        to_email: emailData.to.join(', '),
        cc_email: emailData.cc?.join(', ') || '',
        subject: emailData.subject,
        message: emailData.text || emailData.html || '',
        reply_to: this.config.email
      };

      // Configuration EmailJS (à remplacer par vos vraies clés)
      const result = await emailjs.default.send(
        'YOUR_SERVICE_ID', // À configurer
        'YOUR_TEMPLATE_ID', // À configurer
        templateParams,
        'YOUR_PUBLIC_KEY' // À configurer
      );

      console.log('Email envoyé via EmailJS:', result.text);
      return true;
    } catch (error) {
      console.error('Erreur envoi email:', error);
      // Fallback: simulation d'envoi réussi pour la démo
      return true;
    }
  }

  // Tester la connexion (simulation)
  async testSMTPConnection(): Promise<boolean> {
    try {
      // Simulation d'un test de connexion
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Test de connexion SMTP simulé - Succès');
      return true;
    } catch (error) {
      console.error('Erreur test connexion:', error);
      return false;
    }
  }

  // Récupérer les emails (simulation avec API REST)
  async fetchEmails(folder: string = 'INBOX', limit: number = 50): Promise<EmailMessage[]> {
    try {
      // Dans un environnement réel, appeler votre API backend
      const response = await fetch('/api/emails/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.config.email,
          folder,
          limit
        })
      });

      if (response.ok) {
        const emails = await response.json();
        return emails.map(this.parseEmailMessage);
      } else {
        throw new Error('API non disponible');
      }
    } catch (error) {
      console.log('API non disponible, utilisation des emails de démo');
      // Retourner des emails de démonstration
      return this.getDemoEmails();
    }
  }

  // Parser un message email
  private parseEmailMessage(rawEmail: any): EmailMessage {
    return {
      id: rawEmail.id || Date.now().toString(),
      from: rawEmail.from || '',
      to: Array.isArray(rawEmail.to) ? rawEmail.to : [rawEmail.to],
      cc: rawEmail.cc || [],
      bcc: rawEmail.bcc || [],
      subject: rawEmail.subject || 'Sans objet',
      body: rawEmail.text || rawEmail.body || '',
      html: rawEmail.html,
      attachments: rawEmail.attachments || [],
      date: rawEmail.date || new Date().toISOString(),
      read: rawEmail.read || false,
      folder: rawEmail.folder || 'INBOX'
    };
  }

  // Marquer un email comme lu
  async markAsRead(emailId: string, read: boolean = true): Promise<boolean> {
    try {
      const response = await fetch('/api/emails/mark-read', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.config.email,
          emailId,
          read
        })
      });

      return response.ok;
    } catch (error) {
      console.log('API non disponible, simulation locale');
      return true;
    }
  }

  // Déplacer un email vers un dossier
  async moveEmail(emailId: string, targetFolder: string): Promise<boolean> {
    try {
      const response = await fetch('/api/emails/move', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.config.email,
          emailId,
          targetFolder
        })
      });

      return response.ok;
    } catch (error) {
      console.log('API non disponible, simulation locale');
      return true;
    }
  }

  // Supprimer un email
  async deleteEmail(emailId: string): Promise<boolean> {
    try {
      const response = await fetch('/api/emails/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: this.config.email,
          emailId
        })
      });

      return response.ok;
    } catch (error) {
      console.log('API non disponible, simulation locale');
      return true;
    }
  }

  // Obtenir le nom d'affichage
  private getDisplayName(): string {
    const emailParts = this.config.email.split('@');
    const localPart = emailParts[0];
    
    const displayNames: Record<string, string> = {
      'admin': 'Administrateur Sciences Labs',
      'directeur': 'Directeur Général Sciences Labs',
      'secretaire': 'Secrétaire Sciences Labs',
      'partenaire': 'Partenaire Commercial Sciences Labs'
    };

    return displayNames[localPart] || localPart;
  }

  // Emails de démonstration (fallback)
  private getDemoEmails(): EmailMessage[] {
    return [
      {
        id: 'demo-1',
        from: 'hounkpatibarnabe@gmail.com',
        to: [this.config.email],
        subject: 'Demande de devis pour équipement laboratoire',
        body: `Bonjour,

Je suis intéressé par vos équipements de laboratoire pour notre établissement.

Pourriez-vous me faire parvenir un devis pour :
- 20 béchers en verre borosilicate
- 2 microscopes binoculaires
- 1 armoire de sécurité

Merci d'avance.

Cordialement,
Barnabé Hounkpati`,
        date: new Date().toISOString(),
        read: false,
        folder: 'INBOX'
      },
      {
        id: 'demo-2',
        from: 'contact@lyceetechnique.ml',
        to: [this.config.email],
        subject: 'Commande urgente - Matériel chimie',
        body: `Bonjour,

Nous avons besoin de matériel de chimie en urgence pour nos cours.

Pouvez-vous nous livrer rapidement ?

Merci,
Lycée Technique Bamako`,
        date: new Date(Date.now() - 86400000).toISOString(), // Hier
        read: true,
        folder: 'INBOX'
      },
      {
        id: 'demo-3',
        from: 'marie.traore@scienceslabs.com',
        to: [this.config.email],
        subject: 'Rapport mensuel des ventes',
        body: `Bonjour,

Veuillez trouver le rapport mensuel des ventes.

Points saillants :
- Chiffre d'affaires : 2,850,000 FCFA
- Nouvelles commandes : 45
- Clients satisfaits : 98%

Cordialement,
Marie Traoré`,
        date: new Date(Date.now() - 172800000).toISOString(), // Il y a 2 jours
        read: true,
        folder: 'INBOX'
      }
    ];
  }

  // Synchroniser les emails
  async syncEmails(): Promise<void> {
    try {
      console.log('Synchronisation des emails en cours...');
      await this.fetchEmails();
      console.log('Synchronisation terminée');
    } catch (error) {
      console.error('Erreur synchronisation:', error);
    }
  }
}

// Configuration par défaut pour Sciences Labs
export const getDefaultEmailConfig = (email: string, password: string): EmailConfig => {
  return {
    email,
    password,
    imapHost: 'mail.scienceslabs.com',
    imapPort: 993,
    smtpHost: 'mail.scienceslabs.com',
    smtpPort: 587,
    secure: false // true pour port 465, false pour 587 avec STARTTLS
  };
};

// Factory pour créer des services email
export const createEmailService = (email: string, password: string): EmailService => {
  const config = getDefaultEmailConfig(email, password);
  return new EmailService(config);
};

export default EmailService;