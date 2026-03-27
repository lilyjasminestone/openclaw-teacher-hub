import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ModeCard from '../components/ModeCard';
import modesData from '../data/modes.json';

export default function Modes() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>协作模式 - OpenClaw多智能体协作教师助手</title>
        <meta name="description" content="五种多智能体协作模式详细介绍" />
      </Head>

      <Header />

      <div className="bg-gradient-to-br from-primary-600 to-accent-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">协作模式</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            从顺序执行到并行协作，从个人使用到团队协作，
            <br />选择最适合您的多智能体协作方案
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Comparison Table */}
        <section className="bg-white rounded-2xl shadow-md overflow-hidden mb-12">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">模式</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">架构</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">配置时间</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">团队规模</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">场景数</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-slate-900">平台</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {modesData.modes.map((mode) => (
                  <tr key={mode.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{mode.name}</div>
                      <div className="text-sm text-slate-500">{mode.modeNumber}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{mode.architecture.type}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{mode.configTime}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{mode.teamSize}</td>
                    <td className="px-6 py-4">
                      <span className="badge-primary">适合一人</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{mode.platform}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Mode Cards */}
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">详细模式介绍</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modesData.modes.map((mode, index) => (
              <ModeCard key={mode.id} mode={mode as any} index={index} />
            ))}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
