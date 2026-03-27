import React from 'react';
import Link from 'next/link';
import { Mail, Github, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
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
            <p className="text-slate-400 mb-4">
              为高校教师打造的多智能体协作平台，
              <br />让AI成为您的专业团队成员。
            </p>
            <p className="text-sm text-slate-500">
              由「职教者行」平台提供支持
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">快速链接</h4>
            <ul className="space-y-2">
              <li><Link href="/modes" className="hover:text-white transition-colors">协作模式</Link></li>
              <li><Link href="/scenarios" className="hover:text-white transition-colors">场景中心</Link></li>
              <li><Link href="/examples" className="hover:text-white transition-colors">参考案例</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">联系我们</Link></li>
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
        
        {/* Contact Info */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 职教者行OpenClaw Teacher Hub. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="mailto:384679582@qq.com" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                384679582@qq.com
              </a>
              <a href="https://github.com/lilyjasminestone" target="_blank" rel="noopener" className="flex items-center gap-1 text-slate-400 hover:text-white transition-colors">
                <Github className="w-4 h-4" />
                @lilyjasminestone
              </a>
              <span className="flex items-center gap-1 text-slate-400">
                <MessageCircle className="w-4 h-4" />
                微信: lilystone001
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
