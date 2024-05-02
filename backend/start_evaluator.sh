docker buildx build -m 10G --no-cache -f ./evaluator/amd_64.Dockerfile -t prod_evaluator .
docker run \
	--rm \
	-d \
	--network juezguapa-net \
	--privileged \
	--add-host=host.docker.internal:host-gateway \
	-v /$PWD/evaluator/configuration/:/app/evaluator/configuration/ \
	prod_evaluator

