# Nori — Design

本文为 2026-11-16 整页重设计及后续 UI／Hero 修订的当前依据。Hero 按最新确认采用持续缩远的元胞递归循环；工牌保留有限入场，不恢复持续摆动、可见暂停按钮或重复示例脚注。内容见 [content.md](content.md)。本轮为本地网站实现与验证；不包含部署、域名切换或真实业务操作。

## 身份与视觉方向

Nori 是一个 super agent，以多个数字分身或下属 subagents 承担职责；不是互不相关的 peer agents，也不是五名真人员工。保留薄荷粉发色、猫耳、胶囊眼睛与耳机／天线识别特征。普通头像仅用头部，工牌使用已接受的独立半身照片与服装资产，不重复生成。

产品主体使用暖白、鼠尾草与深森林绿、大尺度无衬线正体、细分隔线及正常密度的应用界面。全站不使用斜体；强调通过字重与尺度完成。保留元胞身份，但减少重复卡片、装饰性流程箭头与营销脚注。正文始终可读，不依赖入场动画。

## Header 与 Hero

Hero 标题保留 `Your mission. Nori’s work.`，字距使用 -0.045em、行高 1.06；`Nori` 与所有格 `’s` 分别控制字距，并为撇号保留 0.025em 左间距，避免大字号下 i、撇号与 s 粘连。所有格与品牌名保持同字号、同基线，不做上标或缩小。

Header 保留 Nori 标识、章节平滑锚点和 GitHub 图标，不放 Discord CTA。页面顶部保留浮动胶囊；滚动达到 64px 后收为 桌面 56px／手机 54px 高、top: 0 的通栏导航，去掉气泡圆角和外侧留白。回到顶部恢复；手机菜单、键盘焦点与减少动态继续有效。Hero 保留全页唯一的 `Meet Nori on Discord` 入口（https://discord.gg/m8qnWv9XX），与 `See Nori at work` 使用相同宽度、56px 最小高度、8px 圆角和至少14px字号。社区归属移到按钮下方，以14px文字说明 Rein Protocol Foundation community。Rein 章节链接其官网；结尾使用同尺寸的 Explore GitHub 与 Contact us（nori-contact@rein-protocol.org）。Footer 不重复 Discord 入口，社交账号继续隐藏。

Hero 为全幅元胞场景，文字与按钮使用 HTML 叠加；不采用左右插画卡。镜头自动持续拉远，小 Nori 逐渐显现为更大 Nori 的元胞，再进入下一层相同构图。每层使用 32×32 身份网格，20 秒完成 32 倍缩远，以递归固定点衔接下一层；不跳回首帧、不倒放、不等待用户滚动。页面正常滚动，Hero 不再占据额外的滚动拼装距离。手机将画面放在正文上方。

身份轮廓与镜头递归为人为编排，局部细胞使用独立的真实 B3/S23 演化：死细胞三个活邻居出生，活细胞两个或三个邻居存活。细胞每秒推进五代，保留较淡的身份底纹，避免演化后完全失去 Nori 的辨识度；不宣称 Conway 自然生成头像、自然自复制或已实现 RSI。使用 Canvas 2D 与分层细节绘制。无可见暂停控件；系统减少动态时采用静态头像，Canvas 不可用时保留正文、链接及静态画面。离屏和页面隐藏时冻结镜头与细胞状态，返回后从原处继续，不补播隐藏期间的时间。不声称已验证低性能设备自动检测策略。

## 工牌

五张均为 Nori：Chief Operating Officer、Chief People Officer、Chief Financial Officer、Community Lead、Software Engineer。完整职位自然换行；所有屏宽单行横排，窄屏区域内横向滚动。

透明卡套、黑色织带、独立金属扣、接触阴影与 CSS 3D 分层保留。有限的入场动作结束后静止，不无限自动摆动，不显示暂停按钮。拖拽、悬停、倾斜和绳索末端使用同一挂点与连续弹簧状态。支持指针捕获、触控、键盘方向键及 Escape 复位；焦点进入后显示操作说明。减少动态时不产生惯性回弹。该实现为 CSS 3D／弹簧模型，不声称刚体模拟。

## 直接展开的工作场景

