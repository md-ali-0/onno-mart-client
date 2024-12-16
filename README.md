# OnnoMart - E-Commerce Application

## Project Name & Description
The **OnnoMart - E-Commerce Application** is a complete online shopping platform designed to cater to users, vendors, and administrators. It provides an intuitive, secure, and responsive experience for all roles. Users can browse and purchase products, vendors can manage shops and inventories, and administrators can monitor and control the entire system. The application is built with modern web technologies and ensures scalability and high performance.

---

## Live URLs
-   **Frontend Deployment**: [Frontend Live URL](https://onno-mart.vercel.app)
-   **Backend Deployment**: [Backend Live URL](https://onnomart-api.vercel.app)

---

## Technology Stack & Packages

### Backend:

-   **Framework**: Node.js with Express.js
-   **Database**: PostgreSQL (managed using Prisma)
-   **Authentication**: JSON Web Tokens (JWT)
-   **Image Uploads**: Integrated with Cloudinary
-   **Payment Gateways**: SSLCommerz and Aamarpay

### Frontend:

-   **Framework**: React.js or Next.js
-   **State Management**: Redux
-   **CSS**: TailwindCSS for styling

### Other Packages:

-   **bcrypt**: For password hashing
-   **jsonwebtoken**: For handling authentication
-   **multer**: For file uploads
-   **pg**: PostgreSQL client for Node.js
-   **redux**: For handeling state and rtk query making HTTP requests

---

## Features & Functionalities

-   User Features:
    -   Browse products with advanced filtering and sorting options.
    -   Add items to the cart and checkout with secure payment options.
    -   View order history and leave reviews for purchased products.
    -   Compare up to three products from the same category.
-   Vendor Features:
    -   Manage shops and products (add, edit, or delete).
    -   View and respond to customer reviews.
    -   Track order history for better inventory management.
-   Admin Features:
    -   Manage users, vendors, and product categories.
    -   Monitor transactions and platform activities.
-   Other Features:
    -   Follow specific shops for personalized product prioritization.
    -   Recent products page to view recently browsed items.
    -   Responsive design for an optimized experience across devices.

### General Features:

-   Mobile and desktop responsive design.
-   Paginated APIs for list-based data (products, order history, etc.).
-   Cart functionality allowing products only from one vendor at a time.
-   Flash sale and related product views.

---


## Setup Instructions

### Prerequisites

-   Node.js and npm installed
-   PostgreSQL database running

### Frontend Setup:

1. Navigate to the frontend directory:
    ```bash
    cd frontend
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Create a `.env` file in the root of the frontend directory and add the following:
    ```env
    NEXT_PUBLIC_BASE_URL=<your-database-url>
    AUTH_SECRET=<your-jwt-secret>
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```

---

## Key Features & Functionality

-   Comprehensive admin dashboard with user and product management capabilities.
-   Vendor dashboard for shop and product management.
-   Advanced cart functionality with vendor-specific restrictions.
-   Integrated payment gateways (SSLCommerz and Aamarpay).
-   Paginated APIs for efficient data handling.
-   Responsive design for both mobile and desktop platforms.

---

### Admin:
- Email: admin@gmail.com
- Password: 123456

### Vendor:
- Email: vendor1@gmail.com
- Password: 123456

### Customer:
- Email: ali@gmail.com
- Password: 123456

## Contact
For queries or support, reach out via [Mohammad Ali](mailto:md.ali.office@gmail.com). or the project repository.
