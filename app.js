const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));

let tasks = [];

app.get('/', (req, res) => {
    const taskItems = tasks.map((task, index) => `
        <li class="flex items-center justify-between bg-slate-50 p-4 rounded-xl border border-slate-100 mb-3 shadow-sm">
            <span class="text-slate-700 font-medium">${task}</span>
            <form action="/delete" method="POST" class="m-0">
                <input type="hidden" name="id" value="${index}">
                <button type="submit" class="text-red-500 hover:text-red-700 font-bold px-2">Hapus</button>
            </form>
        </li>
    `).join('');

    res.send(`
    <!DOCTYPE html>
    <html lang="id">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>App CI/CD</title>
        <script src="[https://cdn.tailwindcss.com](https://cdn.tailwindcss.com)"></script>
    </head>
    <body class="bg-slate-100 min-h-screen flex items-center justify-center p-4">
        <div class="w-full max-w-md">
            <div class="bg-white rounded-3xl shadow-xl p-8 border border-white">
                <h1 class="text-3xl font-black text-slate-800 text-center mb-2">App-CICD</h1>
                <p class="text-slate-400 text-center mb-8 text-sm uppercase tracking-widest">Web Application</p>
                
                <form action="/add" method="POST" class="flex gap-2 mb-6">
                    <input type="text" name="task" required class="flex-1 px-4 py-3 border rounded-xl outline-none focus:ring-2 focus:ring-blue-500" placeholder="Tugas baru...">
                    <button type="submit" class="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-blue-100">+</button>
                </form>

                <ul>
                    ${tasks.length === 0 ? '<p class="text-center text-slate-300 italic py-10">Kosong.</p>' : taskItems}
                </ul>
            </div>
        </div>
    </body>
    </html>
    `);
});

app.post('/add', (req, res) => {
    if (req.body.task) tasks.push(req.body.task);
    res.redirect('/');
});

app.post('/delete', (req, res) => {
    const id = req.body.id;
    if (id !== undefined) tasks.splice(id, 1);
    res.redirect('/');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
