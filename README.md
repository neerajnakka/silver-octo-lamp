# DevOps Mastery Hub 🚀

A comprehensive, interactive DevOps learning platform built with Next.js 15, React 19, and Tailwind CSS. Master Docker, Kubernetes, AWS, and 10+ other essential DevOps skills with hands-on tutorials, quizzes, and real-world troubleshooting scenarios.

![DevOps Mastery Hub](./public/preview.png)

## ✨ Features

### 🎯 Core Features
- **13 DevOps Skills**: Docker, Kubernetes, AWS, Terraform, Jenkins, GitLab CI, Ansible, Prometheus, ELK Stack, Nginx, Linux, Bash, Networking
- **1300+ Concepts**: Comprehensive coverage of DevOps concepts with detailed explanations
- **1300+ Commands**: Real-world commands with examples and best practices
- **975+ Q&A**: Interview-style questions with detailed answers
- **390+ Troubleshooting Scenarios**: Real-world problems with step-by-step solutions

### 🎨 UI/UX
- **Modern Design**: Inspired by Stripe and Linear with glass morphism effects
- **Dark/Light Mode**: System-aware theme with smooth transitions
- **Responsive**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered transitions
- **Search (Cmd/Ctrl + K)**: Fuzzy search across all content

### 📊 Learning Tools
- **Interactive Quizzes**: Test your knowledge with immediate feedback
- **Progress Tracking**: Visual progress for each skill
- **Achievements System**: Earn badges and unlock milestones
- **Streak Tracking**: Maintain learning consistency
- **Bookmarks**: Save important concepts for later

### 🎯 Advanced Features
- **Dashboard Analytics**: Visualize your learning journey
- **State Persistence**: LocalStorage-based progress tracking
- **Code Examples**: Syntax-highlighted real-world examples
- **Difficulty Levels**: Beginner to advanced content

## 🛠️ Tech Stack

- **Framework**: Next.js 15.1.0 (App Router)
- **React**: 19.0.0
- **Styling**: Tailwind CSS 3.4.17
- **Animations**: Framer Motion 12.23.24
- **Icons**: Lucide React 0.555.0
- **State Management**: Zustand 5.0.3
- **Search**: Fuse.js 7.0.0
- **Notifications**: React Hot Toast 2.4.1
- **Utilities**: clsx, tailwind-merge

## 📦 Installation

### Prerequisites
- Node.js 18.x or higher
- npm, yarn, or pnpm

### Setup

1. **Clone or extract the project**
```bash
cd devops-mastery-hub
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Run development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. **Open your browser**
```
http://localhost:3000
```

## 🏗️ Project Structure

```
devops-mastery-hub/
├── app/                          # Next.js app directory
│   ├── layout.js                 # Root layout
│   ├── page.js                   # Home page
│   ├── skills/                   # Skills pages
│   │   ├── page.js              # Skills listing
│   │   └── [slug]/              # Individual skill
│   ├── quiz/                     # Quiz system
│   │   └── [skill]/             # Quiz page
│   ├── dashboard/                # Dashboard
│   ├── achievements/             # Achievements page
│   ├── profile/                  # User profile
│   └── settings/                 # Settings
├── components/                   # React components
│   ├── ui/                      # Base UI components
│   │   ├── button.jsx
│   │   ├── card.jsx
│   │   ├── badge.jsx
│   │   ├── progress.jsx
│   │   ├── tabs.jsx
│   │   ├── input.jsx
│   │   ├── modal.jsx
│   │   └── tooltip.jsx
│   ├── features/                # Feature components
│   │   ├── header.jsx
│   │   ├── footer.jsx
│   │   ├── skill-card.jsx
│   │   └── search-modal.jsx
│   └── root-layout-client.jsx   # Client wrapper
├── data/                         # Content data
│   ├── skills/                  # Skill content
│   │   ├── index.js            # Skills list
│   │   └── docker.js           # Docker content
│   ├── quizzes/                 # Quiz data
│   │   └── docker-quiz.js
│   └── achievements.js          # Achievements
├── lib/                          # Utilities
│   ├── store.js                 # Zustand store
│   └── utils.js                 # Helper functions
├── styles/                       # Global styles
│   └── globals.css
├── public/                       # Static assets
├── next.config.js               # Next.js config
├── tailwind.config.js           # Tailwind config
└── package.json                 # Dependencies

```

## 🎯 Usage Guide

### Learning Path

1. **Start with Skills**: Navigate to `/skills` to see all available DevOps skills
2. **Choose a Skill**: Click on any skill card to access its content
3. **Explore Content**: Use tabs to switch between Concepts, Commands, Q&A, and Troubleshooting
4. **Track Progress**: Mark lessons as complete to track your progress
5. **Take Quizzes**: Test your knowledge with interactive quizzes
6. **Earn Achievements**: Unlock badges as you learn

### Search

- Press `Cmd/Ctrl + K` anywhere to open search
- Search across concepts, commands, Q&A, and troubleshooting
- Use arrow keys to navigate results
- Press `Enter` to select

### Dashboard

- View overall progress across all skills
- Track your learning streak
- See recent achievements
- Monitor quiz scores

## 🎨 Customization

### Adding New Skills

1. Add skill info to `data/skills/index.js`:
```javascript
{
  slug: 'new-skill',
  name: 'New Skill',
  icon: '🔥',
  description: 'Learn new skill',
  difficulty: 'intermediate',
  // ...
}
```

2. Create content file `data/skills/new-skill.js`:
```javascript
export const newSkillData = {
  concepts: [...],
  commands: [...],
  qa: [...],
  troubleshooting: [...]
};
```

3. Import in skill page and add to map

### Theme Customization

Edit `tailwind.config.js` to customize:
- Colors
- Fonts
- Spacing
- Animations

## 📝 Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## 🌟 Key Features Explained

### Progress Tracking
- Automatic progress saving to localStorage
- Per-skill progress tracking
- Overall completion percentage
- Streak tracking with daily updates

### Quiz System
- Multiple-choice questions
- Timed quizzes
- Immediate feedback
- Score tracking
- Answer review with explanations

### Achievement System
- 16+ achievements to unlock
- Progress-based badges
- Points system
- Special achievements for consistency

### Search System
- Fuzzy search with Fuse.js
- Search across all content types
- Keyboard navigation
- Recent searches history

## 🚀 Performance

- **Fast Loading**: Optimized with Next.js App Router
- **Code Splitting**: Automatic code splitting per route
- **Image Optimization**: Next.js Image component
- **Font Optimization**: Google Fonts with display=swap
- **CSS Optimization**: Tailwind CSS purging

## 🔒 Privacy

- **No Backend**: All data stored locally
- **No Tracking**: No analytics or tracking scripts
- **No Login Required**: Start learning immediately

## 📱 Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## 🤝 Contributing

To add more content:

1. Add concepts to skill data files
2. Create quiz questions
3. Add troubleshooting scenarios
4. Define new achievements

## 📄 License

This project is for educational purposes.

## 👏 Acknowledgments

- Design inspired by [Stripe](https://stripe.com) and [Linear](https://linear.app)
- Icons from [Lucide](https://lucide.dev)
- Fonts from Google Fonts

## 🐛 Known Issues

- None currently reported

## 📮 Support

For issues or questions, please create an issue in the repository.

---

**Built with ❤️ for the DevOps community**

