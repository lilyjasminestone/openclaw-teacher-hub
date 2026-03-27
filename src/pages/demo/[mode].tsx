import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Pause, RotateCcw, User, Bot, ChevronRight, Clock, CheckCircle } from 'lucide-react';
import Header from '../../components/Header';
import modesData from '../../data/modes.json';

const demoScripts: Record<string, Record<string, {
  title: string;
  description: string;
  steps: { role: 'user' | 'assistant'; content: string; delay?: number }[];
}>> = {
  'teacher-pipeline-agent': {
    'paper': {
      title: '社科论文流水线演示',
      description: '六阶段多模型协作，从文献综述到论文润色',
      steps: [
        { role: 'user', content: '开始论文写作' },
        { role: 'assistant', content: '🎓 欢迎使用社科论文流水线！\n\n我将协助您完成论文写作，流程包括：\n1️⃣ 文献综述（DeepSeek-V3）\n2️⃣ 理论框架（Claude-3.5）\n3️⃣ 研究设计（Kimi-K2.5）\n4️⃣ 数据分析（GPT-4o）\n5️⃣ 论文撰写（Claude-3.5）\n6️⃣ 完善润色（DeepSeek-V3）\n\n请告诉我您的论文主题？', delay: 1000 },
        { role: 'user', content: '在线开放课程对大学生学习效果的影响研究' },
        { role: 'assistant', content: '📚 **阶段1：文献综述**（DeepSeek-V3）\n\n正在检索相关文献...\n\n找到关键文献30篇，包括：\n• 陈丽等(2023)《在线学习投入度研究》\n• 王陆(2022)《MOOC学习效果影响因素分析》\n• 张伟等(2024)《开放课程质量评价体系》\n\n📋 文献综述框架已生成！是否继续？', delay: 2000 },
        { role: 'user', content: '继续' },
        { role: 'assistant', content: '🏗️ **阶段2：理论框架**（Claude-3.5）\n\n构建研究理论框架：\n\n**核心理论基础：**\n• 技术接受模型（TAM）\n• 自我决定理论（SDT）\n• 联通主义学习理论\n\n**研究模型：**\n自变量 → 中介变量 → 因变量\n\n理论框架图已生成！', delay: 2000 },
        { role: 'user', content: '继续' },
        { role: 'assistant', content: '📊 **阶段3：研究设计**（Kimi-K2.5）\n\n研究方案设计完成：\n\n**研究方法：** 混合研究方法\n- 量化：问卷调查（n=500）\n- 质性：深度访谈（n=20）\n\n**研究工具：**\n- 学习效果量表\n- 学习投入度量表\n- 半结构化访谈提纲', delay: 2000 },
        { role: 'user', content: '继续' },
        { role: 'assistant', content: '📈 **阶段4：数据分析**（GPT-4o）\n\n**量化分析结果：**\n• Cronbach α = 0.892 ✓\n• 结构方程模型拟合良好\n• 路径系数显著（p<0.001）\n\n**质性分析：**\n三级编码完成，提取3个主题', delay: 2500 },
        { role: 'user', content: '继续' },
        { role: 'assistant', content: '✍️ **阶段5：论文撰写**（Claude-3.5）\n\n**已完成章节：**\n✓ 摘要（中英文）\n✓ 第一章 绪论\n✓ 第二章 文献综述\n✓ 第三章 研究设计\n✓ 第四章 数据分析\n✓ 第五章 结论与建议\n\n论文初稿已完成（约15000字）', delay: 3000 },
        { role: 'user', content: '润色' },
        { role: 'assistant', content: '✨ **阶段6：完善润色**（DeepSeek-V3）\n\n✅ 格式标准化检查通过\n✅ 语言润色完成\n✅ 查重预检：12%（符合要求）\n\n🎉 **论文已完成！**\n\n总用时：约25分钟\n总字数：15,200字\n质量评估：优秀', delay: 2000 },
      ]
    },
    'wechat': {
      title: '微信文章发布流水线演示',
      description: '从工作日志到公众号文章的自动化流程',
      steps: [
        { role: 'user', content: '写成长日记' },
        { role: 'assistant', content: '📝 欢迎使用微信文章发布流水线！\n\n我将帮您将工作日志转化为公众号文章，流程包括：\n1️⃣ 素材整理（DeepSeek-V3）\n2️⃣ 标题优化（Claude-3.5）\n3️⃣ 正文撰写（Kimi-K2.5）\n4️⃣ 排版美化（GPT-4o）\n5️⃣ 发布推送（DeepSeek-V3）\n\n请提供今天的工作日志文件路径', delay: 1000 },
        { role: 'user', content: '/workspace/memory/2026-03-27.md' },
        { role: 'assistant', content: '📄 **阶段1：素材整理**（DeepSeek-V3）\n\n读取工作日志...\n\n今日工作内容：\n• 上午：完成多智能体协作网站重构\n• 下午：修复智能推荐逻辑\n• 晚上：添加对话演示功能\n\n关键收获：\n- 掌握了Next.js静态导出\n- 学会了Framer Motion动画\n- 理解了多智能体协作模式\n\n提炼出3个可分享的观点', delay: 1500 },
        { role: 'assistant', content: '🎯 **阶段2：标题优化**（Claude-3.5）\n\n基于内容生成10个标题：\n\n1. 从零到一：我如何用AI搭建多智能体协作平台\n2. 一天完成网站重构：教师的多智能体实践\n3. 对话演示上线！我的AI协作系统进化史\n4. 教师的一天：AI辅助完成5个复杂任务\n5. 打破信息差：多智能体协作模式全解析\n\n💡 推荐标题：**《一天完成网站重构：教师的多智能体实践日记》**', delay: 2000 },
        { role: 'user', content: '就用这个标题' },
        { role: 'assistant', content: '✍️ **阶段3：正文撰写**（Kimi-K2.5）\n\n文章结构生成：\n\n**开篇（痛点引入）**\n作为高校教师，每天要处理教学、科研、行政多项任务...\n\n**主体（3个故事）**\n1️⃣ 上午：重构网站的技术挑战\n2️⃣ 下午：修复推荐逻辑的思考\n3️⃣ 晚上：对话演示的惊喜\n\n**结尾（金句+行动号召）**\nAI不是替代，而是放大...\n\n正文约2000字，是否继续？', delay: 2500 },
        { role: 'user', content: '继续' },
        { role: 'assistant', content: '🎨 **阶段4：排版美化**（GPT-4o）\n\n排版完成：\n\n✅ 添加小标题和分段\n✅ 插入3张示意图（ASCII转图片）\n✅ 重点内容加粗标注\n✅ 添加 emoji 增强可读性\n✅ 生成封面图（900x500）\n\n📱 预览效果：\n- 手机端阅读体验良好\n- 段落间距适中\n- 重点突出', delay: 2000 },
        { role: 'assistant', content: '🚀 **阶段5：发布推送**（DeepSeek-V3）\n\n正在上传到微信公众号...\n\n✅ 封面图上传成功\n✅ 正文内容上传成功\n✅ 图片资源全部转存到微信CDN\n\n📋 草稿箱预览链接已生成\n\n🎉 **文章发布完成！**\n\n总用时：约10分钟\n字数：2,150字\n预计阅读量：500+', delay: 2000 },
      ]
    }
  },
  'teacher-file-blackboard': {
    'lesson': {
      title: '备课智能体团队演示',
      description: 'Master+4 Workers并行产出教案+PPT+习题+实验',
      steps: [
        { role: 'user', content: '单课备课' },
        { role: 'assistant', content: '📋 欢迎使用教师文件黑板！\n\n我是Master Agent，将协调4个Worker并行工作：\n• Worker 1：教案设计\n• Worker 2：PPT制作\n• Worker 3：习题设计\n• Worker 4：实验指导\n\n请提供：学科、主题、年级', delay: 1000 },
        { role: 'user', content: '工业机器人编程 - 第三章 机器人运动学 - 大二' },
        { role: 'assistant', content: '👤 **Master**：启动Workers...\n\n🚀 Worker 1 [教案设计] 启动\n🚀 Worker 2 [PPT制作] 启动\n🚀 Worker 3 [习题设计] 启动\n🚀 Worker 4 [实验指导] 启动\n\n⏱️ 预计：15-20分钟', delay: 1500 },
        { role: 'assistant', content: '👤 **Worker 1** → 教案完成\n\n📄 **教案设计**\n- 教学目标：理解运动学正逆解\n- 重难点：DH参数法、坐标变换\n- 课时：2理论+2实践', delay: 3000 },
        { role: 'assistant', content: '👤 **Worker 2** → PPT完成\n\n📊 **PPT（25页）**\n- 第1-5页：引入与概念\n- 第6-15页：DH参数法详解\n- 第16-25页：案例与总结\n\n包含3个动画演示', delay: 3200 },
        { role: 'assistant', content: '👤 **Worker 3** → 习题完成\n\n📝 **习题设计**\n- 选择题：5道\n- 填空题：3道\n- 计算题：2道\n- 思考题：1道\n\n附详细解答', delay: 3400 },
        { role: 'assistant', content: '👤 **Worker 4** → 实验指导完成\n\n🔬 **实验指导书**\n- 实验名称：机器人运动学仿真\n- 使用MATLAB Robotics Toolbox\n- 6步详细操作', delay: 3600 },
        { role: 'assistant', content: '👤 **Master**：整合完成！\n\n✅ **资源包完成**\n• 教案（1份）\n• PPT（25页）\n• 习题（11题）\n• 实验指导（1份）\n\n⏱️ 用时：18分钟\n👥 1 Master + 4 Workers', delay: 2000 },
        { role: 'assistant', content: '🔍 **Reviewer** 审核通过\n\n✓ 内容一致性\n✓ 难度匹配度\n✓ 格式规范性\n✓ 完整性检查\n✓ 逻辑连贯性\n\n🎉 **可直接使用！**', delay: 2500 },
      ]
    },
    'research': {
      title: '科研课题申报演示',
      description: '5个Workers并行准备申报材料',
      steps: [
        { role: 'user', content: '科研课题申报' },
        { role: 'assistant', content: '🔬 启动科研申报智能体团队！\n\n5个Workers并行准备：\n• Worker 1：文献研究\n• Worker 2：研究设计\n• Worker 3：数据分析方案\n• Worker 4：预算规划\n• Worker 5：申报书撰写\n\n请提供课题名称和类型', delay: 1000 },
        { role: 'user', content: '基于深度学习的工业机器人故障诊断研究 - 省级一般项目' },
        { role: 'assistant', content: '👤 **Master**：任务分解完成，启动所有Workers\n\n🚀 5个Workers并行启动\n⏱️ 预计：30-40分钟', delay: 1500 },
        { role: 'assistant', content: '👤 **Worker 1** → 文献研究完成\n\n📚 **国内外研究现状**\n- 检索文献：156篇\n- 核心文献：28篇\n- 研究缺口：深度学习在故障诊断中的应用不足\n- 创新点定位：多模态数据融合', delay: 3000 },
        { role: 'assistant', content: '👤 **Worker 2** → 研究设计完成\n\n🔬 **研究方案**\n- 研究目标：3个\n- 研究内容：5项\n- 技术路线：数据采集→预处理→模型训练→验证\n- 预期成果：论文3篇+专利1项', delay: 3500 },
        { role: 'assistant', content: '👤 **Worker 3** → 数据分析方案完成\n\n📊 **数据分析方法**\n- 数据采集：振动+声音+温度\n- 模型选择：CNN+LSTM\n- 验证方法：10折交叉验证\n- 评价指标：准确率、召回率、F1', delay: 3200 },
        { role: 'assistant', content: '👤 **Worker 4** → 预算规划完成\n\n💰 **经费预算**\n- 设备费：12万（传感器+服务器）\n- 材料费：3万（实验耗材）\n- 差旅费：2万（企业调研）\n- 劳务费：8万（研究生）\n- 合计：25万', delay: 3400 },
        { role: 'assistant', content: '👤 **Worker 5** → 申报书初稿完成\n\n📝 **申报书结构**\n- 一、立项依据（已完成）\n- 二、研究内容（已完成）\n- 三、研究方案（已完成）\n- 四、预期成果（已完成）\n- 五、研究基础（已完成）\n- 六、经费预算（已完成）\n\n共8000字', delay: 4000 },
        { role: 'assistant', content: '👤 **Master**：申报书整合完成！\n\n✅ **申报材料包**\n• 申报书（8000字）\n• 文献综述（3000字）\n• 技术路线图\n• 预算明细表\n• 研究团队介绍\n\n⏱️ 总用时：35分钟\n👥 1 Master + 5 Workers', delay: 2000 },
        { role: 'assistant', content: '🔍 **Reviewer** 质量审核\n\n✓ 创新性：省级项目定位准确\n✓ 可行性：技术路线清晰\n✓ 完整性：申报材料齐全\n✓ 规范性：格式符合要求\n✓ 逻辑性：论述严密\n\n🎉 **审核通过，可提交！**', delay: 2500 },
      ]
    }
  },
  'feishu-multi-group-single': {
    'personal': {
      title: '个人多角色助手演示',
      description: '1个Bot在4个群组自动切换角色',
      steps: [
        { role: 'assistant', content: '🤖 单机器人路由模式运行中...\n\n1个Bot服务4个群组，自动切换角色' },
        { role: 'user', content: '【教学群】@机器人 帮我设计课程导入', delay: 500 },
        { role: 'assistant', content: '🎓 **[教学助手模式]**\n\n好的！5分钟导入设计：\n1. 播放工业机器人视频（30秒）\n2. 提问：机器人如何知道自己在哪？\n3. 引出主题：运动学基础\n4. 明确学习目标' },
        { role: 'user', content: '【科研群】@机器人 润色这段话', delay: 500 },
        { role: 'assistant', content: '🔬 **[科研助手模式]**\n\n请提供需要润色的段落，我将：\n• 优化学术表达\n• 检查逻辑连贯性\n• 确保术语准确' },
        { role: 'user', content: '【行政群】@机器人 写会议通知', delay: 500 },
        { role: 'assistant', content: '📋 **[行政助手模式]**\n\n关于召开教研室工作例会的通知\n\n各教研室：\n定于3月28日（周四）下午2:30...\n\n请补充：会议主题、参会人员' },
        { role: 'user', content: '【生活群】@机器人 推荐徒步路线', delay: 500 },
        { role: 'assistant', content: '🌲 **[生活助手模式]**\n\n🏔️ **香山后山环线**\n- 距离：8公里\n- 难度：中等\n- 时长：4小时\n- 特色：人少景美\n\n🎒 准备：防滑鞋、2L水、防晒霜' },
        { role: 'assistant', content: '✨ **演示说明**\n\n同一个Bot，不同群组自动切换：\n- 教学群 → 教学专家\n- 科研群 → 学术助手\n- 行政群 → 行政秘书\n- 生活群 → 生活顾问' },
      ]
    },
    'classes': {
      title: '课程平行班管理演示',
      description: '1个Bot同时管理多个平行班级',
      steps: [
        { role: 'assistant', content: '🤖 课程平行班管理模式运行中...\n\n1个Bot管理3个平行班+1个统筹群' },
        { role: 'user', content: '【班级1群】@机器人 今天的作业是什么？', delay: 500 },
        { role: 'assistant', content: '📚 **[班级1助教模式]**\n\n今日作业（3月27日）：\n\n1. 复习第三章 机器人运动学\n2. 完成习题3.1、3.3、3.5\n3. 预习第四章 动力学基础\n\n⏰ 截止时间：下周一上课前\n\n有问题随时@我！' },
        { role: 'user', content: '【班级2群】@机器人 这道题怎么做？', delay: 500 },
        { role: 'assistant', content: '📚 **[班级2助教模式]**\n\n收到问题！让我看看...\n\n这道题考查DH参数法的应用。\n\n**解题思路：**\n1. 确定连杆坐标系\n2. 列出DH参数表\n3. 建立变换矩阵\n4. 计算末端位姿\n\n💡 **提示：** 注意第3个关节是旋转关节还是移动关节！\n\n需要详细解答吗？' },
        { role: 'user', content: '【班级3群】@机器人 实验报告什么时候交？', delay: 500 },
        { role: 'assistant', content: '📚 **[班级3助教模式]**\n\n实验报告提交时间：\n\n📅 **第三章实验报告**\n- 提交截止：4月5日（周五）\n- 提交方式：学习通平台\n- 格式要求：PDF，命名"学号_姓名_实验3"\n\n📋 **报告内容：**\n1. 实验目的\n2. 实验原理\n3. 实验步骤\n4. 结果分析\n5. 心得体会\n\n不要抄袭哦！' },
        { role: 'user', content: '【统筹群】@机器人 三个班的进度如何？', delay: 500 },
        { role: 'assistant', content: '📊 **[课程统筹模式]**\n\n**三个班级进度汇总：**\n\n📈 **教学进度：**\n- 班级1：第三章 3.3节（正常）\n- 班级2：第三章 3.2节（稍慢）\n- 班级3：第三章 3.4节（超前）\n\n📋 **作业提交率：**\n- 班级1：95%（优秀）\n- 班级2：88%（良好）\n- 班级3：92%（优秀）\n\n⚠️ **注意事项：**\n班级2需要关注后进生，建议安排答疑', delay: 1000 },
        { role: 'assistant', content: '✨ **演示说明**\n\n1个Bot同时管理：\n- 3个班级群（独立答疑、布置作业）\n- 1个统筹群（整体进度把控）\n\n自动识别班级，独立维护上下文！' },
      ]
    }
  },
  'feishu-multi-group-team': {
    'course': {
      title: '课程建设项目演示',
      description: '4个独立Bot协作完成课程建设',
      steps: [
        { role: 'assistant', content: '🚀 多群组团队模式启动\n\n4个独立Bot，4个独立群组\n每个Bot有独立身份和权限' },
        { role: 'user', content: '【Manager群】启动第三章内容开发', delay: 500 },
        { role: 'assistant', content: '👨‍💼 **[Manager Bot]**\n\n收到！启动第三章《运动学基础》开发。\n\n📋 任务分解：\n• @Unit1 负责3.1-3.2节\n• @Unit2 负责3.3-3.4节\n• @Quality 准备质量检查\n\n⏰ 截止时间：本周五' },
        { role: 'user', content: '【Unit1群】收到，开始3.1-3.2节', delay: 800 },
        { role: 'assistant', content: '🔧 **[Unit1 Bot]**\n\n收到，开始开发：\n\n3.1 机器人运动学概述\n3.2 DH参数法\n\n✓ 脚本大纲完成\n✓ 关键概念梳理\n⏳ 预计明天完成初稿' },
        { role: 'user', content: '【Unit2群】收到，开始3.3-3.4节', delay: 800 },
        { role: 'assistant', content: '⚙️ **[Unit2 Bot]**\n\n收到，开始开发：\n\n3.3 坐标变换\n3.4 逆运动学求解\n\n✓ 案例素材收集\n✓ 计算示例编写\n⏳ 动画制作中' },
        { role: 'user', content: '【Quality群】收到，准备质量检查', delay: 800 },
        { role: 'assistant', content: '✅ **[Quality Bot]**\n\n收到，准备质量检查：\n\n📋 检查清单：\n□ 内容准确性\n□ 逻辑连贯性\n□ 格式规范性\n□ 难度适宜性\n□ 图文匹配度' },
        { role: 'user', content: '【Manager群】汇报进度', delay: 1000 },
        { role: 'assistant', content: '👨‍💼 **[Manager Bot]**\n\n📊 第三章进度汇报：\n\n✅ Unit1：进度60%，按计划推进\n✅ Unit2：进度55%，动画制作中\n✅ Quality：待审核\n\n📈 整体进度：57.5%\n🎯 风险：无\n📅 预计按时完成' },
      ]
    },
    'competition': {
      title: '教学比赛2026演示',
      description: '7个Bot协作准备教学能力比赛',
      steps: [
        { role: 'assistant', content: '🏆 教学比赛智能体团队启动！\n\n7个独立Bot，7个专业角色：\n• 统筹Bot：整体协调\n• 资料Bot：收集整理\n• 设计Bot：教学设计\n• PPTBot：课件制作\n• 答辩Bot：答辩准备\n• 模拟Bot：模拟演练\n• 审核Bot：质量把关' },
        { role: 'user', content: '【统筹群】启动教学比赛备赛', delay: 500 },
        { role: 'assistant', content: '👨‍💼 **[统筹Bot]**\n\n收到！启动教学能力比赛备赛。\n\n📋 比赛要求分析：\n• 教学设计（20分）\n• 课堂教学（40分）\n• 教学反思（20分）\n• 现场答辩（20分）\n\n⏰ 比赛日期：6月15日\n📅 倒计时：80天\n\n各位Bot开始工作！', delay: 1000 },
        { role: 'user', content: '【资料群】已收集近3年获奖作品', delay: 800 },
        { role: 'assistant', content: '📚 **[资料Bot]**\n\n资料收集完成！\n\n**获奖作品分析：**\n- 国赛一等奖：12份\n- 省赛一等奖：35份\n- 共性特点提炼：\n  1. 教学目标明确可测\n  2. 课程思政融入自然\n  3. 信息化手段丰富\n  4. 教学反思深刻\n\n📁 资料库已建立，供各Bot参考' },
        { role: 'user', content: '【设计群】教学设计初稿完成', delay: 1000 },
        { role: 'assistant', content: '✏️ **[设计Bot]**\n\n教学设计完成！\n\n**设计亮点：**\n• 教学目标：知识+能力+素养三维目标\n• 教学策略：BOPPPS模型+翻转课堂\n• 课程思政：工匠精神融入\n• 评价方式：过程性+终结性结合\n\n📄 已提交审核Bot检查' },
        { role: 'user', content: '【PPT群】课件制作进度50%', delay: 1000 },
        { role: 'assistant', content: '🎨 **[PPTBot]**\n\n课件制作中...\n\n**已完成：**\n• 封面设计（课程特色突出）\n• 内容页40页（含动画）\n• 课程思政页5页\n• 互动环节设计8处\n\n**待完成：**\n• 结尾总结页\n• 参考文献页\n• 整体美化\n\n预计3天后完成' },
        { role: 'user', content: '【答辩群】已准备10个可能问题', delay: 800 },
        { role: 'assistant', content: '🎯 **[答辩Bot]**\n\n答辩准备中！\n\n**高频问题准备：**\n1. 本课程的创新点是什么？\n2. 如何实现课程思政？\n3. 如何评价学生学习效果？\n4. 信息化手段如何支撑教学？\n5. 如何持续改进教学？\n...\n\n💡 **答辩策略：**\n- 突出特色\n- 数据支撑\n- 案例生动\n- 态度自信' },
        { role: 'user', content: '【模拟群】本周五进行模拟演练', delay: 800 },
        { role: 'assistant', content: '🎭 **[模拟Bot]**\n\n模拟演练安排：\n\n**时间：** 本周五 下午2:00\n**地点：** 教学楼A301\n**流程：**\n1. 20分钟课堂教学展示\n2. 5分钟教学反思\n3. 10分钟现场答辩\n4. 15分钟专家点评\n\n👥 **评审团：**\n- 教学督导2人\n- 往届获奖教师2人\n- 校外专家1人\n\n请各位做好准备！' },
        { role: 'user', content: '【审核群】已完成质量检查', delay: 1000 },
        { role: 'assistant', content: '✅ **[审核Bot]**\n\n质量检查完成！\n\n**检查结果：**\n✓ 教学设计：优秀\n✓ 课件制作：优秀\n✓ 答辩准备：良好（需加强数据支撑）\n✓ 模拟演练：待进行\n\n⚠️ **改进建议：**\n1. 补充学生学习效果数据\n2. 优化PPT配色方案\n3. 准备应急预案\n\n🎯 预计可获得省赛一等奖，冲击国赛！' },
        { role: 'user', content: '【统筹群】整体进度汇报', delay: 1000 },
        { role: 'assistant', content: '👨‍💼 **[统筹Bot]**\n\n📊 教学比赛备赛进度：\n\n✅ 资料收集：100%\n✅ 教学设计：100%\n🔄 课件制作：70%\n✅ 答辩准备：90%\n⏳ 模拟演练：待进行\n🔄 持续优化：进行中\n\n📈 **整体进度：82%**\n🎯 **目标：冲击国赛一等奖**\n⏰ **剩余时间：80天**\n\n各位Bot继续加油！' },
      ]
    }
  },
  'feishu-topic-team': {
    'talent': {
      title: '人才培养方案制定演示',
      description: '6个话题AI从不同角度评估',
      steps: [
        { role: 'assistant', content: '💬 话题团队模式启动\n\n1个群组，6个话题，6个AI专家\n多方协商制定培养方案' },
        { role: 'user', content: '【主群】制定人工智能专业培养方案', delay: 500 },
        { role: 'assistant', content: '🎯 **方案汇总Bot**\n\n启动人才培养方案制定！\n\n邀请话题AI：\n• 企业视角\n• 行业专家\n• 学校视角\n• 教师视角\n• 学生视角\n• 方案汇总' },
        { role: 'user', content: '【企业视角】评估', delay: 800 },
        { role: 'assistant', content: '🏢 **[企业视角AI]**\n\n从企业用人需求评估：\n\n✅ 优势：\n- Python、TensorFlow技能匹配\n- 项目实践环节充分\n\n⚠️ 建议：\n- 增加大模型应用课程\n- 强化工程化部署能力' },
        { role: 'user', content: '【行业专家】评估', delay: 800 },
        { role: 'assistant', content: '🔮 **[行业专家AI]**\n\n从前沿技术趋势评估：\n\n✅ 优势：\n- 基础理论扎实\n- 机器学习覆盖全面\n\n⚠️ 建议：\n- 增加AIGC相关内容\n- 补充多模态技术' },
        { role: 'user', content: '【学生视角】评估', delay: 800 },
        { role: 'assistant', content: '👨‍🎓 **[学生视角AI]**\n\n从学习体验评估：\n\n✅ 优势：\n- 实践课程比例高\n- 毕业设计灵活\n\n⚠️ 建议：\n- 减少理论课时长\n- 增加选修课多样性' },
        { role: 'user', content: '【方案汇总】整合意见', delay: 1000 },
        { role: 'assistant', content: '📋 **[方案汇总AI]**\n\n综合各方意见：\n\n**采纳建议：**\n✓ 增加大模型应用课程\n✓ 强化工程化部署\n✓ 补充AIGC内容\n✓ 增加选修课\n\n🎉 **方案V2.0完成！**' },
      ]
    },
    'textbook': {
      title: '教材编写团队演示',
      description: '6个话题AI分工协作编写教材',
      steps: [
        { role: 'assistant', content: '📚 教材编写话题团队启动！\n\n1个群组，6个话题，6个编写专家：\n• 主编视角：整体统筹\n• 理论专家：理论章节\n• 案例专家：实践案例\n• 图表专家：图表制作\n• 习题专家：课后习题\n• 审核汇总：质量把关' },
        { role: 'user', content: '【主编视角】启动第二章编写', delay: 500 },
        { role: 'assistant', content: '👨‍💼 **[主编视角AI]**\n\n收到！启动第二章《工业机器人运动学》编写。\n\n📋 任务分配：\n• @理论专家 负责2.1-2.2节（基础理论）\n• @案例专家 负责2.3节（工程案例）\n• @图表专家 负责所有插图和坐标系图\n• @习题专家 负责课后习题和答案\n\n⏰ 初稿截止：2周后\n📄 字数要求：15000字' },
        { role: 'user', content: '【理论专家】2.1-2.2节初稿完成', delay: 1000 },
        { role: 'assistant', content: '🔬 **[理论专家AI]**\n\n理论章节初稿完成！\n\n**2.1 机器人运动学基础**\n- 位姿描述（5000字）\n- 坐标变换（6000字）\n\n**2.2 DH参数法**\n- 方法原理（4000字）\n- 应用步骤（3000字）\n\n📎 附：5个推导过程详细步骤' },
        { role: 'user', content: '【案例专家】2.3节案例收集完成', delay: 1000 },
        { role: 'assistant', content: '💼 **[案例专家AI]**\n\n工程案例章节完成！\n\n**案例1：ABB机器人运动学建模**\n- 企业背景介绍\n- 实际问题描述\n- 建模过程详解\n- 结果验证分析\n\n**案例2：KUKA机器人轨迹规划**\n- 焊接应用场景\n- 轨迹优化方法\n- 实际效果对比\n\n📷 附：现场照片10张' },
        { role: 'user', content: '【图表专家】所有插图绘制完成', delay: 1000 },
        { role: 'assistant', content: '🎨 **[图表专家AI]**\n\n图表制作完成！\n\n**插图清单：**\n• 图2-1：机器人坐标系示意图\n• 图2-2：DH参数定义图\n• 图2-3：坐标变换流程图\n• 图2-4：ABB机器人结构图\n• 图2-5：KUKA工作场景图\n• 图2-6：运动学求解算法流程图\n\n📐 全部使用Visio绘制，清晰度满足印刷要求' },
        { role: 'user', content: '【习题专家】课后习题编制完成', delay: 1000 },
        { role: 'assistant', content: '📝 **[习题专家AI]**\n\n课后习题编制完成！\n\n**习题结构：**\n• 基础题：10道（概念理解）\n• 提高题：8道（计算应用）\n• 拓展题：5道（综合设计）\n• 编程题：2道（MATLAB实现）\n\n📋 附：详细解答和评分标准\n💡 提供解题思路提示' },
        { role: 'user', content: '【审核汇总】完成质量检查', delay: 1000 },
        { role: 'assistant', content: '✅ **[审核汇总AI]**\n\n第二章质量检查完成！\n\n**检查结果：**\n✓ 理论章节：逻辑严密，推导正确\n✓ 案例章节：贴近实际，具有代表性\n✓ 图表质量：清晰规范，标注完整\n✓ 习题设计：层次分明，难度递进\n\n⚠️ 修改建议：\n1. 案例2补充数据表格\n2. 图2-3调整颜色对比度\n3. 习题3增加提示信息\n\n🎉 **第二章初稿完成！**' },
        { role: 'user', content: '【主编视角】整体进度汇报', delay: 1000 },
        { role: 'assistant', content: '👨‍💼 **[主编视角AI]**\n\n📊 教材编写进度汇报：\n\n✅ 第一章 绪论：已完成\n✅ 第二章 运动学：已完成\n🔄 第三章 动力学：编写中（50%）\n⏳ 第四章 控制：待启动\n⏳ 第五章 应用：待启动\n\n📈 **整体进度：45%**\n📅 **预计完成时间：3个月后**\n📄 **总字数预估：8万字**\n\n各位话题AI继续加油！' },
      ]
    }
  }
};

