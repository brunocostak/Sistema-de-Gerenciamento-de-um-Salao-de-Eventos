docker run -d \
    --name sistema-salao-postgres \
    -e POSTGRES_PASSWORD=password \
    -e POSTGRES_USER=user \
    -e PGDATA=/var/lib/postgresql/data/pgdata \
    -v ./data:/var/lib/postgresql/data \
    postgres