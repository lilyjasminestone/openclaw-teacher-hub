import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Play, Pause, RotateCcw, MessageSquare, 
  User, Bot, ChevronRight, Clock, CheckCircle 
} from 'lucide-react';
import Header from '../../components/Header';
import modesData from '../../data/modes.json';

const demoScripts: Record<string, {
  title: string;
  description: string;
  steps: {
    role: 'user' | 'assistant';
    content: string;
    delay?: number;
  }[];
}> = {
  'teacher-pipeline-agent': {
    title: '社科论文流水线演示',
    description: '展示六阶段多模型协作流程',
    steps: [
      { role: 'user', content: '开始论文写作' },
      { role: 'assistant', content: '🎓 欢迎使用社科论文流水线！\n\n我将协助您完成论文写作，流程包括：\n1️⃣ 文献综述（DeepSeek-V3）\n2️⃣ 理论框架（Claude-3.5）\n3️⃣ 研究设计（Kimi-K2.5）\n4️⃣ 数据分析（GPT-4o）\n5️⃣ 论文撰写（Claude-3.5）\n6️⃣ 完善润色（DeepSeek-V3）\n\n请告诉我您的论文主题是什么？', delay: 1000 },
      { role: 'user', content: '在线开放课程对大学生学习效果的影响研究' },
      { role: 'assistant', content: '📚 **阶段1：文献综述**（DeepSeek-V3）\n\n正在为您检索相关文献...\n\n找到关键文献30篇，包括：\n• 陈丽等(2023)《在线学习投入度研究》\n• 王陆(2022)《MOOC学习效果影响因素分析》\n• 张伟等(2024)《开放课程质量评价体系》\n\n📋 文献综述框架已生成，包含：\n- 研究背景与现状\n- 关键概念界定\n- 研究缺口分析\n\n是否继续下一阶段？', delay: 2000 },
      { role: 'user', content: '继续' },
      { role: 'assistant', content: '🏗️ **阶段2：理论框架**（Claude-3.5）\n\n基于文献综述，构建研究理论框架：\n\n**核心理论基础：**\n• 技术接受模型（TAM）\n• 自我决定理论（SDT）\n• 联通主义学习理论\n\n**研究模型：**\n自变量 → 中介变量 → 因变量\n\n理论框架图已生成，是否继续？', delay: 2000 },
      { role: 'user', content: '继续' },
      { role: 'assistant', content: '📊 **阶段3：研究设计**（Kimi-K2.5）\n\n研究方案设计完成：\n\n**研究方法：** 混合研究方法\n- 量化：问卷调查（n=500）\n- 质性：深度访谈（n=20）\n\n**研究工具：**\n- 学习效果量表（改编）\n- 学习投入度量表\n- 半结构化访谈提纲\n\n**抽样方案：**\n分层抽样，覆盖不同学科、年级\n\n是否继续？', delay: 2000 },
      { role: 'user', content: '继续' },
      { role: 'assistant', content: '📈 **阶段4：数据分析**（GPT-4o）\n\n数据分析进行中...\n\n**量化分析结果：**\n• 信度检验：Cronbach α = 0.892 ✓\n• 结构方程模型拟合良好\n• 路径系数显著（p<0.001）\n\n**质性分析结果：**\n三级编码完成，提取3个主题\n\n数据分析报告已生成，是否继续？', delay: 2500 },
      { role: 'user', content: '继续' },
      { role: 'assistant', content: '✍️ **阶段5：论文撰写**（Claude-3.5）\n\n正在生成论文正文...\n\n**已完成章节：**\n✓ 摘要（中英文）\n✓ 第一章 绪论\n✓ 第二章 文献综述\n✓ 第三章 研究设计\n✓ 第四章 数据分析\n✓ 第五章 结论与建议\n✓ 参考文献（APA格式）\n\n论文初稿已完成（约15000字），是否进行最后润色？', delay: 3000 },
      { role: 'user', content: '润色' },
      { role: 'assistant', content: '✨ **阶段6：完善润色**（DeepSeek-V3）\n\n润色检查完成：\n\n✅ 格式标准化检查\n- 标题层级统一\n- 图表编号规范\n- 参考文献格式正确\n\n✅ 语言润色\n- 学术用语优化\n- 逻辑连贯性提升\n- 减少重复表达\n\n✅ 查重预检\n- 预估重复率：12%（符合要求）\n\n🎉 **论文已完成！**\n\n总用时：约25分钟\n总字数：15,200字\n质量评估：优秀\n\n可以导出为Word或PDF格式。', delay: 2000 },
    ]
  },
  'teacher-file-blackboard': {
    title: '备课智能体团队演示',
    description: '展示Master+4 Workers并行协作',
    steps: [
      { role: 'user', content: '单课备课' },
      { role: 'assistant', content: '📋 欢迎使用教师文件黑板！\n\n我是Master Agent，将协调4个Worker并行为您准备：\n• Worker 1：教案设计\n• Worker 2：PPT制作\n• Worker 3：习题设计\n• Worker 4：实验指导\n\n请提供课程信息：学科名称、课程主题、目标年级', delay: 1000 },
      { role: 'user', content: '工业机器人编程 - 第三章 机器人运动学 - 大二学生' },
      { role: 'assistant', content: '👤 **Master**：收到任务，正在启动Workers...\n\n🚀 Worker 1 [教案设计] 启动\n🚀 Worker 2 [PPT制作] 启动\n🚀 Worker 3 [习题设计] 启动\n🚀 Worker 4 [实验指导] 启动\n\n⏱️ 预计完成时间：15-20分钟\n\nWorkers正在并行处理...', delay: 1500 },
      { role: 'assistant', content: '👤 **Worker 1** → Master：教案初稿完成\n\n📄 **教案设计**\n- 教学目标：理解运动学正逆解\n- 重难点：DH参数法、坐标变换\n- 教学方法：案例驱动+可视化\n- 课时分配：2学时理论+2学时实践', delay: 3000 },
      { role: 'assistant', content: '👤 **Worker 2** → Master：PPT制作完成\n\n📊 **PPT制作（25页）**\n- 第1-5页：引入与概念\n- 第6-15页：DH参数法详解\n- 第16-20页：坐标变换演示\n- 第21-25页：案例与总结\n\n包含3个动画演示和5个示意图', delay: 3200 },
      { role: 'assistant', content: '👤 **Worker 3** → Master：习题设计完成\n\n📝 **习题设计**\n- 选择题：5道（基础概念）\n- 填空题：3道（公式应用）\n- 计算题：2道（综合应用）\n- 思考题：1道（拓展延伸）\n\n附：详细解答与评分标准', delay: 3400 },
      { role: 'assistant', content: '👤 **Worker 4** → Master：实验指导完成\n\n🔬 **实验指导书**\n- 实验名称：机器人运动学仿真\n- 实验目的：验证正逆解算法\n- 实验步骤：6步详细操作\n- 实验报告模板\n\n使用MATLAB Robotics Toolbox', delay: 3600 },
      { role: 'assistant', content: '👤 **Master**：所有Workers已完成，正在整合...\n\n✅ **资源包整合完成**\n\n📦 包含内容：\n• 详细教案（1份）\n• 教学PPT（25页）\n• 课堂习题（11题+答案）\n• 实验指导书（1份）\n\n⏱️ 总用时：18分钟\n👥 协作：1 Master + 4 Workers', delay: 2000 },
      { role: 'assistant', content: '🔍 **Reviewer Agent** 质量审核中...\n\n**审核维度：**\n✓ 内容一致性 - 通过\n✓ 难度匹配度 - 通过\n✓ 格式规范性 - 通过\n✓ 完整性检查 - 通过\n✓ 逻辑连贯性 - 通过\n\n🎉 **质量审核通过！**\n\n所有资源已通过五维度审核，可直接使用。', delay: 2500 },
    ]
  },
  'feishu-multi-group-single': {
    title: '个人多角色助手演示',
    description: '展示1个Bot在多个群组中自动切换角色',
    steps: [
      { role: 'assistant', content: '🤖 单机器人路由模式运行中...\n\n1个Bot同时服务4个群组，根据Chat ID自动切换角色' },
      { role: 'user', content: '【教学群】@机器人 帮我设计一个课程导入', delay: 500 },
      { role: 'assistant', content: '🎓 **[教学助手模式]**\n\n好的！为《工业机器人编程》设计课程导入：\n\n🎬 **5分钟导入设计：**\n1. 播放工业机器人工作视频（30秒）\n2. 提问：机器人如何知道自己在哪？\n3. 引出本节课主题：运动学基础\n4. 明确学习目标\n\n需要完整的教案吗？' },
      { role: 'user', content: '【科研群】@机器人 帮我润色这段话', delay: 500 },
      { role: 'assistant', content: '🔬 **[科研助手模式]**\n\n请提供需要润色的段落，我将：\n• 优化学术表达\n• 检查逻辑连贯性\n• 确保术语准确\n• 提升语言专业性\n\n请粘贴您的段落...' },
      { role: 'user', content: '【行政群】@机器人 写一份会议通知', delay: 500 },
      { role: 'assistant', content: '📋 **[行政助手模式]**\n\n好的，为您起草会议通知：\n\n关于召开教研室工作例会的通知\n\n各教研室：\n\n定于3月28日（周四）下午2:30在会议室A召开工作例会...\n\n请补充：会议主题、参会人员、议程安排' },
      { role: 'user', content: '【生活群】@机器人 推荐周末徒步路线', delay: 500 },
      { role: 'assistant', content: '🌲 **[生活助手模式]**\n\n周末徒步推荐：\n\n🏔️ **香山后山环线**\n- 距离：8公里\n- 难度：中等\n- 时长：4小时\n- 特色：人少景美，可俯瞰北京城\n\n🎒 准备建议：\n• 穿防滑鞋\n• 带足水（2L）\n• 防晒霜\n• 充电宝' },
      { role: 'assistant', content: '\n✨ **演示说明**\n\n同一个Bot，在不同群组自动切换角色：\n- 教学群 → 教学专家\n- 科研群 → 学术助手\n- 行政群 → 行政秘书\n- 生活群 → 生活顾问\n\n配置简单，5分钟搞定！' },
    ]
  },
  'feishu-multi-group-team': {
    title: '课程建设项目演示',
    description: '展示4个独立Bot协作完成课程建设',
    steps: [
      { role: 'assistant', content: '🚀 多群组团队模式启动\n\n4个独立Bot，4个独立群组\n每个Bot有独立身份和权限' },
      { role: 'user', content: '【Manager群】启动第三章内容开发', delay: 500 },
      { role: 'assistant', content: '👨‍💼 **[Manager Bot]**\n\n收到！启动第三章《运动学基础》内容开发。\n\n📋 任务分解：\n• @Unit1 负责3.1-3.2节（概念与理论）\n• @Unit2 负责3.3-3.4节（方法与案例）\n• @Quality 准备质量检查清单\n\n⏰ 截止时间：本周五\n\n各位Worker请确认收到。' },
      { role: 'user', content: '【Unit1群】收到，开始3.1-3.2节', delay: 800 },
      { role: 'assistant', content: '🔧 **[Unit1 Bot]**\n\n收到任务，开始开发：\n\n3.1 机器人运动学概述\n3.2 DH参数法\n\n今日进度：\n✓ 脚本大纲完成\n✓ 关键概念梳理\n⏳ 预计明天完成初稿' },
      { role: 'user', content: '【Unit2群】收到，开始3.3-3.4节', delay: 800 },
      { role: 'assistant', content: '⚙️ **[Unit2 Bot]**\n\n收到任务，开始开发：\n\n3.3 坐标变换\n3.4 逆运动学求解\n\n今日进度：\n✓ 案例素材收集\n✓ 计算示例编写\n⏳ 动画制作中' },
      { role: 'user', content: '【Quality群】收到，准备质量检查', delay: 800 },
      { role: 'assistant', content: '✅ **[Quality Bot]**\n\n收到，准备质量检查：\n\n📋 检查清单：\n□ 内容准确性\n□ 逻辑连贯性\n□ 格式规范性\n□ 难度适宜性\n□ 图文匹配度\n\n等待各位提交后进行审核。' },
      { role: 'user', content: '【Manager群】汇报进度', delay: 1000 },
      { role: 'assistant', content: '👨‍💼 **[Manager Bot]**\n\n📊 第三章进度汇报：\n\n✅ Unit1：进度60%，按计划推进\n✅ Unit2：进度55%，动画制作中\n✅ Quality：待审核\n\n📈 整体进度：57.5%\n🎯 风险：无\n📅 预计按时完成\n\n各位继续加油！' },
    ]
  },
  'feishu-topic-team': {
    title: '人才培养方案制定演示',
    description: '展示6个话题AI从不同角度评估',
    steps: [
      { role: 'assistant', content: '💬 话题团队模式启动\n\n1个群组，6个话题，6个AI专家\n多方协商制定培养方案' },
      { role: 'user', content: '【主群】制定新版人工智能专业培养方案', delay: 500 },
      { role: 'assistant', content: '🎯 **方案汇总Bot**\n\n收到！启动人才培养方案制定流程。\n\n将邀请以下话题AI参与评估：\n• 企业视角\n• 行业专家\n• 学校视角\n• 教师视角\n• 学生视角\n• 方案汇总\n\n请各话题发表意见。' },
      { role: 'user', content: '【企业视角话题】评估', delay: 800 },
      { role: 'assistant', content: '🏢 **[企业视角AI]**\n\n从企业用人需求评估：\n\n✅ **优势：**\n- Python、TensorFlow等技能匹配\n- 项目实践环节充分\n\n⚠️ **建议调整：**\n- 增加大模型应用课程\n- 强化工程化部署能力\n- 增加团队协作训练' },
      { role: 'user', content: '【行业专家话题】评估', delay: 800 },
      { role: 'assistant', content: '🔮 **[行业专家AI]**\n\n从前沿技术趋势评估：\n\n✅ **优势：**\n- 基础理论扎实\n- 机器学习覆盖全面\n\n⚠️ **建议调整：**\n- 增加AIGC相关内容\n- 补充多模态技术\n- 关注AI伦理与安全' },
      { role: 'user', content: '【学校视角话题】评估', delay: 800 },
      { role: 'assistant', content: '🏛️ **[学校视角AI]**\n\n从办学定位评估：\n\n✅ **优势：**\n- 符合应用型人才培养目标\n- 学分分配合理\n\n⚠️ **建议调整：**\n- 考虑现有师资情况\n- 实验室资源是否充足\n- 与现有课程衔接' },
      { role: 'user', content: '【学生视角话题】评估', delay: 800 },
      { role: 'assistant', content: '👨‍🎓 **[学生视角AI]**\n\n从学习体验评估：\n\n✅ **优势：**\n- 实践课程比例高\n- 毕业设计灵活\n\n⚠️ **建议调整：**\n- 减少理论课时长\n- 增加选修课多样性\n- 提供更多企业实习机会' },
      { role: 'user', content: '【方案汇总话题】整合意见', delay: 1000 },
      { role: 'assistant', content: '📋 **[方案汇总AI]**\n\n综合各方意见，生成优化方案：\n\n**采纳的建议：**\n✓ 增加大模型应用课程（企业+专家）\n✓ 强化工程化部署（企业）\n✓ 补充AIGC内容（专家）\n✓ 增加选修课（学生）\n\n**待讨论：**\n• 理论课调整（需评估师资）\n• 实习安排（需联系企业）\n\n🎉 **方案V2.0生成完成！**' },
    ]
  }
};

