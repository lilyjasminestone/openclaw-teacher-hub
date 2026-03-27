import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Search, BookOpen, Trophy, GraduationCap, FileText, Beaker, Award, Layers, ArrowRight } from 'lucide-react';
import Header from '../components/Header';
import modesData from '../data/modes.json';

const categoryIcons: Record<string, React.ReactNode> = {
  '备课': <BookOpen className="w-5 h-5" />,
  '竞赛': <Trophy className="w-5 h-5" />,
  '课程建设': <GraduationCap className="w-5 h-5" />,
  '科研': <FileText className="w-5 h-5" />,
  '实训': <Beaker className="w-5 h-5" />,
  '成果申报': <Award className="w-5 h-5" />,
};

// 从各个模式的 examples 中提取典型场景
const allScenarios = [
  {
    name: "试卷命制",
    category: "备课",
    modeId: "teacher-pipeline-agent",
    modeName: "教师流水线",
    description: "命题→审题→排版→难度标注，4阶段流水线完成标准化试卷命制",
    tags: ["标准化流程", "4阶段"]
  },
  {
    name: "教学视频开发",
    category: "课程建设",
    modeId: "teacher-pipeline-agent",
    modeName: "教师流水线",
    description: "教学设计→脚本→分镜→提示词→多媒体→合成，6阶段完成视频制作",
    tags: ["内容创作", "6阶段"]
  },
  {
    name: "教研论文写作",
    category: "科研",
    modeId: "teacher-pipeline-agent",
    modeName: "教师流水线",
    description: "文献综述→研究设计→数据分析→撰写→投稿优化，学术写作全流程",
    tags: ["学术写作", "5阶段"]
  },
  {
    name: "专著写作",
    category: "科研",
    modeId: "teacher-pipeline-agent",
    modeName: "教师流水线",
    description: "选题→大纲→资料→撰写→校对→出版，图书出版完整流程",
    tags: ["出版", "6阶段"]
  },
  {
    name: "单课备课",
    category: "备课",
    modeId: "teacher-file-blackboard",
    modeName: "教师文件黑板",
    description: "并行产出教案+PPT+习题+实验指导，20分钟完成全套资源",
    tags: ["并行协作", "4 Workers"]
  },
  {
    name: "学期备课",
    category: "备课",
    modeId: "teacher-file-blackboard",
    modeName: "教师文件黑板",
    description: "批量开发16周完整教学资源，效率提升5倍",
    tags: ["批量处理", "16 Workers"]
  },
  {
    name: "差异化教学资源",
    category: "备课",
    modeId: "teacher-file-blackboard",
    modeName: "教师文件黑板",
    description: "为同一节课开发基础版/标准版/拓展版三个难度版本",
    tags: ["个性化", "3 Workers"]
  },
  {
    name: "科研课题申报",
    category: "科研",
    modeId: "teacher-file-blackboard",
    modeName: "教师文件黑板",
    description: "文献研究+研究设计+数据分析+预算规划+申报撰写 并行准备",
    tags: ["并行处理", "5 Workers"]
  },
  {
    name: "个人多角色管理",
    category: "备课",
    modeId: "feishu-multi-group-single",
    modeName: "单机器人路由",
    description: "一个Bot管理教学+科研+行政+生活四个场景",
    tags: ["个人效率", "多角色"]
  },
  {
    name: "平行班管理",
    category: "课程建设",
    modeId: "feishu-multi-group-single",
    modeName: "单机器人路由",
    description: "同时管理班级1/班级2/班级3/统筹四个群组",
    tags: ["班级管理", "多群组"]
  },
  {
    name: "多门课程协调",
    category: "课程建设",
    modeId: "feishu-multi-group-single",
    modeName: "单机器人路由",
    description: "协调课程A/B/C的教学进度和资源分配",
    tags: ["课程协调", "多角色"]
  },
  {
    name: "职业技能大赛指导",
    category: "竞赛",
    modeId: "feishu-multi-group-team",
    modeName: "多群组团队",
    description: "统筹+训练+资源+评审 4个独立Bot协作指导",
    tags: ["团队协作", "4 Bots"]
  },
  {
    name: "在线课程建设",
    category: "课程建设",
    modeId: "feishu-multi-group-team",
    modeName: "多群组团队",
    description: "统筹+脚本+PPT+习题+审核 5个Bot完整建设流程",
    tags: ["项目管理", "5 Bots"]
  },
  {
    name: "教材编写",
    category: "课程建设",
    modeId: "feishu-multi-group-team",
    modeName: "多群组团队",
    description: "主编+基础编写+核心编写+拓展编写+审稿 多Bot协作",
    tags: ["出版项目", "5 Bots"]
  },
  {
    name: "教师教学能力比赛",
    category: "竞赛",
    modeId: "feishu-multi-group-team",
    modeName: "多群组团队",
    description: "统筹+资料+设计+PPT+答辩+模拟+审核 7个Bot复杂协作",
    tags: ["比赛准备", "7 Bots"]
  },
  {
    name: "人才培养方案制定",
    category: "课程建设",
    modeId: "feishu-topic-team",
    modeName: "话题团队",
    description: "企业+行业专家+学校+教师+学生+汇总 6视角平衡制定",
    tags: ["多方协商", "6话题"]
  },
  {
    name: "校企合作评估",
    category: "课程建设",
    modeId: "feishu-topic-team",
    modeName: "话题团队",
    description: "企业评估+学校评估+学生反馈+发展潜力分析+综合汇总",
    tags: [ "评估决策", "5话题"]
  },
  {
    name: "专业建设质量诊断",
    category: "课程建设",
    modeId: "feishu-topic-team",
    modeName: "话题团队",
    description: "学生评价+督导评价+同行评价+成绩分析+诊断汇总",
    tags: ["质量诊断", "5话题"]
  },
  {
    name: "教学比赛作品评价",
    category: "成果申报",
    modeId: "feishu-topic-team",
    modeName: "话题团队",
    description: "小白视角+同行视角+专家视角+评价汇总 多维度评估",
    tags: ["作品评审", "4话题"]
  },
  {
    name: "课题/项目评审",
    category: "科研",
    modeId: "feishu-topic-team",
    modeName: "话题团队",
    description: "创新性+可行性+预算+规范+产业应用+评审汇总 多维评估",
    tags: ["项目评审", "6话题"]
  }
];

