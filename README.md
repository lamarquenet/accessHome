# AI Services Dashboard

A modern, responsive dashboard application for managing and accessing AI-related services and tools. Built with Next.js and React.

![Dashboard Screenshot](/public/images/openwebui.png)

## Overview

This dashboard provides a centralized interface for accessing various AI services and tools. It allows users to manage a collection of sites with descriptions and thumbnails, making it easy to organize and access different AI resources from a single location.

## Features

- **Site Management**: View, add, edit, and delete sites in your dashboard
- **Responsive Design**: Works seamlessly across desktop and mobile devices
- **Theme Support**: Toggle between light and dark themes based on your preference
- **Visual Cards**: Each site is displayed as a card with thumbnail, name, and description
- **External Links**: Easily access external services with a single click

## Services Included

The dashboard comes pre-configured with several AI-related services:

- **Voice Cloning Tools**: TTSindex and Sesame for voice cloning and text-to-speech
- **Chat Interfaces**: WebUI for interacting with open-source LLM models
- **Image Generation**: ComfyUI for creating workflows to generate images and videos
- **Automation**: n8n for creating agent-based workflows using logic and LLMs
- **Vector Databases**: Quadrant and Redis for LLM RAG (Retrieval Augmented Generation)
- **Search Services**: SearXNG as an open-source web search service for LLMs

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

## Technology Stack

- **Framework**: [Next.js 15](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: Custom styling with theme support
- **Deployment**: Can be deployed on [Vercel](https://vercel.com/) or any hosting platform that supports Next.js

## Project Structure

- `/src/app`: Main application pages and API routes
- `/src/components`: Reusable UI components
- `/src/contexts`: React context providers (e.g., ThemeContext)
- `/src/hooks`: Custom React hooks
- `/src/lib`: Utility functions and services
- `/src/types`: TypeScript type definitions
- `/data`: JSON data storage for sites

## Future Development

- **Chat LLM Interface**: A dedicated chat interface for interacting with language models (currently under development)
- **User Authentication**: Planned support for user accounts and personalized dashboards
- **Additional Integrations**: More AI services and tools will be added in future updates

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests to help improve the dashboard.