export default function Demo() {
  const router = useRouter();
  const { mode: modeId } = router.query;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const demo = modeId && typeof modeId === 'string' ? demoScripts[modeId] : null;
  const mode = modeId && typeof modeId === 'string' ? modesData.modes.find(m => m.id === modeId) : null;

  useEffect(() => {
    if (!isPlaying || !demo || currentStep >= demo.steps.length - 1) {
      if (currentStep >= (demo?.steps.length || 0) - 1) {
        setShowComplete(true);
      }
      return;
    }

    const currentDelay = demo.steps[currentStep].delay || 1500;
    const timer = setTimeout(() => {
      setCurrentStep(prev => prev + 1);
    }, currentDelay);

    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, demo]);

  const handlePlay = () => {
    setIsPlaying(true);
    if (currentStep >= (demo?.steps.length || 0) - 1) {
      setCurrentStep(0);
      setShowComplete(false);
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStep(0);
    setShowComplete(false);
  };

  if (!demo || !mode) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">选择要演示的模式</h1>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {Object.keys(demoScripts).map((key) => {
              const m = modesData.modes.find(m => m.id === key);
              return (
                <Link
                  key={key}
                  href={`/demo/${key}`}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left"
                >
                  <h3 className="font-bold text-slate-900 mb-2">{demoScripts[key].title}</h3>
                  <p className="text-sm text-slate-600">{demoScripts[key].description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>{demo.title} - 演示 - OpenClaw教师助手</title>
        <meta name="description" content={demo.description} />
      </Head>

      <Header />

      <div className="bg-gradient-to-br from-primary-600 to-accent-600 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href={`/mode/${mode.id}`}
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            返回模式详情
          </Link>
          <h1 className="text-2xl font-bold text-white">{demo.title}</h1>
          <p className="text-white/80 mt-1">{demo.description}</p>
        </div>
      </div>

      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!isPlaying ? (
                <button
                  onClick={handlePlay}
                  className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  <Play className="w-4 h-4" />
                  {currentStep > 0 ? '继续' : '开始演示'}
                </button>
              ) : (
                <button
                  onClick={handlePause}
                  className="flex items-center gap-2 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                >
                  <Pause className="w-4 h-4" />
                  暂停
                </button>
              )}
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                <RotateCcw className="w-4 h-4" />
                重置
              </button>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock className="w-4 h-4" />
              <span>步骤 {currentStep + 1} / {demo.steps.length}</span>
            </div>
          </div>

          <div className="mt-4">
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary-500 transition-all duration-300"
                style={{ width: `${((currentStep + 1) / demo.steps.length) * 100}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm min-h-[500px]">
          <div className="p-6 space-y-4">
            {demo.steps.slice(0, currentStep + 1).map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-4 ${step.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  step.role === 'user' 
                    ? 'bg-primary-100 text-primary-600' 
                    : 'bg-green-100 text-green-600'
                }`}>
                  {step.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`max-w-[80%] ${step.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block px-4 py-3 rounded-2xl whitespace-pre-wrap text-left ${
                    step.role === 'user'
                      ? 'bg-primary-600 text-white rounded-tr-none'
                      : 'bg-slate-100 text-slate-800 rounded-tl-none'
                  }`}>
                    {step.content}
                  </div>
                </div>
              </motion.div>
            ))}
            
            {isPlaying && currentStep < demo.steps.length - 1 && (
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                  <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                </div>
                <div className="bg-slate-100 rounded-2xl rounded-tl-none px-4 py-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <AnimatePresence>
          {showComplete && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 bg-green-50 rounded-2xl p-8 text-center border border-green-200"
            >
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-900 mb-2">演示完成！</h3>
              <p className="text-green-700 mb-6">
                这就是 {mode.name} 的典型工作流程
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleReset}
                  className="px-6 py-2 border border-green-300 text-green-700 rounded-lg hover:bg-green-100"
                >
                  重新观看
                </button>
                <Link
                  href={`/guide?mode=${mode.id}`}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  开始使用
                  <ChevronRight className="w-4 h-4 inline ml-1" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-2">
          {demo.steps.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setCurrentStep(idx);
                setIsPlaying(false);
              }}
              className={`w-3 h-3 rounded-full transition-colors ${
                idx <= currentStep ? 'bg-primary-500' : 'bg-slate-200'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
