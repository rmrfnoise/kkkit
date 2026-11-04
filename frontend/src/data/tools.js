// 工具清单：全站唯一的数据源。
// 首页目录、页脚链接、搜索、工具页的「接下来」都从这里读。
//
// 新增工具只需要在数组里加一条，并保证 path / icon 与路由、
// src/assets/icons/tools 下的文件名一致；数组顺序就是首页的显示顺序，
// 想让它排在前面就放在前面，不需要再想分类。

export const TOOLS = [
  {
    id: 'base64',
    title: 'Base64 编解码',
    desc: '文本与 Base64 互转，中文按 UTF-8 处理。',
    path: '/base64',
    icon: 'base64'
  },
  {
    id: 'url',
    title: 'URL 编解码',
    desc: '按 UTF-8 逐字节百分号编码，解码失败会直接提示。',
    path: '/url',
    icon: 'url'
  },
  {
    id: 'unicode',
    title: 'Unicode 转中文',
    desc: '把 \\u4f60\\u597d 这类转义还原成中文。',
    path: '/unicode',
    icon: 'unicode'
  },
  {
    id: 'color',
    title: 'HEX ↔ RGB',
    desc: '十六进制与 RGB 数值互转，带色块预览。',
    path: '/color',
    icon: 'color'
  },
  {
    id: 'timestamp',
    title: '时间戳转换器',
    desc: '秒级 / 毫秒级时间戳与日期时间互转，顺带一个实时时钟。',
    path: '/timestamp',
    icon: 'timestamp'
  },
  {
    id: 'idcard',
    title: '身份证号码解析',
    desc: '从 18 位号码里读出地区、生日与性别。',
    path: '/idcard',
    icon: 'idCard'
  },
  {
    id: 'earth-online',
    title: '地球online 在线时长',
    desc: '选个生日，看看你已经上线多少年、多少天。',
    path: '/earth-online-duration-query',
    icon: 'earth-online'
  },
  {
    id: 'qr-code',
    title: '二维码生成器',
    desc: '内容和颜色都能改，点一下就下载 PNG。',
    path: '/qr-code',
    icon: 'qr-code'
  },
  {
    id: 'wechat-chat',
    title: '微信对话生成器',
    desc: '搭一段单聊或群聊，配上语音、转账、通话记录。',
    path: '/wechat-chat',
    icon: 'wechat-chat'
  },
  {
    id: 'wechat-moments',
    title: '微信朋友圈生成器',
    desc: '头像、文案、九宫格、点赞和评论都能编。',
    path: '/wechat-moments',
    icon: 'wechat-moments'
  },
  {
    id: 'barrage',
    title: '手持弹幕',
    desc: '全屏滚动一行大字，手机横过来举着用。',
    path: '/barrage',
    icon: 'barrage'
  },
  {
    id: 'nickname',
    title: '昵称生成器',
    desc: '随机抽昵称，抽到满意为止。',
    path: '/nickname-generator',
    icon: 'nickname'
  }
]

export const TOOL_COUNT = TOOLS.length

export function findToolByPath(path) {
  return TOOLS.find(tool => tool.path === path) ?? null
}

export function findToolById(id) {
  return TOOLS.find(tool => tool.id === id) ?? null
}

// 工具页底部的「接下来」：顺着清单取后面三个，走到末尾就绕回开头
export function relatedTools(id, count = 3) {
  const index = TOOLS.findIndex(tool => tool.id === id)
  if (index === -1) return []
  const size = Math.min(count, TOOLS.length - 1)
  return Array.from({length: size}, (_, offset) => TOOLS[(index + offset + 1) % TOOLS.length])
}