const getDefaultDemo = (modeId: string): string => {
  const defaults: Record<string, string> = {
    'teacher-pipeline-agent': 'paper',
    'teacher-file-blackboard': 'lesson',
    'feishu-multi-group-single': 'personal',
    'feishu-multi-group-team': 'course',
    'feishu-topic-team': 'talent'
  };
  return defaults[modeId] || Object.keys(demoScripts[modeId] || {})[0];
};

export default function Demo() {
  const router = useRouter();
  const { mode: modeId, case: caseId } = router.query;
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showComplete, setShowComplete] = useState(false);

  const mode = modeId && typeof modeId === 'string' ? modesData.modes.find(m => m.id === modeId) : null;
  
  const selectedCase = caseId && typeof caseId === 'string' 
    ? caseId 
    : (modeId && typeof modeId === 'string' ? getDefaultDemo(modeId) : '');
  
  const demo = modeId && typeof modeId === 'string' 
    ? demoScripts[modeId]?.[selectedCase] 
    : null;

  const availableDemos = modeId && typeof modeId === 'string' 
    ? Object.keys(demoScripts[modeId] || {}) 
    : [];

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

  const handlePause = () => setIsPlaying(false);
  
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
            {Object.keys(demoScripts).flatMap(modeKey => 
              Object.keys(demoScripts[modeKey]).map(caseKey => {
                const m = modesData.modes.find(m => m.id === modeKey);
                const d = demoScripts[modeKey][caseKey];
                return (
                  <Link
                    key={`${modeKey}-${caseKey}`}
                    href={`/demo/${modeKey}?case=${caseKey}`}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow text-left"
                  >
                    <span className="text-xs text-primary-600 font-medium">{m?.name}</span>
                    <h3 className="font-bold text-slate-900 mt-1">{d.title}</h3>
                    <p className="text-sm text-slate-600 mt-1">{d.description}</p>
                  </Link>
                );
              })
            )}
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
          <Link href={`/mode/${mode.id}`} className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-4">
            <ArrowLeft className="w-4 h-4" />
            返回模式详情
          </Link>
          <h1 className="text-2xl font-bold text-white">{demo.title}</h1>
          <p className="text-white/80 mt-1">{demo.description}</p>
          
          {availableDemos.length > 1 && (
            <div className="flex gap-2 mt-4">
              {availableDemos.map((c) => (
                <Link
                  key={c}
                  href={`/demo/${mode.id}?case=${c}`}
                  className={`px-3 py-1 rounded-full text-sm ${
                    c === selectedCase 
                      ? 'bg-white text-primary-600' 
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  {demoScripts[mode.id]?.[c]?.title.split('演示')[0]}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {!isPlaying ? (
                <button onClick={handlePlay} className="flex items-center gap-2 px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                  <Play className="w-4 h-4" />
                  {currentStep > 0 ? '继续' : '开始演示'}
                </button>
              ) : (
                <button onClick={handlePause} className="flex items-center gap-2 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
                  <Pause className="w-4 h-4" />
                  暂停
                </button>
              )}
              <button onClick={handleReset} className="flex items-center gap-2 px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg">
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
              <div className="h-full bg-primary-500 transition-all duration-300" style={{ width: `${((currentStep + 1) / demo.steps.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-sm min-h-[500px]">
          <div className="p-6 space-y-4">
            {demo.steps.slice(0, currentStep + 1).map((step, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-4 ${step.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${step.role === 'user' ? 'bg-primary-100 text-primary-600' : 'bg-green-100 text-green-600'}`}>
                  {step.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`max-w-[80%] ${step.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block px-4 py-3 rounded-2xl whitespace-pre-wrap text-left ${step.role === 'user' ? 'bg-primary-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-800 rounded-tl-none'}`}>
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
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-8 bg-green-50 rounded-2xl p-8 text-center border border-green-200">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-900 mb-2">演示完成！</h3>
              <p className="text-green-700 mb-6">这就是 {mode.name} 的典型工作流程</p>
              <div className="flex items-center justify-center gap-4">
                <button onClick={handleReset} className="px-6 py-2 border border-green-300 text-green-700 rounded-lg hover:bg-green-100">重新观看</button>
                <Link href={`/guide?mode=${mode.id}`} className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  开始使用<ChevronRight className="w-4 h-4 inline ml-1" />
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-8 flex items-center justify-center gap-2">
          {demo.steps.map((_, idx) => (
            <button key={idx} onClick={() => { setCurrentStep(idx); setIsPlaying(false); }} className={`w-3 h-3 rounded-full transition-colors ${idx <= currentStep ? 'bg-primary-500' : 'bg-slate-200'}`} />
          ))}
        </div>
      </div>
    </div>
  );
}
