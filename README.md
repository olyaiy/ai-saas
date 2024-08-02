# RAG-Powered PDF Chat SaaS

## Overview

This project is a full-stack Retrieval-Augmented Generation (RAG) powered PDF Chat SaaS application. It allows users to upload PDF documents and engage in AI-driven conversations about the content. The application leverages advanced technologies to provide a seamless, efficient, and intelligent chat experience.

🔗 [Live Demo](https://lnkd.in/g2iVxQK2)

📂 [GitHub Repository](https://github.com/olyaiy/ai-saas)

## Features

- PDF document upload and processing
- AI-powered chat interface for document-based conversations
- Vector-based document retrieval for enhanced accuracy
- User authentication and management
- Subscription-based access with Stripe integration
- Responsive and clean user interface

## Tech Stack

- **Frontend**: Next.js 13, React, TypeScript
- **Backend**: Next.js API routes (Serverless)
- **AI/ML**: OpenAI API for natural language processing
- **Vector Database**: Pinecone for efficient similarity search
- **File Storage**: AWS S3
- **Database**: PostgreSQL with DrizzleORM
- **Authentication**: Clerk
- **Payments**: Stripe
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/olyaiy/ai-saas
   cd ai-saas
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up environment variables (refer to `.env.example` for required variables)

4. Run the development server:
   ```
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Configuration

Ensure you have accounts and API keys set up for the following services:

- OpenAI
- Pinecone
- AWS S3
- Stripe
- Clerk

Update the `.env` file with your API keys and configuration details.

## Deployment

This project is configured for easy deployment on Vercel. Connect your GitHub repository to Vercel and follow the deployment steps, ensuring all environment variables are properly set.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

This project was created as a side project to explore RAG technology and full-stack AI application development. It's not intended for commercial use but as a learning and experimentation platform.

## Contact

For any questions or feedback, please reach out through GitHub issues or my LinkedIn profile.

---

Happy coding! 🚀
