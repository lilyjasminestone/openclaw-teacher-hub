#!/bin/bash

# OpenClaw教师助手 - 部署脚本

echo "🚀 开始部署 OpenClaw教师助手..."

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未找到 Node.js，请先安装 Node.js 18+"
    exit 1
fi

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ 未找到 npm"
    exit 1
fi

echo "📦 安装依赖..."
npm install

echo "🔨 构建项目..."
npm run export

if [ $? -eq 0 ]; then
    echo "✅ 构建成功！"
    echo ""
    echo "📁 输出目录: ./dist"
    echo ""
    echo "部署选项:"
    echo "  1. Vercel:     vercel --prod"
    echo "  2. Netlify:    将 dist/ 拖拽到 Netlify"
    echo "  3. GitHub Pages: 将 dist/ 推送到 gh-pages 分支"
    echo ""
else
    echo "❌ 构建失败"
    exit 1
fi