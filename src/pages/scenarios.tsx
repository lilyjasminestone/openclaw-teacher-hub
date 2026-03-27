import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Search, BookOpen, Trophy, GraduationCap, FileText, Beaker, Award, Layers, ArrowRight, FlaskConical, Briefcase, Home, Lightbulb } from 'lucide-react';
import Header from '../components/Header';
import modesData from '../data/modes.json';

// 四大领域分类
const domains = [
  { 
    id: 'teaching', 
    name: '教学', 
    icon: <GraduationCap className="w-6 h-6" />,
    color: 'bg-blue-100 text-blue-600',
    description: '课程建设、教学资源、学生管理'
  },
  { 
    id: 'research', 
    name: '科研', 
    icon: <FlaskConical className="w-6 h-6" />,
    color: 'bg-purple-100 text-purple-600',
    description: '论文写作、项目申报、学术研究'
  },
  { 
    id: 'project', 
    name: '专项项目', 
    icon: <Briefcase className="w-6 h-6" />,
    color: 'bg-amber-100 text-amber-600',
    description: '技能竞赛、教材编写、校企合作'
  },
  { 
    id: 'daily', 
    name: '日常与生活', 
    icon: <Home className="w-6 h-6" />,
    color: 'bg-green-100 text-green-600',
    description: '个人管理、行政事务、内容创作'
  }
];