export default function Scenarios() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('全部');

  // 分类
  const categories = ['全部', '备课', '竞赛', '课程建设', '科研', '成果申报'];

  // 过滤场景
  const filteredScenarios = allScenarios.filter((scenario) => {
    const matchesSearch = scenario.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scenario.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '全部' || scenario.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>场景模板 - OpenClaw教师助手</title>
        <meta name="description" content="高校教师教学场景模板，覆盖备课、竞赛、课程建设、科研全流程" />
      </Head>

      <Header />

      <div className="bg-gradient-to-br from-emerald-600 to-teal-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">场景模板库</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            20+经过验证的教学场景，覆盖备课、竞赛、课程建设、科研全流程
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="搜索场景..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6 text-slate-600">
          共找到 <span className="font-bold text-slate-900">{filteredScenarios.length}</span> 个场景
        </div>

        {/* Scenarios Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScenarios.map((scenario, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center text-primary-600">
                    {categoryIcons[scenario.category] || <Layers className="w-5 h-5" />}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{scenario.name}</h3>
                    <span className="text-xs text-slate-500">{scenario.modeName}</span>
                  </div>
                </div>
              </div>

              <p className="text-slate-600 text-sm mb-4">
                {scenario.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {scenario.tags.map((tag, tidx) => (
                  <span key={tidx} className="px-2 py-1 bg-slate-100 text-slate-600 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>

              <Link
                href={`/mode/${scenario.modeId}`}
                className="flex items-center gap-1 text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                查看对应模式
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 mb-4">没有找到合适的场景？查看所有协作模式</p>
          <Link
            href="/modes"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
          >
            浏览所有模式
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
