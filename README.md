<h1>Welcome to my Blog App</h1>

<h2>Objective</h2>
This project is about creating a blog app using Nextjs 14 and Prisma, where you can add, update, remove, and list your personnel blogs.

<h2>Technologies:</h2>
<ul>
<li>Nextjs 14(app router)</li>
<li>Authjs for authentication</li>
<li>Tailwind as CSS framework</li>
<li>shadcn which is a group of reusable components built in using radix</li>
<li>Prisma a long side with postgresql using <a href="https://neon.tech/">NEON</a>(Serverless Postgres) which handles our database without using a server</li>
</ul>

<h2>Usage:</h2>
<ol>
<li>Copy the content of `.env.example` file in a new `.env` file to get the URL's to connect to the database</li>
<li>There is a Makefile that compiles the project
<ul>
<li>make up: to run the application in the production mode</li>
<li>make dev: to run the application in the development mode</li>
</ul>
</li>
<li>The application will be running on http://localhost:3000</li>
</ol>

<h2>Features:</h2>
<ol>
<li>
Landing Page
<ul>
<li>where you can click to redirect to the blog home page</li>
<li>You need to authenticate using 42 provider</li>
</ul>
</li>
<li>Home Page
<ul>
<li>Add Blog</li>
<li>Remove all Blogs</li>
<li>Sing out from the app</li>
<li>Display a list of Blogs: each blog have a title, content and a publication date, firstly you can see the title, the publication date and time, and an excerpt from the content, you can remove or display all the content of this blog</li>
</ul>
</li>
<li>Blog Page
<ul>
<li>Which is a dynamic route by id where you can see all the information of this blog in one page</li>
</ul>
</li>
</ol>