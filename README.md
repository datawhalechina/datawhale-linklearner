# 【WIP】datawhale 官网项目

## 一、技术选型

- 编程语言：typescript
- 前端框架：vue3
- 前端组件库：element-plus
- markdown-to-html 解析库：markdown-it
- 前端包管理工具：pnpm
- 流程图绘制库：echart
- 后端框架：express
- orm 框架：typeorm
- 部署工具：pm2

## 二、目录结构

| 文件目录         | 说明                               |
| ---------------- | ---------------------------------- |
| ./README.md      | 说明文档                           |
| ./deploy         | 数据库 dump 文件、postman 请求文件 |
| ./package        | 源代码                             |
| ./package/client | 前端源代码                         |
| ./package/server | 后端源代码                         |

## 三、开发指南

执行`bootstrap`命令安装 pnpm 和 pm2（如果你没有这两个东西的话）
使用`pnpm install`命令安装依赖
使用`dev:all`命令进行开发，访问`localhost:8080`即可看到网站
使用`build:all`命令进行打包
使用`format`命令格式化代码

需要在根目录下单独配置`private.json`，用于数据库连接相关配置，具体文件内容可以找 owner 要一下。

## 四、部署指南

执行`bootstrap`命令安装 pnpm 和 pm2（如果你没有这两个东西的话）
使用`start`命令启动服务

## 五、后续 todo

- 1、用户体系搭建
- 2、seo 优化
  - 可以将 csr 渲染改为 ssr 渲染
  - 或将学习内容拆成 ssg 单独部署
- 3、后端接口的补充
  - 现在后端只写了查询接口
  - 需要额外补充创建和更新的接口
