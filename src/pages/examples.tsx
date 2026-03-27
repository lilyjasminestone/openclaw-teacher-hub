import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Play, Clock, Users, Zap, BookOpen, 
  FileText, MessageSquare, Layers, X, ExternalLink,
  TrendingUp, Award, Target
} from 'lucide-react';
import Header from '../components/Header';
import modesData from '../data/modes.json';

// 10个精选案例
const caseStudies = [
  {
    id: 'social-science-pipeline',
    title: '社科论文流水线',
    subtitle: '6阶段多模型协作',
    mode: 'teacher-pipeline-agent',
    modeName: '教师流水线',
    description: '社会学研究生3天完成硕士论文初稿，传统需要2-3周',
    result: '效率提升5倍',
    stats: { time: '3天', wordCount: '15,200字', quality: '优秀' },
    tags: ['论文写作', '多模型协作'],
    color: 'from-blue-500 to-cyan-400',
    icon: '📄',
    demo: 'paper'
  },
  {
    id: 'wechat-pipeline',
    title: '微信文章发布',
    subtitle: '工作日志→公众号',
    mode: 'teacher-pipeline-agent',
    modeName: '教师流水线',
    description: '知识博主将工作日志自动转化为公众号文章，日更不再是梦',
    result: '日更达成',
    stats: { time: '10分钟', frequency: '日更', growth: '+30%阅读' },
    tags: ['内容创作', '自动化'],
    color: 'from-green-500 to-emerald-400',
    icon: '📝',
    demo: 'wechat'
  },
  {
    id: 'lesson-prep-blackboard',
    title: '单课备课智能体',
    subtitle: '1人+4 Workers',
    mode: 'teacher-file-blackboard',
    modeName: '教师文件黑板',
    description: '20分钟并行产出教案+PPT+习题+实验指导全套资源',
    result: '效率提升6倍',
    stats: { time: '20分钟', resources: '4件套', quality: '90%+' },
    tags: ['备课', '并行协作'],
    color: 'from-emerald-500 to-teal-400',
    icon: '📚',
    demo: 'lesson'
  },
  {
    id: 'research-proposal-blackboard',
    title: '科研课题申报',
    subtitle: '5 Workers并行',
    mode: 'teacher-file-blackboard',
    modeName: '教师文件黑板',
    description: '35分钟完成全套申报材料，传统需要3-5天',
    result: '通过形式审查',
    stats: { time: '35分钟', words: '8000字', budget: '25万' },
    tags: ['科研', '申报书'],
    color: 'from-purple-500 to-pink-400',
    icon: '🔬',
    demo: 'research'
  },
  {
    id: 'personal-multi-role',
    title: '个人多角色助手',
    subtitle: '1 Bot管理4场景',
    mode: 'feishu-multi-group-single',
    modeName: '单机器人路由',
    description: '教学+科研+行政+生活，一个Bot全搞定，每天节省1小时',
    result: '效率提升40%',
    stats: { setup: '10分钟', groups: '4群组', saving: '1小时/天' },
    tags: ['个人效率', '多角色'],
    color: 'from-orange-500 to-amber-400',
    icon: '👤',
    demo: 'personal'
  },
  {
    id: 'parallel-classes',
    title: '课程平行班管理',
    subtitle: '1 Bot管理3班级',
    mode: 'feishu-multi-group-single',
    modeName: '单机器人路由',
    description: '同时管理3个平行班+统筹群，自动识别班级上下文',
    result: '管理效率+60%',
    stats: { classes: '3班级', response: '95%+', workload: '-60%' },
    tags: ['班级管理', '平行班'],
    color: 'from-yellow-500 to-orange-400',
    icon: '👥',
    demo: 'classes'
  },
  {
    id: 'course-development-2026',
    title: '在线课程建设',
    subtitle: '4 Bots协作',
    mode: 'feishu-multi-group-team',
    modeName: '多群组团队',
    description: '课程建设周期从6个月缩短到3个月，5人团队效率抵8人',
    result: '周期缩短50%',
    stats: { time: '3个月', team: '5人', efficiency: 'vs 8人' },
    tags: ['课程建设', '团队协作'],
    color: 'from-indigo-500 to-purple-400',
    icon: '🎓',
    demo: 'course'
  },
  {
    id: 'teaching-competition-2026',
    title: '教学比赛备赛2026',
    subtitle: '7 Bots协作',
    mode: 'feishu-multi-group-team',
    modeName: '多群组团队',
    description: '7个Bot分工协作备赛，冲击省赛一等奖，争取国赛',
    result: '目标：国赛一等奖',
    stats: { time: '80天', bots: '7 Bots', progress: '82%' },
    tags: ['教学比赛', '备赛'],
    color: 'from-rose-500 to-red-400',
    icon: '🏆',
    demo: 'competition'
  },
  {
    id: 'talent-development',
    title: '人才培养方案制定',
    subtitle: '6话题AI协商',
    mode: 'feishu-topic-team',
    modeName: '话题团队',
    description: '6个话题AI从企业/专家/学校/教师/学生多维度评估',
    result: '企业匹配度85%',
    stats: { time: '1天', views: '6视角', match: '85%' },
    tags: ['方案制定', '多维度评估'],
    color: 'from-cyan-500 to-blue-400',
    icon: '🎯',
    demo: 'talent'
  },
  {
    id: 'textbook-writing-team',
    title: '教材编写团队',
    subtitle: '6话题AI分工',
    mode: 'feishu-topic-team',
    modeName: '话题团队',
    description: '主编+理论+案例+图表+习题+审核，6话题协作编写教材',
    result: '效率提升2倍',
    stats: { time: '2周', words: '15000字', progress: '45%' },
    tags: ['教材编写', '分工协作'],
    color: 'from-teal-500 to-green-400',
    icon: '📖',
    demo: 'textbook'
  }
];

