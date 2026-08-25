/** @type {import('next').NextConfig} */
const repoName = 'anais-gaillot-photographie';
const isGithubActions = process.env.GITHUB_ACTIONS === 'true';
const basePath = isGithubActions ? `/${repoName}` : '';

const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  basePath,
  assetPrefix: isGithubActions ? `/${repoName}/` : '',
  env: {
    // next/image ne prefixe pas automatiquement basePath quand unoptimized: true,
    // il faut donc le faire a la main via withBasePath() dans lib/utils.ts.
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

module.exports = nextConfig;
