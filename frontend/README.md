`# Music Page Frontend

A React + TypeScript frontend application built with Vite.

## 🚀 Quick Start

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager
- Git

### Installing Dependencies

```bash
# Install all dependencies
npm install

# Or using yarn
yarn install
```

### Running the Application

```bash
# Start development server
npm run dev

# Or using yarn
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is busy).

### Building for Production

```bash
# Build the application
npm run build

# Or using yarn
yarn build
```

### Preview Production Build

```bash
# Preview the production build locally
npm run preview

# Or using yarn
yarn preview
```

### Code Quality

```bash
# Run ESLint to check code quality
npm run lint

# Or using yarn
yarn lint
```

## 📁 Project Structure

```
frontend/
├── public/                 # Static assets
├── src/
│   ├── assets/            # Images, fonts, icons, videos
│   ├── components/        # Reusable React components
│   ├── constants/         # Application constants
│   ├── pages/             # Page components
│   ├── App.tsx            # Main application component
│   ├── main.tsx           # Application entry point
│   └── index.css          # Global styles
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── README.md              # This file
```

## 🔧 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build the application for production |
| `npm run lint` | Run ESLint to check code quality |
| `npm run preview` | Preview production build locally |

## 📚 Git Commands Reference

### Basic Git Commands

#### Repository Setup
```bash
# Initialize a new Git repository
git init

# Clone an existing repository
git clone <repository-url>

# Add remote repository
git remote add origin <repository-url>

# View remote repositories
git remote -v
```

#### Basic Workflow
```bash
# Check repository status
git status

# Add files to staging area
git add <filename>          # Add specific file
git add .                   # Add all files
git add -A                  # Add all files including deletions

# Commit changes
git commit -m "Your commit message"
git commit -am "Add and commit in one step"

# Push changes to remote repository
git push origin main
git push                    # Push to default branch

# Pull latest changes
git pull origin main
git pull                    # Pull from default branch
```

#### Branching
```bash
# List branches
git branch                  # Local branches
git branch -r               # Remote branches
git branch -a               # All branches

# Create and switch to new branch
git checkout -b <branch-name>
git switch -c <branch-name> # Alternative command

# Switch branches
git checkout <branch-name>
git switch <branch-name>    # Alternative command

# Merge branch
git checkout main
git merge <branch-name>

# Delete branch
git branch -d <branch-name>        # Delete local branch
git push origin --delete <branch-name>  # Delete remote branch
```

#### History and Information
```bash
# View commit history
git log
git log --oneline           # Compact view
git log --graph             # Graph view

# View changes
git diff                    # Unstaged changes
git diff --staged           # Staged changes
git diff <commit1> <commit2> # Between commits

# Show file history
git log --follow <filename>
```

#### Undoing Changes
```bash
# Unstage files
git reset <filename>
git reset                   # Unstage all

# Discard changes in working directory
git checkout -- <filename>
git restore <filename>      # Alternative command

# Reset to previous commit
git reset --soft HEAD~1     # Keep changes staged
git reset --mixed HEAD~1    # Keep changes unstaged (default)
git reset --hard HEAD~1     # Discard changes completely

# Revert a commit (creates new commit)
git revert <commit-hash>
```

#### Stashing
```bash
# Stash changes
git stash
git stash push -m "Stash message"

# List stashes
git stash list

# Apply stash
git stash apply             # Apply latest stash
git stash apply stash@{n}   # Apply specific stash

# Pop stash (apply and remove)
git stash pop

# Drop stash
git stash drop stash@{n}
```

#### Advanced Commands
```bash
# Interactive rebase
git rebase -i HEAD~n        # Rebase last n commits

# Cherry pick commits
git cherry-pick <commit-hash>

# Show changes in a commit
git show <commit-hash>

# Find commits that introduced a bug
git bisect start
git bisect bad <commit-hash>
git bisect good <commit-hash>

# Search in code history
git grep "search-term"
git log -S "search-term"    # Search in commit history

# Clean untracked files
git clean -n                # Dry run
git clean -f                # Force clean files
git clean -fd               # Force clean files and directories
```

#### Configuration
```bash
# Set user information
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Set default branch name
git config --global init.defaultBranch main

# View configuration
git config --list
git config user.name        # View specific setting

# Set up aliases
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.cm commit
```

#### GitHub Specific Commands
```bash
# Fork workflow
git remote add upstream <original-repo-url>
git fetch upstream
git merge upstream/main

# Create pull request (after pushing branch)
# Use GitHub CLI if installed:
gh pr create --title "Your PR title" --body "PR description"

# Clone with SSH
git clone git@github.com:username/repository.git
```

## 🛠️ Development Tools

- **Vite** - Fast build tool and development server
- **React 19** - Frontend library
- **TypeScript** - Type-safe JavaScript
- **ESLint** - Code linting and formatting

## 🚨 Common Issues

### Port Already in Use
If port 5173 is already in use, Vite will automatically try the next available port. Check the terminal output for the actual port being used.

### Node Version Issues
Make sure you're using Node.js version 16 or higher. You can check your version with:
```bash
node --version
```

### Dependencies Issues
If you encounter dependency issues, try:
```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and not licensed for public use.
