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

DATABASE_URL=postgresql://user:password@localhost:5432/orders

execute migrations

"prisma:migrate": "prisma migrate dev",

## License

[MIT](https://choosealicense.com/licenses/mit/)
