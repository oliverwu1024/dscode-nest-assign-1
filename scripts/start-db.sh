#!/bin/bash

# 建立網路（如果還沒有）
docker network inspect nest-network > /dev/null 2>&1 || docker network create nest-network

# 啟動 PostgreSQL
if ! docker start postgres-db > /dev/null 2>&1; then
  docker run -d \
    --name postgres-db \
    --network nest-network \
    -e POSTGRES_USER=postgres \
    -e POSTGRES_PASSWORD=postgres123 \
    -e POSTGRES_DB=nest_demo \
    -p 5433:5432 \
    -v pgdata:/var/lib/postgresql/data \
    postgres:17
else
  docker network connect nest-network postgres-db > /dev/null 2>&1
fi

# 啟動 pgAdmin
if ! docker start pgadmin > /dev/null 2>&1; then
  docker run -d \
    --name pgadmin \
    --network nest-network \
    -e PGADMIN_DEFAULT_EMAIL=admin@example.com \
    -e PGADMIN_DEFAULT_PASSWORD=admin123 \
    -p 5050:80 \
    dpage/pgadmin4
else
  docker network connect nest-network pgadmin > /dev/null 2>&1
fi

echo "Docker PostgreSQL and pgAdmin are running."
echo "PostgreSQL Host: postgres-db"
echo "PostgreSQL Port: 5432"
echo "pgAdmin URL: http://localhost:5050"