核心场景不使用 Tab、折叠或自动轮播。1:1 至 16:9 的宽高比限制仅适用于完整 desktop／browser 应用，优先接近方形或 4:3／16:10。完整 mobile 应用按对应手机屏幕比例；iMessage 使用 iPhone 17 Pro 的 1206:2622（402:874）竖屏，保留状态栏、Dynamic Island、联系人与底部输入栏。窄长容器仅用于明确标注的对话／工件局部，不缩放或拉伸整套软件。保留平台的系统字体、文字密度、关键工具栏、导航层级、头像、时间与工件状态。手机端隐藏不在裁切区域内的导航，显示局部说明并保留正文可读；不把整套桌面压进小卡，不用厚软胶外框。各平台单独构图，不复用换 logo 的聊天壳。

- **Work**：Slack onboarding 展示工作区／aubergine 导航、频道与独立 thread pane；Lark 使用 Messenger 应用栏、Filter、Chats、联系人标题与 Chat／Files，申请卡嵌入对话并保留待批准及后续验证状态；Google Docs 保留文件菜单、格式工具栏、标尺、document tabs、白色文档页与页外评论，以日历 smart chip 展示 review 时间。正文是董事会材料、议程、待决事项、负责人和期限。三个场景依次可见。
- **Finance**：iMessage 请求 → Stripe invoice draft → owner review → project ledger。`INV–014 / Workshop registration` 为四个 workshop places，每个 $60，总计 $240；Stripe 保留 Draft，Maya 的发送授权未取得，账本为 Awaiting review；不伪造支付成功、银行记录或真实交易。iMessage 使用完整 iPhone 17 Pro 屏幕比例（联系人、蓝灰气泡与尾巴、时间／已读、输入栏），不套进横向桌面窗口；Stripe 保留账户侧栏、搜索、Billing／Invoices、草稿操作、明细与总额。金融区通过三个具体工件展示：300 USDC 贡献者津贴的 Safe 提案（待 2/3 签名）、$600 场地预算下的 $480 ACH 付款审核（拟支出后预算余量 $120）、四个 $60 名额的 Stripe／PayPal 报名对账。采用有叙事的横排案例与不同工件，替代抽象基础设施列表；一处 Planned workflows 覆盖未来能力，具体 draft／review 状态保留，不声称已接通或已验证 live payment。
- **Community / software**：Discord 反馈 → GitHub issue → PR、checks 与 maintainer review → 回报与 monitoring。Discord 使用 charcoal server rail、分类频道、主消息与 member rail；GitHub 使用浅灰全局栏、组织／仓库 breadcrumb、搜索、repo 导航、PR 标题／分支、计数标签、带头像沟槽的 timeline、checks、review 与 metadata sidebar；站点自己的 Develop／Accept／Report／Monitor 说明放在软件框外。样例 issue #142 关联 PR #143，Alex 已审阅批准，四项 checks 通过且 PR 显示 Merged；这是样例的完成状态，不代表真实合并或发布。
- **Outreach**：X 使用侧栏、Post 标题、作者／handle、原帖／reply 结构和原生操作图标；Instagram 桌面 Reels 保留侧栏及动作栏，在正常比例软件窗口中居中放置完成度高的 9:16 活动创意；Gmail 保留品牌、搜索、文件夹、收件箱与底部停靠 compose 窗口、收件人／主题／附件和 Draft saved。三个场景依次展开，不再并排挤进狭长卡片。去除 SVG preview、demo、concept 等制作过程标识，不将技术实现暴露给访客。Gmail 正文缩减为两段，保证完整 compose 内容、附件、操作栏同时可见，无内部 scroller。不得把页面创意称为已发布视频、把草稿称为已发送或把示例互动当真实背书。
- **Continuity**：从「What should we send our supporters next?」进入 Google Docs 决定、Slack 交接、日历期限三个来源，以 01／02／03 引用对应回答，交付 Sam 的 briefing。12 秒流程动画顺序强调来源、传递到 Nori、引用与下一步；文本始终可读，离屏／隐藏暂停，减少动态完整静态展示。不宣称所有渠道自动共享记忆。

只在页尾显示一次 `Product walkthroughs use sample data.`。删除每张界面重复的 illustrative／example caption；草稿、待审、planned 等有业务含义的状态继续保留。页面不用真实组织记录、证件、私密对话或运行记忆。

## Rein 独立品牌章节

Rein 仅在具名组织章节出现，不成为工牌雇主、通用示例工作区或页尾署名。采用官方标记 [rein-logo.png](../../public/brands/rein-logo.png)，从 https://rein-protocol.org/brand/rein-mark-footer.png 原样取得；192×192 PNG，不重绘。官方页同时使用 `/brand/rein-mark-header.png`；标志旁的 Rein Protocol／Foundation 有明确字级。

