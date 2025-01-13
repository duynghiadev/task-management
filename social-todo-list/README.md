- Command to create new docker and run:

```bash
docker run --name test-mysql -e MYSQL_ROOT_PASSWORD=duynghia123 -d -p 3307:3306 mysql:8.0.31
```

- After created new docker, then run docker by using command:

```bash
docker start test-mysql
```
