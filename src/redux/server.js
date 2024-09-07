const express = require("express");
const cors = require("cors"); // Импортируйте cors
const https = require("https");
const fs = require("fs");
const path = require("path");
const filePath = path.join(__dirname, "tasks.json");
const filePathMovies = path.join(__dirname, "movies.json");
const app = express();
const port = 3040;

const options = {
  key: fs.readFileSync("./cert/private.key"),
  cert: fs.readFileSync("./cert/certificate.crt"),
  ca: fs.readFileSync("./cert/ca_bundle.crt"), // если требуется
};

app.use(cors());

// Используем встроенный парсер JSON
app.use(express.json());

// Функция для чтения данных из файла
const readFromFile = (path) => {
  if (fs.existsSync(path)) {
    const data = fs.readFileSync(path);
    return JSON.parse(data);
  }
  return [];
};

// Функция для записи данных в файл
const writeToFile = (data, path) => {
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
};

// Загрузка начальных данных
let todos = readFromFile(filePath);

// Получение списка всех дел
app.get("/tasks", (req, res) => {
  res.json(todos);
});

// Добавление нового дела
app.post("/tasks", (req, res) => {
  const newTodo = {
    id: Date.now(), // Простая генерация уникального ID
    task: req.body.task,
    done: false,
  };
  todos.push(newTodo);
  writeToFile(todos, filePath);
  res.status(201).json(newTodo);
});

// Удаление дела по ID
app.delete("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter((todo) => todo.id !== id);
  writeToFile(todos, filePath);
  res.status(204).send(); // 204 No Content
});

// Обновление задачи по ID (например, изменение completed)
app.put("/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    if (req.body.done !== undefined) {
      todo.done = req.body.done;
    }
    if (req.body.task !== undefined) {
      todo.task = req.body.task;
    }
    writeToFile(todos, filePath);
    res.json(todo);
  } else {
    res.status(404).json({ message: "Task not found" });
  }
});
////////////////////////////////////////////////////////////////////////
/*-------------------------MOVIES------------------------------------**/
// Загрузка начальных данных
let favMovies = readFromFile(filePathMovies);

// Получение списка всех дел
app.get("/movies", (req, res) => {
  res.json(favMovies);
});

// Добавление нового дела
app.post("/movies", (req, res) => {
  let mvStatus = false;
  let mvWatch = false;
  if (req.body.status !== undefined) {
    mvWatch = req.body.status;
  }
  if (req.body.watch !== undefined) {
    mvWatch = req.body.watch;
  }
  const newMovie = {
    id: Date.now(), // Простая генерация уникального ID
    poster_path: req.body.poster_path,
    title: req.body.title,
    status: mvStatus,
    favId: req.body.favId,
    isWatch: mvWatch,
  };
  favMovies.push(newMovie);
  writeToFile(favMovies, filePathMovies);
  res.status(201).json(newMovie);
});

// Удаление дела по ID
app.delete("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  favMovies = favMovies.filter((movie) => movie.id !== id);
  writeToFile(favMovies, filePathMovies);
  res.status(204).send(); // 204 No Content
});

// Обновление задачи по ID (например, изменение completed)
app.put("/movies/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const movie = favMovies.find((movie) => movie.id === id);

  if (favMovies) {
    if (req.body.status !== undefined) {
      movie.status = req.body.status;
    }
    if (req.body.isWatch !== undefined) {
      movie.isWatch = req.body.isWatch;
    }
    writeToFile(favMovies, filePath);
    res.json(movie);
  } else {
    res.status(404).json({ message: "Movie not found" });
  }
});

https.createServer(options, app).listen(port, () => {
  console.log(`Server is running on https://localhost:${port}`);
});
