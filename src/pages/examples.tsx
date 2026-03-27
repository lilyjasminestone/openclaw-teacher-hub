import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github, Play, BookOpen, FileText, Video } from 'lucide-react';
import Header from '../components/Header';
import modesData from '../data/modes.json';

const caseStudies = [
  {
    id: 'social-science-pipeline',
    title: '社科论文流水线',
    mode: 'teacher-pipeline-agent',
    description: '六阶段多模型协作，从文献综述到论文润色的完整流程',
    details: `
一个社会学研究生使用此流水线完成了硕士论文的初稿撰写。

使用流程：
1. 阶段1（DeepSeek-V3）：文献综述框架生成，整理30篇核心文献
2. 阶段2（Claude-3.5）：理论框架建构，确立研究理论视角
3. 阶段3（Kimi-K2.5）：研究设计方案，设计质性研究方法
4. 阶段4（GPT-4o）：数据分析，对访谈转录进行扎根理论三级编码
5. 阶段5（Claude-3.5）：论文撰写，生成完整章节
6. 阶段6（DeepSeek-V3）：格式标准化检查

成果：
• 用时：3天完成初稿（传统方式需要2-3周）
• 质量：通过导师一审，修改意见减少60%
• 成本：约$1.5的API调用费用
    `,
    tags: ['论文写作', '多模型协作', '质性研究'],
    demo: true
  },
  {
    id: 'lesson-prep-blackboard',
    title: '单课备课智能体团队',
    mode: 'teacher-file-blackboard',
    description: '4个Worker并行产出：教案+PPT+习题+实验指导',
    details: `
某高校教师需要为《工业机器人编程》课程准备下周的授课内容。

使用流程：
1. Master Agent接收任务："准备第3章 机器人运动学 的完整教学资源"
2. 启动4个Worker并行工作：
   - Worker 1：教案设计Agent → 生成详细教案（含教学目标、重难点）
   - Worker 2：PPT制作Agent → 生成20页教学PPT
   - Worker 3：习题设计Agent → 设计课堂练习和课后作业
   - Worker 4：实验指导Agent → 编写实验指导书
3. Reviewer Agent审核：检查内容一致性、难度匹配
4. Master整合输出：打包成完整教学资源包

成果：
• 用时：20分钟完成全套资源（传统备课需要2-3小时）
• 质量：PPT可直接使用，习题与教材匹配度90%+
• 效率：提升约6倍
    `,
    tags: ['备课', '并行协作', '教学资源'],
    demo: true
  },
  {
    id: 'personal-multi-role',
    title: '个人多角色助手',
    mode: 'feishu-multi-group-single',
    description: '一个Bot管理教学、科研、行政、生活四个场景',
    details: `
某青年教师使用飞书管理繁忙的工作和生活。

配置：
• 教学群：课程答疑、作业批改、成绩管理
• 科研群：文献检索、论文润色、项目申报
• 行政群：会议安排、材料撰写、日程管理
• 生活群：读书笔记、旅行规划、健康管理

使用方式：
- 在对应群组@机器人，自动切换角色
- 教学群提问自动以教师角色回答
- 科研群提问自动以学术助手角色回答

成果：
• 配置时间：10分钟
• 日常使用：每天节省约1小时处理杂务的时间
• 满意度：成为日常不可或缺的助手
    `,
    tags: ['个人效率', '多角色', '飞书'],
    demo: false
  },
  {
    id: 'course-development-2026',
    title: '在线课程建设项目',
    mode: 'feishu-multi-group-team',
    description: '4个独立Bot协作完成在线开放课程建设',
    details: `
课程建设团队使用多群组团队模式开发《工业机器人编程与实操》在线课程。

团队配置：
• Manager Bot（课程总负责人群）：统筹进度、分配任务、协调资源
• Unit1 Bot（第一单元群）：负责第1-3章内容开发
• Unit2 Bot（第二单元群）：负责第4-6章内容开发
• Quality Bot（质控群）：审核内容质量、检查规范

工作流程：
1. Manager在总群发布本周任务
2. 各Unit Bot在各自群组组织内容开发
3. 完成后@Quality Bot进行审核
4. 审核通过，Manager更新项目进度

成果：
• 项目周期：从预估6个月缩短到3个月
• 团队协作：5人团队效率相当于传统8人团队
• 沟通成本：减少70%的无效会议
    `,
    tags: ['课程建设', '团队协作', '生产级'],
    demo: true
  },
  {
    id: 'talent-development',
    title: '人才培养方案制定',
    mode: 'feishu-topic-team',
    description: '6个话题AI从多方视角平衡制定培养方案',
    details: `
专业负责人在制定新版人才培养方案时，使用话题团队收集多方意见。

话题配置：
• 企业视角：行业对人才的知识技能需求
• 行业专家：前沿技术发展趋势
• 学校视角：办学定位和资源条件
• 教师视角：课程实施可行性
• 学生视角：学习体验和发展期望
• 方案汇总：整合各方意见，生成最终方案

使用流程：
1. 在总群发布培养方案草案
2. 各话题AI在各自话题中发表专业意见
3. 汇总话题整合各方建议
4. 生成最终方案V2.0

成果：
• 调研效率：1天完成多方意见收集（传统需要2周访谈）
• 方案质量：企业匹配度从60%提升到85%
• 满意度：教师和学生对新方案的接受度显著提升
    `,
    tags: ['方案制定', '多维度评估', '利益相关方'],
    demo: true
  },
  {
    id: 'wechat-pipeline',
    title: '微信文章自动发布',
    mode: 'teacher-pipeline-agent',
    description: '从工作日志到微信公众号文章的自动化流水线',
    details: `
知识博主使用此流水线将每日工作日志自动转化为公众号文章。

使用流程：
1. 阶段1：素材整理 - 提取日志中的关键事件和思考
2. 阶段2：标题优化 - 生成10个备选标题，选择最佳
3. 阶段3：正文撰写 - 将日志扩展成完整文章
4. 阶段4：排版美化 - 添加格式、图片、分段
5. 阶段5：发布推送 - 上传到微信公众号，预览确认

技术亮点：
• 使用工作日志标准格式作为输入
• 自动压缩图片、生成封面
• 处理ASCII艺术图转换为图片

成果：
• 用时：10分钟/篇（传统需要1-2小时）
• 频率：从每周1篇提升到每天1篇
• 质量：阅读量平均提升30%
    `,
    tags: ['内容创作', '自动化', '社交媒体'],
    demo: true
  }
];

