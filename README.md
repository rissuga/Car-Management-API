# Binar: Express.js

Berikut merupakan dokumentasi API dari Binar Car Rental yang menyediakan CRUD yang hanya dilakukan oleh superadmin dan admin. Tidak hanya itu pada dokumentasi ini juga menyediakan API login dan register untuk user dan terdapat fitur create admin yang hanya bisa dilakukan oleh superadmin

## Getting Started

Untuk mulai membuat sebuah implementasi dari HTTP Server, mulainya menginspeksi file [`app/index.js`](./app/index.js), dan lihatlah salah satu contoh `controller` yang ada di [`app/controllers/mainController.js`](./app/controllers/mainController.js)

Lalu untuk menjalankan development server, kalian tinggal jalanin salah satu script di package.json, yang namanya `develop`.

```sh
yarn develop
```

## ERD

![Users One to Many Cars](https://user-images.githubusercontent.com/72052154/236868111-b54adc84-1dd2-4628-b76a-46d6ddd30690.png)

### Email: superadmin@gmail.com

### Password: superadmin123