公开首页 https://www.rein-protocol.org 的实际 CSS（https://rein-protocol.org/_next/static/immutable/chunks/3p2itxezsoxq6.css ）给出以下参考值：paper `#f4ecdd`、paper-deep `#e9dac5`、paper-light `#fbf6ec`、ink `#1d140e`、ink-soft `#43342c`、ink-faint `#70635a`、line `#b8ac9d`、line-dark `#4d3f37`、accent `#ee4217`、accent-dark `#a8260a`、focus `#d12e00`。其 display 为 Newsreader，body 为 Manrope；这是观察到的网站实现，不是独立发布的 brand manual。Nori 全站正体约束继续适用，Rein 章节借用纸色、棕黑、橙红与官方 R，不复制斜体。

本轮按用户要求原样复用官网建筑拼贴 [rein-stanford.webp](../../public/brands/rein-stanford.webp)，来源 https://rein-protocol.org/_next/static/immutable/media/stanford.10fq65dahi31b.webp 。图片直接铺入右侧版面，无卡片外框；手机以建筑主体裁切呈现。删除旧右侧原则卡片、重复使命小字与底部分类行。官网标注的来源为 Hoover Tower — © BrokenSphere, CC BY-SA，原图 https://commons.wikimedia.org/wiki/File:Hoover_Tower_west_face.JPG ；页尾可展开 Image credits 保留归属。

公开使命为使 AI agents 对人和社会安全，通过社区、开源项目与研究推进 transparency、observability、policy controls。可说明人设定边界、审阅重大决定并承担责任；不增加融资、合作、成果或规模声明。

金融主场景桌面端的 Owner review 与 Project ledger 在两列底部对齐，采用一致标题与记录间距；头像字母保持居中，状态正文不影响头像布局。后续案例入口减少重复留白，手机继续按请求、草稿、审核、账本顺序展示。

## 原始 UI 参考

- Slack sidebar 组成：https://slack.com/help/articles/212596808-Adjust-your-sidebar-preferences
- Slack parent message 与 thread：https://slack.com/help/articles/115000769927-Use-threads-to-organize-discussions-
- Discord 官方 server／text／voice 结构：https://support.discord.com/hc/en-us/articles/360045138571-Beginner-s-Guide-to-Discord
- Discord community roles／channels：https://support.discord.com/hc/en-us/articles/11074987197975-Community-Onboarding-FAQ
- GitHub issue 右侧 assignees：https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/assigning-issues-and-pull-requests-to-other-github-users
- GitHub PR tabs／checks／review：https://docs.github.com/en/pull-requests/reference/pull-requests

- 本轮用户提供的 Lark Messenger、Google Docs、iMessage、Stripe Balances 与 GitHub PR 截图：只参考界面结构、比例、颜色及控件；不把截图里的私人对话、组织信息、文档内容或头像写入公共素材。
- Gmail compose／自动保存草稿：https://support.google.com/mail/answer/9259768?hl=en
- X 原帖、reply 与 mentions：https://help.x.com/en/using-x/types-of-posts
- Instagram Reels 官方公开视觉参考：https://about.fb.com/news/2022/07/new-ways-to-create-instagram-reels-remix/ （历史公开参考，不声称为当前所有账号的统一版本）。

iPhone 17 Pro 屏幕规格来源：https://support.apple.com/en-us/125090 （2622×1206 pixels，显示比例按屏幕矩形计算）。

应用演示使用 HTML/CSS/SVG 重建可辨认的原生界面，并替换为 sample data；不是直接截取的真实业务操作，也不代表这些集成已验证。

## 验证与边界

分别检查桌面和移动端视觉、无滚动时的完整自动循环与接缝像素、递归固定点、真实 Conway 状态、离屏／隐藏冻结与恢复、减少动态与 Canvas 不可用降级、工牌入场结束与交互回弹、键盘焦点、文字对比、横向溢出和锚点。静态截图与构建不能替代运动／交互验证；报告实际运行的工程检查及未完成项。

公开代码不等于已获开源许可。Nori README https://github.com/rein-protocol-foundation/nori-agent 当前明确尚未选择许可证；页面使用 super agent、public code、built in the open，不声称已授予开源许可证。产品目标与已验证能力保持区分，不访问管理员 dashboard 证明公共演示。
