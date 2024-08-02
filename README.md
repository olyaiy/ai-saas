# RAG-Powered PDF Chat SaaS

## Overview

This project is a side project I developed to explore Retrieval-Augmented Generation (RAG) technology and experiment with full-stack AI application development. It's a PDF Chat SaaS application that demonstrates the power of combining various cutting-edge technologies to create an intelligent document interaction system.

🔗 [Live Demo](https://lnkd.in/g2iVxQK2)
📂 [GitHub Repository](https://github.com/olyaiy/ai-saas)

## What It Does

This application allows users to:

1. Upload PDF documents to the system.
2. Process and index the content of these documents using advanced AI techniques.
3. Engage in natural language conversations about the uploaded documents.
4. Receive intelligent responses based on the content of the documents.

The core functionality is powered by RAG, which enhances the AI's responses by retrieving relevant information from the uploaded documents. This results in more accurate and context-aware answers compared to traditional chatbots.

For example, a user could upload a complex scientific paper and then ask questions about specific sections, methodologies, or conclusions. The system would analyze the document, understand the context, and provide detailed, relevant answers based on the paper's content.

## Key Features

- Seamless PDF document upload and processing
- AI-powered chat interface for document-based conversations
- Vector-based document retrieval for enhanced accuracy and relevance
- User authentication and management for personalized experiences
- Subscription-based access with Stripe integration for potential monetization
- Responsive and clean user interface for ease of use across devices

## Tech Stack

This project integrates a variety of modern technologies:

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
   git clone https://github.com/olyaiy/ai-saas.git
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

While this is primarily a personal side project, contributions are welcome! Feel free to submit a Pull Request if you have ideas for improvements or new features.

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgements

This project was created as a side project to explore RAG technology and full-stack AI application development. It's not intended for commercial use but as a learning and experimentation platform. The rapid evolution of AI technologies and their integration into web applications has been a fascinating journey.

## Contact

For any questions, feedback, or discussions about this project or AI development in general, please reach out through GitHub issues or my LinkedIn profile. I'm always excited to connect with fellow developers and AI enthusiasts!

---

Happy coding and AI exploring! 🚀
