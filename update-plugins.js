const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });
const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const plugins = [
  { repo: 'No-Instructions/Relay', name: 'relay' },
  { repo: 'remotely-save/remotely-save', name: 'remotely-save' }
];

async function getLatestRelease(repo) {
  const [owner, name] = repo.split('/');
  const release = await octokit.repos.getLatestRelease({ owner, name });
  return release.data;
}

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', reject);
  });
}

async function updatePlugin(plugin) {
  try {
    const release = await getLatestRelease(plugin.repo);
    const tag = release.tag_name;
    const versionsFile = 'plugins_versions.json';
    let versions = {};
    if (fs.existsSync(versionsFile)) {
      versions = JSON.parse(fs.readFileSync(versionsFile, 'utf8'));
    }
    if (versions[plugin.name] === tag) {
      console.log(`${plugin.name} is up to date`);
      return false;
    }
    // Find zip asset
    const asset = release.assets.find(a => a.name.endsWith('.zip'));
    if (!asset) {
      console.log(`No zip asset found for ${plugin.name}`);
      return false;
    }
    const zipPath = `${plugin.name}.zip`;
    await downloadFile(asset.browser_download_url, zipPath);
    // Ensure plugin directory exists
    const pluginDir = `.obsidian/plugins/${plugin.name}`;
    if (!fs.existsSync(pluginDir)) {
      fs.mkdirSync(pluginDir, { recursive: true });
    }
    // Unzip
    execSync(`unzip -o ${zipPath} -d ${pluginDir}`);
    fs.unlinkSync(zipPath);
    versions[plugin.name] = tag;
    fs.writeFileSync(versionsFile, JSON.stringify(versions, null, 2));
    console.log(`Updated ${plugin.name} to ${tag}`);
    return true;
  } catch (error) {
    console.error(`Error updating ${plugin.name}: ${error.message}`);
    return false;
  }
}

async function main() {
  let changed = false;
  for (const plugin of plugins) {
    if (await updatePlugin(plugin)) {
      changed = true;
    }
  }
  if (changed) {
    console.log('Plugins updated');
  } else {
    console.log('No updates needed');
  }
}

main().catch(console.error);