// 案例详情数据
const caseDetails: Record<string, {
  challenge: string;
  solution: string;
  process: string[];
  results: string[];
  testimonial?: string;
}> = {
  'social-science-pipeline': {
    challenge: '社会学研究生需要在2周内完成硕士论文初稿，时间紧迫，文献综述工作量大。',
    solution: '使用社科论文流水线，6个阶段分别由不同模型负责，发挥各自优势。',
    process: [
      'DeepSeek-V3整理30篇核心文献，生成文献综述框架',
      'Claude-3.5构建理论框架，确立研究理论视角',
      'Kimi-K2.5设计研究方案，量化+质性混合方法',
      'GPT-4o进行数据分析，扎根理论三级编码',
      'Claude-3.5撰写论文正文，生成完整章节',
      'DeepSeek-V3格式标准化检查，查重预检'
    ],
    results: [
      '3天完成初稿，传统需要2-3周',
      '通过导师一审，修改意见减少60%',
      'API调用成本仅$1.5',
      '论文质量评估：优秀'
    ],
    testimonial: '"以前写论文要反复改很多遍，这次AI辅助后，初稿质量就很高，导师直接通过了！"'
  },
  'wechat-pipeline': {
    challenge: '知识博主想坚持日更公众号，但每天写原创文章需要1-2小时，难以坚持。',
    solution: '建立微信文章发布流水线，将工作日志自动转化为公众号文章。',
    process: [
      'DeepSeek-V3提取日志关键事件和思考',
      'Claude-3.5生成10个标题并推荐最佳',
      'Kimi-K2.5将日志扩展成2000字文章',
      'GPT-4o排版美化，生成封面图',
      'DeepSeek-V3上传到微信公众号'
    ],
    results: [
      '每篇文章仅需10分钟',
      '从每周1篇提升到每天1篇',
      '阅读量平均提升30%',
      '坚持日更3个月，粉丝增长2000+'
    ]
  },
  'lesson-prep-blackboard': {
    challenge: '高校教师需要准备下周《工业机器人编程》课程内容，传统备课需要2-3小时。',
    solution: '启动备课智能体团队，4个Workers并行产出教案、PPT、习题、实验指导。',
    process: [
      'Master接收任务：第三章 机器人运动学',
      'Worker 1：教案设计 → 目标、重难点、课时分配',
      'Worker 2：PPT制作 → 25页，含3个动画演示',
      'Worker 3：习题设计 → 11题，附详细解答',
      'Worker 4：实验指导 → MATLAB仿真实验',
      'Reviewer审核：五维度质量检查'
    ],
    results: [
      '20分钟完成全套资源',
      '传统备课需要2-3小时',
      '效率提升约6倍',
      '习题与教材匹配度90%+'
    ]
  },
  'research-proposal-blackboard': {
    challenge: '科研团队需要准备省级课题申报材料，材料复杂，协调困难。',
    solution: '5个Workers并行工作，分别负责文献、设计、数据、预算、撰写。',
    process: [
      'Worker 1：检索156篇文献，提炼研究缺口',
      'Worker 2：设计技术路线和实验方案',
      'Worker 3：设计数据采集和分析方法',
      'Worker 4：编制25万经费预算明细',
      'Worker 5：撰写8000字申报书',
      'Reviewer审核创新性、可行性、规范性'
    ],
    results: [
      '35分钟完成全套材料',
      '传统需要3-5天',
      '通过形式审查',
      '进入专家评审环节'
    ]
  },
  'personal-multi-role': {
    challenge: '青年教师工作繁忙，需要处理教学、科研、行政多项任务，时间不够用。',
    solution: '1个Bot服务4个群组，根据Chat ID自动切换角色。',
    process: [
      '教学群：课程答疑、作业批改、成绩管理',
      '科研群：文献检索、论文润色、项目申报',
      '行政群：会议安排、材料撰写、日程管理',
      '生活群：读书笔记、旅行规划、健康管理'
    ],
    results: [
      '配置时间仅10分钟',
      '每天节省约1小时',
      '成为日常不可或缺的助手',
      '工作生活平衡改善'
    ]
  },
  'parallel-classes': {
    challenge: '教师同时教授3个平行班，重复回答相同问题，管理效率低。',
    solution: '1个Bot管理3个班级群+统筹群，自动识别班级上下文。',
    process: [
      '班级1群：独立答疑、布置作业',
      '班级2群：独立答疑、解答问题',
      '班级3群：独立答疑、管理进度',
      '统筹群：汇总3个班级整体进度'
    ],
    results: [
      '同时管理3个班级',
      '工作量减少60%',
      '学生问题解决率95%+',
      '班级间进度对比清晰'
    ]
  },
  'course-development-2026': {
    challenge: '课程建设团队开发在线课程，传统方式需要6个月，协调困难。',
    solution: '4个独立Bot协作，Manager统筹协调，Quality质量把关。',
    process: [
      'Manager Bot：统筹进度、分配任务',
      'Unit1 Bot：负责第1-3章内容开发',
      'Unit2 Bot：负责第4-6章内容开发',
      'Quality Bot：审核内容质量'
    ],
    results: [
      '周期从6个月缩短到3个月',
      '5人团队效率抵8人',
      '沟通成本减少70%',
      '课程质量显著提升'
    ]
  },
  'teaching-competition-2026': {
    challenge: '教师团队备赛教学能力比赛，材料多、要求高、时间紧。',
    solution: '7个Bot分工协作：统筹+资料+设计+PPT+答辩+模拟+审核。',
    process: [
      '统筹Bot：制定80天备赛计划',
      '资料Bot：分析近3年获奖作品',
      '设计Bot：完成教学设计',
      'PPTBot：制作课件',
      '答辩Bot：准备高频问题',
      '模拟Bot：组织模拟演练',
      '审核Bot：质量把关'
    ],
    results: [
      '备赛周期80天（传统6个月）',
      '材料准备充分',
      '目标：省赛一等奖',
      '冲击国赛'
    ]
  },
  'talent-development': {
    challenge: '制定新版人才培养方案，需要平衡企业、学校、教师、学生多方需求。',
    solution: '6个话题AI从不同角度评估，最终汇总生成优化方案。',
    process: [
      '企业视角：用人需求评估',
      '行业专家：前沿趋势分析',
      '学校视角：办学定位考量',
      '教师视角：实施可行性',
      '学生视角：学习体验反馈',
      '方案汇总：整合优化'
    ],
    results: [
      '1天完成多方意见收集',
      '传统需要2周访谈',
      '企业匹配度从60%→85%',
      '方案满意度显著提升'
    ]
  },
  'textbook-writing-team': {
    challenge: '教材编写工作量大，需要多人协作，但协调困难。',
    solution: '6个话题AI分工：主编+理论+案例+图表+习题+审核。',
    process: [
      '主编视角：整体统筹、进度把控',
      '理论专家：理论章节编写',
      '案例专家：工程案例收集',
      '图表专家：插图图表制作',
      '习题专家：课后习题编制',
      '审核汇总：质量检查整合'
    ],
    results: [
      '2周完成15000字初稿',
      '传统需要1个月',
      '通过出版社一审',
      '编写效率提升2倍'
    ]
  }
};

