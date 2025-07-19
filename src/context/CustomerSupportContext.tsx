import React, { createContext, useContext, useState, ReactNode } from 'react';

interface SupportTicket {
  id: string;
  subject: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
    company?: string;
  };
  status: 'new' | 'open' | 'pending' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'product' | 'general';
  source: 'email' | 'chat' | 'phone' | 'form' | 'chatbot';
  assignedTo?: string;
  messages: SupportMessage[];
  createdAt: string;
  updatedAt: string;
  resolvedAt?: string;
  satisfaction?: number;
  tags: string[];
}

interface SupportMessage {
  id: string;
  content: string;
  sender: 'customer' | 'agent' | 'bot';
  timestamp: string;
  attachments?: string[];
}

interface ChatbotConversation {
  id: string;
  customer: {
    name?: string;
    email?: string;
    sessionId: string;
  };
  messages: ChatMessage[];
  status: 'active' | 'transferred' | 'resolved';
  aiConfidence: number;
  intent: string;
  startedAt: string;
  endedAt?: string;
}

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: string;
  intent?: string;
  confidence?: number;
}

interface ContactForm {
  id: string;
  name: string;
  description: string;
  fields: FormField[];
  submissions: FormSubmission[];
  isActive: boolean;
  conversionRate: number;
  createdAt: string;
}

interface FormField {
  id: string;
  name: string;
  type: 'text' | 'email' | 'phone' | 'textarea' | 'select' | 'checkbox';
  label: string;
  required: boolean;
  options?: string[];
}

interface FormSubmission {
  id: string;
  formId: string;
  data: Record<string, any>;
  status: 'new' | 'processed' | 'converted';
  source: string;
  submittedAt: string;
}

interface SupportStats {
  totalTickets: number;
  openTickets: number;
  newTickets: number;
  resolvedTickets: number;
  avgResponseTime: string;
  avgResolutionTime: string;
  customerSatisfaction: number;
  chatbotResolutionRate: number;
  activeChatSessions: number;
  totalFormSubmissions: number;
}

interface CustomerSupportContextType {
  tickets: SupportTicket[];
  conversations: ChatbotConversation[];
  forms: ContactForm[];
  stats: SupportStats;
  
  // Ticket management
  addTicket: (ticket: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTicket: (id: string, updates: Partial<SupportTicket>) => void;
  deleteTicket: (id: string) => void;
  addMessageToTicket: (ticketId: string, message: Omit<SupportMessage, 'id' | 'timestamp'>) => void;
  
  // Chatbot management
  addConversation: (conversation: Omit<ChatbotConversation, 'id' | 'startedAt'>) => void;
  updateConversation: (id: string, updates: Partial<ChatbotConversation>) => void;
  addMessageToConversation: (conversationId: string, message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
  
  // Form management
  addForm: (form: Omit<ContactForm, 'id' | 'submissions' | 'createdAt'>) => void;
  updateForm: (id: string, updates: Partial<ContactForm>) => void;
  deleteForm: (id: string) => void;
  addFormSubmission: (formId: string, submission: Omit<FormSubmission, 'id' | 'submittedAt'>) => void;
  
  // Analytics
  getTicketsByStatus: (status: string) => SupportTicket[];
  getTicketsByPriority: (priority: string) => SupportTicket[];
  searchTickets: (query: string) => SupportTicket[];
}

const CustomerSupportContext = createContext<CustomerSupportContextType | undefined>(undefined);

export const CustomerSupportProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tickets, setTickets] = useState<SupportTicket[]>([
    {
      id: 'TKT-001',
      subject: 'Problème avec la livraison de microscopes',
      customer: {
        name: 'Dr. Amadou Traoré',
        email: 'a.traore@lyceetechnique.ml',
        phone: '+223 20 22 33 44',
        company: 'Lycée Technique de Bamako'
      },
      status: 'open',
      priority: 'high',
      category: 'technical',
      source: 'email',
      assignedTo: 'Marie Traoré',
      messages: [
        {
          id: '1',
          content: 'Bonjour, nous avons reçu les microscopes mais ils ne fonctionnent pas correctement.',
          sender: 'customer',
          timestamp: '2024-01-20T10:30:00Z'
        },
        {
          id: '2',
          content: 'Bonjour Dr. Traoré, je suis désolée pour ce problème. Pouvez-vous me décrire précisément le dysfonctionnement ?',
          sender: 'agent',
          timestamp: '2024-01-20T11:00:00Z'
        }
      ],
      createdAt: '2024-01-20T10:30:00Z',
      updatedAt: '2024-01-20T11:00:00Z',
      tags: ['livraison', 'microscope', 'défaut']
    }
  ]);

  const [conversations, setConversations] = useState<ChatbotConversation[]>([
    {
      id: 'CHAT-001',
      customer: {
        name: 'Visiteur anonyme',
        sessionId: 'sess_123456',
        email: 'prospect@example.com'
      },
      messages: [
        {
          id: '1',
          content: 'Bonjour, je cherche des informations sur vos microscopes',
          sender: 'user',
          timestamp: '2024-01-20T15:30:00Z'
        },
        {
          id: '2',
          content: 'Bonjour ! Je serais ravi de vous aider avec nos microscopes. Nous avons plusieurs modèles disponibles. Pour quel type d\'utilisation cherchez-vous un microscope ?',
          sender: 'bot',
          timestamp: '2024-01-20T15:30:05Z',
          intent: 'product_inquiry',
          confidence: 95
        }
      ],
      status: 'active',
      aiConfidence: 95,
      intent: 'product_inquiry',
      startedAt: '2024-01-20T15:30:00Z'
    }
  ]);

