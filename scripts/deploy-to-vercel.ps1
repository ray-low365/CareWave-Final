# PowerShell script to deploy CareWave frontend to Vercel

# Check if Vercel CLI is installed
function Test-VercelCLI {
    try {
        $null = Get-Command vercel -ErrorAction Stop
        return $true
    }
    catch {
        return $false
    }
}

# Set console colors
$reset = "`e[0m"
$bright = "`e[1m"
$green = "`e[32m"
$yellow = "`e[33m"
$cyan = "`e[36m"

Write-Host "`n${bright}${cyan}=== CareWave Frontend Deployment to Vercel ===${reset}`n"

# Check if Vercel CLI is installed
if (-not (Test-VercelCLI)) {
    Write-Host "${yellow}Vercel CLI is not installed. Installing now...${reset}"
    npm install -g vercel
}

# Check if user is logged in to Vercel
Write-Host "`n${cyan}Checking Vercel login status...${reset}"
try {
    $null = vercel whoami 2>&1
    Write-Host "${green}You are logged in to Vercel.${reset}"
}
catch {
    Write-Host "${yellow}You need to log in to Vercel first.${reset}"
    vercel login
}

# Ask for environment variables
Write-Host "`n${cyan}Setting up environment variables...${reset}"

$apiUrl = Read-Host "Enter your API URL (default: https://carewave-backend.onrender.com)"
if ([string]::IsNullOrWhiteSpace($apiUrl)) {
    $apiUrl = "https://carewave-backend.onrender.com"
}

$supabaseUrl = Read-Host "Enter your Supabase URL (default: https://efyoufljsmihzhqjdsqz.supabase.co)"
if ([string]::IsNullOrWhiteSpace($supabaseUrl)) {
    $supabaseUrl = "https://efyoufljsmihzhqjdsqz.supabase.co"
}

$supabaseKey = Read-Host "Enter your Supabase Anon Key"

# Create .vercel directory if it doesn't exist
$vercelDir = Join-Path -Path (Get-Location) -ChildPath "frontend\.vercel"
if (-not (Test-Path $vercelDir)) {
    New-Item -ItemType Directory -Path $vercelDir -Force | Out-Null
}

# Create .env file for Vercel
$envContent = @"
VITE_API_URL=$apiUrl
VITE_SUPABASE_URL=$supabaseUrl
VITE_SUPABASE_ANON_KEY=$supabaseKey
"@

$envPath = Join-Path -Path $vercelDir -ChildPath ".env"
Set-Content -Path $envPath -Value $envContent
Write-Host "${green}Environment variables saved.${reset}"

# Ask for deployment type
Write-Host "`n${cyan}Choose deployment type:${reset}"
Write-Host "1) Preview deployment (default)"
Write-Host "2) Production deployment"
$deployType = Read-Host "Enter your choice (1/2)"

# Deploy to Vercel
Write-Host "`n${cyan}Deploying to Vercel...${reset}"

if ($deployType -eq "2") {
    Write-Host "${yellow}Deploying to production...${reset}"
    Set-Location -Path "frontend"
    vercel --prod
}
else {
    Write-Host "${yellow}Creating preview deployment...${reset}"
    Set-Location -Path "frontend"
    vercel
}

Write-Host "`n${green}${bright}Deployment process completed!${reset}"
