// Deployment script for Vercel

/**
 * This script helps deploy the CareWave frontend to Vercel
 * It handles environment variable setup and deployment
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m'
};

/**
 * Execute a command and return its output
 */
function exec(command) {
  try {
    return execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error(`${colors.red}Command failed: ${command}${colors.reset}`);
    if (error.message) console.error(error.message);
    return null;
  }
}

/**
 * Check if Vercel CLI is installed
 */
function checkVercelCLI() {
  try {
    execSync('vercel --version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Ask a question and get user input
 */
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

/**
 * Main deployment function
 */
async function deploy() {
  console.log(`\n${colors.bright}${colors.cyan}=== CareWave Frontend Deployment to Vercel ===${colors.reset}\n`);

  // Check if Vercel CLI is installed
  if (!checkVercelCLI()) {
    console.log(`${colors.yellow}Vercel CLI is not installed. Installing now...${colors.reset}`);
    exec('npm install -g vercel');
  }

  // Check if user is logged in to Vercel
  console.log(`\n${colors.cyan}Checking Vercel login status...${colors.reset}`);
  try {
    execSync('vercel whoami', { stdio: 'ignore' });
    console.log(`${colors.green}You are logged in to Vercel.${colors.reset}`);
  } catch (error) {
    console.log(`${colors.yellow}You need to log in to Vercel first.${colors.reset}`);
    exec('vercel login');
  }

  // Ask for environment variables
  console.log(`\n${colors.cyan}Setting up environment variables...${colors.reset}`);

  const apiUrl = await askQuestion(`Enter your API URL (default: https://carewave-backend.onrender.com): `);
  const supabaseUrl = await askQuestion(`Enter your Supabase URL (default: https://efyoufljsmihzhqjdsqz.supabase.co): `);
  const supabaseKey = await askQuestion(`Enter your Supabase Anon Key: `);

  // Create .env file for Vercel
  const envContent = `VITE_API_URL=${apiUrl || 'https://carewave-backend.onrender.com'}
VITE_SUPABASE_URL=${supabaseUrl || 'https://efyoufljsmihzhqjdsqz.supabase.co'}
VITE_SUPABASE_ANON_KEY=${supabaseKey}`;

  fs.writeFileSync(path.join(__dirname, '../frontend/.vercel/.env'), envContent);
  console.log(`${colors.green}Environment variables saved.${colors.reset}`);

  // Ask for deployment type
  const deployType = await askQuestion(`\n${colors.cyan}Choose deployment type:${colors.reset}
1) Preview deployment (default)
2) Production deployment
Enter your choice (1/2): `);

  // Deploy to Vercel
  console.log(`\n${colors.cyan}Deploying to Vercel...${colors.reset}`);

  if (deployType === '2') {
    console.log(`${colors.yellow}Deploying to production...${colors.reset}`);
    exec('cd frontend && vercel --prod');
  } else {
    console.log(`${colors.yellow}Creating preview deployment...${colors.reset}`);
    exec('cd frontend && vercel');
  }

  console.log(`\n${colors.green}${colors.bright}Deployment process completed!${colors.reset}`);
  rl.close();
}

// Run the deployment function
deploy().catch(error => {
  console.error(`${colors.red}Deployment failed:${colors.reset}`, error);
  rl.close();
  process.exit(1);
});
