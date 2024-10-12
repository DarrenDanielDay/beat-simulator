/// <reference path="./src/env.d.ts" />
import { defineConfig } from '@rsbuild/core';

const deployRoot = import.meta.env.DEV ? undefined : '/beat-simulator';

export default defineConfig({
  html: {
    template: './src/index.html',
  },
  output: {
    assetPrefix: deployRoot,
  },
});
