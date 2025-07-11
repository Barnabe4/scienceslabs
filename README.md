# Sciences Labs E-commerce

Une application e-commerce moderne pour Sciences Labs, spécialisée dans la vente d'équipements scientifiques éducatifs en Afrique de l'Ouest.

## 🚀 Fonctionnalités

### Frontend
- **Catalogue produits** avec filtres avancés et recherche
- **Panier d'achat** avec gestion des quantités
- **Système d'authentification** (admin, clients)
- **Dashboard administrateur** pour la gestion
- **Pages informatives** (services, formations, blog, contact)
- **Design responsive** optimisé mobile et desktop
- **Interface multilingue** (français)

### Gestion
- **Gestion des produits** (CRUD complet)
- **Gestion des commandes** avec suivi des statuts
- **Gestion des clients** et historique
- **Tableau de bord** avec statistiques
- **Système de rôles** et permissions

## 🛠️ Technologies

- **React 18** avec TypeScript
- **Vite** pour le build et développement
- **Tailwind CSS** pour le styling
- **React Router** pour la navigation
- **Lucide React** pour les icônes
- **Context API** pour la gestion d'état

## 📁 Structure du projet

```
src/
├── components/          # Composants réutilisables
│   ├── Header.tsx
│   └── Footer.tsx
├── pages/              # Pages de l'application
│   ├── Home.tsx
│   ├── Shop.tsx
│   ├── ProductDetail.tsx
│   ├── Cart.tsx
│   ├── Dashboard.tsx
│   ├── Management.tsx
│   ├── Services.tsx
│   ├── Training.tsx
│   ├── Blog.tsx
│   └── Contact.tsx
├── context/            # Contextes React
│   ├── AuthContext.tsx
│   ├── CartContext.tsx
│   └── ManagementContext.tsx
├── hooks/              # Hooks personnalisés
│   ├── useLocalStorage.ts
│   └── useDebounce.ts
├── types/              # Types TypeScript
│   └── index.ts
├── utils/              # Utilitaires
│   ├── constants.ts
│   └── helpers.ts
├── services/           # Services API
│   └── api.ts
├── styles/             # Styles globaux
│   └── globals.css
└── App.tsx
```

## 🚀 Installation et démarrage

1. **Cloner le projet**
```bash
git clone <repository-url>
cd sciences-labs-ecommerce
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Démarrer le serveur de développement**
```bash
npm run dev
```

4. **Ouvrir l'application**
Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📝 Scripts disponibles

- `npm run dev` - Démarre le serveur de développement
- `npm run build` - Build de production
- `npm run preview` - Prévisualise le build de production
- `npm run lint` - Vérifie le code avec ESLint
- `npm run test` - Lance les tests

## 🔐 Authentification

### Compte administrateur par défaut
- **Email**: admin@scienceslabs.com
- **Mot de passe**: admin123

## 🎨 Design System

L'application utilise un design system cohérent basé sur:
- **Couleurs primaires**: Bleu (#2563eb) et Orange (#f97316)
- **Typographie**: Inter font family
- **Espacement**: Système basé sur 8px
- **Composants**: Boutons, cartes, badges standardisés

## 📱 Responsive Design

L'application est entièrement responsive avec des breakpoints:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🌍 Internationalisation

L'application est conçue pour le marché francophone d'Afrique de l'Ouest avec:
- Interface en français
- Devise en FCFA
- Formats de date localisés
- Numéros de téléphone locaux

## 🔧 Configuration

### Variables d'environnement
Créer un fichier `.env.local` pour la configuration:

```env
REACT_APP_API_URL=http://localhost:3001/api
REACT_APP_COMPANY_NAME=Sciences Labs
REACT_APP_COMPANY_EMAIL=contact@scienceslabs.com
REACT_APP_COMPANY_PHONE=+223 XX XX XX XX
```

## 🚀 Déploiement

### Build de production
```bash
npm run build
```

Le dossier `dist/` contient les fichiers optimisés pour la production.

### Déploiement sur Netlify/Vercel
1. Connecter le repository GitHub
2. Configurer les variables d'environnement
3. Déployer automatiquement

## 🤝 Contribution

1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit les changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 📞 Support

Pour toute question ou support:
- **Email**: contact@scienceslabs.com
- **Téléphone**: +223 XX XX XX XX
- **Adresse**: Bamako, Mali

---

Développé avec ❤️ pour Sciences Labs