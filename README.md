# docker-demo
Demo with docker, docker-compose and swarm

This repo has 3 dockerized applications:

## queue-loader
A Node.js Express app that allows the user to load a list of lines with the following format: `<image-name> <image-url>`
Sample:
```
space1 http://www.lpi.usra.edu/resources/apollo/images/print/AS16/M/0161.jpg
space2 http://www.lpi.usra.edu/resources/apollo/images/print/AS16/M/0162.jpg
space3 http://www.lpi.usra.edu/resources/apollo/images/print/AS16/M/0163.jpg
space4 http://www.lpi.usra.edu/resources/apollo/images/print/AS16/M/0164.jpg
space5 http://www.lpi.usra.edu/resources/apollo/images/print/AS16/M/0165.jpg
space6 http://www.lpi.usra.edu/resources/apollo/images/print/AS16/M/0166.jpg
space7 http://www.lpi.usra.edu/resources/apollo/images/print/AS16/M/0167.jpg
space8 http://www.lpi.usra.edu/resources/apollo/images/print/AS16/M/0168.jpg
space9 http://www.lpi.usra.edu/resources/apollo/images/print/AS16/M/0169.jpg
space10 http://www.lpi.usra.edu/resources/apollo/images/print/AS16/M/0170.jpg
space11 http://www.lpi.usra.edu/resources/apollo/images/print/AS16/M/0171.jpg
space12 http://www.lpi.usra.edu/resources/apollo/images/print/AS16/M/0172.jpg
space13 http://www.lpi.usra.edu/resources/apollo/images/print/AS16/M/0173.jpg
space14 http://www.lpi.usra.edu/resources/apollo/images/print/AS16/M/0174.jpg
```

This app exposes the port 3000

## queue-consumer
A .NET Core app that polls a RestMQ server to see if there are new messages to process.
When a message is found, it tries to download an image and store it in a Redis server (Webdis)

This app exposes the port 5000

## queue-result
A Node.js Express front-end to see the images that were processed from the queue

This app exposes the port 3000


## How to use
To start the app for development (builds each image before running):
`docker-compose -f docker-compose.yml -f docker-compose.dev.yml up`

To start the app in a production environment (compatible with docker swarm. Uses images from dockerhub):
`docker-compose -f docker-compose.yml -f docker-compose.swarm.yml up`
