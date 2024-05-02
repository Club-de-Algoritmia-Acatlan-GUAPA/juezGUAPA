docker buildx build -m 10G --no-cache -f ./evaluator/local.Dockerfile -t local_evaluator .
#docker run \
#	--rm \
#	-d \
#	--network juezguapa-net \
#	--privileged \
#	--add-host=host.docker.internal:host-gateway \
#	-v /$PWD/evaluator/configuration/:/app/evaluator/configuration/ \
#	local_evaluator

