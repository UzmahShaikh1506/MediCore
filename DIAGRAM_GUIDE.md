# 📊 MediCore - Diagram Creation Guide

Simple step-by-step instructions to create Use Case and Class Diagrams for MediCore.

---

## 🎯 **USE CASE DIAGRAM - Step by Step**

### **Step 1: Identify Actors (Users/External Systems)**
Draw these as stick figures (👤) on the left and right sides:

1. **User** (Public User) - Main user of the system
2. **AI Assistant** - The AI that processes requests
3. **OCR Service** - Python service for text extraction
4. **LLM (Ollama)** - Large Language Model
5. **PDF Parser** - External library for PDF processing

### **Step 2: Draw System Boundary**
- Draw a large rectangle
- Label it: **"MediCore System"**

### **Step 3: Add Use Cases (Ovals) Inside System**
Inside the rectangle, draw these ovals:

1. **Upload Report** (PDF or Image)
2. **Extract Text from Image** (OCR)
3. **Extract Text from PDF**
4. **Analyze Medical Report**
5. **Translate Medical Text**
6. **Chat with AI Assistant**
7. **Generate Simplified Summary**
8. **Extract Parameters**
9. **Generate Treatment Recommendations**
10. **Display Analysis Results**

### **Step 4: Connect Actors to Use Cases**
Draw lines (associations) connecting:

**User** connects to:
- Upload Report
- Analyze Medical Report
- Translate Medical Text
- Chat with AI Assistant
- Display Analysis Results

**OCR Service** connects to:
- Extract Text from Image (arrow FROM OCR Service TO use case)

**PDF Parser** connects to:
- Extract Text from PDF (arrow FROM PDF Parser TO use case)

**AI Assistant** connects to:
- Generate Simplified Summary (arrow FROM use case TO AI Assistant)
- Generate Treatment Recommendations (arrow FROM use case TO AI Assistant)

**LLM (Ollama)** connects to:
- Generate Simplified Summary (arrow FROM use case TO LLM)
- Generate Treatment Recommendations (arrow FROM use case TO LLM)

### **Step 5: Add Internal Dependencies (Optional)**
Use dashed arrows (<<include>> or <<extend>>) to show:
- **Analyze Medical Report** <<include>> **Extract Text from Image** OR **Extract Text from PDF**
- **Analyze Medical Report** <<include>> **Extract Parameters**
- **Analyze Medical Report** <<include>> **Generate Simplified Summary**

---

## 🏗️ **CLASS DIAGRAM - Step by Step**

### **Step 1: Identify Main Classes**
Draw rectangles for each class with 3 sections:
- **Class Name** (top)
- **Attributes** (middle)
- **Methods** (bottom)

### **Step 2: Create Base User Class**

**User** (Base Class)
```
┌─────────────────┐
│     User        │
├─────────────────┤
│ - userId: String│
│ - name: String  │
│ - email: String │
│ - language: String│
├─────────────────┤
│ + login()       │
│ + logout()      │
└─────────────────┘
```

### **Step 3: Create Main Classes**

**Report**
```
┌──────────────────────┐
│      Report          │
├──────────────────────┤
│ - reportId: String   │
│ - fileName: String   │
│ - fileType: String   │
│ - fileSize: Number   │
│ - uploadedAt: Date   │
│ - extractedText: String│
├──────────────────────┤
│ + upload()           │
│ + validate()         │
│ + getFileType()      │
└──────────────────────┘
```

**Analysis**
```
┌─────────────────────────────┐
│        Analysis             │
├─────────────────────────────┤
│ - analysisId: String        │
│ - reportId: String          │
│ - simplifiedSummary: String │
│ - detailedExplanation: String│
│ - keyFindings: Array        │
│ - treatmentRecommendations: Array│
│ - medicineSuggestions: Array│
│ - lifestyleAdvice: Array    │
│ - whenToConsultDoctor: Array│
│ - parameterBreakdown: Array │
│ - createdAt: Date           │
├─────────────────────────────┤
│ + generateSummary()         │
│ + extractParameters()       │
│ + formatResults()           │
└─────────────────────────────┘
```

**Parameter**
```
┌──────────────────────────┐
│      Parameter           │
├──────────────────────────┤
│ - parameterId: String    │
│ - parameterName: String  │
│ - patientValue: String   │
│ - normalRange: String    │
│ - unit: String           │
│ - status: String         │
│ - explanation: String    │
├──────────────────────────┤
│ + detectStatus()         │
│ + generateExplanation()  │
└──────────────────────────┘
```

**OCRService**
```
┌──────────────────────┐
│    OCRService        │
├──────────────────────┤
│ - serviceId: String  │
│ - pythonPath: String │
├──────────────────────┤
│ + extractFromImage() │
│ + extractFromPDF()   │
│ + validateImage()    │
└──────────────────────┘
```

**AIService**
```
┌──────────────────────────┐
│      AIService           │
├──────────────────────────┤
│ - serviceId: String      │
│ - provider: String       │
│ - modelName: String      │
├──────────────────────────┤
│ + analyzeReport()        │
│ + simplifyText()         │
│ + generateRecommendations()│
│ + tryOllama()            │
│ + tryHuggingFace()       │
│ + tryDictionary()        │
└──────────────────────────┘
```

