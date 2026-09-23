# CompetitionPrep_Workspace — 备赛工作区

多赛事备赛资料的一站式仓库：**每场比赛一个文件夹**，内容以纯静态网页（HTML）组织，通过 GitHub Actions 自动发布，随时在线复习、离线可用。

**在线访问**：<https://gemzsx.github.io/CompetitionPrep_Workspace/>

> 当前线上发布的是「大数竞赛」板块；新增比赛后按下方 [新增比赛](#新增一场比赛) 一节操作即可上线。

## 仓库结构

```
CompetitionPrep_Workspace/          ← 仓库根（本 README 所在层）
├── README.md                      ← 本文件：总览 + 部署说明
├── .github/workflows/deploy.yml   ← 自动部署脚本（仓库级，只有这一份）
└── 大数竞赛/                       ← 第一场比赛的全部内容
    ├── README.md                  ← 该比赛的详细信息（进度、文件约定）
    ├── index.html                 ← 该比赛网站的首页
    ├── assets/                    ← 公式渲染 + 全站导航（离线可用）
    └── 01~09 专题文件夹/           ← 复习内容，每专题独立页面
```

**层级规则**（记住这个就不会迷路）：

- `README.md`、`.github/`、`.gitignore` 是**仓库级**配置，永远只住仓库根这一层
- 每场比赛（大数竞赛、蓝桥杯…）是**平级的内容文件夹**，想加就加，互不干扰
- 比赛文件夹内部自成体系：有自己的 README、首页、导航，拆出来单独看也完整

## 当前比赛

| 比赛 | 内容 | 状态 |
|------|------|------|
| 全国大学生数学竞赛（非数学类） | 高等数学 9 大专题：知识框架 / 例题精讲 / 练习真题 | 🔄 进行中（[详情](大数竞赛/README.md)） |

## 日常更新（每场比赛都一样）

内容全部在本地编辑，更新就是三步，在仓库内任意目录执行均可：

```bash
git add .
git commit -m "大数竞赛：专题 03 上线"
git push
```

push 之后 GitHub Actions 自动部署（1~2 分钟生效），去仓库 **Actions** 标签页看绿勾即成功。**远端配置只需一次**（remote 登记已保存在本地 `.git/config`），日常不需要重新输入。

## 部署原理

- 全站为纯静态 HTML，**无需任何构建**：push 到 `main` 分支时，`.github/workflows/deploy.yml` 自动把 `大数竞赛/` 文件夹原样发布为 GitHub Pages 站点
- 注意 workflow 跑在 Linux 服务器上，yml 里路径必须用正斜杠：`path: ./大数竞赛`
- 仓库 **Settings → Pages** 的 Source 已设为 **GitHub Actions**，不需要再动
- 站点内容 ≠ 仓库内容：`大数竞赛/` 以外的文件不会出现在网站上，但仍在公开仓库里可见——私密文件请写进仓库根的 `.gitignore`

## 新增一场比赛

1. 在仓库根新建文件夹（如 `蓝桥杯/`），内含自己的 `index.html` 与内容页
2. 二选一（推荐 A）：
   - **A. 单站点扩展**：做一个仓库根总入口 `index.html`（一场比赛一个卡片），并把 `deploy.yml` 里的 `path: ./大数竞赛` 改为 `path: .`——一个地址看所有比赛
   - **B. 替换发布**：只把 `path` 改成新文件夹——旧比赛下线，新比赛顶上（一个仓库同一时间只有一个 Pages 站点）
3. `git add . → commit → push`，自动上线
4.
假设以后加了`E:\比赛\蓝桥杯\` ，在`E:\比赛\.github\workflows\` 下 新建`lanqiao.yml` （名字随便起，别和 deploy.yml 重复），内容整份照抄 deploy.yml，只改三处：
    name: Deploy Lanqiao Pages        # ① 改名字，Actions 页里好区分

    concurrency:
  group: lanqiao-pages            # ② 改组名，必须和 github-pages 不同！
  cancel-in-progress: true

    jobs:
    deploy:
        ...
            with:
            path: ./蓝桥杯           # ③ path 指向新文件夹

> 一个仓库只能绑定一个 Pages 站点地址，所以"多比赛同站"走方案 A（子路径组织），不要试图给每场比赛单独开 workflow 抢同一个地址。

## 离线使用

克隆或下载本仓库后，直接双击 `大数竞赛/index.html` 即可离线复习——公式渲染用的 MathJax 已内置在仓库里，不需要网络。
