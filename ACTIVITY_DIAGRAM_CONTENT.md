# Activity Diagram Content for MediCore

This document provides detailed content for creating activity diagrams for the MediCore Medical Jargon Simplifier App. Use this content with UML diagramming tools like draw.io, Lucidchart, PlantUML, or any UML tool.

---

## 📊 Activity Diagram 1: Report Analyzer Workflow

### **Swimlanes:**
- **User**
- **Frontend (UI)**
- **API Route (/api/report)**
- **OCR Service**
- **AI Service**
- **Parameter Parser**

### **Activities and Flow:**

#### **Initial Flow:**
1. **[User]** Start: Upload Medical Report
   - User selects PDF or Image file
   - User clicks "Analyze" button

2. **[Frontend]** Validate File Selection
   - Check if file is selected
   - **Decision:** File selected?
     - **No →** Display error: "Please select a file" → **[End]**
     - **Yes →** Continue to next activity

3. **[Frontend]** Prepare File for Upload
   - Extract file type (PDF or Image)
   - Validate file extension
   - Check file size
   - **Decision:** File valid?
     - **No →** Display error: "Invalid file type or size" → **[End]**
     - **Yes →** Send to API

4. **[API Route]** Receive Upload Request
   - Parse FormData
   - Extract file, fileType, language

5. **[API Route]** Validate File Type & Size
   - Check MIME type (PDF: application/pdf, Images: image/jpeg, image/png, image/webp, etc.)
   - Validate file size limits
   - **Decision:** File valid?
     - **No →** Return error response (400) → **[End]**
     - **Yes →** Continue to text extraction

#### **Text Extraction Flow (Fork - Parallel):**
6. **[Fork Node]** Split based on file type

7. **[Path A: PDF File]**
   - **[OCR Service]** Extract Text from PDF
     - Use pdf-parse library
     - Extract all text content
     - Return extracted text

8. **[Path B: Image File]**
   - **[OCR Service]** Extract Text from Image
     - Use Python EasyOCR
     - Process image file
     - Extract text with OCR
     - Return extracted text

9. **[Join Node]** Merge both paths

10. **[API Route]** Validate Extracted Text
    - Check if text is not empty
    - Check minimum text length
    - **Decision:** Text valid?
      - **No →** Return error: "Could not extract text from file" → **[End]**
      - **Yes →** Continue to preprocessing

#### **Text Preprocessing:**
11. **[API Route]** Preprocess Extracted Text
    - Clean text (remove extra spaces, special characters)
    - Normalize text format
    - Format text for analysis

#### **AI Analysis Flow (Parallel Processing - Fork):**
12. **[Fork Node]** Try multiple AI providers in parallel

13. **[Path 1: Ollama (Primary)]**
    - **[AI Service]** Try Ollama Analysis
      - Connect to local Ollama server
      - Send text to Llama 3.2 model
      - **Decision:** Ollama successful?
        - **Yes →** Return AI analysis
        - **No →** Continue to fallback

14. **[Path 2: Hugging Face (Fallback)]**
    - **[AI Service]** Try Hugging Face Analysis
      - Connect to Hugging Face API
      - Send text to model
      - **Decision:** Hugging Face successful?
        - **Yes →** Return AI analysis
        - **No →** Continue to fallback

15. **[Path 3: OpenAI (Optional)]**
    - **[AI Service]** Try OpenAI Analysis (if API key exists)
      - Connect to OpenAI API
      - Send text to model
      - **Decision:** OpenAI successful?
        - **Yes →** Return AI analysis
        - **No →** Continue to fallback

16. **[Path 4: Dictionary Fallback]**
    - **[AI Service]** Use Dictionary Fallback
      - Match medical terms with dictionary
      - Generate basic explanations
      - Return dictionary-based analysis

17. **[Join Node]** Merge AI analysis paths
    - Select first successful AI response
    - If all fail, use dictionary fallback

#### **Parameter Extraction:**
18. **[Parameter Parser]** Extract Test Parameters
    - Parse extracted text with regex patterns
    - **Loop:** For each parameter found:
      - Extract parameter name
      - Extract patient value
      - Extract normal range
      - Determine status (HIGH/LOW/NORMAL)
      - Generate parameter explanation
    - Collect all parameters

19. **[Parameter Parser]** Generate Parameter Breakdown
    - Create structured parameter objects
    - Include patient value vs normal range
    - Include status indicators

#### **Comprehensive Analysis Generation:**
20. **[AI Service]** Generate Detailed Summary
    - Generate 8-12 sentence comprehensive summary
    - Analyze all parameters together

21. **[AI Service]** Generate Detailed Explanation
    - Generate 6-8 sentence detailed explanation
    - Provide context for findings

22. **[AI Service]** Extract Key Findings
    - Identify 7-10 key findings
    - Highlight important parameters