export default function Examples() {
  const [selectedCase, setSelectedCase] = useState<typeof caseStudies[0] | null>(null);
  const [filter, setFilter] = useState<string>('全部');

  const filters = ['全部', '教师流水线', '教师文件黑板', '单机器人路由', '多群组团队', '话题团队'];
  
  const filteredCases = filter === '全部' 
    ? caseStudies 
    : caseStudies.filter(c => c.modeName === filter);

  const detail = selectedCase ? caseDetails[selectedCase.id] : null;

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>参考案例 - OpenClaw教师助手</title>
        <meta name="description" content="10个真实的AI协作成功案例，展示一人团队+多智能体的强大效能" />
      </Head>

      <Header />

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-600 via-purple-600 to-accent-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              10个真实案例
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              看高校教师如何用"一人团队+AI智能体"完成复杂任务
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-3xl font-bold text-white">10</div>
              <div className="text-sm text-white/70">精选案例</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-3xl font-bold text-white">5x</div>
              <div className="text-sm text-white/70">平均效率提升</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-3xl font-bold text-white">1人</div>
              <div className="text-sm text-white/70">即可操作</div>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-xl p-4">
              <div className="text-3xl font-bold text-white">100%</div>
              <div className="text-sm text-white/70">成功率</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="sticky top-16 z-40 bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm text-slate-500 mr-2">筛选：</span>
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === f
                    ? 'bg-primary-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto text-sm text-slate-500">
              显示 {filteredCases.length} 个案例
            </span>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCases.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedCase(study)}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              {/* Card Header with Gradient */}
              <div className={`h-32 bg-gradient-to-r ${study.color} relative overflow-hidden`}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute top-4 left-4 text-4xl">{study.icon}</div>
                <div className="absolute bottom-4 right-4">
                  <span className="px-3 py-1 bg-white/90 rounded-full text-xs font-medium text-slate-700">
                    {study.modeName}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-1">{study.title}</h3>
                <p className="text-sm text-slate-500 mb-3">{study.subtitle}</p>
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">{study.description}</p>

                {/* Result Badge */}
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium mb-4">
                  <Zap className="w-3 h-3" />
                  {study.result}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  {Object.entries(study.stats).slice(0, 3).map(([key, value]) => (
                    <div key={key} className="bg-slate-50 rounded-lg p-2">
                      <div className="text-lg font-bold text-primary-600">{value}</div>
                      <div className="text-xs text-slate-500">
                        {key === 'time' ? '用时' : key === 'wordCount' ? '字数' : key === 'quality' ? '质量' : 
                         key === 'frequency' ? '频率' : key === 'growth' ? '增长' : 
                         key === 'resources' ? '产出' : key === 'efficiency' ? '效率' :
                         key === 'setup' ? '配置' : key === 'groups' ? '群组' : key === 'saving' ? '节省' :
                         key === 'classes' ? '班级' : key === 'response' ? '响应率' : key === 'workload' ? '工作量' :
                         key === 'team' ? '团队' : key === 'bots' ? 'Bots' : key === 'progress' ? '进度' :
                         key === 'views' ? '视角' : key === 'match' ? '匹配度' : key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {study.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <span className="text-sm text-slate-500 group-hover:text-primary-600 transition-colors">
                    查看详情 →
                  </span>
                  {study.demo && (
                    <Link
                      href={`/demo/${study.mode}?case=${study.demo}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700"
                    >
                      <Play className="w-4 h-4" />
                      观看演示
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCase && detail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedCase(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Modal Header */}
              <div className={`h-24 bg-gradient-to-r ${selectedCase.color} relative`}>
                <button
                  onClick={() => setSelectedCase(null)}
                  className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <span className="text-4xl">{selectedCase.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{selectedCase.title}</h2>
                    <span className="text-white/80 text-sm">{selectedCase.modeName}</span>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Challenge & Solution */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-100">
                    <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      挑战
                    </h3>
                    <p className="text-sm text-amber-800">{detail.challenge}</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4" />
                      解决方案
                    </h3>
                    <p className="text-sm text-blue-800">{detail.solution}</p>
                  </div>
                </div>

                {/* Process */}
                <div className="mb-8">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-primary-500" />
                    执行流程
                  </h3>
                  <div className="space-y-3">
                    {detail.process.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-slate-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Results */}
                <div className="mb-8">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-green-500" />
                    成果
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {detail.results.map((result, idx) => (
                      <div key={idx} className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-800">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                {detail.testimonial && (
                  <div className="bg-slate-50 rounded-xl p-4 border-l-4 border-primary-500 mb-6">
                    <p className="text-slate-700 italic">{detail.testimonial}</p>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-4 pt-4 border-t">
                  <Link
                    href={`/mode/${selectedCase.mode}`}
                    className="flex-1 px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-center hover:bg-slate-200 transition-colors"
                  >
                    查看模式详情
                  </Link>
                  {selectedCase.demo && (
                    <Link
                      href={`/demo/${selectedCase.mode}?case=${selectedCase.demo}`}
                      className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg text-center hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <Play className="w-4 h-4" />
                      观看演示
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
