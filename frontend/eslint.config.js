import js from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import globals from 'globals'

// unplugin-auto-import 会在编译期注入这些 API，源码里没有对应 import 语句，
// 必须声明为全局，否则会被 no-undef 误报。
const autoImportedGlobals = Object.fromEntries([
    'ref', 'computed', 'reactive', 'watch', 'shallowRef', 'markRaw',
    'useTemplateRef', 'nextTick', 'onMounted', 'onUnmounted',
    'defineProps', 'defineEmits', 'defineModel',
    'useRouter', 'useRoute',
    'ElMessage'
].map(name => [name, 'readonly']))

// noinspection JSUnusedGlobalSymbols
export default [
    {
        ignores: ['dist/**', 'node_modules/**']
    },
    js.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node,
                ...autoImportedGlobals
            }
        },
        rules: {
            // 本项目组件文件名统一为 index.vue（靠目录名区分），不启用该规则
            'vue/multi-word-component-names': 'off'
        }
        // 刻意不启用 vue/no-undef-components：
        // Element Plus 组件靠 unplugin-vue-components 自动导入，源码里没有 import 语句，
        // 开启会误报一片；若改用忽略列表维护 el-* 前缀，成本高于收益。
    }
]
