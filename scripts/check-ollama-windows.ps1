# Check Ollama Installation on Windows

Write-Host ""
Write-Host "=== Checking Ollama Installation ===" -ForegroundColor Cyan
Write-Host ""

# Check if Ollama command exists
if (Get-Command ollama -ErrorAction SilentlyContinue) {
    Write-Host "Ollama is installed!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Version:" -ForegroundColor Yellow
    ollama --version
    
    Write-Host ""
    Write-Host "Checking models..." -ForegroundColor Yellow
    ollama list
    
    Write-Host ""
    Write-Host "Ollama is ready to use!" -ForegroundColor Green
    Write-Host ""
} else {
    Write-Host "Ollama is NOT installed." -ForegroundColor Red
    Write-Host ""
    
    Write-Host "Installation Options:" -ForegroundColor Yellow
    Write-Host "1. Download from: https://ollama.ai/download" -ForegroundColor White
    Write-Host "2. Or use winget: winget install Ollama.Ollama" -ForegroundColor White
    
    Write-Host ""
    Write-Host "See INSTALL_OLLAMA_WINDOWS.md for detailed instructions." -ForegroundColor Yellow
    Write-Host ""
    
    # Check if winget is available
    if (Get-Command winget -ErrorAction SilentlyContinue) {
        Write-Host "Quick install with winget:" -ForegroundColor Cyan
        Write-Host "   winget install Ollama.Ollama" -ForegroundColor White
        Write-Host ""
    }
}
