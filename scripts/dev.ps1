$projectRoot = Split-Path -Parent $PSScriptRoot
$python = Join-Path $projectRoot "..\.venv\Scripts\python.exe"

if (-not (Test-Path $python)) {
  throw "Python virtual environment not found at $python. Install backend requirements first."
}

Start-Process -FilePath $python -ArgumentList "-m", "uvicorn", "main:app", "--app-dir", "backend", "--port", "8000" -WorkingDirectory $projectRoot -WindowStyle Hidden
Write-Host "Starting Lingo at http://localhost:3000 (API: http://localhost:8000)"
& npm.cmd run dev:web