23. **[AI Service]** Generate Treatment Recommendations
    - Provide 4-6 treatment recommendations
    - General treatment suggestions

24. **[AI Service]** Generate Medicine Suggestions
    - Suggest 3-5 common medications
    - Include generic and brand names
    - Add disclaimer about doctor consultation

25. **[AI Service]** Generate Lifestyle Advice
    - Provide 4-6 lifestyle recommendations
    - Actionable health tips

26. **[AI Service]** Generate "When to Consult Doctor" Section
    - List 3-4 specific situations
    - Clear guidance on urgent cases

#### **Response Formatting:**
27. **[API Route]** Format Response
    - Normalize all arrays
    - Convert objects to strings where needed
    - Structure JSON response
    - Apply language translation if needed

28. **[API Route]** Return Response to Frontend
    - Send JSON response with all analysis sections

#### **UI Display:**
29. **[Frontend]** Receive Analysis Response
    - Parse JSON response
    - Store in component state

30. **[Frontend]** Display Analysis Results
    - Display Detailed Summary (color-coded)
    - Display Detailed Explanation
    - Display Key Findings (with badges)
    - Display Treatment Recommendations
    - Display Medicine Suggestions (with disclaimer)
    - Display Lifestyle Advice
    - Display "When to Consult Doctor" section
    - Display Parameter Breakdown (table with status colors)

31. **[Frontend]** Apply Color Coding
    - HIGH values: Red indicators
    - LOW values: Orange indicators
    - NORMAL values: Green indicators

32. **[User]** View Analysis Results
    - User can read all sections
    - User can scroll through parameters

33. **[End]** Activity Complete

---

## 📊 Activity Diagram 2: Medical Text Translator Workflow

### **Swimlanes:**
- **User**
- **Frontend (UI)**
- **API Route (/api/translate)**
- **AI Service**

### **Activities and Flow:**

1. **[User]** Start: Enter Medical Text
   - User types or pastes medical text in input field
   - User selects target language (en, hi, mr, ur)
   - User clicks "Translate" button

2. **[Frontend]** Validate Input
   - Check if text is not empty
   - Check minimum text length
   - **Decision:** Text valid?
     - **No →** Display error: "Please enter medical text" → **[End]**
     - **Yes →** Send to API

3. **[Frontend]** Show Loading State
   - Display loading indicator
   - Disable translate button

4. **[API Route]** Receive Translation Request
   - Parse JSON body
   - Extract text and targetLanguage

5. **[API Route]** Validate Request
   - Check if text exists
   - Validate language code
   - **Decision:** Request valid?
     - **No →** Return error (400) → **[End]**
     - **Yes →** Continue to translation

#### **AI Translation (Parallel Processing - Fork):**
6. **[Fork Node]** Try multiple AI providers

7. **[Path 1: Ollama]**
   - **[AI Service]** Try Ollama Translation
     - Connect to local Ollama
     - Send translation prompt with text and target language
     - **Decision:** Ollama successful?
       - **Yes →** Return simplified text
       - **No →** Continue to fallback

8. **[Path 2: Hugging Face]**
   - **[AI Service]** Try Hugging Face Translation
     - Connect to Hugging Face API
     - Translate medical text
     - **Decision:** Hugging Face successful?
       - **Yes →** Return simplified text
       - **No →** Continue to fallback

9. **[Path 3: Dictionary Fallback]**
   - **[AI Service]** Use Dictionary Translation
     - Match medical terms with dictionary
     - Replace with simple equivalents
     - Translate to target language if needed

10. **[Join Node]** Merge translation paths
    - Select first successful translation

11. **[API Route]** Format Translation Response
    - Structure response with originalText, simplifiedText, language

12. **[API Route]** Return Response to Frontend
    - Send JSON response

13. **[Frontend]** Receive Translation Response
    - Parse JSON response
    - Update component state

14. **[Frontend]** Display Simplified Text
    - Show original text (optional)
    - Display simplified/translated text prominently
    - Apply language-specific formatting if needed

15. **[User]** View Simplified Text
    - User reads simplified medical explanation

16. **[End]** Activity Complete

---

## 📊 Activity Diagram 3: Medical Chatbot Workflow

### **Swimlanes:**
- **User**
- **Frontend (UI)**
- **API Route (/api/chatbot)**
- **AI Service**

### **Activities and Flow:**

1. **[User]** Start: Ask Medical Question
   - User types question in chat input
   - User selects language preference
   - User clicks "Send" or presses Enter

2. **[Frontend]** Validate Message
   - Check if message is not empty
   - **Decision:** Message valid?
     - **No →** Display error: "Please enter a question" → **[End]**
     - **Yes →** Add message to conversation history

3. **[Frontend]** Display User Message
   - Show user message in chat UI
   - Update conversation history state

4. **[Frontend]** Show Loading Indicator
   - Display "AI is typing..." indicator
   - Disable input temporarily

