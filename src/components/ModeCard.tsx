import React from 'react';
import Link from 'next/link';
import { ArrowRight, Users, Clock, Layers } from 'lucide-react';

interface ModeCardProps {
  mode: {
    id: string;
    name: string;
    modeNumber: string;
    shortDescription: string;
    description: string;
    configTime: string;
    teamSize: string;
    scenarios: Array<any>;
    features: string[];
  };
  index: number;
}

const modeColors: Record<string, string> = {
  'teacher-pipeline-agent': 'from-blue-500 to-cyan-400',
  'teacher-file-blackboard': 'from-emerald-500 to-teal-400',
  'feishu-multi-group-single': 'from-orange-500 to-amber-400',
  'feishu-multi-group-team': 'from-purple-500 to-pink-400',
  'feishu-topic-team': 'from-rose-500 to-orange-400',
};

const modeIcons: Record<string, string> = {
  'teacher-pipeline-agent': '🔄',
  'teacher-file-blackboard': '📋',
  'feishu-multi-group-single': '👤',
  'feishu-multi-group-team': '👥',
  'feishu-topic-team': '💬',
};

export default function ModeCard({ mode, index }: ModeCardProps) {
  return (
    <div 
      className="card card-hover animate-slide-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className={`h-2 bg-gradient-to-r ${modeColors[mode.id]} rounded-t-xl`} />
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{modeIcons[mode.id]}</span>
            <div>
              <h3 className="text-xl font-bold text-slate-900">{mode.name}</h3>
              <span className="text-sm text-slate-500">{mode.modeNumber}</span>
            </div>
          </div>
          <span className="badge-primary">适合一人团队</span>
        </div>

        <p className="text-slate-600 mb-4 line-clamp-2">{mode.description}</p>

        <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>配置{mode.configTime}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>{mode.teamSize}</span>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          {mode.features.slice(0, 3).map((feature, idx) => (
            <div key={idx} className="flex items-center gap-2 text-sm text-slate-600">
              <Layers className="w-4 h-4 text-primary-500" />
              <span>{feature}</span>
            </div>
          ))}
        </div>

        <Link 
          href={`/mode/${mode.id}`}
          className="btn-primary w-full group"
        >
          查看详情
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}