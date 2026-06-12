# T2ii Transport — Site Vitrine

Site vitrine premium pour T2ii Transport, entreprise de logistique express basée à Lyon.

## Stack
- HTML5 sémantique
- CSS3 custom properties (pas de framework)
- JavaScript vanilla (ES2020+)
- Google Fonts : DM Serif Display + Inter

## Structure
```
t2ii/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── public/
│   └── images/
│       ├── hero-bg.jpg          (1920×1200px)
│       ├── hero-road.jpg        (1200×720px)
│       ├── service-veto.jpg     (1400×560px)
│       ├── service-express.jpg  (800×400px)
│       ├── service-international.jpg (800×400px)
│       └── team.jpg             (1600×900px)
└── README.md
```

## Images à fournir

| Fichier | Dimensions | Contenu suggéré |
|---|---|---|
| `hero-bg.jpg` | 1920×1200 | Route/autoroute motion blur — fond discret |
| `hero-road.jpg` | 1200×720 | Mains scellant colis / camion gros plan |
| `service-veto.jpg` | 1400×560 | Patte / clinique vétérinaire |
| `service-express.jpg` | 800×400 | Camion urbain / livreur en mouvement |
| `service-international.jpg` | 800×400 | Autoroute / frontière européenne |
| `team.jpg` | 1600×900 | Équipe ou chauffeurs devant camion |

## Déploiement

### Vercel (recommandé)
1. Créer un compte sur vercel.com
2. Glisser-déposer le dossier `t2ii/` dans le dashboard Vercel
3. Domaine personnalisé : Ajouter `t2ii.fr` dans Settings > Domains

### Hébergeur classique (OVH, o2switch, etc.)
1. Uploader le contenu du dossier via FTP à la racine `public_html/`
2. S'assurer que `index.html` est le fichier d'entrée

### GitHub Pages
1. `git init && git add . && git commit -m "init"`
2. Push sur un repo GitHub
3. Settings > Pages > Branch: main, folder: / (root)

## Personnalisation

### Coordonnées
Dans `index.html`, remplacer :
- `+33 X XX XX XX XX` par le vrai numéro
- `contact@t2ii.fr` par l'email réel
- Liens réseaux sociaux (Instagram, Facebook)

### Couleurs (tokens CSS)
Dans `css/style.css`, modifier les variables dans `:root` :
```css
--navy: #0a1628;
--accent: #1e4d8c;
```

### Textes
Tous les textes sont dans `index.html`, chercher et remplacer directement.

## Performance
- Aucune dépendance externe (hors Google Fonts)
- CSS custom properties pour le theming
- IntersectionObserver pour les animations au scroll
- Images à optimiser via [Squoosh](https://squoosh.app) avant mise en ligne
- Recommandation : convertir images en WebP, utiliser `loading="lazy"` sur les images hors-fold
