import { ConfigEnv, ESBuildOptions } from 'vite';
export type TEsBuild = false | ESBuildOptions | undefined;
export const crateEsbuildConfig = ({ mode }: ConfigEnv): TEsBuild => {
  if (mode === 'production') {
    return {
      pure: ['console.log'],
      drop: ['debugger']
    };
  }
};