// 按领域分类的场景数据
const scenariosByDomain = {
  teaching: {
    categories: [
      {
        name: "课程资源开发",
        scenarios: [
          { name: "单课备课", modeId: "teacher-file-blackboard", modeName: "教师文件黑板", description: "并行产出教案+PPT+习题+实验指导", difficulty: "简单", time: "20分钟" },
          { name: "学期课程建设", modeId: "teacher-file-blackboard", modeName: "教师文件黑板", description: "批量开发16周完整教学资源", difficulty: "中等", time: "2-3小时" },
          { name: "在线课程制作", modeId: "teacher-pipeline-agent", modeName: "教师流水线", description: "视频脚本、分镜、素材、合成全流程", difficulty: "复杂", time: "1-2天" },
          { name: "微课程开发", modeId: "teacher-pipeline-agent", modeName: "教师流水线", description: "5-10分钟短视频完整制作", difficulty: "简单", time: "2-3小时" }
        ]
      },
      {
        name: "教学评估与质量",
        scenarios: [
          { name: "试卷命制", modeId: "teacher-pipeline-agent", modeName: "教师流水线", description: "命题→审题→排版→难度标注，4阶段标准化", difficulty: "中等", time: "1-2小时" },
          { name: "教学诊断", modeId: "feishu-topic-team", modeName: "话题团队", description: "学生+督导+同行多维度评估诊断", difficulty: "中等", time: "1周" },
          { name: "课程评价", modeId: "feishu-topic-team", modeName: "话题团队", description: "多利益相关方协商讨论评价", difficulty: "简单", time: "3-5天" },
          { name: "教学改进研讨", modeId: "feishu-topic-team", modeName: "话题团队", description: "收集反馈、优化教学方案", difficulty: "简单", time: "1-2天" }
        ]
      },
      {
        name: "学生培养",
        scenarios: [
          { name: "个性化学习方案", modeId: "teacher-pipeline-agent", modeName: "教师流水线", description: "学情分析→目标设定→资源匹配→督导方案", difficulty: "中等", time: "30分钟/人" },
          { name: "平行班管理", modeId: "feishu-multi-group-single", modeName: "单机器人路由", description: "多个班级统一管理协调", difficulty: "简单", time: "持续" },
          { name: "学生竞赛指导", modeId: "feishu-multi-group-team", modeName: "多群组团队", description: "统筹+训练+资源+评审全流程", difficulty: "复杂", time: "1-3个月" }
        ]
      }
    ]
  },
  research: {
    categories: [
      {
        name: "学术写作",
        scenarios: [
          { name: "教研论文", modeId: "teacher-pipeline-agent", modeName: "教师流水线", description: "文献→设计→数据→撰写→投稿全流程", difficulty: "中等", time: "3-7天" },
          { name: "学术论文", modeId: "teacher-pipeline-agent", modeName: "教师流水线", description: "完整的六阶段学术写作流水线", difficulty: "复杂", time: "1-2周" },
          { name: "综述撰写", modeId: "teacher-pipeline-agent", modeName: "教师流水线", description: "文献整理→框架→撰写→修订", difficulty: "中等", time: "3-5天" }
        ]
      },
      {
        name: "项目申报",
        scenarios: [
          { name: "课题申报", modeId: "teacher-file-blackboard", modeName: "教师文件黑板", description: "文献+设计+数据+预算+申报并行准备", difficulty: "复杂", time: "1-2周" },
          { name: "基金申请", modeId: "teacher-file-blackboard", modeName: "教师文件黑板", description: "多维度申报材料并行产出", difficulty: "复杂", time: "2-4周" },
          { name: "项目评估", modeId: "feishu-topic-team", modeName: "话题团队", description: "技术+市场+资源多维度评估", difficulty: "中等", time: "3-5天" }
        ]
      },
      {
        name: "研究管理",
        scenarios: [
          { name: "文献管理", modeId: "feishu-multi-group-single", modeName: "单机器人路由", description: "文献群+笔记群+写作群统一管理", difficulty: "简单", time: "持续" },
          { name: "课题组协作", modeId: "feishu-multi-group-team", modeName: "多群组团队", description: "文献+实验+写作+汇报协作", difficulty: "中等", time: "持续" },
          { name: "学术会议准备", modeId: "teacher-file-blackboard", modeName: "教师文件黑板", description: "PPT+讲稿+海报+材料并行准备", difficulty: "中等", time: "2-3天" }
        ]
      }
    ]
  },
  project: {
    categories: [
      {
        name: "竞赛与比赛",
        scenarios: [
          { name: "职业技能大赛", modeId: "feishu-multi-group-team", modeName: "多群组团队", description: "统筹+训练+资源+评审4Bot协作", difficulty: "复杂", time: "2-6个月" },
          { name: "教学能力比赛", modeId: "feishu-multi-group-team", modeName: "多群组团队", description: "资料+设计+PPT+答辩+模拟+审核", difficulty: "复杂", time: "1-3个月" },
          { name: "学生创新创业", modeId: "feishu-multi-group-team", modeName: "多群组团队", description: "计划书+路演+答辩全流程", difficulty: "中等", time: "1-2个月" }
        ]
      },
      {
        name: "教材与出版物",
        scenarios: [
          { name: "教材编写", modeId: "feishu-multi-group-team", modeName: "多群组团队", description: "主编+编写+审稿多Bot协作", difficulty: "复杂", time: "3-12个月" },
          { name: "专著写作", modeId: "teacher-pipeline-agent", modeName: "教师流水线", description: "选题→大纲→资料→撰写→校对→出版", difficulty: "复杂", time: "3-6个月" },
          { name: "教学资源包", modeId: "teacher-file-blackboard", modeName: "教师文件黑板", description: "视频+PPT+习题+实验并行产出", difficulty: "中等", time: "1-2周" }
        ]
      },
      {
        name: "校企合作",
        scenarios: [
          { name: "人才培养方案", modeId: "feishu-topic-team", modeName: "话题团队", description: "企业+学校+学生多方协商制定", difficulty: "中等", time: "1-2个月" },
          { name: "合作单位评估", modeId: "feishu-topic-team", modeName: "话题团队", description: "多维度考察评估合作单位", difficulty: "中等", time: "2-4周" },
          { name: "实习基地建设", modeId: "feishu-multi-group-team", modeName: "多群组团队", description: "多角色协调管理基地建设", difficulty: "中等", time: "1-3个月" }
        ]
      }
    ]
  },
  daily: {
    categories: [
      {
        name: "个人管理",
        scenarios: [
          { name: "个人多角色", modeId: "feishu-multi-group-single", modeName: "单机器人路由", description: "教学+科研+行政+生活统一管理", difficulty: "简单", time: "持续" },
          { name: "知识管理", modeId: "teacher-pipeline-agent", modeName: "教师流水线", description: "笔记整理→知识库→文章输出", difficulty: "简单", time: "持续" },
          { name: "时间管理", modeId: "feishu-multi-group-single", modeName: "单机器人路由", description: "日程+提醒+任务+回顾", difficulty: "简单", time: "持续" }
        ]
      },
      {
        name: "行政事务",
        scenarios: [
          { name: "会议组织", modeId: "teacher-pipeline-agent", modeName: "教师流水线", description: "通知→议程→纪要→跟进", difficulty: "简单", time: "1-2天" },
          { name: "文档处理", modeId: "teacher-pipeline-agent", modeName: "教师流水线", description: "起草→审核→修订→发布", difficulty: "简单", time: "2-4小时" },
          { name: "政策制定", modeId: "feishu-topic-team", modeName: "话题团队", description: "多方征求意见协商制定", difficulty: "中等", time: "1-2周" }
        ]
      },
      {
        name: "内容创作",
        scenarios: [
          { name: "公众号文章", modeId: "teacher-pipeline-agent", modeName: "教师流水线", description: "素材→标题→正文→排版→发布", difficulty: "简单", time: "1-2小时" },
          { name: "视频内容", modeId: "teacher-pipeline-agent", modeName: "教师流水线", description: "脚本→分镜→素材→合成", difficulty: "中等", time: "2-4小时" },
          { name: "播客/音频", modeId: "teacher-pipeline-agent", modeName: "教师流水线", description: "选题→大纲→录制→剪辑", difficulty: "中等", time: "2-3小时" }
        ]
      }
    ]
  }
};

