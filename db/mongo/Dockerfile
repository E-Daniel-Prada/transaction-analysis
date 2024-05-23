# Dockerfile for your MongoDB container

# Use the official MongoDB image as the base image
FROM mongo:latest

# Update package lists and install the MongoDB client
RUN apt-get update && apt-get install -y mongodb-clients

# Specify the default command to run when the container starts
CMD ["mongod"]