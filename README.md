# Проект Laravel и Angular запакованый в Docker


## О проекте
### Данный проект основана на:
- Backend: будет использовать API NestJS 8.1.2
- Frontend: будет использовать Angular 9.0.5
- Database: будет использовать Postgres 13.2
- Nginx: в качетсве web сервера
- Другие: memcached

### Струткура папок и файлов проекта:
- backend (для NestJS)
- frontend (для angular)
- nginx (для nginx)
- docs (для различной документации)
- docker-composer.yml

## Основыне команды для запуска
### Для чистой установки Laravel для api через Laravel Sail
1. Устанавливаем NestJS `sudo npm i -g @nestjs/cli`
2. Создаем проект `nest new backend`
3. Выбираем команду yarn
4. Переходим в директорию проекта `cd backend`
5. Запуск проекта: docker-compose -f docker-compose.yml

### Для чистой установки Nginx
1. Создать каталог и перейти в него`mkdir nginx && cd nginx`
2. Создать в этом каталоге файл `touch nginx.conf`
3. Внести в него свои настройки:
```text
server {
    listen 80;

    server_name vinfe;

    location / {
        proxy_pass http://frontend:4200;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    location /api {
            proxy_pass http://backend:8000;
            rewrite ^/api/(.*) /$1 break;
    }
}
```
4. В docker-compose.yml внести:
```yaml
nginx:
   image: library/nginx:stable-alpine
   container_name: nginx
   ports:
      - 80:80
   volumes:
      - ../nginx/nginx.conf:/etc/nginx/conf.d/nginx.conf
   depends_on:
      - laravel
      - pgsql
   networks:
      - sail
```

### Для чистой установки Angular 9.0.5
1. устанавливаем командой `npm install -g @angular/cli@9.0.5`
2. Создаем проект командой `ng new frontend`
3. Удаляем не нужные файлы и настраиваем проект под себя
4. В файле angular.json добавить на 70 строку `"disableHostCheck": true`
5. в файле package.json поменять на `"start": "ng serve --host 0.0.0.0",`
6. Устанавливаем некоторые зависимости:
   - NgRx store 9.0.0: `yarn add @ngrx/store@9.0.0`
   - NgRx effects 9.0.0: `yarn add @ngrx/effects@9.0.0`
   - NgRx dev-tools 9.0.0: `yarn add @ngrx/store-devtools@9.0.0`


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