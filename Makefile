build:
        sudo docker build . -t def-back
run:
        sudo docker run -e PORT=8080 -e MONGODB_HOST=mongodb --rm -p 8080:8080 def-back