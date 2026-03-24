import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import dts from 'vite-plugin-dts';


export default defineConfig({
    plugins: [
        react(),
        dts({
            insertTypesEntry: true,
            include: ['src'],
            rollupTypes: true
        }),
    ],
    build: {
        cssCodeSplit: true,
        lib: {
            entry: path.resolve(__dirname, 'src/index.ts'),
            name: 'react-easy-dashboard',
            formats: ['es'],
            fileName: (format) => `index.mjs`,
        },
        rollupOptions: {
            external: [
                'react',
                'react-dom',
                'react/jsx-runtime',
                '@mui/material',
                '@emotion/react',
                '@emotion/styled',
                '@mui/icons-material',
                '@mui/lab',
                'framer-motion',
            ],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    'react/jsx-runtime': 'jsxRuntime',
                    '@mui/material': 'MaterialUI',
                    '@emotion/react': 'EmotionReact',
                    '@emotion/styled': 'EmotionStyled',
                    '@mui/icons-material': 'MuiIconsMaterial',
                    '@mui/lab': 'MuiLab',
                },
            },
        },
    },
});