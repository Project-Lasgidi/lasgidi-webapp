# Project Lasgidi

A community-driven platform that helps developers discover and connect with tech communities and conferences across Africa and beyond. Born at DjangoCon Africa 2023, Project Lasgidi makes it easy to find developer communities to join and conferences to attend.

## Features

- **Community Discovery**: Browse and search through a curated list of developer communities
- **Conference Listings**: Find upcoming tech conferences with detailed information
- **Submission System**: Submit new communities and conferences for inclusion
- **Advanced Filtering**: Filter by region, programming language, tools, and more
- **Admin Panel**: Content management system powered by Payload CMS

## Tech Stack

- **Frontend**: Next.js 14 with TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Payload CMS with MongoDB
- **Storage**: AWS S3 for media files
- **Forms**: React Hook Form with Zod validation
- **UI Components**: Headless UI, React Icons
- **Deployment Ready**: Optimized for production deployment

## Getting Started

### Prerequisites

- Node.js 18.20.2+ or 20.9.0+
- MongoDB database
- AWS S3 bucket (for file storage)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd lasgidi-webapp
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Configure the following variables in `.env`:
- `DATABASE_URI`: MongoDB connection string
- `PAYLOAD_SECRET`: Secret key for JWT tokens
- `PAYLOAD_PUBLIC_SERVER_URL`: Public URL for the application
- `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_REGION`, `S3_BUCKET`: AWS S3 configuration

4. Start the development server:
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) to view the application

### Admin Panel

Access the admin panel at [http://localhost:3000/admin](http://localhost:3000/admin) to manage:
- Communities
- Conferences
- Media uploads
- User accounts

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── (app)/             # Main application routes
│   └── (payload)/         # Payload CMS admin routes
├── components/            # React components
├── payload/               # Payload CMS configuration
│   ├── collections/       # Database collections (Communities, Conferences, etc.)
│   └── access/           # Access control functions
├── constants/             # Application constants
├── hooks/                 # Custom React hooks
├── lib/                   # Utility functions
└── types/                 # TypeScript type definitions
```

## Available Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm generate:types` - Generate Payload types

## Contributing

We welcome contributions! To get started:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## About the Team

Project Lasgidi was created by:
- **Hope Adoli** (Ghana) - Design/Lead
- **Derek Duafa** (Ghana) - Software Engineer
- **Gyen Abubakar** (Ghana) - Software Engineer

## Contact

- X/Twitter: [@ProjectLasgidi](https://x.com/ProjectLasgidi)
- Found a bug or have a suggestion? Open an issue or reach out on Twitter!

---

*"Lasgidi" is another name for Lagos⎯Nigeria's largest city.*
