# Project Name

This project is a web application developed to reinforce and apply TypeScript, HTML, and CSS concepts. 

## Prerequisites

- [Node.js](https://nodejs.org/) (version 18^)
- [Angular CLI](https://cli.angular.io/) (version 16^)
- [.NET Core SDK](https://dotnet.microsoft.com/download/dotnet) (version 8)
- [Visual Studio Code](https://code.visualstudio.com/) or [Visual Studio](https://visualstudio.microsoft.com/) (optional)

## Backend Setup

1. Navigate to the backend directory:

    ```bash
    cd PostIt-API
    ```

2. Install dependencies:

    ```bash
    dotnet restore
    ```

3. Start the server:

    ```bash
    dotnet run --urls "https://localhost:7286"
    ```

4. The backend will be available at `https://localhost:7286`.

## Frontend Setup

1. Navigate to the frontend directory:

    ```bash
    cd PsotIt-App
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Start the Angular application:

    ```bash
    ng serve
    ```

4. Open your browser and visit `http://localhost:4200`.

## Additional Notes

- Ensure you have the correct versions of Node.js, Angular CLI, and .NET Core SDK installed.
- You can customize settings in frontend and backend configuration files as needed.
- Visual Studio Code is recommended for development, but you can use any code editor of your choice.