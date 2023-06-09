

```
    docker run -itd --restart=always --net=host --cpu-shares=512 \
        -p 3000:3000 \
        -e API_SERVER="https://blob.iee.one" \
        -v /app/view-video:/app \
        --name view-video mixnet/vmgc
```