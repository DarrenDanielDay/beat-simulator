declare module '*.mp3' {
  const url: string;
  export default url;
}

interface ImportMeta {
  env: {
    DEV: boolean;
  };
}
