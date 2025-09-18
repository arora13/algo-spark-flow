# 🤖 Gemini AI Setup Guide

## Quick Setup (5 minutes)

### 1. Get Your Free API Key
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click "Get API Key" 
4. Create a new API key
5. Copy the key (starts with `AIza...`)

### 2. Add to Your Project
Create a `.env` file in your project root:
```bash
VITE_GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Restart Your Dev Server
```bash
npm run dev
```

## 🎯 Features You'll Get

### ✅ Smart Code Review
- Paste your algorithm code
- Get instant feedback on logic, efficiency, and style
- "Great logic! Consider using a helper function for readability"

### ✅ Concept Explanation  
- Ask about any algorithm
- Get step-by-step breakdowns with analogies
- "I don't understand merge sort" → Clear explanation

### ✅ AI Code Review
- Detailed analysis of your solutions
- Time/space complexity feedback
- Bug detection and suggestions

## 💰 Cost
- **FREE**: 15 requests/minute, 1M tokens/day
- Perfect for learning and development
- No credit card required

## 🚀 Usage Examples

**Ask Questions:**
- "Explain binary search"
- "What's the difference between merge sort and quick sort?"
- "Why is my bubble sort slow?"

**Get Code Reviews:**
- Paste your code and ask "Review this implementation"
- "How can I optimize this algorithm?"
- "What's the time complexity of my code?"

**Get Hints:**
- "I'm stuck on this problem, give me a hint"
- "What am I missing in my approach?"

## 🔧 Troubleshooting

**"AI Tutor is not configured"**
- Make sure you created the `.env` file
- Check that your API key is correct
- Restart your dev server

**"I'm having trouble connecting"**
- Check your internet connection
- Verify your API key is valid
- Try again in a few minutes

## 🎨 Customization

The AI Tutor appears in your Study Tools panel and can be:
- Moved to different positions
- Customized with different prompts
- Extended with more specialized functions

Happy learning! 🚀