export default function Examples() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>参考案例 - OpenClaw教师助手</title>
        <meta name="description" content="OpenClaw多智能体协作系统实际应用案例" />
      </Head>

      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">参考案例</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            真实的应用场景和成功故事，了解其他教师如何使用多智能体系统提升效率
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-primary-600 mb-1">6</div>
            <div className="text-sm text-slate-600">精选案例</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-accent-600 mb-1">5x</div>
            <div className="text-sm text-slate-600">平均效率提升</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-emerald-600 mb-1">3天</div>
            <div className="text-sm text-slate-600">论文初稿用时</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm">
            <div className="text-3xl font-bold text-purple-600 mb-1">20min</div>
            <div className="text-sm text-slate-600">单课备课用时</div>
          </div>
        </div>

        {/* Case Studies */}
        <div className="space-y-8">
          {caseStudies.map((study, index) => {
            const mode = modesData.modes.find(m => m.id === study.mode);
            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-sm overflow-hidden"
              >
                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                          {mode?.name}
                        </span>
                        {study.demo && (
                          <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1">
                            <Play className="w-3 h-3" />
                            有演示
                          </span>
                        )}
                      </div>
                      <h2 className="text-2xl font-bold text-slate-900">{study.title}</h2>
                    </div>
                  </div>

                  <p className="text-slate-600 mb-6">{study.description}</p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="bg-slate-50 rounded-xl p-6 mb-6">
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <BookOpen className="w-4 h-4" />
                      案例详情
                    </h3>
                    <pre className="whitespace-pre-wrap text-sm text-slate-600 font-sans leading-relaxed">
                      {study.details}
                    </pre>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href={`/mode/${study.mode}`}
                      className="px-4 py-2 bg-primary-600 text-white rounded-lg text-sm font-medium hover:bg-primary-700 transition-colors"
                    >
                      查看对应模式
                    </Link>
                    {study.demo && (
                      <Link
                        href={`/demo/${study.mode}?case=${study.id}`}
                        className="px-4 py-2 border border-primary-200 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-50 transition-colors flex items-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        观看演示
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-gradient-to-r from-primary-600 to-accent-600 rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">开始您的多智能体之旅</h2>
          <p className="text-white/80 mb-6 max-w-2xl mx-auto">
            选择适合您当前任务的模式，体验一人团队的效率提升
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="px-8 py-3 bg-white text-primary-600 rounded-lg font-medium hover:bg-slate-100 transition-colors"
            >
              智能推荐
            </Link>
            <Link
              href="/modes"
              className="px-8 py-3 border border-white text-white rounded-lg font-medium hover:bg-white/10 transition-colors"
            >
              浏览所有模式
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
