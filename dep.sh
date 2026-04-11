#!/bin/bash 

git stash

git pull
echo "代码更新完成"

pnpm install
echo "依赖安装完成"

pnpm run build
echo "构建完成"

pm2 restart today_server
echo "构建部署完成"

