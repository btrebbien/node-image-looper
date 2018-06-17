#!/bin/bash

if [ "$1" = "auto" ]; then
	sudo docker stop udemynode_image_looper && \
	sudo docker rm udemynode_image_looper && \
	sudo docker build -t udemyimageloopernodejs . && \
	sudo docker run --name=udemynode_image_looper -tid -p 6006:3000 -e NODEMON="on" -v /home/btrebz22/Projects/udemy/nodejsdemo/node-image-looper:/usr/src/app -v /usr/src/app/node_modules udemyimageloopernodejs nodemon server/server.js && \
  sudo docker logs -f udemynode_image_looper
elif [ "$1" = "test" ]; then
	sudo docker stop udemynode_image_looper && \
	sudo docker rm udemynode_image_looper && \
	sudo docker build -t udemyimageloopernodejs . && \
	sudo docker run --name=udemynode_image_looper -tid -p 6006:3000 -e NODEMON="on" -v /home/btrebz22/Projects/udemy/nodejsdemo/node-image-looper:/usr/src/app -v /usr/src/app/node_modules udemyimageloopernodejs npm run test-watch && \
  sudo docker logs -f udemynode_image_looper
else
	sudo docker stop udemynode_image_looper && \
	sudo docker rm udemynode_image_looper && \
	sudo docker build -t udemyimageloopernodejs . && \
	sudo docker run --name=udemynode_image_looper -tid -p 6006:3000 -e NODEMON="off" -v /home/btrebz22/Projects/udemy/nodejsdemo/node-image-looper:/usr/src/app -v /usr/src/app/node_modules udemyimageloopernodejs && \
  sudo docker logs -f udemynode_image_looper
fi
