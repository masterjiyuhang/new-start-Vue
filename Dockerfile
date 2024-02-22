# # 声明镜像来源为node:16
# FROM node:16

# # 声明工作目录
# WORKDIR /cch_web/

# # 拷贝整个web项目到当前工作目录
# COPY . .

# # 通过npm下载pnpm
# RUN npm install -g pnpm --registry=https://registry.npm.taobao.org

# # 使用pnpm进行安装依赖
# RUN pnpm install && pnpm run build-only


# # 声明镜像来源为nginx:alpine
# FROM nginx:alpine

# # 从.docker-compose/目录拷贝my.conf到容器内的/etc/nginx/conf.d/my.conf
# COPY .docker-compose/my.conf /etc/nginx/conf.d/my.conf

# # 从第一阶段进行拷贝文件
# COPY --from=0 /cch_web/ /usr/share/nginx/html

# # 查看/etc/nginx/nginx.conf文件
# RUN cat /etc/nginx/nginx.conf

# # 查看 /etc/nginx/conf.d/my.conf
# RUN cat /etc/nginx/conf.d/my.conf

# # 查看 文件是否拷贝成功
# RUN ls -al /usr/share/nginx/html

FROM node:16-alpine as build-stage

WORKDIR /cch_web
COPY . ./

# 设置 node 镜像
RUN npm config set registry https://registry.npm.taobao.org
# 设置--max-old-space-size
ENV NODE_OPTIONS=--max-old-space-size=16384

RUN npm install pnpm -g \
    pnpm install --frozen-lockfile && \
    pnpm build-only

# node部分结束
RUN echo "🎉 编 🎉 译 🎉 成 🎉 功 🎉!"

FROM nginx:1.23.3-alpine as production-stage

COPY --from=build-stage .docker-compose/my.conf /etc/nginx/conf.d/my.conf
COPY --from=build-stage /cch_web/dist /usr/share/nginx/html
EXPOSE 8080

RUN cat /etc/nginx/nginx.conf
RUN cat /etc/nginx/conf.d/my.conf
RUN ls -al /usr/share/nginx/html
