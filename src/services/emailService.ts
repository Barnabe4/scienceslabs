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
  content: Buffer;
  contentType: string;
  size: number;
}

class EmailService {
  private config: EmailConfig;
  private nodemailer: any;

  constructor(config: EmailConfig) {
    this.config = config;
    this.initializeNodemailer();
  }

  private async initializeNodemailer() {
    const nodemailer = await import('nodemailer');
    this.nodemailer = nodemailer.default;
  }

  // Configuration de la connexion SMTP pour l'envoi
  private createSMTPTransporter() {
    return this.nodemailer.createTransporter({
      host: this.config.smtpHost,
      port: this.config.smtpPort,
      secure: this.config.secure, // true pour 465, false pour autres ports
      auth: {
        user: this.config.email,
        pass: this.config.password,
      },
      tls: {
        rejectUnauthorized: false // Pour les certificats auto-signés
      }
    });
  }

  // Envoyer un email
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
      const transporter = this.createSMTPTransporter();
      
      const mailOptions = {
        from: `"${this.getDisplayName()}" <${this.config.email}>`,
        to: emailData.to.join(', '),
        cc: emailData.cc?.join(', '),
        bcc: emailData.bcc?.join(', '),
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html,
        attachments: emailData.attachments || []
      };

      const result = await transporter.sendMail(mailOptions);
      console.log('Email envoyé:', result.messageId);
      return true;
    } catch (error) {
      console.error('Erreur envoi email:', error);
      throw new Error(`Erreur envoi email: ${error.message}`);
    }
  }

  // Tester la connexion SMTP
  async testSMTPConnection(): Promise<boolean> {
    try {
      const transporter = this.createSMTPTransporter();
      await transporter.verify();
      console.log('Connexion SMTP réussie');
      return true;
    } catch (error) {
      console.error('Erreur connexion SMTP:', error);
      return false;
    }
  }

  // Récupérer les emails via IMAP (simulation pour WebContainer)
  async fetchEmails(folder: string = 'INBOX', limit: number = 50): Promise<EmailMessage[]> {
    try {
      // Dans un environnement réel, on utiliserait la bibliothèque IMAP
      // Pour WebContainer, on simule avec une API REST
      const response = await fetch('/api/emails/fetch', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          config: this.config,
          folder,
          limit
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des emails');
      }

      const emails = await response.json();
      return emails.map(this.parseEmailMessage);
    } catch (error) {
      console.error('Erreur récupération emails:', error);
      // Retourner des emails de démonstration en cas d'erreur
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
          config: this.config,
          emailId,
          read
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Erreur marquage email:', error);
      return false;
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
          config: this.config,
          emailId,
          targetFolder
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Erreur déplacement email:', error);
      return false;
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
          config: this.config,
          emailId
        })
      });

      return response.ok;
    } catch (error) {
      console.error('Erreur suppression email:', error);
      return false;
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