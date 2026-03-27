import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { Mail, Github, MessageCircle, Heart, Users, BookOpen, Sparkles } from 'lucide-react';
import Header from '../components/Header';

export default function Contact() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Head>
        <title>联系我们 - OpenClaw多智能体协作教师助手</title>
        <meta name="description" content="联系职教者行平台，获取多智能体协作技能支持" />
      </Head>

      <Header />

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary-600 to-accent-600 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">联系我们</h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            欢迎与职教者行平台取得联系，获取技能支持与交流学习
          </p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 职教者行介绍 */}
        <div className="bg-white rounded-2xl p-8 shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-500 rounded-xl flex items-center justify-center text-white">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900">关于职教者行</h2>
              <p className="text-slate-500">职教一线教师发展公益性平台</p>
            </div>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-slate-600 text-lg leading-relaxed">
              <strong>"职教者行"</strong>是由职教教师自发打造的职教一线教师发展公益性平台，
              其目的是为致力于"三教"改革的职教教师们提供一个对话交流、相互学习的平台。
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 mt-8">
              <div className="bg-rose-50 rounded-xl p-6 border border-rose-100">
                <Users className="w-8 h-8 text-rose-500 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">对话交流</h3>
                <p className="text-sm text-slate-600">
                  为职教教师提供交流经验、分享心得的对话空间
                </p>
              </div>
              
              <div className="bg-amber-50 rounded-xl p-6 border border-amber-100">
                <BookOpen className="w-8 h-8 text-amber-500 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">相互学习</h3>
                <p className="text-sm text-slate-600">
                  搭建教师之间相互学习、共同成长的平台
                </p>
              </div>
              
              <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
                <Sparkles className="w-8 h-8 text-emerald-500 mb-3" />
                <h3 className="font-semibold text-slate-900 mb-2">三教改革</h3>
                <p className="text-sm text-slate-600">
                  支持教师教材教法的改革创新与实践
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* 微信公众号 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <MessageCircle className="w-6 h-6 text-green-500" />
              关注微信公众号
            </h2>
            
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-xl overflow-hidden shadow-lg">
                <Image
                  src="/wechat-qrcode.jpg"
                  alt="职教者行微信公众号二维码"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-slate-600 text-sm">
                扫码关注「职教者行」微信公众号
                <br />
                获取更多职教资讯与资源
              </p>
            </div>
          </div>

          {/* 联系方式 */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Mail className="w-6 h-6 text-primary-500" />
              联系获取技能
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">Email</h3>
                  <a 
                    href="mailto:384679582@qq.com" 
                    className="text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    384679582@qq.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center text-purple-600 flex-shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">GitHub</h3>
                  <a 
                    href="https://github.com/lilyjasminestone" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-primary-600 transition-colors"
                  >
                    @lilyjasminestone
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600 flex-shrink-0">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 mb-1">微信</h3>
                  <p className="text-slate-600">lilystone001</p>
                  <div className="relative w-32 h-32 mt-3 rounded-lg overflow-hidden shadow">
                    <Image
                      src="/wechat-contact.png"
                      alt="微信联系方式"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center bg-gradient-to-r from-primary-50 to-accent-50 rounded-2xl p-8">
          <h3 className="text-xl font-bold text-slate-900 mb-3">准备好开始了吗？</h3>
          <p className="text-slate-600 mb-6">
            选择适合您的协作模式，开启多智能体协作之旅
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/guide"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors"
            >
              开始智能推荐
            </a>
            <a
              href="/scenarios"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors border border-slate-200"
            >
              查看场景中心
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
