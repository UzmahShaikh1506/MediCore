# Installing Ollama on Windows

## Method 1: Direct Download (Recommended)

1. **Download Ollama for Windows:**
   - Go to: https://ollama.ai/download/windows
   - Or direct download: https://ollama.ai/download/OllamaSetup.exe
   - Run the installer

2. **After Installation:**
   - Ollama should start automatically
   - You may need to restart your terminal/PowerShell

3. **Verify Installation:**
   ```powershell
   ollama --version
   ```

4. **Download Model:**
   ```powershell
   ollama pull llama3.2
   ```

## Method 2: Using Winget (Windows Package Manager)

If you have winget installed:

```powershell
winget install Ollama.Ollama
```

Then restart PowerShell and run:
```powershell
ollama pull llama3.2
```

## Method 3: Using Chocolatey

If you have Chocolatey installed:

```powershell
choco install ollama
```

Then restart PowerShell and run:
```powershell
ollama pull llama3.2
```

## After Installation

1. **Restart PowerShell** (important - so it picks up the new PATH)

2. **Verify Ollama is working:**
   ```powershell
   ollama list
   ```

3. **Download the model:**
   ```powershell
   ollama pull llama3.2
   ```

4. **Test it:**
   ```powershell
   ollama run llama3.2 "What is diabetes?"
   ```

5. **Check from your app:**
   ```powershell
   pnpm check-ollama
   ```

## Troubleshooting

### "ollama is not recognized" after installation

**Solution:** Restart your PowerShell/terminal window. Ollama adds itself to PATH, but you need to restart the terminal for it to take effect.

### Ollama not starting automatically

**Solution:** 
1. Open Ollama from Start Menu
2. Or run manually: `ollama serve`

### Port 11434 already in use

**Solution:** 
1. Check what's using the port: `netstat -ano | findstr :11434`
2. Stop the conflicting service
3. Or change Ollama port in settings

### Still not working?

1. Check if Ollama is in PATH:
   ```powershell
   $env:PATH -split ';' | Select-String -Pattern "ollama"
   ```

2. Manually add to PATH if needed:
   - Usually installed at: `C:\Users\YourUsername\AppData\Local\Programs\Ollama`
   - Add to System Environment Variables

3. Try running directly:
   ```powershell
   & "$env:LOCALAPPDATA\Programs\Ollama\ollama.exe" --version
   ```

## Quick Test

Once installed, test with:
```powershell
ollama run llama3.2 "Say hello"
```

If you see a response, Ollama is working! ✅
