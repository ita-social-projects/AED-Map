build:
        sudo docker build . -t def-back
run:
        sudo docker run --rm -p 8080:8080 def-back
