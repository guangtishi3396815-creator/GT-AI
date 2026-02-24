# 光体AI - 自动修复版本

## 问题诊断

Vercel 部署失败的原因：
1. 静态文件配置问题
2. API 路由配置错误
3. 文件路径不匹配

## 解决方案：使用 Next.js 框架

Next.js 是 Vercel 原生支持的框架，部署最稳定。

## 快速部署步骤

### 第一步：准备文件

确保有以下文件结构：
```
lightbody-ai/
├── package.json
├── next.config.js
├── pages/
│   ├── index.js          # 前端页面
│   └── api/
│       └── generate.js   # API接口
```

### 第二步：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 仓库名: `lightbody-ai-nextjs`
3. 选择 Public
4. 创建仓库

### 第三步：上传文件

上传所有文件到仓库（已为你准备好）

### 第四步：Vercel 部署

1. 访问 https://vercel.com
2. 用 GitHub 登录
3. 点击 "Add New Project"
4. 选择 `lightbody-ai-nextjs` 仓库
5. **Framework Preset**: 选择 `Next.js`
6. 添加环境变量：
   - Name: `KIMI_API_KEY`
   - Value: `sk-AT66lec8PlPL3EgdjUrBtAVxLfg9uXmwrjvN7c2TPqHApfNu`
7. 点击 **Deploy**

### 第五步：完成

等待部署完成，获得网址如：
`https://lightbody-ai-nextjs.vercel.app`

## 为什么这个版本能成功？

- ✅ 使用 Next.js 框架，Vercel 原生支持
- ✅ 标准的路由结构，不会 404
- ✅ 自动处理静态文件和 API
- ✅ 无需额外配置

## 如果还是失败

直接用 **Netlify**：
1. 访问 https://app.netlify.com/drop
2. 拖入 `index.html`
3. 立即获得网址