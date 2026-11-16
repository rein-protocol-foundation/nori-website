# Nori — Design

本文为 2026-11-16 第二次整页重设计的当前依据，取代此前的自动缩远循环、持续工牌摆动、可见暂停按钮、重复示例脚注与绿色 Rein 章节规范。内容见 [content.md](content.md)。本轮授权本地网站实现、提交代码和创建 PR；不包含部署、域名切换或真实业务操作。

## 身份与视觉方向

Nori 是一个 super agent，以多个数字分身或下属 subagents 承担职责；不是互不相关的 peer agents，也不是五名真人员工。保留薄荷粉发色、猫耳、胶囊眼睛与耳机／天线识别特征。普通头像仅用头部，工牌使用已接受的独立半身照片与服装资产，不重复生成。

产品主体使用暖白、鼠尾草与深森林绿、大尺度无衬线正体、细分隔线及正常密度的应用界面。全站不使用斜体；强调通过字重与尺度完成。保留元胞身份，但减少重复卡片、装饰性流程箭头与营销脚注。正文始终可读，不依赖入场动画。

## Header 与 Hero

Header 保留 Nori 标识、章节平滑锚点和 GitHub 图标，不放 Discord CTA。Hero 主按钮 `Meet Nori` 链接 https://discord.gg/m8qnWv9XX ，次按钮 `See Nori at work` → `#work`；只有一个 Discord 目的地按钮。页尾保留社区与代码入口。

Hero 为全幅元胞场景，文字与按钮使用 HTML 叠加；不采用左右插画卡。滚动驱动四个小像素 Nori 汇聚并拼成一个大 Nori，表达一个身份的多个分身。拼装的位置与镜头是人为编排，不能称为 Conway 自然自组装；局部细胞状态使用真实 B3/S23 演化：死细胞三个活邻居出生，活细胞两个或三个邻居存活。状态、拼装与渲染适当分离。

不再要求 28 秒／8 倍自动递归循环，不宣称自然自复制或已实现 RSI。无可见暂停控件；主要运动由用户滚动控制。减少动态时采用可识别的静态组合，当前使用 Canvas 2D；Canvas 不可用时保留正文、链接及静态画面，不声称已验证低性能设备自动检测策略。离屏和页面隐藏停止不必要的推进。

## 工牌

五张均为 Nori：Chief Operating Officer、Chief People Officer、Chief Financial Officer、Community Lead、Software Engineer。完整职位自然换行；所有屏宽单行横排，窄屏区域内横向滚动。

透明卡套、黑色织带、独立金属扣、接触阴影与 CSS 3D 分层保留。有限的入场动作结束后静止，不无限自动摆动，不显示暂停按钮。拖拽、悬停、倾斜和绳索末端使用同一挂点与连续弹簧状态。支持指针捕获、触控、键盘方向键及 Escape 复位；焦点进入后显示操作说明。减少动态时不产生惯性回弹。该实现为 CSS 3D／弹簧模型，不声称刚体模拟。

## 直接展开的工作场景

核心场景不使用 Tab、折叠或自动轮播。保留应用真实宽高比、文字密度、工具栏、头像、时间与工件状态；可自然裁切非关键边缘，不把整套桌面压进小卡，不用厚软胶外框。各平台单独构图，不复用换 logo 的聊天壳。