  const [forms, setForms] = useState<ContactForm[]>([
    {
      id: 'FORM-001',
      name: 'Contact Général',
      description: 'Formulaire de contact standard',
      fields: [
        { id: '1', name: 'name', type: 'text', label: 'Nom complet', required: true },
        { id: '2', name: 'email', type: 'email', label: 'Email', required: true },
        { id: '3', name: 'subject', type: 'text', label: 'Sujet', required: true },
        { id: '4', name: 'message', type: 'textarea', label: 'Message', required: true }
      ],
      submissions: [],
      isActive: true,
      conversionRate: 12.5,
      createdAt: '2024-01-15T10:00:00Z'
    }
  ]);

  const stats: SupportStats = {
    totalTickets: tickets.length,
    openTickets: tickets.filter(t => t.status === 'open').length,
    newTickets: tickets.filter(t => t.status === 'new').length,
    resolvedTickets: tickets.filter(t => t.status === 'resolved').length,
    avgResponseTime: '2h 15min',
    avgResolutionTime: '1.5 jours',
    customerSatisfaction: 4.6,
    chatbotResolutionRate: 78,
    activeChatSessions: conversations.filter(c => c.status === 'active').length,
    totalFormSubmissions: forms.reduce((sum, form) => sum + form.submissions.length, 0)
  };

  // Ticket management
  const addTicket = (ticketData: Omit<SupportTicket, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTicket: SupportTicket = {
      ...ticketData,
      id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setTickets(prev => [...prev, newTicket]);
  };

  const updateTicket = (id: string, updates: Partial<SupportTicket>) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === id 
        ? { ...ticket, ...updates, updatedAt: new Date().toISOString() }
        : ticket
    ));
  };

  const deleteTicket = (id: string) => {
    setTickets(prev => prev.filter(ticket => ticket.id !== id));
  };

  const addMessageToTicket = (ticketId: string, messageData: Omit<SupportMessage, 'id' | 'timestamp'>) => {
    const newMessage: SupportMessage = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            messages: [...ticket.messages, newMessage],
            updatedAt: new Date().toISOString()
          }
        : ticket
    ));
  };

  // Chatbot management
  const addConversation = (conversationData: Omit<ChatbotConversation, 'id' | 'startedAt'>) => {
    const newConversation: ChatbotConversation = {
      ...conversationData,
      id: `CHAT-${String(conversations.length + 1).padStart(3, '0')}`,
      startedAt: new Date().toISOString()
    };
    setConversations(prev => [...prev, newConversation]);
  };

  const updateConversation = (id: string, updates: Partial<ChatbotConversation>) => {
    setConversations(prev => prev.map(conversation => 
      conversation.id === id ? { ...conversation, ...updates } : conversation
    ));
  };

  const addMessageToConversation = (conversationId: string, messageData: Omit<ChatMessage, 'id' | 'timestamp'>) => {
    const newMessage: ChatMessage = {
      ...messageData,
      id: Date.now().toString(),
      timestamp: new Date().toISOString()
    };
    
    setConversations(prev => prev.map(conversation => 
      conversation.id === conversationId 
        ? { ...conversation, messages: [...conversation.messages, newMessage] }
        : conversation
    ));
  };

  // Form management
  const addForm = (formData: Omit<ContactForm, 'id' | 'submissions' | 'createdAt'>) => {
    const newForm: ContactForm = {
      ...formData,
      id: `FORM-${String(forms.length + 1).padStart(3, '0')}`,
      submissions: [],
      createdAt: new Date().toISOString()
    };
    setForms(prev => [...prev, newForm]);
  };

  const updateForm = (id: string, updates: Partial<ContactForm>) => {
    setForms(prev => prev.map(form => 
      form.id === id ? { ...form, ...updates } : form
    ));
  };

  const deleteForm = (id: string) => {
    setForms(prev => prev.filter(form => form.id !== id));
  };

  const addFormSubmission = (formId: string, submissionData: Omit<FormSubmission, 'id' | 'submittedAt'>) => {
    const newSubmission: FormSubmission = {
      ...submissionData,
      id: Date.now().toString(),
      submittedAt: new Date().toISOString()
    };
    
    setForms(prev => prev.map(form => 
      form.id === formId 
        ? { ...form, submissions: [...form.submissions, newSubmission] }
        : form
    ));
  };

  // Analytics
  const getTicketsByStatus = (status: string) => {
    return status === 'all' ? tickets : tickets.filter(ticket => ticket.status === status);
  };

  const getTicketsByPriority = (priority: string) => {
    return priority === 'all' ? tickets : tickets.filter(ticket => ticket.priority === priority);
  };

  const searchTickets = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return tickets.filter(ticket => 
      ticket.subject.toLowerCase().includes(lowercaseQuery) ||
      ticket.customer.name.toLowerCase().includes(lowercaseQuery) ||
      ticket.customer.email.toLowerCase().includes(lowercaseQuery) ||
      ticket.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
    );
  };

  return (
    <CustomerSupportContext.Provider
      value={{
        tickets,
        conversations,
        forms,
        stats,
        addTicket,
        updateTicket,
        deleteTicket,
        addMessageToTicket,
        addConversation,
        updateConversation,
        addMessageToConversation,
        addForm,
        updateForm,
        deleteForm,
        addFormSubmission,
        getTicketsByStatus,
        getTicketsByPriority,
        searchTickets,
      }}
    >
      {children}
    </CustomerSupportContext.Provider>
  );
};

export const useCustomerSupport = () => {
  const context = useContext(CustomerSupportContext);
  if (context === undefined) {
    throw new Error('useCustomerSupport must be used within a CustomerSupportProvider');
  }
  return context;
};