# MediCore - Medical Jargon Simplifier

A comprehensive medical jargon simplifier app that helps patients and caregivers understand complex medical terminology through AI-powered translation, chatbot assistance, and medical report analysis.

## Features

### 1. Medical Text Translator
- Translate complex medical text into simple, easy-to-understand language
- Support for multiple languages: English, Hindi, Marathi, Urdu
- Real-time translation with AI-powered simplification

### 2. Medical Terminology Chatbot
- Interactive chatbot for medical term explanations
- Conversational interface with conversation history
- Multi-language support for questions and answers

### 3. Medical Report Analyzer
- Upload medical reports (PDF or images)
- OCR technology to extract text from documents
- AI-powered summarization and key findings extraction
- Left-side upload, right-side summary layout

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **UI Components**: shadcn/ui, Radix UI, Tailwind CSS
- **AI/ML**: OpenAI GPT-4o-mini for text simplification
- **OCR**: Tesseract.js for image text extraction, pdf-parse for PDFs
- **File Upload**: react-dropzone
- **Multi-language**: Language selection per feature

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm (or npm/yarn)
- **Ollama** (Recommended - FREE, local) - See [OLLAMA_SETUP.md](./OLLAMA_SETUP.md) for quick setup

> **Note:** The app works without Ollama using a dictionary fallback, but Ollama provides much better AI-powered results!

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd MediCore
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
```

3. Set up environment variables (optional):
   ```bash
   cp .env.example .env
   ```

4. **Set Up Ollama (Recommended - 5 minutes):**
   
   See [OLLAMA_SETUP.md](./OLLAMA_SETUP.md) for detailed instructions.
   
   Quick setup:
   ```bash
   # 1. Install Ollama from https://ollama.ai/download
   # 2. Download model:
   ollama pull llama3.2
   # 3. Verify setup:
   pnpm check-ollama
   ```
   
   That's it! The app will automatically use Ollama. No .env needed!
   
   > **Alternative:** App works without Ollama using dictionary fallback, but AI results are much better with Ollama.

5. Run the development server:
```bash
pnpm dev
# or
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
MediCore/
├── app/
│   ├── api/              # API routes
│   │   ├── translate/   # Text translation endpoint
│   │   ├── chatbot/      # Chatbot endpoint
│   │   ├── ocr/          # OCR endpoint
│   │   └── report/       # Report analysis endpoint
│   ├── translator/       # Text translator page
│   ├── chatbot/          # Chatbot page
│   ├── report-analyzer/  # Report analyzer page
│   └── page.tsx          # Homepage
├── components/
│   ├── ui/               # shadcn/ui components
│   └── navigation.tsx    # Main navigation
├── lib/
│   ├── services/         # Business logic
│   │   ├── ai-service.ts # AI/OpenAI integration
│   │   └── ocr-service.ts # OCR functionality
│   └── types/           # TypeScript types
└── messages/            # Translation files (for future i18n)
```

## API Endpoints

### POST `/api/translate`
Translate medical text to simple language.

**Request:**
```json
{
  "text": "The patient presents with acute myocardial infarction...",
  "targetLanguage": "en"
}
```

**Response:**
```json
{
  "originalText": "...",
  "simplifiedText": "The patient has a heart attack...",
  "language": "en"
}
```

### POST `/api/chatbot`
Get chatbot response for medical questions.

**Request:**
```json
{
  "message": "What is diabetes?",
  "language": "en",
  "conversationHistory": []
}
```

### POST `/api/report`
Analyze medical report (with file upload).

**Request:** FormData
- `file`: File (PDF or image)
- `fileType`: "pdf" | "image"
- `language`: "en" | "hi" | "mr" | "ur"

## Supported Languages

- **English (en)**: Default language
- **Hindi (hi)**: हिंदी
- **Marathi (mr)**: मराठी
- **Urdu (ur)**: اردو

## Features in Detail

### OCR Capabilities
- **Images**: JPG, PNG, JPEG, GIF
- **PDFs**: Full PDF text extraction
- Uses Tesseract.js for image OCR
- Uses pdf-parse for PDF text extraction

### AI Features
- Text simplification using OpenAI GPT-4o-mini
- Medical terminology explanation
- Report summarization
- Key findings extraction

## Development

### Build for Production
```bash
pnpm build
pnpm start
```

### Linting
```bash
pnpm lint
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OLLAMA_URL` | Ollama server URL (default: http://localhost:11434) | No |
| `OLLAMA_MODEL` | Ollama model name (default: llama3.2) | No |
| `HUGGING_FACE_API_KEY` | Hugging Face API token (free tier available) | No |
| `HUGGING_FACE_MODEL` | Hugging Face model name | No |
| `OPENAI_API_KEY` | OpenAI API key (paid) | No |
| `MONGODB_URI` | MongoDB connection string (optional) | No |
| `POSTGRES_URL` | PostgreSQL connection string (optional) | No |

**Note:** The app works without any API keys using a dictionary fallback. For best results, use Ollama (free, local) or Hugging Face (free tier).

## Future Enhancements

- [ ] Database integration for storing reports
- [ ] User authentication
- [ ] Report history
- [ ] Export functionality
- [ ] Mobile app
- [ ] Offline support
- [ ] SMS alerts

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is private and proprietary.

## Support

For issues and questions, please contact the development team.

