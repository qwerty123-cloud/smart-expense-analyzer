Smart Expense Analyzer

Smart Expense Analyzer is a full stack web app that helps users track their daily expenses, view them by category, and generate simple reports. The client side is built with Vue 3 and Vite, and the server side is built with Express.js and MongoDB. This project was completed in two phases — Deliverable 1 covered the client side architecture, and Deliverable 2 added server side integration using Express and MongoDB.

Project Structure

smart-expense-analyzer/
  client/     Vue 3 + Vite client app
  server/     Express.js + MongoDB server

Tech Stack

Client: Vue 3, Vite, Vue Router, Axios, Chart.js
Server: Node.js, Express.js, MongoDB (Mongoose), JWT Authentication, bcryptjs

Deliverable 1 — Client Side Architecture

In this phase, the whole client side was built using Vue 3. There are two separate layouts, AuthLayout for pages where the user is not logged in yet (Intro, Login, Register), and AppLayout for pages that need login (Menu, Account, Dashboard, Reports, History, Finish). Both layouts use RouterView so their child routes can render properly.

Routing is handled with Vue Router, and a navigation guard is also added. It checks if a route requires login, and if the user is not logged in, it redirects them back to the intro page.

The UI is broken down into small reusable components, like ExpenseForm, ExpenseList, Navbar and Sidebar. Parent views pass data to these components through props, and the components send events back to their parent using emits, for example when an expense is added or deleted.

Deliverable 2 — Express.js and MongoDB Integration

In this phase, a server was built to connect the client with real data. The server runs on Express.js and uses MongoDB through Mongoose.

Authentication is handled with JWT. When a user registers, their password is hashed with bcrypt before being stored, and when they log in, a token is generated which must be sent with every protected request. The expense routes are also protected, so no one can access expense data without logging in.

There are two main models, User and Expense. The Expense model stores a reference to the user's id, so each user can only see their own expenses.

The API endpoints are as follows

Auth
POST /api/auth/register — create a new account
POST /api/auth/login — log in and get a token
GET /api/auth/me — get the current logged in user's info using the token

Expenses (all protected, token required)
GET /api/expenses — get the list of all expenses
GET /api/expenses/:id — get one specific expense
POST /api/expenses — add a new expense
PUT /api/expenses/:id — update an existing expense
DELETE /api/expenses/:id — delete an expense

How to Run Locally

Server setup
cd server
npm install
create a .env file and add MONGO_URI and JWT_SECRET
npm run dev

Client setup
cd client
npm install
npm run dev

The server runs on port 3001 and the client runs on Vite's default port. The client's axios config is already connected to the server URL.