- **Work**：Slack onboarding 展示工作区／aubergine 导航、频道与独立 thread pane；Lark 展示工具访问申请、负责人批准与后续验证；Google Docs／Calendar 展示董事会材料、议程、待决事项、负责人和期限。三个场景依次可见。
- **Finance**：iMessage 请求 → Stripe invoice draft → owner review → project ledger。`INV–014 / Workshop registration` 为四个 workshop places，每个 $60，总计 $240；Stripe 保留 Draft，Maya 的发送授权未取得，账本为 Awaiting review；不伪造支付成功、银行记录或真实交易。资金三层与其他金融服务是产品设计／planned workflows，不声称已验证 live payment。
- **Community / software**：Discord 反馈 → GitHub issue → PR、checks 与 maintainer review → 回报与 monitoring。Discord 使用 charcoal server rail、分类频道、主消息与 member rail；GitHub 使用 repo 导航、issue／PR timeline、checks、review 与 metadata sidebar。样例 issue #142 关联 PR #143，Alex 已审阅批准，四项 checks 通过且 PR 显示 Merged；这是样例的完成状态，不代表真实合并或发布。
- **Outreach**：X 原创帖与 reply 呈现不同动作；Reels 以竖屏 SVG 视频视觉呈现；Gmail 明确是 draft。不得把 SVG 预览称为已生成视频、把草稿称为已发送或把示例互动当真实背书。
- **Continuity**：展示可访问来源 → 有出处的回答及下一步，保留权限边界；不宣称所有渠道自动共享记忆。

只在页尾显示一次 `Product walkthroughs use sample data.`。删除每张界面重复的 illustrative／example caption；草稿、待审、planned 等有业务含义的状态继续保留。页面不用真实组织记录、证件、私密对话或运行记忆。

## Rein 独立品牌章节

Rein 仅在具名组织章节出现，不成为工牌雇主、通用示例工作区或页尾署名。采用官方标记 [rein-logo.png](../../public/brands/rein-logo.png)，从 https://rein-protocol.org/brand/rein-mark-footer.png 原样取得；192×192 PNG，不重绘。官方页同时使用 `/brand/rein-mark-header.png`；标志旁的 Rein Protocol／Foundation 有明确字级。

公开首页 https://www.rein-protocol.org 的实际 CSS（https://rein-protocol.org/_next/static/immutable/chunks/3p2itxezsoxq6.css ）给出以下参考值：paper `#f4ecdd`、paper-deep `#e9dac5`、paper-light `#fbf6ec`、ink `#1d140e`、ink-soft `#43342c`、ink-faint `#70635a`、line `#b8ac9d`、line-dark `#4d3f37`、accent `#ee4217`、accent-dark `#a8260a`、focus `#d12e00`。其 display 为 Newsreader，body 为 Manrope；这是观察到的网站实现，不是独立发布的 brand manual。Nori 全站正体约束继续适用，Rein 章节借用纸色、棕黑、橙红与官方 R，不复制斜体。

公开使命为使 AI agents 对人和社会安全，通过社区、开源项目与研究推进 transparency、observability、policy controls。可说明人设定边界、审阅重大决定并承担责任；不增加融资、合作、成果或规模声明。

## 原始 UI 参考

- Slack sidebar 组成：https://slack.com/help/articles/212596808-Adjust-your-sidebar-preferences
- Slack parent message 与 thread：https://slack.com/help/articles/115000769927-Use-threads-to-organize-discussions-
- Discord 官方 server／text／voice 结构：https://support.discord.com/hc/en-us/articles/360045138571-Beginner-s-Guide-to-Discord
- Discord community roles／channels：https://support.discord.com/hc/en-us/articles/11074987197975-Community-Onboarding-FAQ
- GitHub issue 右侧 assignees：https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/assigning-issues-and-pull-requests-to-other-github-users
- GitHub PR tabs／checks／review：https://docs.github.com/en/pull-requests/reference/pull-requests

以上为已查阅的官方结构依据。Lark、Google Docs／Calendar、iMessage、Stripe、X、Reels 与 Gmail 的本轮组合是产品演示设计，不代表这些集成已验证；不得把未查阅的产品指南写成已核实来源。

## 验证与边界

分别检查桌面和移动端视觉、完整滚动拼装、真实 Conway 状态、减少动态与Canvas 不可用降级、工牌入场结束与交互回弹、键盘焦点、文字对比、横向溢出和锚点。静态截图与构建不能替代运动／交互验证；报告实际运行的工程检查及未完成项。

公开代码不等于已获开源许可。Nori README https://github.com/rein-protocol-foundation/nori-agent 当前明确尚未选择许可证；页面使用 super agent、public code、built in the open，不声称已授予开源许可证。产品目标与已验证能力保持区分，不访问管理员 dashboard 证明公共演示。
