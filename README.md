# Ecommerce Backend

This is the backend of the ecommerce application used on the course.

## Compile

Use the package manager [npm](https://www.npmjs.com/) to install the dependencies used on this project.

```bash
npm run build
```

## Usage

```bash
npm start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## Generate .env

1. Copy local.env to env
2. Run migrations from the container

docker exec -it orders-backend-express_orders-api_1 sh
npm run prisma:migrate

## License

[MIT](https://choosealicense.com/licenses/mit/)
