# OpenClaw教师助手 - 多智能体协作模式选择系统

> 为高校教师提供五种多智能体协作模式选择，覆盖教学、科研、项目管理全场景

![版本](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

---

## 🎯 系统介绍

这是一个纯静态网站，帮助高校教师快速了解、选择并配置适合自己的多智能体协作模式。

**核心功能：**
- 🤖 **智能模式推荐** - 回答3-5个问题，获得最适合的协作模式推荐
- 📚 **五种模式详解** - Pipeline、File Blackboard、Single Bot、Independent Fleet、Topic Team
- 🎨 **31个场景模板** - 覆盖备课、竞赛、课程建设、科研全流程
- ⚡ **交互式配置向导** - 分步引导，快速上手

---

## 🚀 快速开始

### 在线访问

访问已部署的网站：
```
https://openclaw-teachers.vercel.app
```

### 本地开发

```bash
# 克隆项目
git clone https://github.com/yourusername/openclaw-teacher-hub.git
cd openclaw-teacher-hub/frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建部署

```bash
# 构建静态网站
npm run export

# 输出目录: dist/
```

---

## 📁 项目结构

```
frontend/
├── src/
│   ├── components/          # React组件
│   │   ├── Header.tsx      # 导航栏
│   │   ├── ModeCard.tsx    # 模式卡片
│   │   ├── DecisionTree.tsx # 决策树组件
│   │   └── ...
│   ├── pages/              # Next.js页面
│   │   ├── index.tsx       # 首页
│   │   ├── modes.tsx       # 模式列表
│   │   ├── mode/[id].tsx   # 模式详情
│   │   ├── scenarios.tsx   # 场景模板
│   │   └── guide.tsx       # 使用指南
│   ├── data/
│   │   └── modes.json      # 五种模式数据
│   └── styles/
│       └── globals.css     # 全局样式
├── public/                 # 静态资源
├── package.json
├── next.config.js
├── tailwind.config.js
└── tsconfig.json
```

---

## 🎨 技术栈

- **框架**: [Next.js 14](https://nextjs.org/) - React框架
- **样式**: [Tailwind CSS](https://tailwindcss.com/) - 原子化CSS
- **动画**: [Framer Motion](https://www.framer.com/motion/) - 动画库
- **图标**: [Lucide React](https://lucide.dev/) - 图标库
- **字体**: 系统默认字体

---

## 📊 包含的五种模式

| 模式 | 编号 | 核心特点 | 配置时间 |
|------|------|---------|---------|
| **教师流水线** | 形式一 | 多模型顺序协作 | 5分钟 |
| **教师文件黑板** | 形式二 | Master+Workers+Reviewer并行 | 10分钟 |
| **单机器人路由** | 形式三-A | 单机器人多群组 | 5分钟 |
| **多群组团队** | 形式三-B | 多机器人独立舰队 | 30分钟 |
| **话题团队** | 形式四 | 单群组多话题 | 25分钟 |

---

## 🎯 核心页面

### 1. 首页 (`/`)
- Hero区域 - 系统介绍和CTA
- 智能模式推荐器 - 决策树问卷
- 五种模式概览卡片
- 系统特点展示

### 2. 模式列表 (`/modes`)
- 模式对比表格
- 详细模式卡片

### 3. 模式详情 (`/mode/[id]`)
- 架构设计说明
- 核心特性展示
- 优势与限制
- 应用场景列表
- 参考案例
- 触发词

### 4. 场景模板 (`/scenarios`)
- 31个教学场景
- 搜索和筛选功能
- 按分类浏览

### 5. 使用指南 (`/guide`)
- 快速开始
- 常见问题
- 社区链接

---

## 🔧 决策树算法

系统内置决策引擎，根据用户回答推荐最适合的模式：

```javascript
// 决策逻辑示例
if (taskType === 'sequential' && platform === 'none') {
  return {
    mode: 'teacher-pipeline-agent',
    confidence: 0.95,
    reason: '顺序流程任务，无需外部平台'
  };
}

if (taskType === 'parallel' && platform === 'none') {
  return {
    mode: 'teacher-file-blackboard',
    confidence: 0.95,
    reason: '并行复杂项目，文件黑板最适合'
  };
}
```

---

## 📝 数据来源

所有模式数据来自 `src/data/modes.json`，基于：
- `extensions/SKILL_SUMMARY_TEACHERS.md`
- 各技能目录下的 `SKILL.md`

---

## 🚀 部署

### 部署到 Vercel（推荐）

```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel --prod
```

### 部署到 GitHub Pages

```bash
# 构建
npm run export

# 将 dist/ 目录内容推送到 gh-pages 分支
```

### 部署到 Netlify

```bash
# 构建
npm run export

# 将 dist/ 目录拖拽到 Netlify
```

---

## 🤝 贡献

欢迎提交 Issue 和 PR！

### 添加新场景

1. 编辑 `src/data/modes.json`
2. 在对应模式的 `scenarios` 数组中添加新场景
3. 提交 PR

### 修改样式

1. 编辑 `src/styles/globals.css`
2. 或编辑 `tailwind.config.js`

---

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

---

## 🔗 相关链接

- [OpenClaw GitHub](https://github.com/openclaw/openclaw)
- [OpenClaw 文档](https://docs.openclaw.ai)
- [技能仓库](https://github.com/yourusername/openclaw-skills)

---

**让AI成为您的专业团队成员！** 🎓🤖