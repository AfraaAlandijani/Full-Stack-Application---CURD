# Full Stack Application

1. Backend (Product CRUD API)
   a. Follow MVC Architecture
   b. handle client and server errors with express error middleware
   c. setup the cors, dev setup: nodemon, morgan
   d. HTTP Requests:
        i. GET: /products -> get All products
        ii. GET: /products/:id -> get a single product
        iii. DELETE: /products/:id -> delete single product based on id
        iv. POST: /products -> create the product
        v. PUT: /products/:id -> update the product
   e. Add express-validator validation
2. Front-end (Do not focus on design but functionality)
   a. Read all the products from the API
   b. create a product (call the API)
   c. Delete a product (call the API)
   d. Update product (call the API)
