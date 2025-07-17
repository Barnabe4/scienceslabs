import React, { useState } from 'react';
import { 
  Settings, Save, CreditCard, Smartphone, Building, Coins, 
  DollarSign, Percent, AlertTriangle, Plus, Trash2, Check, X
} from 'lucide-react';

const FinancialSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [currency, setCurrency] = useState('FCFA');
  const [taxRate, setTaxRate] = useState(18);
  const [roundingMethod, setRoundingMethod] = useState('nearest');
  const [invoicePrefix, setInvoicePrefix] = useState('INV-');
  const [invoiceStartNumber, setInvoiceStartNumber] = useState(1000);
  const [paymentTerms, setPaymentTerms] = useState(30);
  
  const [paymentMethods, setPaymentMethods] = useState([
    { 
      id: 'mobile_money', 
      name: 'Mobile Money', 
      enabled: true, 
      providers: [
        { id: 'orange', name: 'Orange Money', enabled: true, fee: 1.5 },
        { id: 'mtn', name: 'MTN Mobile Money', enabled: true, fee: 1.5 },
        { id: 'moov', name: 'Moov Money', enabled: false, fee: 1.5 }
      ]
    },
    { 
      id: 'bank_transfer', 
      name: 'Virement Bancaire', 
      enabled: true,
      providers: [
        { id: 'ecobank', name: 'ECOBANK', enabled: true, fee: 0 },
        { id: 'boa', name: 'Bank of Africa', enabled: true, fee: 0 }
      ]
    },
    { 
      id: 'cash', 
      name: 'Espèces', 
      enabled: true,
      providers: []
    },
    { 
      id: 'credit_card', 
      name: 'Carte Bancaire', 
      enabled: false,
      providers: [
        { id: 'visa', name: 'Visa', enabled: false, fee: 2.5 },
        { id: 'mastercard', name: 'Mastercard', enabled: false, fee: 2.5 }
      ]
    }
  ]);

  const [newProvider, setNewProvider] = useState({
    methodId: '',
    name: '',
    fee: 0
  });

  const [showAddProvider, setShowAddProvider] = useState(false);

  const handlePaymentMethodToggle = (methodId: string) => {
    setPaymentMethods(prev => 
      prev.map(method => 
        method.id === methodId 
          ? { ...method, enabled: !method.enabled }
          : method
      )
    );
  };

  const handleProviderToggle = (methodId: string, providerId: string) => {
    setPaymentMethods(prev => 
      prev.map(method => 
        method.id === methodId 
          ? { 
              ...method, 
              providers: method.providers.map(provider => 
                provider.id === providerId 
                  ? { ...provider, enabled: !provider.enabled }
                  : provider
              )
            }
          : method
      )
    );
  };

  const handleProviderFeeChange = (methodId: string, providerId: string, fee: number) => {
    setPaymentMethods(prev => 
      prev.map(method => 
        method.id === methodId 
          ? { 
              ...method, 
              providers: method.providers.map(provider => 
                provider.id === providerId 
                  ? { ...provider, fee }
                  : provider
              )
            }
          : method
      )
    );
  };

  const handleAddProvider = () => {
    if (!newProvider.methodId || !newProvider.name) return;

    const providerId = newProvider.name.toLowerCase().replace(/\s+/g, '_');
    
    setPaymentMethods(prev => 
      prev.map(method => 
        method.id === newProvider.methodId 
          ? { 
              ...method, 
              providers: [
                ...method.providers,
                { id: providerId, name: newProvider.name, enabled: true, fee: newProvider.fee }
              ]
            }
          : method
      )
    );

    setNewProvider({ methodId: '', name: '', fee: 0 });
    setShowAddProvider(false);
  };

  const handleRemoveProvider = (methodId: string, providerId: string) => {
    setPaymentMethods(prev => 
      prev.map(method => 
        method.id === methodId 
          ? { 
              ...method, 
              providers: method.providers.filter(provider => provider.id !== providerId)
            }
          : method
      )
    );
  };

  const handleSaveSettings = () => {
    alert('Paramètres financiers enregistrés avec succès !');
  };

  const getPaymentMethodIcon = (methodId: string) => {
    switch (methodId) {
      case 'mobile_money': return <Smartphone className="w-5 h-5" />;
      case 'bank_transfer': return <Building className="w-5 h-5" />;
      case 'cash': return <Coins className="w-5 h-5" />;
      case 'credit_card': return <CreditCard className="w-5 h-5" />;
      default: return <DollarSign className="w-5 h-5" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Paramètres Financiers</h1>
          <p className="text-gray-600">Configurez les paramètres financiers de votre entreprise</p>
        </div>
        <button
          onClick={handleSaveSettings}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-4 h-4 mr-2" />
          Enregistrer
        </button>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-lg">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                activeTab === 'general'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Paramètres généraux
            </button>
            <button
              onClick={() => setActiveTab('payment')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                activeTab === 'payment'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Méthodes de paiement
            </button>
            <button
              onClick={() => setActiveTab('invoice')}
              className={`py-4 border-b-2 font-medium transition-colors ${
                activeTab === 'invoice'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Paramètres de facturation
            </button>
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Paramètres généraux
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Devise
                  </label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="FCFA">FCFA</option>
                    <option value="EUR">EUR</option>
                    <option value="USD">USD</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Taux de TVA (%)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={taxRate}
                      onChange={(e) => setTaxRate(parseFloat(e.target.value))}
                      min="0"
                      max="100"
                      step="0.1"
                      className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <Percent className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Méthode d'arrondi
                  </label>
                  <select
                    value={roundingMethod}
                    onChange={(e) => setRoundingMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="nearest">Au plus proche</option>
                    <option value="up">Arrondi supérieur</option>
                    <option value="down">Arrondi inférieur</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Délai de paiement par défaut (jours)
                  </label>
                  <input
                    type="number"
                    value={paymentTerms}
                    onChange={(e) => setPaymentTerms(parseInt(e.target.value))}
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-yellow-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-yellow-800">Attention</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      La modification du taux de TVA affectera tous les nouveaux produits et factures.
                      Les produits existants ne seront pas mis à jour automatiquement.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'payment' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <CreditCard className="w-5 h-5 mr-2" />
                Méthodes de paiement
              </h2>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div key={method.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 p-4 flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                          {getPaymentMethodIcon(method.id)}
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">{method.name}</h3>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-3 text-sm text-gray-600">
                          {method.enabled ? 'Activé' : 'Désactivé'}
                        </span>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={method.enabled}
                            onChange={() => handlePaymentMethodToggle(method.id)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>

                    {method.providers.length > 0 && method.enabled && (
                      <div className="p-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-3">Fournisseurs</h4>
                        <div className="space-y-3">
                          {method.providers.map((provider) => (
                            <div key={provider.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                              <div className="flex items-center">
                                <label className="relative inline-flex items-center cursor-pointer mr-3">
                                  <input
                                    type="checkbox"
                                    checked={provider.enabled}
                                    onChange={() => handleProviderToggle(method.id, provider.id)}
                                    className="sr-only peer"
                                  />
                                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                                </label>
                                <span className="font-medium text-gray-900">{provider.name}</span>
                              </div>
                              <div className="flex items-center">
                                <div className="flex items-center mr-4">
                                  <span className="text-sm text-gray-600 mr-2">Frais:</span>
                                  <input
                                    type="number"
                                    value={provider.fee}
                                    onChange={(e) => handleProviderFeeChange(method.id, provider.id, parseFloat(e.target.value))}
                                    min="0"
                                    step="0.1"
                                    className="w-16 px-2 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                  />
                                  <span className="text-sm text-gray-600 ml-1">%</span>
                                </div>
                                <button
                                  onClick={() => handleRemoveProvider(method.id, provider.id)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>

                        <button
                          onClick={() => {
                            setNewProvider({ methodId: method.id, name: '', fee: 0 });
                            setShowAddProvider(true);
                          }}
                          className="mt-3 text-blue-600 hover:text-blue-800 text-sm flex items-center"
                        >
                          <Plus className="w-4 h-4 mr-1" />
                          Ajouter un fournisseur
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Add Provider Modal */}
              {showAddProvider && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg max-w-md w-full mx-4">
                    <div className="flex items-center justify-between p-6 border-b">
                      <h2 className="text-xl font-semibold text-gray-900">Ajouter un fournisseur</h2>
                      <button
                        onClick={() => setShowAddProvider(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="p-6">
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Méthode de paiement
                          </label>
                          <select
                            value={newProvider.methodId}
                            onChange={(e) => setNewProvider(prev => ({ ...prev, methodId: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Sélectionner une méthode</option>
                            {paymentMethods.filter(m => m.enabled).map(method => (
                              <option key={method.id} value={method.id}>{method.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nom du fournisseur
                          </label>
                          <input
                            type="text"
                            value={newProvider.name}
                            onChange={(e) => setNewProvider(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ex: Orange Money"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Frais (%)
                          </label>
                          <input
                            type="number"
                            value={newProvider.fee}
                            onChange={(e) => setNewProvider(prev => ({ ...prev, fee: parseFloat(e.target.value) }))}
                            min="0"
                            step="0.1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="0"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-4 p-6 border-t">
                      <button
                        onClick={() => setShowAddProvider(false)}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Annuler
                      </button>
                      <button
                        onClick={handleAddProvider}
                        disabled={!newProvider.methodId || !newProvider.name}
                        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Ajouter
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'invoice' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Paramètres de facturation
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Préfixe des factures
                  </label>
                  <input
                    type="text"
                    value={invoicePrefix}
                    onChange={(e) => setInvoicePrefix(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="INV-"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Exemple: {invoicePrefix}2024-001
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Numéro de départ
                  </label>
                  <input
                    type="number"
                    value={invoiceStartNumber}
                    onChange={(e) => setInvoiceStartNumber(parseInt(e.target.value))}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Pour la prochaine facture générée
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Conditions de paiement par défaut
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    defaultValue="Paiement à 30 jours. Merci d'effectuer le paiement sur notre compte bancaire ou par Mobile Money."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes de bas de page
                  </label>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows={3}
                    defaultValue="Merci pour votre confiance. Pour toute question concernant cette facture, veuillez nous contacter à contact@scienceslabs.com"
                  />
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-md font-semibold text-gray-900 mb-4">Options avancées</h3>
                <div className="space-y-3">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Générer automatiquement les factures lors de la création d'une commande
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Envoyer automatiquement les factures par email
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      defaultChecked
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Inclure les détails de TVA sur les factures
                    </span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Envoyer des rappels automatiques pour les factures en retard
                    </span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FinancialSettings;