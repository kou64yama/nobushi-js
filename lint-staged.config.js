// @ts-check

module.exports = {
  '*.{md,json}': ['prettier --write'],
  '*.{ts,tsx,js,jsx}': ['prettier --write', 'eslint --fix'],
  'pnpm-workspace.yaml': ['prettier --write'],
};
