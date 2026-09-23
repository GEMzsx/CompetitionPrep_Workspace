# 全国大学生数学竞赛（非数学类）复习工作区

- **初赛**：2026 年 11 月 14 日（周六）9:00–11:30，共 2.5 小时，满分 100 分（部分赛区 150 分制），内容为高等数学
- **决赛**：预计 2027 年 4 月（...）

## 专题进度

| # | 专题 | 状态 |
|---|------|------|
| 01 | 函数极限与连续 | ✅ 闭环（框架 + 例题/挑战实录归档） |
| 02 | 一元微分学（中值定理、导数应用） | ✅ 框架 + 例题精讲（题型全覆盖） |
| 03 | 一元积分学（不定积分、定积分、反常积分） | ⬜ 未开始 |
| 04 | 向量与空间解析几何 | ⬜ 未开始 |
| 05 | 多元微分学 | ⬜ 未开始 |
| 06 | 重积分 | ⬜ 未开始 |
| 07 | 曲线曲面积分 | ⬜ 未开始 |
| 08 | 无穷级数 | ⬜ 未开始 |
| 09 | 常微分方程 | ⬜ 未开始 |

## 每个专题的文件约定

- `01_知识框架.html` —— 知识点唤醒 + 竞赛考点 + 记忆卡片
- `02_例题精讲.html` —— 按题型分类的例题详解 + 每日进阶题/挑战题实录（随做随录；**类型求全，不求题量**，含个人错题档案）
- `assets/mathjax/` —— 本地 MathJax（tex-svg.js，离线可用）。所有专题页面通过相对路径 `../assets/mathjax/tex-svg.js` 引用，请勿单独移动 HTML 文件而脱离本目录

## 站点结构

```
├── index.html              # 站点首页（专题总入口）
├── assets/
│   ├── mathjax/tex-svg.js  # 本地公式渲染
│   └── site-nav.js         # 全站导航栏（所有页面共享）
└── NN_专题名/
    └── 01_知识框架.html     # 每个专题的落地页
```

- 每个页面顶部有**吸顶导航栏**，可在 9 大专题间一键跳转，当前专题高亮
- 导航栏由 `assets/site-nav.js` 统一渲染：**新专题完成后，把该文件里对应条目的 `ready` 改为 `true`**，全站导航自动更新，无需逐页修改
- 新建专题页面时，在 `<body>` 开头加入两行即可接入导航（注意 `data-current` 填专题编号）：

```html
<nav id="site-nav" data-base="../" data-current="03"></nav>
<script src="../assets/site-nav.js"></script>
```

## 部署到 GitHub Pages（开源 + 在线访问）

1. 在 GitHub 新建仓库（如 `math-competition-notes`），不要勾选自动生成 README
2. 在本目录初始化并推送：

```bash
git init
git add .
git commit -m "大数竞赛复习中心：专题 01-02 知识框架上线"
git branch -M main
git remote add origin https://github.com/<你的用户名>/math-competition-notes.git
git push -u origin main
```

3. 仓库 **Settings → Pages**，Build and deployment 的 Source 选 **GitHub Actions**
4. 之后每次 `git push` 到 main，会自动触发 `.github/workflows/deploy.yml`：把整个目录作为静态站点发布（纯 HTML 无需构建，1~2 分钟生效）。到仓库 **Actions** 标签页可查看运行记录，绿勾即部署成功
5. 访问地址：`https://<你的用户名>.github.io/math-competition-notes/`
6. 全站为纯静态 HTML + 相对路径，本地双击 `index.html` 与线上访问效果完全一致，无需任何构建

> `.gitignore` 已排除 TRAE 本地缓存目录；`assets/mathjax/tex-svg.js` 约 2MB，仍在 GitHub 单文件 100MB 限制内，保留它可保证公式离线渲染。
