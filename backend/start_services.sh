docker-compose -f ./services.yml up --detach
echo "Waiting for services to start"
sleep 3
docker exec juez_guapa_rabbitmq rabbitmqadmin declare queue name="submissions" durable=true
