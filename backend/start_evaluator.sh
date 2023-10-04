docker build -f ./evaluator/prod.Dockerfile -t prod_evaluator .
docker run \
	--rm \
	-i \
	-t \
	--privileged \
	-it \
	--network juezguapa-net \
	--add-host=host.docker.internal:host-gateway \
	-v /Users/yollotl/guapa/judge/juez_guapa/backend/evaluator/configuration/:/app/evaluator/configuration/ \
	prod_evaluator