// 获取模式颜色
const getModeColor = (modeId: string) => {
  const colors: Record<string, string> = {
    'teacher-pipeline-agent': 'bg-emerald-100 text-emerald-700 border-emerald-200',
    'teacher-file-blackboard': 'bg-blue-100 text-blue-700 border-blue-200',
    'feishu-multi-group-single': 'bg-amber-100 text-amber-700 border-amber-200',
    'feishu-multi-group-team': 'bg-purple-100 text-purple-700 border-purple-200',
    'feishu-topic-team': 'bg-rose-100 text-rose-700 border-rose-200'
  };
  return colors[modeId] || 'bg-slate-100 text-slate-700 border-slate-200';
};

// 获取难度颜色
const getDifficultyColor = (difficulty: string) => {
  const colors: Record<string, string> = {
    '简单': 'bg-green-100 text-green-700',
    '中等': 'bg-yellow-100 text-yellow-700',
    '复杂': 'bg-red-100 text-red-700'
  };
  return colors[difficulty] || 'bg-slate-100 text-slate-700';
};

export default function Scenarios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<string | null>(null);

  // 过滤场景
  const filterScenarios = () => {
    const allScenarios: Array<{
      name: string;
      modeId: string;
      modeName: string;
      description: string;
      difficulty: string;
      time: string;
      category: string;
      domain: string;
    }> = [];
    
    Object.entries(scenariosByDomain).forEach(([domain, data]) => {
      data.categories.forEach(category => {
        category.scenarios.forEach(scenario => {
          allScenarios.push({
            ...scenario,
            category: category.name,
            domain
          });
        });
      });
    });
    
    return allScenarios.filter(scenario => {
      const matchesSearch = scenario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           scenario.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           scenario.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDomain = !selectedDomain || scenario.domain === selectedDomain;
      return matchesSearch && matchesDomain;
    });
  };

  const filteredScenarios = filterScenarios();

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>场景中心 - OpenClaw多智能体协作教师助手</title>
        <meta name="description" content="40+教学场景，按教学、科研、专项、日常四大领域分类，快速找到适合您的多智能体协作方案" />
      </Head>

      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-accent-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">场景中心</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            40+教学场景，按四大领域分类
            <br />
            快速找到适合您的多智能体协作方案
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 领域选择 */}
        {!selectedDomain && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">选择您的工作领域</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {domains.map((domain) => (
                <button
                  key={domain.id}
                  onClick={() => setSelectedDomain(domain.id)}
                  className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all text-left group"
                >
                  <div className={`w-14 h-14 ${domain.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    {domain.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{domain.name}</h3>
                  <p className="text-slate-600 text-sm">{domain.description}</p>
                  <div className="mt-4 flex items-center text-primary-600 text-sm font-medium">
                    查看场景
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* 搜索栏 */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="搜索场景、分类或描述..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            />
          </div>
          
          {selectedDomain && (
            <button
              onClick={() => setSelectedDomain(null)}
              className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
            >
              返回全部领域
            </button>
          )}
        </div>

        {/* 已选领域标题 */}
        {selectedDomain && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <div className={`w-10 h-10 ${domains.find(d => d.id === selectedDomain)?.color} rounded-xl flex items-center justify-center`}>
                {domains.find(d => d.id === selectedDomain)?.icon}
              </div>
              <h2 className="text-2xl font-bold text-slate-900">
                {domains.find(d => d.id === selectedDomain)?.name}领域
              </h2>
            </div>
            <p className="text-slate-600">
              {domains.find(d => d.id === selectedDomain)?.description}
            </p>
          </div>
        )}

        {/* 场景列表 */}
        {selectedDomain ? (
          // 显示分类下的场景
          <div className="space-y-12">
            {scenariosByDomain[selectedDomain as keyof typeof scenariosByDomain].categories.map((category, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-primary-500" />
                  {category.name}
                </h3>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.scenarios.map((scenario, sidx) => (
                    <div 
                      key={sidx}
                      className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-slate-100"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="font-semibold text-slate-900">{scenario.name}</h4>
                        <span className={`px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(scenario.difficulty)}`}>
                          {scenario.difficulty}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 text-sm mb-3">{scenario.description}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <span className={`px-2 py-1 rounded text-xs border ${getModeColor(scenario.modeId)}`}>
                          {scenario.modeName}
                        </span>
                        <span className="text-xs text-slate-500">⏱️ {scenario.time}</span>
                      </div>
                      
                      <Link
                        href={`/mode/${scenario.modeId}`}
                        className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                      >
                        查看模式详情
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : searchTerm ? (
          // 搜索结果
          <div>
            <div className="mb-4 text-slate-600">
              找到 <span className="font-bold text-slate-900">{filteredScenarios.length}</span> 个相关场景
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredScenarios.map((scenario, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow border border-slate-100"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-semibold text-slate-900">{scenario.name}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getDifficultyColor(scenario.difficulty)}`}>
                      {scenario.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 text-sm mb-2">{scenario.description}</p>
                  <p className="text-xs text-slate-500 mb-3">{scenario.category}</p>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className={`px-2 py-1 rounded text-xs border ${getModeColor(scenario.modeId)}`}>
                      {scenario.modeName}
                    </span>
                    <span className="text-xs text-slate-500">⏱️ {scenario.time}</span>
                  </div>
                  
                  <Link
                    href={`/mode/${scenario.modeId}`}
                    className="text-sm text-primary-600 hover:text-primary-700 font-medium flex items-center gap-1"
                  >
                    查看模式详情
                    <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* CTA */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-3">不确定选择哪个场景？</h3>
          <p className="text-slate-600 mb-6">使用智能推荐，回答3个问题获取个性化建议</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/guide"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              开始智能推荐
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/modes"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors border border-slate-200"
            >
              浏览所有模式
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
