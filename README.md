# Workspace App

A modern, feature-rich workspace management application built with Next.js 15, TypeScript, and Tailwind CSS. This Progressive Web App (PWA) helps users manage projects, tasks, notes, and reminders with a beautiful, responsive interface.

## 🌟 Features

### Project Management
- Create and manage multiple projects
- Track project status (not started, in progress, completed)
- Attach todos and notes to projects
- Visual progress tracking
- Custom color coding for projects

### Task Management
- Create, edit, and delete todos
- Priority levels (high, medium, low)
- Due date tracking
- Filter tasks by status and priority
- Mark tasks as completed

### Note Taking
- Organize notes by categories (personal, work, ideas)
- Rich text formatting
- Search functionality
- Category-based filtering
- Date tracking for notes

### Reminders
- Set up recurring reminders
- Priority levels
- Custom descriptions
- Date and time scheduling
- Completion tracking

### Data Synchronization
- Export/Import data as JSON
- Generate sync codes
- QR code sharing
- Cross-device synchronization
- Local storage persistence

### UI/UX Features
- Dark/Light theme support
- Responsive design
- Smooth animations using Framer Motion
- Modern glass-morphism design
- Mobile-first approach

## 🛠 Technology Stack

- **Framework**: Next.js 15
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context
- **Animations**: Framer Motion
- **PWA Support**: next-pwa
- **Icons**: Heroicons
- **Font**: Geist
- **QR Code**: html5-qrcode, qrcode.react
- **Date Handling**: date-fns

## 📱 PWA Features

The application is fully PWA-compatible with:
- Offline support
- Install prompts
- App icon
- Splash screens
- Service worker caching
- Mobile-optimized viewport

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## 📁 Project Structure

```
src/
├── app/
│   ├── components/    # Reusable UI components
│   ├── context/      # Global state management
│   ├── types/        # TypeScript interfaces
│   ├── utils/        # Helper functions
│   └── pages/        # Application routes
├── public/
│   ├── icons/        # PWA icons
│   └── manifest.json # PWA manifest
```

## 🔄 Data Synchronization

The app provides multiple ways to sync data:

1. **File Export/Import**: Export your data as a JSON file and import it on another device
2. **Sync Codes**: Generate and share compact sync codes
3. **QR Codes**: Scan QR codes to sync data between devices
4. **Local Storage**: Automatic persistence of data in browser storage

## 🎨 Theming

The application supports both light and dark themes with:
- Automatic system preference detection
- Manual theme toggle
- Smooth transition animations
- Consistent color palette
- Accessible contrast ratios

## 📱 Mobile Optimization

- Touch-friendly interface
- Responsive layouts
- Native-like animations
- Bottom navigation
- Swipe gestures
- Pull-to-refresh

## 🔒 Privacy

All data is stored locally in the browser's storage. No external servers are used for data storage.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
