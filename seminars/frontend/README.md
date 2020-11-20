# frontend

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### Auth

1. Страница с входом (логин, пароль)
2. Когда он ввёл данные и нажал на кнопку "Войти". Отправляется запрос на сервер в `sign_in`.
3. Если сервер возвращает 200 (успещно) и токен, то сохраняем токен (например, в localStorage). Перенаправление на нужную страницу приложения
4. Добавить ко всем запросам на бэкенд токен в header
