# Vinfe API 
### Для авторизации используется заголовок:

`Authorization: Token jwt.token.here`

## Обьекты JSON возвращаемые от клиента в API:

### Users (для авторизации)

```JSON
{
  "user": {
    "login": "vova",
    "firstname": "Вова",
    "lastname": "Восковщук",
    "email": "jake@jake.jake",
    "token": "jwt.token.here",
    "city": "Йошкар-Ола",
    "school": "28",
    "yearStudy": "7",
    "liter": "A",
    "points": 34,
    "isBanned": false,
    "isActive": true,
    "createdAt": "тут дата",
    "role": {
      "id": 1,
      "title": "ADMIN",
      "name": "Админ"
    }
  }
}
```

### Roles
```JSON
{
  "role": {
    "title": "ADMIN",
    "name": "Админ"
  }
}
```
## Роутинг:
### Авторизация:

`POST /api/user/login`

Пример запроса:
```JSON
{
  "user":{
    "login": "jake",
    "password": "jakejake"
  }
}
```
Доступ к роуту не требует авторизацию, возвращает модель Users  
Обязательные поля: `login`, `password`

### Регистрация:

`POST /api/user/reg`

Пример запроса:
```JSON
{
  "user": {
    "login": "vova",
    "firstname": "Вова",
    "lastname": "Восковщук",
    "email": "jake@jake.jake",
    "password": "jwt.token.here"
  }
}
```

Доступ к роуту не требует авторизацию, возвращает модель Users  
Обязательные поля: `email`, `login`, `password`, `firstname`, `lastname`
