# 🚀 Quick Reference - MediCore Diagrams

## 📋 **USE CASE DIAGRAM - Quick List**

### **Actors:**
1. User (Public User)
2. AI Assistant
3. OCR Service (Python)
4. LLM (Ollama)
5. PDF Parser

### **Use Cases:**
1. Upload Report
2. Extract Text from Image (OCR)
3. Extract Text from PDF
4. Analyze Medical Report
5. Translate Medical Text
6. Chat with AI Assistant
7. Generate Simplified Summary
8. Extract Parameters
9. Generate Treatment Recommendations
10. Display Analysis Results

### **Connections:**
- **User** → Upload Report, Analyze Report, Translate Text, Chat, View Results
- **OCR Service** → Extract Text from Image
- **PDF Parser** → Extract Text from PDF
- **AI Assistant** ← Generate Summary, Generate Recommendations
- **LLM** ← Generate Summary, Generate Recommendations

---

## 🏗️ **CLASS DIAGRAM - Quick List**

### **Classes with Key Attributes:**

**User**
- userId, name, email, language
- Methods: login(), logout()

**Report**
- reportId, fileName, fileType, extractedText
- Methods: upload(), validate()

**Analysis**
- analysisId, simplifiedSummary, keyFindings, parameterBreakdown
- Methods: generateSummary(), extractParameters()

**Parameter**
- parameterName, patientValue, normalRange, status
- Methods: detectStatus(), generateExplanation()

**OCRService**
- serviceId, pythonPath
- Methods: extractFromImage(), extractFromPDF()

**AIService**
- serviceId, provider, modelName
- Methods: analyzeReport(), tryOllama()

**LLM**
- modelName, baseUrl
- Methods: generateResponse()

**TranslatorService**
- sourceLanguage, targetLanguage
- Methods: translate()

**ChatbotService**
- conversationId, history
- Methods: processQuestion()

### **Relationships:**
- User → Report (1 to many)
- Report → Analysis (1 to 1)
- Analysis → Parameter (1 to many)
- Report → OCRService (uses)
- Analysis → AIService (uses)
- AIService → LLM (uses)

---

## 🎯 **5-Minute Setup**

1. Open **Draw.io** (https://app.diagrams.net/)
2. Choose **UML** template
3. Use the lists above to add elements
4. Connect them following the relationships
5. Export as PNG/PDF

**Done! ✅**