5. **[API Route]** Receive Chatbot Request
   - Parse JSON body
   - Extract message, language, conversationHistory

6. **[API Route]** Validate Request
   - Check if message exists
   - Validate language code
   - **Decision:** Request valid?
     - **No →** Return error (400) → **[End]**
     - **Yes →** Continue to AI processing

#### **AI Response Generation (Parallel Processing - Fork):**
7. **[Fork Node]** Try multiple AI providers

8. **[Path 1: Ollama]**
   - **[AI Service]** Try Ollama Chatbot Response
     - Connect to local Ollama
     - Send conversation history + current question
     - Generate context-aware response
     - **Decision:** Ollama successful?
       - **Yes →** Return AI response
       - **No →** Continue to fallback

9. **[Path 2: Hugging Face]**
   - **[AI Service]** Try Hugging Face Chatbot Response
     - Connect to Hugging Face API
     - Generate medical Q&A response
     - **Decision:** Hugging Face successful?
       - **Yes →** Return AI response
       - **No →** Continue to fallback

10. **[Path 3: Dictionary Fallback]**
    - **[AI Service]** Use Dictionary-Based Response
      - Match question keywords with dictionary
      - Generate basic explanation from medical dictionary
      - Return simple explanation

11. **[Join Node]** Merge AI response paths
    - Select first successful response

12. **[API Route]** Format Chatbot Response
    - Structure response with response text and language

13. **[API Route]** Return Response to Frontend
    - Send JSON response

14. **[Frontend]** Receive Chatbot Response
    - Parse JSON response
    - Add response to conversation history

15. **[Frontend]** Display AI Response
    - Show AI response in chat UI
    - Mark as AI message with appropriate styling
    - Scroll chat to bottom

16. **[Frontend]** Enable Input
    - Re-enable chat input
    - Focus on input field

17. **[User]** Review Response
    - User reads AI explanation
    - **Decision:** User has another question?
      - **Yes →** Go back to activity 1 (Ask Medical Question) **[Loop]**
      - **No →** Continue

18. **[End]** Activity Complete (or continue loop)

---

## 📊 Activity Diagram 4: Error Handling & Recovery Flow

### **General Error Handling Activities:**

#### **File Upload Errors:**
- Invalid file type → Display error message → Allow user to select new file
- File too large → Display error with size limit → Allow user to upload smaller file
- File corrupted → Display error → Suggest user try another file

#### **OCR Errors:**
- Text extraction failed → Display error → Suggest user upload clearer image or try PDF
- Low quality image → Warning message → Still attempt extraction with results disclaimer

#### **AI Service Errors:**
- All AI services failed → Use dictionary fallback → Display simplified analysis
- Timeout error → Display timeout message → Suggest user try again
- Network error → Display network error → Allow retry

#### **API Errors:**
- 400 Bad Request → Display validation error → Guide user to fix input
- 500 Internal Server Error → Display generic error → Log error server-side → Suggest retry

---

## 🎨 Diagram Elements Legend

### **Activity Diagram Symbols:**
- **Rounded Rectangle** = Activity/Action
- **Diamond** = Decision Node (with guard conditions)
- **Horizontal Bar (Thick)** = Fork/Join Node (parallel processing)
- **Vertical Bars** = Swimlanes (different actors/components)
- **Arrow** = Control Flow
- **Start Node (Black Circle)** = Start of activity
- **End Node (Black Circle with border)** = End of activity
- **Note** = Additional information/comments

### **Guard Conditions Format:**
- [condition?] Yes
- [condition?] No
- [file type = PDF]
- [file type = Image]
- [successful?]
- [failed?]

---

## 📝 Notes for Diagram Creation

1. **Fork/Join Nodes**: Use these for parallel processing activities (multiple AI providers)
2. **Decision Nodes**: Use diamonds with guard conditions for all validation checks
3. **Swimlanes**: Organize activities by component/user for clarity
4. **Loops**: Use decision nodes with loops back for iterative processes (parameter extraction)
5. **Sub-activities**: Some activities can be broken into sub-activities if needed
6. **Error Paths**: Always include error handling paths from decision nodes

---

## 🔧 Tools Recommendation

You can use these tools to create the diagrams:
- **draw.io (diagrams.net)**: Free, web-based, supports UML
- **Lucidchart**: Professional, has free tier
- **PlantUML**: Text-based, can generate diagrams from code
- **Visio**: Microsoft's diagramming tool
- **Mermaid**: Text-based, can embed in markdown

---

## 📄 Usage Instructions

1. Choose your preferred diagramming tool
2. Use the activities listed above as nodes/actions
3. Connect them with arrows following the flow described
4. Add decision diamonds where indicated
5. Use fork/join nodes for parallel processing
6. Organize into swimlanes as specified
7. Add guard conditions on decision outputs

---

**Generated for MediCore Project**  
*Medical Jargon Simplifier App*
