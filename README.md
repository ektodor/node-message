## 🚩 Swagger

本地 URL : http://localhost:3000/api-doc
Render URL : https://node-message.onrender.com/api-doc

## 🚩 資料庫設計

### user

```
id - (string)
nickname - (string)
email - (string)
sex - (number) 0.尚未選擇、1.男、2.女
image - (string)
password - (string)
followers - (array) <=> follower.id
like_posts - (array) <=> post.id
```

### follower

```
id - (string) <=> user.followers
follower (string) <=> user.id
follow_time (date)
```

### post

```
id - (string) <=> user.posts、user.like_posts
title - (string)
author - (string) <=> user.id
tags - (array)
content - (string)
likes - (number)
comments - (array) <=> comment.id
images - (array)
createAt - (date)
updateAt - (date)
```

### comment

```
id - (string)
user (string) <=> user.id
message - (string)
createAt - (date)
updateAt - (date)
```
