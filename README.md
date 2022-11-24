Usage

- git clone https://github.com/vitalii-minchuk/task-grandy.git

- cd task-grandy

- docker-compose build

- docker-compose up -d

make sure that "? Database connected successfully"
and run inside container

- docker exec -it grandy_api sh

- npx prisma migrate reset

It does't work properly all the time, but who knows, probably you are lucky)

You can use "task-grandy API.postman_collection.json" to test api
