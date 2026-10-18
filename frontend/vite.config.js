import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'

// noinspection JSUnusedGlobalSymbols
export default defineConfig({
    // GitHub Pages 项目站部署在 https://rmrfnoise.github.io/kkkit/ 子路径下，
    // 生产构建的资源前缀必须是 /kkkit/；开发服务器仍以根路径运行，本地地址不变
    base: process.env.NODE_ENV === 'production' ? '/kkkit/' : '/',
    plugins: [
        vue(),
        vueDevTools(),
        svgLoader(),
        AutoImport({
            resolvers: [ElementPlusResolver()]
        }),
        Components({
            resolvers: [ElementPlusResolver()]
        })
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})