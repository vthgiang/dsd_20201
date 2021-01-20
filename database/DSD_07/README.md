# Hướng dẫn import CSDL và test API nhóm DSD07

## Import CSDL

Nhóm DSD07 sử dụng MongoDB làm hệ quản trị CSDL.

- Cài đặt `mongodb database tools` theo hướng dẫn tại link [https://docs.mongodb.com/database-tools/installation/installation](https://docs.mongodb.com/database-tools/installation/installation/).

- Sử dụng `mongorestore` để import CSDL:

```cmd
mongorestore --drop -d <Tên DB của Mongo Localhost Instance> dump/
```

*dump/* là thư mục chứa dữ liệu đã dump. Bên trong đó có thư mục `dsd` (tên của database và các cặp file .bson, .json là các collections)

- Link server online (SRV Record):

```raw
mongodb+srv://dsdadmin:dsd123456@cluster-sgp.jjwxn.mongodb.net/dsd?retryWrites=true&w=majority
```

## Test API Server

Tạo thử 1 HTTP request tới server

```http
GET /
Host: <host>
```

*host*:

- Server Deploy: http://14.248.5.197:8040
- Heroku: https://dsd07.herokuapp.com

Kết quả nếu server đang chạy:

```http
HTTP/1.1 200 OK
Content-Type: text/html

<html>
  <head></head>
  <body>Welcome to DSD07 APIs: Reporting and Statistics</body>
</html>

```
