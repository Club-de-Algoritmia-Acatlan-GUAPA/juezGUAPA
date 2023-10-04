docker network create juezguapa-net
docker-compose -f ./services.yml up --detach --remove-orphans --no-recreate
echo "Waiting for services to start"
sleep 10
docker exec juez_guapa_rabbitmq rabbitmqadmin declare queue name="submissions" durable=true

docker exec juez_guapa_postgres psql -U postgres -c "alter user postgres with PASSWORD 'password'"

docker exec juez_guapa_redis redis-cli flushall
