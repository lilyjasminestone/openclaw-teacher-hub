import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { ArrowLeft, BookOpen, FileText, Video, MessageSquare, Layers } from 'lucide-react';
import Header from '../components/Header';
import modesData from '../data/modes.json';

const docSections = [
  {
    id: 'overview',
    title: '架构概述',
    icon: <Layers className="w-5 h-5" />,
    content: `OpenClaw 多智能体协作系统基于"一人团队"理念设计，即一个人搭配多个AI智能体完成复杂任务。

核心理念：
• 人是总指挥，AI是团队成员
• 不同模式对应不同的协作方式
• 所有模式都支持一人操作
• 也可扩展为多人+多AI协作`
  },
  {
    id: 'comparison',
    title: '模式对比',
    icon: <FileText className="w-5 h-5" />,
    content: `五种协作模式对比：

形式一：教师流水线
• 特点：顺序执行，多模型协作
• 场景：标准化流程任务
• 优势：每阶段可用最优模型

形式二：教师文件黑板
• 特点：并行执行，Master+Workers+Reviewer
• 场景：需要同时产出多个成果
• 优势：效率提升3-5倍

形式三-A：单机器人路由
• 特点：1个Bot服务多个群组
• 场景：个人多角色管理
• 优势：配置最简单

形式三-B：多群组团队
• 特点：独立机器人舰队
• 场景：生产级复杂项目
• 优势：独立身份权限

形式四：话题团队
• 特点：单群组多话题
• 场景：多维度评估
• 优势：手机端体验最佳`
  },
  {
    id: 'concepts',
    title: '核心概念',
    icon: <BookOpen className="w-5 h-5" />,
    content: `一人团队（One-Person Business）
• 定义：一个人+多个AI智能体
• 优势：无需协调真人，效率极高
• 适用：独立工作者、小团队

实时协作
• 定义：智能体之间、智能体与人之间的即时互动
• 形式：对话式、文件共享、检查点审核
• 意义：人在关键节点介入，保证质量

检查点机制
• 定义：在关键阶段暂停，等待人工审核
• 作用：确保方向正确，避免返工
• 配置：可在任意阶段插入检查点`
  },
  {
    id: 'quickstart',
    title: '快速开始',
    icon: <Video className="w-5 h-5" />,
    content: `选择适合的模式：
1. 是否需要飞书？
   - 否 → 形式一或形式二
   - 是 → 形式三或形式四

2. 任务类型？
   - 顺序执行 → 形式一（流水线）
   - 并行产出 → 形式二（文件黑板）
   - 多维度评估 → 形式四（话题团队）

3. 配置步骤：
   - 查看对应模式的详细文档
   - 按步骤配置环境
   - 启动第一个任务

4. 最佳实践：
   - 从简单任务开始
   - 逐步增加复杂度
   - 记录和优化Prompt`
  },
  {
    id: 'faq',
    title: '常见问题',
    icon: <MessageSquare className="w-5 h-5" />,
    content: `Q: 我是一个人，应该选哪种模式？
A: 所有模式都适合一人团队！区别在于：
   • 形式一：标准化流程任务
   • 形式二：需要并行产出多个成果
   • 形式三-A：快速验证，飞书多角色
   • 形式三-B：生产级项目
   • 形式四：多维度评估场景

Q: 多智能体会不会很贵？
A: 多模型协作单次成本约$0.5-2，远低于人工成本。

Q: 需要编程基础吗？
A: 不需要！所有模式都提供开箱即用的配置。

Q: 可以在手机上使用吗？
A: 形式三和形式四基于飞书，手机端体验最佳。

Q: 如何切换到其他模式？
A: 不同模式对应不同场景，可以同时使用多种模式。`
  }
];

export default function Docs() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>使用指南 - OpenClaw教师助手</title>
        <meta name="description" content="OpenClaw多智能体协作系统使用指南" />
      </Head>

      <Header />

      <div className="bg-gradient-to-br from-primary-600 to-accent-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回首页
          </Link>
          
          <h1 className="text-4xl font-bold text-white mb-4">使用指南</h1>
          <p className="text-xl text-white/80">
            了解OpenClaw多智能体协作系统的核心概念和使用方法
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-1">
              {docSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-slate-600 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                >
                  {section.icon}
                  <span>{section.title}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3 space-y-12">
            {docSections.map((section) => (
              <section key={section.id} id={section.id} className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900">{section.title}</h2>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <pre className="whitespace-pre-wrap text-slate-600 font-sans text-sm leading-relaxed">
                    {section.content}
                  </pre>
                </div>
              </section>
            ))}

            {/* Mode Details */}
            <section id="modes" className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                  <Layers className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">模式详解</h2>
              </div>
              
              <div className="space-y-4">
                {modesData.modes.map((mode) => (
                  <div key={mode.id} className="bg-white rounded-xl p-6 shadow-sm">
                    <div className="flex items-center gap-3 mb-4">
                      <h3 className="text-lg font-bold text-slate-900">{mode.name}</h3>
                      <span className="text-sm text-slate-500">{mode.modeNumber}</span>
                    </div>
                    
                    <p className="text-slate-600 mb-4">{mode.description}</p>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">适用特征</h4>
                        <ul className="space-y-1">
                          {(mode.characteristics || mode.features).map((item, idx) => (
                            <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                              <span className="text-primary-500">•</span>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-2">典型场景</h4>
                        <ul className="space-y-1">
                          {(mode.examples || []).slice(0, 4).map((example: any, idx) => (
                            <li key={idx} className="text-sm text-slate-600 flex items-start gap-2">
                              <span className="text-primary-500">→</span>
                              {typeof example === 'string' ? example : (example?.description || '')}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="flex items-center gap-4 text-sm text-slate-500 pt-2 border-t">
                        <span>配置时间：{mode.configTime}</span>
                        <span>平台：{mode.platform}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