**LLM** (Ollama)
```
┌──────────────────────┐
│        LLM           │
├──────────────────────┤
│ - modelName: String  │
│ - baseUrl: String    │
├──────────────────────┤
│ + generateResponse() │
│ + checkAvailability()│
└──────────────────────┘
```

**TranslatorService**
```
┌──────────────────────┐
│ TranslatorService    │
├──────────────────────┤
│ - sourceLanguage: String│
│ - targetLanguage: String│
├──────────────────────┤
│ + translate()        │
│ + simplifyText()     │
└──────────────────────┘
```

**ChatbotService**
```
┌──────────────────────┐
│  ChatbotService      │
├──────────────────────┤
│ - conversationId: String│
│ - history: Array     │
├──────────────────────┤
│ + processQuestion()  │
│ + addToHistory()     │
│ + clearHistory()     │
└──────────────────────┘
```

### **Step 4: Add Relationships**

Draw arrows between classes:

**Inheritance (Triangle Arrow):**
- None needed (User is base, but no subclasses in current design)

**Association (Simple Arrow):**
- **User** → **Report** (1-to-many: "uploads")
- **User** → **Analysis** (1-to-many: "views")
- **User** → **TranslatorService** (1-to-1: "uses")
- **User** → **ChatbotService** (1-to-1: "chats with")

**Composition (Filled Diamond):**
- **Report** ◆→ **Analysis** (1-to-1: "generates")
- **Analysis** ◆→ **Parameter** (1-to-many: "contains")

**Dependency (Dashed Arrow):**
- **Report** ──→ **OCRService** ("uses" for extraction)
- **Analysis** ──→ **AIService** ("uses" for generation)
- **AIService** ──→ **LLM** ("uses" for responses)
- **TranslatorService** ──→ **AIService** ("uses")
- **ChatbotService** ──→ **AIService** ("uses")

### **Step 5: Add Multiplicity**
Add numbers to relationships:
- User → Report: **1** to **0..***
- Report → Analysis: **1** to **1**
- Analysis → Parameter: **1** to **0..***
- User → TranslatorService: **1** to **1**
- User → ChatbotService: **1** to **1**

---

## 🛠️ **TOOLS TO CREATE DIAGRAMS**

### **Free Online Tools:**
1. **Draw.io (diagrams.net)** - https://app.diagrams.net/
   - Free, no signup needed
   - Has UML templates
   - Can export as PNG/PDF

2. **Lucidchart** - https://www.lucidchart.com/
   - Free tier available
   - Good UML support

3. **PlantUML** - https://plantuml.com/
   - Text-based diagramming
   - Good for version control

### **Desktop Tools:**
1. **StarUML** - Free UML tool
2. **Visual Paradigm** - Free community edition
3. **Microsoft Visio** - Paid, professional

---

## 📝 **QUICK REFERENCE CHECKLIST**

### **Use Case Diagram:**
- [ ] Draw system boundary rectangle
- [ ] Add all actors (stick figures)
- [ ] Add all use cases (ovals)
- [ ] Connect actors to use cases
- [ ] Add include/extend relationships (dashed arrows)
- [ ] Label everything clearly

### **Class Diagram:**
- [ ] List all classes
- [ ] Add attributes to each class
- [ ] Add methods to each class
- [ ] Draw inheritance relationships (triangle arrows)
- [ ] Draw associations (simple arrows)
- [ ] Draw compositions (filled diamond)
- [ ] Draw dependencies (dashed arrows)
- [ ] Add multiplicity (1, 0..*, etc.)

---

## 🎨 **VISUAL EXAMPLE STRUCTURE**

### **Use Case Diagram Layout:**
```
        [User]                    [OCR Service]
           │                            │
           │                            │
    ┌──────┴────────────────────────────┴──────┐
    │         MediCore System                  │
    │                                           │
    │  (Upload Report)  (Extract Text)         │
    │       │                │                  │
    │       └──────┬─────────┘                  │
    │              │                            │
    │      (Analyze Report)                     │
    │              │                            │
    │      (Generate Summary) ──→ [AI Assistant]│
    │                                           │
    └───────────────────────────────────────────┘
```

### **Class Diagram Layout:**
```
    [User] ──1──uploads──0..*──→ [Report]
                                    │
                                    │ generates
                                    │
                                    ↓
                                [Analysis] ──1──contains──0..*──→ [Parameter]
                                    │
                                    │ uses
                                    ↓
                                [AIService] ──uses──→ [LLM]
```

---

## 💡 **TIPS**

1. **Start Simple**: Begin with main actors and use cases, add details later
2. **Use Colors**: Different colors for actors, use cases, and relationships
3. **Keep It Clean**: Don't overcrowd - use multiple diagrams if needed
4. **Label Everything**: Every arrow and box should be labeled
5. **Follow Standards**: Use UML notation consistently
6. **Review**: Check that all relationships make sense

---

## ✅ **FINAL CHECK**

Before submitting, verify:
- [ ] All actors are identified
- [ ] All use cases are covered
- [ ] All classes have attributes and methods
- [ ] All relationships are correct
- [ ] Multiplicity is shown
- [ ] Diagram is readable and professional
- [ ] Labels are clear and consistent

---

**Good luck creating your diagrams! 🎉**





