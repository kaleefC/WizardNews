const express = require("express");
const morgan = require("morgan");
const postBank = require("./postBank");
const app = express();

app.get("/", (req, res) => {
  
  const html =
    `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
          
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
    ).join('')}
    </div>
  </body>
</html>`;

  res.send(html);
});

app.get('/posts/:id', (req, res) => {

  const id = req.params.id;
  const post = postBank.find(id);

  if (typeof post.id === 'undefined') {

        // If the post wasn't found, just throw an error
        const html = `<!DOCTYPE html>
        <html>
        <head>
          <title>Wizard News</title>
          <link rel="stylesheet" href="/style.css" />
        </head>
        
        <body>
          <div class="news-list">
            <header><img src="/logo.png"/>Wizard News</header>
              <div class='news-item'>
                <p>
                
                  404! No post found...

                </p>
              </div>
          
          </div>
        </body>
        </html>`;

        res.send(html);

  } else {

  const html = `<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
        <div class='news-item'>
          <p>
          
            ${post.title} <small>(by ${post.name})</small>
            </p>
            <p>
              ${post.content}
          </p>
        </div>
    
    </div>
  </body>
  </html>`

  res.send(html);
  }
});

const { PORT = 1337 } = process.env;

app.use(morgan('dev'));

app.listen(PORT, () => {
  console.log(`App Listening in port ${PORT}`)
})

app.use(express.static('public'))

const posts = postBank.list();
