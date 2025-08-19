# School Management API

A REST API built with Node.js and Express that allows users to add new schools to a MySQL database and retrieve a sorted list of schools based on their proximity to a given location.

## Core Features

-   **Add a School**: Add a new school with its name, address, and geographic coordinates.
-   **List Schools by Proximity**: Get a list of all schools, sorted by the nearest distance to a user-provided latitude and longitude.

## Technologies Used

-   Node.js
-   Express.js
-   MySQL / MariaDB
-   `mysql2` driver
-   `joi` for validation
-   `dotenv` for environment management

## Setup and Usage

To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/TEJASJONDHALE/school-management-API.git]
    cd your-repo-name
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up the database:**
    -   Create a MySQL database.
    -   Run the `CREATE TABLE` script found in the database setup instructions to create the `schools` table.

4. Refer *.env.example* in the root directory and add your database credentials.

4.  **Start the server:**
    ```bash
    node server.js
    ```
    The API will be running at `http://localhost:3000`.

## API Endpoints

### 1. Add a School

-   **Endpoint**: `POST /api/addSchool`
-   **Description**: Adds a new school to the database.
-   **Body** (raw/json):
    ```json
    {
        "name": "St. Vincent's High School",
        "address": "2005, St Vincent's Street, Pune",
        "latitude": 18.5143,
        "longitude": 73.8762
    }
    ```

### 2. List Schools by Proximity

-   **Endpoint**: `GET /api/listSchools`
-   **Description**: Retrieves a list of schools sorted by distance from the provided coordinates.
-   **Query Parameters**:
    -   `lat`: (required) Your latitude.
    -   `lon`: (required) Your longitude.
-   **Example URL**: `http://localhost:3000/api/listSchools?lat=18.5204&lon=73.8567`
