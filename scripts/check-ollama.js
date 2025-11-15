#!/usr/bin/env node

/**
 * Quick script to check if Ollama is running and configured correctly
 */

const http = require('http')

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434'
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3.2'

console.log('🔍 Checking Ollama setup...\n')
console.log(`URL: ${OLLAMA_URL}`)
console.log(`Model: ${OLLAMA_MODEL}\n`)

// Check if Ollama is running
async function checkOllama() {
  try {
    // Check if server is reachable
    const url = new URL(`${OLLAMA_URL}/api/tags`)
    const response = await fetch(url.toString())
    
    if (!response.ok) {
      console.log('❌ Ollama server is not responding')
      console.log(`   Make sure Ollama is running at ${OLLAMA_URL}`)
      console.log('   Start it with: ollama serve')
      process.exit(1)
    }

    const data = await response.json()
    const models = data.models || []

    console.log('✅ Ollama is running!\n')
    console.log(`📦 Installed models (${models.length}):`)
    models.forEach((model) => {
      const name = model.name || model.model || 'unknown'
      const size = model.size ? `(${(model.size / 1024 / 1024 / 1024).toFixed(2)} GB)` : ''
      const marker = name.includes(OLLAMA_MODEL) ? ' ⭐ (will be used)' : ''
      console.log(`   - ${name} ${size}${marker}`)
    })

    // Check if recommended model is installed
    const hasModel = models.some(
      (m) => (m.name || m.model || '').includes(OLLAMA_MODEL)
    )

    if (!hasModel) {
      console.log(`\n⚠️  Model "${OLLAMA_MODEL}" not found!`)
      console.log(`   Install it with: ollama pull ${OLLAMA_MODEL}`)
    } else {
      console.log(`\n✅ Model "${OLLAMA_MODEL}" is ready to use!`)
    }

    // Test a simple request
    console.log('\n🧪 Testing model...')
    try {
      const testResponse = await fetch(`${OLLAMA_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: OLLAMA_MODEL,
          prompt: 'Say "Hello" in one word.',
          stream: false,
        }),
      })

      if (testResponse.ok) {
        const testData = await testResponse.json()
        console.log('✅ Model test successful!')
        console.log(`   Response: ${testData.response?.substring(0, 50)}...`)
      } else {
        console.log('⚠️  Model test failed (model might still be loading)')
      }
    } catch (error) {
      console.log('⚠️  Could not test model:', error.message)
    }

    console.log('\n✨ Ollama is ready to use with MediCore!')
  } catch (error) {
    console.log('❌ Error connecting to Ollama:')
    console.log(`   ${error.message}`)
    console.log('\n📖 Setup instructions:')
    console.log('   1. Install Ollama: https://ollama.ai/download')
    console.log(`   2. Download model: ollama pull ${OLLAMA_MODEL}`)
    console.log('   3. Start Ollama: ollama serve')
    console.log('\n   See OLLAMA_SETUP.md for detailed instructions')
    process.exit(1)
  }
}

checkOllama()

