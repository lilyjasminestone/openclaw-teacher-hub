import React, { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Check, ChevronRight, Copy, ExternalLink,
  Download, Settings, Play, MessageSquare, Users, BookOpen, Code
} from 'lucide-react';
import Header from '../components/Header';
import modesData from '../data/modes.json';

export default function Guide() {
  const router = useRouter();
  const { mode: modeId } = router.query;
  const [currentStep, setCurrentStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'install' | 'config' | 'usage'>('install');

  const mode = modeId ? modesData.modes.find(m => m.id === modeId) : null;

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!mode) {
    return (
      <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-2xl font-bold text-slate-900 mb-4">选择要开始的模式</h1>
          <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {modesData.modes.map((m) => (
              <Link
                key={m.id}
                href={`/guide?mode=${m.id}`}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left"
              >
                <h3 className="font-bold text-slate-900 mb-2">{m.name}</h3>
                <p className="text-sm text-slate-600">{m.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const hasFeishu = mode.platform === '飞书';

  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>使用指南 - {mode.name} - OpenClaw教师助手</title>
        <meta name="description" content={`${mode.name}完整使用指南`} />
      </Head>

      <Header />

      <div className="bg-gradient-to-br from-primary-600 to-accent-600 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-white/80 mb-4">
            <Link href={`/mode/${mode.id}`} className="hover:text-white">
              {mode.name}
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span>使用指南</span>
          </div>
          <h1 className="text-3xl font-bold text-white">{mode.name} - 完整使用指南</h1>
          <p className="text-white/80 mt-2">从安装到使用的完整流程</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'install', label: '1. 安装 Skill', icon: Download },
            { id: 'config', label: hasFeishu ? '2. 配置飞书+Skill' : '2. 配置 Skill', icon: Settings },
            { id: 'usage', label: '3. 开始使用', icon: Play },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-8 shadow-sm"
        >
          {activeTab === 'install' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <Download className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">安装 Skill</h2>
              </div>

              <div className="space-y-6">
                <div className="bg-amber-50 rounded-lg p-4 border border-amber-200">
                  <h3 className="font-semibold text-amber-900 mb-2 flex items-center gap-2">
                    <span>📦</span> 获取方式
                  </h3>
                  <p className="text-amber-800 text-sm">
                    目前技能处于内测阶段，请联系作者获取 skill.tar.gz 安装包
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">安装步骤</h3>
                  <div className="space-y-3">
                    {mode.installation?.steps?.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-slate-700">{step}</span>
                      </div>
                    )) || (
                      <>
                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                          <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-bold flex-shrink-0">1</span>
                          <span className="text-slate-700">联系技能作者获取 {mode.id}.skill.tar.gz 文件</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                          <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-bold flex-shrink-0">2</span>
                          <span className="text-slate-700">将文件上传到 OpenClaw 服务器的 /workspace/projects/extensions/ 目录</span>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                          <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-bold flex-shrink-0">3</span>
                          <div className="text-slate-700">
                            <p>解压安装包：</p>
                            <code className="block mt-2 px-3 py-2 bg-slate-900 rounded text-green-400 text-sm">
                              tar -xzvf {mode.id}.skill.tar.gz
                            </code>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <Check className="w-4 h-4" /> 验证安装
                  </h3>
                  <p className="text-green-800 text-sm">
                    重启 OpenClaw 服务后，在任意渠道发送触发词测试是否响应
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center text-purple-600">
                  <Settings className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {hasFeishu ? '配置飞书 + Skill' : '配置 Skill'}
                </h2>
              </div>

              <div className="space-y-6">
                {hasFeishu && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-3 flex items-center gap-2">
                      <span>🔧</span> 飞书平台配置（{mode.configTime}）
                    </h3>
                    <div className="space-y-2 text-sm text-blue-800">
                      <p><strong>步骤1：</strong>登录飞书开放平台 open.feishu.cn</p>
                      <p><strong>步骤2：</strong>创建企业自建应用（{mode.id.includes('team') || mode.id.includes('topic') ? '每个Bot一个应用，共4-8个' : '1个应用'}）</p>
                      <p><strong>步骤3：</strong>获取 App ID 和 App Secret</p>
                      <p><strong>步骤4：</strong>配置 Webhook 地址指向 OpenClaw 服务</p>
                      <p><strong>步骤5：</strong>创建飞书群组并添加机器人</p>
                      {mode.id === 'feishu-topic-team' && (
                        <p><strong>步骤6：</strong>开启群组的"话题模式"</p>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">Skill 配置</h3>
                  <div className="space-y-3">
                    {(mode.configuration?.steps || []).map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-slate-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">配置示例</span>
                    <button
                      onClick={() => handleCopy(`# ${mode.name} 配置示例
# 配置文件路径：/workspace/projects/extensions/${mode.id}/config.yaml

mode: ${mode.id}
platform: ${mode.platform}
triggers:
${mode.triggers.slice(0, 3).map(t => `  - "${t}"`).join('\n')}

# 其他配置项...`)}
                      className="flex items-center gap-1 text-xs text-slate-400 hover:text-white"
                    >
                      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      {copied ? '已复制' : '复制'}
                    </button>
                  </div>
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{`# ${mode.name} 配置示例
# 配置文件路径
mode: ${mode.id}
platform: ${mode.platform}

# 触发词
triggers:
${mode.triggers.slice(0, 3).map(t => `  - "${t}"`).join('\n')}

# 详细配置请参考技能包内的 README.md`}</code>
                  </pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'usage' && (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                  <Play className="w-5 h-5" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">开始使用</h2>
              </div>

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4" /> 支持的渠道
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {(mode.usage?.channels || ['WebUI', '飞书', 'Telegram', 'Discord']).map((channel) => (
                        <span key={channel} className="px-3 py-1 bg-white rounded-full text-sm text-slate-600 border">
                          {channel}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-lg p-4">
                    <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                      <Code className="w-4 h-4" /> 触发词示例
                    </h3>
                    <div className="space-y-1">
                      {mode.triggers.slice(0, 3).map((trigger, idx) => (
                        <code key={idx} className="block text-sm text-primary-600 bg-white px-2 py-1 rounded">
                          {trigger}
                        </code>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 mb-3">使用步骤</h3>
                  <div className="space-y-3">
                    {(mode.usage?.steps || [
                      `打开任意 OpenClaw 渠道（WebUI${hasFeishu ? '或飞书' : ''}）`,
                      `发送触发词，如："${mode.triggers[0]}"`,
                      "根据提示提供任务信息",
                      "与AI协作完成整个流程"
                    ]).map((step, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                        <span className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center text-primary-600 text-sm font-bold flex-shrink-0">
                          {idx + 1}
                        </span>
                        <span className="text-slate-700">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-slate-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-slate-400">对话示例</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="text-slate-400">用户：</div>
                    <div className="text-white">{mode.triggers[0]}</div>
                    <div className="text-slate-400 mt-3">AI：</div>
                    <div className="text-green-400">
                      好的！我是您的{mode.name}助手。{mode.shortDescription}。
                      <br /><br />
                      请告诉我您的任务主题是什么？
                    </div>
                  </div>
                </div>

                {hasFeishu && (
                  <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                    <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                      <span>💡</span> 飞书使用提示
                    </h3>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• 在飞书群组中 @机器人 即可开始对话</li>
                      <li>• 支持手机端和电脑端同时使用</li>
                      <li>• 历史记录可在飞书中查看</li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>

        {/* Additional Resources */}
        <div className="mt-12 grid md:grid-cols-3 gap-4">
          <Link
            href="/docs"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <BookOpen className="w-8 h-8 text-primary-500 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">详细文档</h3>
            <p className="text-sm text-slate-600">查看完整的使用指南和最佳实践</p>
          </Link>

          <Link
            href="/examples"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <Play className="w-8 h-8 text-accent-500 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">参考案例</h3>
            <p className="text-sm text-slate-600">查看实际应用案例和示例项目</p>
          </Link>

          <a
            href="https://docs.openclaw.ai"
            target="_blank"
            rel="noopener"
            className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <ExternalLink className="w-8 h-8 text-purple-500 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">OpenClaw文档</h3>
            <p className="text-sm text-slate-600">查看OpenClaw官方文档</p>
          </a>
        </div>
      </div>
    </div>
  );
}
