import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeft, Check, X, Clock, Users, Layers, ExternalLink } from 'lucide-react';
import Header from '../../components/Header';
import modesData from '../../data/modes.json';

export default function ModeDetail() {
  const router = useRouter();
  const { id } = router.query;

  const mode = modesData.modes.find(m => m.id === id);

  if (!mode) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">模式未找到</h1>
          <Link href="/modes" className="btn-primary">
            返回模式列表
          </Link>
        </div>
      </div>
    );
  }

  const modeColors: Record<string, string> = {
    'teacher-pipeline-agent': 'from-blue-500 to-cyan-400',
    'teacher-file-blackboard': 'from-emerald-500 to-teal-400',
    'feishu-multi-group-single': 'from-orange-500 to-amber-400',
    'feishu-multi-group-team': 'from-purple-500 to-pink-400',
    'feishu-topic-team': 'from-rose-500 to-orange-400',
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>{mode.name} - OpenClaw教师助手</title>
        <meta name="description" content={mode.description} />
      </Head>

      <Header />

      {/* Hero */}
      <div className={`bg-gradient-to-r ${modeColors[mode.id]} py-16`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/modes"
            className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            返回模式列表
          </Link>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="px-3 py-1 bg-white/20 text-white rounded-full text-sm font-medium">
              {mode.modeNumber}
            </span>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4">{mode.name}</h1>
          <p className="text-xl text-white/90 max-w-2xl">{mode.description}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <Clock className="w-8 h-8 text-primary-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">{mode.configTime}</div>
            <div className="text-sm text-slate-500">配置时间</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <Users className="w-8 h-8 text-accent-500 mx-auto mb-2" />
            <div className="text-lg font-bold text-slate-900">{mode.teamSize}</div>
            <div className="text-sm text-slate-500">团队规模</div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <Layers className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-slate-900">适合</div>
            <div className="text-sm text-slate-500">一人团队</div>
          </div>
        </div>

        {/* Architecture */}
        <section className="bg-white rounded-2xl p-8 shadow-md mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">架构设计</h2>
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-lg text-sm font-medium">
              {mode.architecture.pattern}
            </span>
            <span className="text-slate-600">{mode.architecture.type}</span>
          </div>
          
          <div className="bg-slate-50 rounded-xl p-6">
            <h3 className="font-semibold text-slate-900 mb-3">协作角色</h3>
            <div className="flex flex-wrap gap-3">
              {mode.architecture.agents.map((agent, idx) => (
                <span 
                  key={idx}
                  className="px-4 py-2 bg-white rounded-lg border border-slate-200 text-slate-700"
                >
                  {agent}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Characteristics */}
        <section className="bg-white rounded-2xl p-8 shadow-md mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">适用特征</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {(mode.characteristics || mode.features).map((item, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                <span className="text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Examples List */}
        <section className="bg-white rounded-2xl p-8 shadow-md mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">典型场景示例</h2>
          <div className="space-y-3">
            {(mode.examples || []).slice(0, 6).map((example: any, idx: number) => (
              <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <span className="text-primary-500 font-bold">→</span>
                <span className="text-slate-700">
                  {typeof example === 'string' ? example : example.description}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Pros & Cons */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <section className="bg-green-50 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-green-900 mb-4">优势</h2>
            <ul className="space-y-3">
              {mode.pros.map((pro, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-green-800">{pro}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-orange-50 rounded-2xl p-8">
            <h2 className="text-xl font-bold text-orange-900 mb-4">限制</h2>
            <ul className="space-y-3">
              {mode.cons.map((con, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <X className="w-5 h-5 text-orange-600 flex-shrink-0" />
                  <span className="text-orange-800">{con}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {/* Scenarios - Hidden for now to fix type error */}
        {/* Examples Reference */}
        <section className="bg-white rounded-2xl p-8 shadow-md mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">查看案例</h2>
          <p className="text-slate-600 mb-4">查看实际应用案例：</p>
          <Link 
            href="/examples"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium"
          >
            浏览参考案例 →
          </Link>
        </section>

        {/* Examples */}
        {mode.examples && mode.examples.length > 0 && (
          <section className="bg-white rounded-2xl p-8 shadow-md mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">参考案例</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {mode.examples.map((example: any, idx: number) => (
                <div key={idx} className="border border-slate-200 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">{example.name}</h3>
                  <p className="text-sm text-slate-600 mb-3">{example.description}</p>
                  <code className="text-xs bg-slate-100 px-2 py-1 rounded">{example.path}</code>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Triggers */}
        <section className="bg-slate-100 rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">触发词</h2>
          <p className="text-slate-600 mb-4">使用以下任意触发词启动该模式：</p>
          <div className="flex flex-wrap gap-2">
            {mode.triggers.slice(0, 6).map((trigger, idx) => (
              <span 
                key={idx}
                className="px-3 py-1.5 bg-white rounded-lg text-slate-700 text-sm font-mono border border-slate-300"
              >
                {trigger}
              </span>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href={`/guide?mode=${mode.id}`}
            className="btn-primary flex-1 text-center text-lg"
          >
            开始使用此模式
          </Link>
          <Link 
            href="/docs"
            className="btn-secondary flex-1 text-center text-lg"
          >
            查看文档
            <ExternalLink className="w-4 h-4 ml-2" />
          </Link>
        </div>
      </div>
    </div>
  );
}