# Demo Projects Portfolio

A modern, responsive portfolio website showcasing innovative solutions across AI, DevOps, and Data Engineering.

## 🚀 Features

- **Modern Design**: Clean, card-based layout with gradient backgrounds
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Interactive**: Hover effects, smooth animations, and scroll reveals
- **Professional**: Ready for deployment and sharing

## 📁 Project Structure

```
Brian-Projects/
├── index.html                 # Main portfolio webpage
├── static/                    # Static assets
│   └── getting_started_with_ai_prototyping.png
├── Demo Projects Portfolio.md # Project documentation
├── README.md                  # This file
└── .gitignore                # Git ignore rules
```

## 🎯 Featured Projects

### 1. Reload STAG/DEV from PROD
Utility script to reset STAG or DEV environments using production data, clearing OpenSearch and DynamoDB.
**Tech Stack**: AWS, DynamoDB, OpenSearch, Automation

### 2. ImmPort Log System with Retry Controls
Logging pipeline for ImmPort with Step Functions and controlled retry logic for better fault tolerance.
**Tech Stack**: AWS Step Functions, Logging, DevOps

### 3. Getting Started with AI Prototyping ✅ [LIVE DEMO](http://difz-ai-info.s3-website-us-east-1.amazonaws.com/)
Comprehensive guide for engineers and scientists featuring LangFlow tutorials, ETLLM pipelines, Groq API integration, and vector search implementations.
**Tech Stack**: AI, LangFlow, Prototyping, ETLLM, Vector Search, Groq API

### 4. Neo4j Natural Language UI
Web-based natural language interface and visualizer for querying Neo4j knowledge graphs.
**Tech Stack**: Neo4j, Natural Language, UI

### 5. MySQL Natural Language Query System
System for translating user natural language questions into structured MySQL queries.
**Tech Stack**: AI, MySQL, LangChain, NLP

### 6. Poster Presenter AI Bot
AI poster bot that uses facial recognition (Rekognition), TTS/STT, and LLMs to simulate conference poster sessions.
**Tech Stack**: AWS Rekognition, AI Agent, TTS, STT

### 7. ResumeAI - LLM Resume Parser & Matcher
Extracts and corrects resumes using LLMs, enabling template conversion and proposal matching.
**Tech Stack**: Resume Parsing, LLM, Proposal Automation

## 🛠️ Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Brian-Projects
   ```

2. **Start local server**
   ```bash
   python3 -m http.server 8000
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000`

## 🚀 Deployment Options

### GitHub Pages
1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Select source branch (main/master)

### AWS S3 Static Website
1. Create S3 bucket
2. Enable static website hosting
3. Upload files and set permissions

### Netlify
1. Connect GitHub repository
2. Auto-deploy on push
3. Custom domain support

## 📊 Portfolio Stats

- **7** Demo Projects
- **5** AI/ML Projects  
- **3** AWS Solutions
- **2** Database Systems

## 🎨 Customization

### Adding Screenshots
1. Add image files to the `static/` directory
2. Update the corresponding project card in `index.html`
3. Replace the screenshot placeholder with:
   ```html
   <div class="screenshot-container" style="...">
       <img src="static/your-image.png" alt="Project Screenshot" style="...">
   </div>
   ```

### Adding Demo Links
Update the href attribute in the "View Demo" buttons:
```html
<a href="your-demo-url" target="_blank" class="btn btn-primary">
    <i class="fas fa-play"></i> View Demo
</a>
```

### Adding GitHub Links
Update the href attribute in the "Code" buttons:
```html
<a href="your-github-repo-url" target="_blank" class="btn btn-secondary">
    <i class="fab fa-github"></i> Code
</a>
```

## 🔧 Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript**: Interactive features and animations
- **Font Awesome**: Icons and visual elements
- **Responsive Design**: Mobile-first approach

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio needs!

---

*Built with passion for innovation and clean code.* 