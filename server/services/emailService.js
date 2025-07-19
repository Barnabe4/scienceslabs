const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: process.env.SMTP_PORT == 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      },
      tls: {
        rejectUnauthorized: false
      }
    });

    // Vérifier la configuration au démarrage
    this.verifyConnection();
  }

  async verifyConnection() {
    try {
      await this.transporter.verify();
      console.log('✅ Service email configuré correctement');
    } catch (error) {
      console.error('❌ Erreur configuration email:', error.message);
    }
  }

  async loadTemplate(templateName) {
    try {
      const templatePath = path.join(__dirname, '../templates/emails', `${templateName}.html`);
      return await fs.readFile(templatePath, 'utf8');
    } catch (error) {
      console.error(`Erreur chargement template ${templateName}:`, error);
      return this.getDefaultTemplate();
    }
  }

  getDefaultTemplate() {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>{{subject}}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f6f9; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 30px; text-align: center; }
          .content { padding: 30px; }
          .footer { background-color: #f9fafb; padding: 20px; text-align: center; color: #6b7280; font-size: 14px; }
          .button { background-color: #f97316; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Sciences Labs</h1>
            <p>Équipements Scientifiques Éducatifs</p>
          </div>
          <div class="content">
            {{content}}
          </div>
          <div class="footer">
            <p>Sciences Labs - Équipements Scientifiques Éducatifs</p>
            <p>Lomé, Togo | +228 XX XX XX XX | contact@scienceslabs.tg</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  replaceTemplateVariables(template, data) {
    let result = template;
    
    // Remplacer les variables simples
    Object.keys(data).forEach(key => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      result = result.replace(regex, data[key] || '');
    });

    return result;
  }

  async sendEmail({ to, subject, template, data = {}, attachments = [] }) {
    try {
      let htmlContent;

      if (template) {
        // Charger le template
        const templateContent = await this.loadTemplate(template);
        
        // Templates spécialisés
        switch (template) {
          case 'email-verification':
            htmlContent = this.replaceTemplateVariables(templateContent, {
              ...data,
              subject: 'Vérifiez votre compte SciencesLabs',
              content: `
                <h2>Bienvenue ${data.name} !</h2>
                <p>Merci de vous être inscrit sur SciencesLabs. Pour activer votre compte, veuillez cliquer sur le bouton ci-dessous :</p>
                <a href="${data.verificationUrl}" class="button">Vérifier mon compte</a>
                <p>Si le bouton ne fonctionne pas, copiez ce lien dans votre navigateur :</p>
                <p><a href="${data.verificationUrl}">${data.verificationUrl}</a></p>
                <p>Ce lien expire dans 24 heures.</p>
              `
            });
            break;

          case 'password-reset':
            htmlContent = this.replaceTemplateVariables(templateContent, {
              ...data,
              subject: 'Réinitialisation de votre mot de passe',
              content: `
                <h2>Réinitialisation de mot de passe</h2>
                <p>Bonjour ${data.name},</p>
                <p>Vous avez demandé la réinitialisation de votre mot de passe. Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :</p>
                <a href="${data.resetUrl}" class="button">Réinitialiser mon mot de passe</a>
                <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
                <p>Ce lien expire dans 1 heure.</p>
              `
            });
            break;

          case 'order-confirmation':
            htmlContent = this.replaceTemplateVariables(templateContent, {
              ...data,
              subject: `Confirmation de commande #${data.orderNumber}`,
              content: `
                <h2>Commande confirmée !</h2>
                <p>Bonjour ${data.customerName},</p>
                <p>Votre commande #${data.orderNumber} a été confirmée et est en cours de traitement.</p>
                <p><strong>Total :</strong> ${data.total} FCFA</p>
                <p><strong>Livraison estimée :</strong> ${data.estimatedDelivery}</p>
                <a href="${data.orderUrl}" class="button">Suivre ma commande</a>
              `
            });
            break;

          case 'quote-request':
            htmlContent = this.replaceTemplateVariables(templateContent, {
              ...data,
              subject: 'Votre demande de devis SciencesLabs',
              content: `
                <h2>Demande de devis reçue</h2>
                <p>Bonjour ${data.customerName},</p>
                <p>Nous avons bien reçu votre demande de devis. Notre équipe l'examine et vous enverra une proposition détaillée sous 24-48h.</p>
                <p><strong>Référence :</strong> ${data.quoteNumber}</p>
                <a href="${data.quoteUrl}" class="button">Voir ma demande</a>
              `
            });
            break;

          default:
            htmlContent = this.replaceTemplateVariables(this.getDefaultTemplate(), {
              ...data,
              subject,
              content: data.content || 'Contenu du message'
            });
        }
      } else {
        // Template par défaut
        htmlContent = this.replaceTemplateVariables(this.getDefaultTemplate(), {
          ...data,
          subject,
          content: data.content || 'Contenu du message'
        });
      }

      const mailOptions = {
        from: `"SciencesLabs" <${process.env.SMTP_USER}>`,
        to: Array.isArray(to) ? to.join(', ') : to,
        subject,
        html: htmlContent,
        attachments
      };

      const result = await this.transporter.sendMail(mailOptions);
      
      console.log('✅ Email envoyé:', {
        to: mailOptions.to,
        subject,
        messageId: result.messageId
      });

      return {
        success: true,
        messageId: result.messageId
      };

    } catch (error) {
      console.error('❌ Erreur envoi email:', error);
      throw new Error(`Erreur envoi email: ${error.message}`);
    }
  }

  // Envoyer un email de newsletter
  async sendNewsletter({ subscribers, subject, content, campaignId }) {
    const results = [];
    
    for (const subscriber of subscribers) {
      try {
        const unsubscribeUrl = `${process.env.APP_URL}/unsubscribe?email=${subscriber.email}&campaign=${campaignId}`;
        
        const emailContent = `
          ${content}
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          <p style="font-size: 12px; color: #6b7280; text-align: center;">
            Vous recevez cet email car vous êtes abonné à notre newsletter.
            <a href="${unsubscribeUrl}" style="color: #6b7280;">Se désabonner</a>
          </p>
        `;

        await this.sendEmail({
          to: subscriber.email,
          subject,
          data: {
            content: emailContent,
            name: subscriber.name
          }
        });

        results.push({ email: subscriber.email, status: 'sent' });
      } catch (error) {
        results.push({ email: subscriber.email, status: 'failed', error: error.message });
      }
    }

    return results;
  }

  // Envoyer un email de relance panier abandonné
  async sendAbandonedCartEmail({ customerEmail, customerName, cartItems, cartTotal, recoveryUrl }) {
    const itemsList = cartItems.map(item => 
      `<li>${item.name} - Quantité: ${item.quantity} - ${item.price} FCFA</li>`
    ).join('');

    const content = `
      <h2>Vous avez oublié quelque chose !</h2>
      <p>Bonjour ${customerName},</p>
      <p>Vous avez laissé des articles dans votre panier. Ne les perdez pas !</p>
      
      <h3>Votre panier :</h3>
      <ul>${itemsList}</ul>
      <p><strong>Total : ${cartTotal} FCFA</strong></p>
      
      <a href="${recoveryUrl}" class="button">Finaliser ma commande</a>
      
      <p>Offre spéciale : Utilisez le code <strong>RETOUR10</strong> pour 10% de réduction !</p>
    `;

    return await this.sendEmail({
      to: customerEmail,
      subject: 'Votre panier vous attend - 10% de réduction !',
      data: { content, name: customerName }
    });
  }
}

// Instance singleton
const emailService = new EmailService();

module.exports = {
  sendEmail: (options) => emailService.sendEmail(options),
  sendNewsletter: (options) => emailService.sendNewsletter(options),
  sendAbandonedCartEmail: (options) => emailService.sendAbandonedCartEmail(options)
};