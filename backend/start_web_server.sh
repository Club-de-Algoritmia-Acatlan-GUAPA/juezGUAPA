docker buildx build -m 10G --no-cache -f ./web_server/Dockerfile -t prod_web_server .
docker run \
	--rm \
	-i \
	-t \
	--privileged \
	-d \
	-it \
	--add-host=host.docker.internal:host-gateway \
	--network juezguapa-net \
	-v /$PWD/web_server/configuration/:/configuration \
	-p 8000:8000 \
	prod_web_server


