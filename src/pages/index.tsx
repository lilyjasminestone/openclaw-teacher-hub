import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Zap, Users, BookOpen } from 'lucide-react';
import Header from '../components/Header';
import ModeCard from '../components/ModeCard';
import DecisionTree from '../components/DecisionTree';
import modesData from '../data/modes.json';

export default function Home() {
  const [recommendation, setRecommendation] = useState<{
    mode: string;
    confidence: number;
    reason: string;
  } | null>(null);

  const recommendedMode = recommendation 
    ? modesData.modes.find(m => m.id === recommendation.mode)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Head>
        <title>OpenClaw多智能体协作教师助手 - 模式选择</title>
        <meta name="description" content="为高校教师提供五种多智能体协作模式选择，覆盖教学、科研、项目管理全场景" />
      </Head>

      <Header />

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-accent-50 opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              <span>专为高校教师设计</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
              多智能体协作模式
              <span className="block gradient-text">选择系统</span>
            </h1>

            <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-10">
              五种协作模式，31个教学场景，覆盖备课、科研、竞赛、课程建设全场景。
              <br className="hidden md:block" />
              回答3-5个问题，为您推荐最适合的智能协作方案。
            </p>

            {/* 双入口设计 */}
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
              {/* 入口 1: 智能推荐 */}
              <Link href="#recommend" className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-left">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">方式一：智能推荐</h3>
                <p className="text-slate-600 mb-4">
                  回答 3 个问题，根据您的技术需求和协作方式，为您推荐最适合的模式
                </p>
                <div className="flex items-center text-primary-600 font-medium">
                  开始推荐
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              {/* 入口 2: 按场景选择 */}
              <Link href="/scenarios" className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all text-left">
                <div className="w-14 h-14 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">方式二：按场景选择</h3>
                <p className="text-slate-600 mb-4">
                  按教学、科研、专项、日常四大领域，40+场景快速定位您的需求
                </p>
                <div className="flex items-center text-accent-600 font-medium">
                  查看场景
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>

            {/* 快捷链接 */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link href="/modes" className="text-slate-500 hover:text-slate-700 transition-colors">
                浏览所有模式 →
              </Link>
              <span className="text-slate-300">|</span>
              <Link href="/guide" className="text-slate-500 hover:text-slate-700 transition-colors">
                使用指南 →
              </Link>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          >
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-primary-600 mb-1">5</div>
              <div className="text-sm text-slate-600">协作模式</div>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-accent-600 mb-1">31</div>
              <div className="text-sm text-slate-600">教学场景</div>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-emerald-600 mb-1">5min</div>
              <div className="text-sm text-slate-600">最快配置</div>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-2xl p-6 shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-1">5x</div>
              <div className="text-sm text-slate-600">效率提升</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recommendation Section */}
      <section id="recommend" className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">智能模式推荐</h2>
            <p className="section-subtitle">
              回答几个简单问题，为您推荐最适合的协作模式
            </p>
          </div>

          <div className="bg-slate-50 rounded-2xl p-8 shadow-inner">
            {!recommendation ? (
              <DecisionTree onComplete={setRecommendation} />
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-6"
              >
                <div className="bg-white rounded-xl p-6 shadow-lg border-2 border-primary-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-2xl">
                      🎯
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">推荐结果</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-slate-500">匹配度</span>
                        <div className="flex-1 w-24 h-2 bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-primary-500 to-accent-500"
                            style={{ width: `${recommendation.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-primary-600">
                          {Math.round(recommendation.confidence * 100)}%
                        </span>
                      </div>
                    </div>
                  </div>

                  {recommendedMode && (
                    <>
                      <h4 className="text-2xl font-bold text-slate-900 mb-2">
                        {recommendedMode.name}
                      </h4>
                      <p className="text-slate-600 mb-4">{recommendedMode.description}</p>
                      <p className="text-sm text-slate-500 mb-6">
                        <span className="font-medium">推荐理由：</span>
                        {recommendation.reason}
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link 
                          href={`/mode/${recommendedMode.id}`}
                          className="btn-primary flex-1 text-center"
                        >
                          查看详情
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                        <button
                          onClick={() => setRecommendation(null)}
                          className="btn-secondary flex-1"
                        >
                          重新推荐
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Modes Grid Section */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">五种协作模式</h2>
            <p className="section-subtitle">
              从顺序执行到并行协作，从个人使用到团队协作，总有一款适合您
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modesData.modes.map((mode, index) => (
              <ModeCard key={mode.id} mode={mode as any} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/modes" className="btn-secondary">
              查看所有模式详情
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">为什么选择我们？</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              className="text-center p-6"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">效率倍增</h3>
              <p className="text-slate-600">
                通过AI并行协作，将原本需要数天的工作缩短至几小时
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-6"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-accent-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-accent-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">专业分工</h3>
              <p className="text-slate-600">
                每个AI专家专注一个领域，教案、PPT、习题并行产出
              </p>
            </motion.div>

            <motion.div 
              className="text-center p-6"
              whileHover={{ y: -5 }}
            >
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">开箱即用</h3>
              <p className="text-slate-600">
                31个预设场景模板，覆盖备课、科研、竞赛全流程
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">O</span>
                </div>
                <span className="font-bold text-white">OpenClaw多智能体协作教师助手</span>
              </div>
              <p className="text-slate-400">
                为高校教师打造的多智能体协作平台，
                <br />让AI成为您的专业团队成员。
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">快速链接</h4>
              <ul className="space-y-2">
                <li><Link href="/modes" className="hover:text-white transition-colors">协作模式</Link></li>
                <li><Link href="/scenarios" className="hover:text-white transition-colors">场景模板</Link></li>
                <li><Link href="/guide" className="hover:text-white transition-colors">使用指南</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">相关资源</h4>
              <ul className="space-y-2">
                <li><a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener" className="hover:text-white transition-colors">OpenClaw GitHub</a></li>
                <li><a href="https://docs.openclaw.ai" target="_blank" rel="noopener" className="hover:text-white transition-colors">文档中心</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-500">
            <p>© 2026 OpenClaw Teacher Hub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}