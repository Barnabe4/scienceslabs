import React, { useState } from 'react';
import { Phone, Mail, MapPin, MessageCircle, Clock, Send } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Téléphone',
      details: ['+223 XX XX XX XX', '+223 YY YY YY YY'],
      description: 'Lun-Ven: 8h00-17h30'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['contact@scienceslabs.com', 'support@scienceslabs.com'],
      description: 'Réponse sous 24h'
    },
    {
      icon: MapPin,
      title: 'Adresse',
      details: ['Bamako, Mali', 'Zone industrielle'],
      description: 'Visite sur rendez-vous'
    },
    {
      icon: MessageCircle,
      title: 'WhatsApp',
      details: ['+223 XX XX XX XX'],
      description: 'Support instantané'
    }
  ];

  const offices = [
    {
      city: 'Bamako',
      country: 'Mali',
      address: 'Zone industrielle, Bamako',
      phone: '+223 XX XX XX XX',
      email: 'bamako@scienceslabs.com',
      isMain: true
    },
    {
      city: 'Ouagadougou',
      country: 'Burkina Faso',
      address: 'Secteur 15, Ouagadougou',
      phone: '+226 XX XX XX XX',
      email: 'ouaga@scienceslabs.com',
      isMain: false
    },
    {
      city: 'Abidjan',
      country: 'Côte d\'Ivoire',
      address: 'Plateau, Abidjan',
      phone: '+225 XX XX XX XX',
      email: 'abidjan@scienceslabs.com',
      isMain: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactez-nous</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Notre équipe d'experts est à votre disposition pour répondre à toutes vos questions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Envoyez-nous un message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Votre nom complet"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="votre@email.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-2">
                      Type de demande
                    </label>
                    <select
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="general">Demande générale</option>
                      <option value="quote">Demande de devis</option>
                      <option value="support">Support technique</option>
                      <option value="partnership">Partenariat</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                      Sujet *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Sujet de votre message"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Décrivez votre demande en détail..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Envoyer le message
                </button>
              </form>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex items-start">
                    <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{info.title}</h3>
                      {info.details.map((detail, detailIndex) => (
                        <p key={detailIndex} className="text-gray-700 font-medium">{detail}</p>
                      ))}
                      <p className="text-sm text-gray-500 mt-1">{info.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Business Hours */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mr-4">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Horaires</h3>
                  <div className="space-y-1 text-sm">
                    <p className="text-gray-700">Lundi - Vendredi: 8h00 - 17h30</p>
                    <p className="text-gray-700">Samedi: 8h00 - 12h00</p>
                    <p className="text-gray-700">Dimanche: Fermé</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Offices */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Nos Bureaux</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {offices.map((office, index) => (
              <div key={index} className={`bg-white rounded-lg shadow-lg p-6 ${office.isMain ? 'ring-2 ring-blue-500' : ''}`}>
                {office.isMain && (
                  <div className="bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded mb-4 inline-block">
                    SIÈGE PRINCIPAL
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-1">{office.city}</h3>
                <p className="text-gray-600 mb-4">{office.country}</p>
                <div className="space-y-2 text-sm">
                  <p className="flex items-center text-gray-700">
                    <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                    {office.address}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <Phone className="w-4 h-4 mr-2 text-gray-400" />
                    {office.phone}
                  </p>
                  <p className="flex items-center text-gray-700">
                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                    {office.email}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-16">
          <div className="h-96 bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
            <div className="text-center text-white">
              <MapPin className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Notre Localisation</h3>
              <p className="text-blue-100">Carte interactive disponible prochainement</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;