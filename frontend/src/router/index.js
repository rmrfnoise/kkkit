import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '@/views/HomeView/index.vue'

const SITE_NAME = '咔咔工具箱'

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
        meta: {title: '在线工具平台，让工作更简单'}
    },
    {
        path: '/base64',
        name: 'base64',
        component: () => import('@/views/Base64View/index.vue'),
        meta: {title: 'Base64 编解码'}
    },
    {
        path: '/url',
        name: 'url',
        component: () => import('@/views/UrlView/index.vue'),
        meta: {title: 'URL 编解码'}
    },
    {
        path: '/unicode',
        name: 'unicode',
        component: () => import('@/views/UnicodeView/index.vue'),
        meta: {title: 'Unicode 转中文'}
    },
    {
        path: '/idcard',
        name: 'idcard',
        component: () => import('@/views/IdCardView/index.vue'),
        meta: {title: '身份证号码解析'}
    },
    {
        path: '/barrage',
        name: 'barrage',
        component: () => import('@/views/BarrageView/index.vue'),
        meta: {title: '手持弹幕'}
    },
    {
        path: '/color',
        name: 'color',
        component: () => import('@/views/ColorView/index.vue'),
        meta: {title: 'HEX ↔ RGB'}
    },
    {
        path: '/wechat-chat',
        name: 'wechat-chat',
        component: () => import('@/views/WechatChatView/index.vue'),
        meta: {title: '微信对话生成器'}
    },
    {
        path: '/earth-online-duration-query',
        name: 'earth-online-duration-query',
        component: () => import('@/views/EarthOnlineDurationQueryView/index.vue'),
        meta: {title: '地球online 在线时长'}
    },
    {
        path: '/timestamp',
        name: 'timestamp',
        component: () => import('@/views/TimestampView/index.vue'),
        meta: {title: '时间戳转换器'}
    },
    {
        path: '/qr-code',
        name: 'qr-code',
        component: () => import('@/views/QRCodeView/index.vue'),
        meta: {title: '二维码生成器'}
    },
    {
        path: '/nickname-generator',
        name: 'nickname-generator',
        component: () => import('@/views/NicknameGeneratorView/index.vue'),
        meta: {title: '昵称生成器'}
    },
    {
        path: '/wechat-moments',
        name: 'wechat-moments',
        component: () => import('@/views/WechatMomentsView/index.vue'),
        meta: {title: '微信朋友圈生成器'}
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('@/views/NotFoundView/index.vue'),
        meta: {title: '页面未找到'}
    }
]

// 等目标锚点挂载出来再滚：路由切换带 160ms 的离场动效，
// scrollBehavior 触发时新页面可能还没进入 DOM
function waitForTarget(selector, timeout = 800) {
    return new Promise(resolve => {
        const startedAt = performance.now()
        const tick = () => {
            const target = document.querySelector(selector)
            if (target || performance.now() - startedAt > timeout) {
                resolve(target ?? null)
                return
            }
            requestAnimationFrame(tick)
        }
        tick()
    })
}

const router = createRouter({
    // BASE_URL 开发时为 /，GitHub Pages 生产构建为 /kkkit/；
    // 不传 base 的话路由链接会解析到域名根路径，子路径部署下全部 404
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    // 切换页面回到顶部；浏览器前进/后退时恢复原有滚动位置；
    // 带 hash 的链接（如 /#tools）滚动到锚点，并让出吸顶页头的高度
    async scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition
        if (to.hash) {
            const target = await waitForTarget(to.hash)
            // 顶部留出吸顶页头的高度；vue-router 的 top 是「从元素位置往上让出的距离」
            return target ? {el: target, top: 88, behavior: 'smooth'} : {top: 0}
        }
        return {top: 0}
    }
})

router.afterEach(to => {
    if (!to.meta.title) {
        document.title = SITE_NAME
        return
    }
    document.title = to.name === 'home'
        ? `${SITE_NAME} - ${to.meta.title}`
        : `${to.meta.title} - ${SITE_NAME}`
})

export default router
