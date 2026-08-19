# FTMS api — Bun runtime (một tiến trình: giao diện + API + SSE + jobs)
FROM oven/bun:1.3-slim
WORKDIR /app
COPY apps/api ./apps/api
COPY db ./db
COPY vang ./vang
ENV NODE_ENV=production
EXPOSE 4000
WORKDIR /app/apps/api
CMD ["bun", "src/main.mjs"]
