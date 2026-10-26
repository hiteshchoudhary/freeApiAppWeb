// Endpoints shown on the landing page. `live: true` ones answer without a login, so the console can run them.
export const CATALOG = [
  {
    id: "public",
    name: "Public data",
    blurb: "Read-only datasets, ready for your first fetch. Lists are paginated with page and limit.",
    endpoints: [
      { method: "GET", path: "/public/quotes/quote/random", label: "A random quote", live: true },
      { method: "GET", path: "/public/randomusers/user/random", label: "A random user profile", live: true },
      { method: "GET", path: "/public/randomusers?page=1&limit=5", label: "Users, paginated", live: true },
      { method: "GET", path: "/public/randomproducts/product/random", label: "A random product", live: true },
      { method: "GET", path: "/public/randomjokes/joke/random", label: "A random joke", live: true },
      { method: "GET", path: "/public/books?page=1&limit=5", label: "Books, paginated", live: true },
      { method: "GET", path: "/public/meals/meal/random", label: "A random meal with its recipe", live: true },
      { method: "GET", path: "/public/dogs/dog/random", label: "A random dog breed", live: true },
      { method: "GET", path: "/public/cats/cat/random", label: "A random cat breed", live: true },
      { method: "GET", path: "/public/stocks/stock/random", label: "A random NSE stock", live: true },
      { method: "GET", path: "/public/youtube/videos?page=1&limit=5", label: "YouTube videos, paginated", live: true },
    ],
  },
  {
    id: "auth",
    name: "Authentication",
    blurb: "Real JWT auth with access and refresh tokens, sent as cookies or a bearer header.",
    endpoints: [
      { method: "POST", path: "/users/register", label: "Create an account" },
      { method: "POST", path: "/users/login", label: "Log in and receive tokens" },
      { method: "POST", path: "/users/refresh-token", label: "Swap a refresh token for a new pair" },
      { method: "GET", path: "/users/current-user", label: "The logged in user" },
      { method: "POST", path: "/users/logout", label: "Log out" },
    ],
  },
  {
    id: "todos",
    name: "Todos",
    blurb: "Full CRUD without a login. The data resets every 2 hours.",
    endpoints: [
      { method: "GET", path: "/todos", label: "All todos", live: true },
      { method: "POST", path: "/todos", label: "Create a todo" },
      { method: "PATCH", path: "/todos/:todoId", label: "Update a todo" },
      { method: "PATCH", path: "/todos/toggle/status/:todoId", label: "Toggle done" },
      { method: "DELETE", path: "/todos/:todoId", label: "Delete a todo" },
    ],
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    blurb: "Products, carts, coupons, addresses and orders. Seed it first, the data resets every 2 hours.",
    endpoints: [
      { method: "GET", path: "/ecommerce/products", label: "Products, paginated", live: true },
      { method: "GET", path: "/ecommerce/categories", label: "Categories", live: true },
      { method: "POST", path: "/ecommerce/cart/item/:productId", label: "Add to cart" },
      { method: "POST", path: "/ecommerce/coupons/c/apply", label: "Apply a coupon" },
      { method: "POST", path: "/ecommerce/orders/provider/paypal", label: "Place an order" },
    ],
  },
  {
    id: "social",
    name: "Social media",
    blurb: "Posts, comments, likes, bookmarks and follows. Enough to build a small Twitter.",
    endpoints: [
      { method: "GET", path: "/social-media/posts", label: "The feed", live: true },
      { method: "POST", path: "/social-media/posts", label: "Create a post" },
      { method: "POST", path: "/social-media/like/post/:postId", label: "Like or unlike" },
      { method: "POST", path: "/social-media/follow/:userId", label: "Follow or unfollow" },
    ],
  },
  {
    id: "chat",
    name: "Chat",
    blurb: "One to one and group chats, with messages pushed over Socket.IO.",
    endpoints: [
      { method: "GET", path: "/chat-app/chats", label: "Your chats" },
      { method: "POST", path: "/chat-app/chats/c/:receiverId", label: "Start a chat" },
      { method: "POST", path: "/chat-app/messages/:chatId", label: "Send a message" },
    ],
  },
  {
    id: "kitchen-sink",
    name: "Kitchen sink",
    blurb: "Test your client: every method, any status code, headers, cookies and redirects.",
    endpoints: [
      { method: "GET", path: "/kitchen-sink/http-methods/get", label: "Echo a GET request", live: true },
      { method: "GET", path: "/kitchen-sink/status-codes/418", label: "Any status code you ask for", live: true },
      { method: "GET", path: "/kitchen-sink/request/headers", label: "The headers you sent", live: true },
      { method: "GET", path: "/kitchen-sink/request/user-agent", label: "Your user agent", live: true },
      { method: "GET", path: "/kitchen-sink/response/brotli", label: "A brotli compressed response", live: true },
    ],
  },
];

// Quick picks shown inside the console
export const PRESETS = [
  { label: "Quote", path: "/public/quotes/quote/random" },
  { label: "User", path: "/public/randomusers/user/random" },
  { label: "Product", path: "/public/randomproducts/product/random" },
  { label: "Joke", path: "/public/randomjokes/joke/random" },
  { label: "Meal", path: "/public/meals/meal/random" },
  { label: "Status 418", path: "/kitchen-sink/status-codes/418" },
];

export const ENDPOINT_COUNT = CATALOG.reduce((n, c) => n + c.endpoints.length, 0);
