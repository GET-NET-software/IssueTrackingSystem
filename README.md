# Issue Tracking System

![Project Logo](/frontend/src/images/logo.png) <!-- If you have a project logo, include it here -->

## Introduction

This is an issue tracking system, a web application designed to help our company track issues of its products that came from the customer. The system is divided into three main components: frontend, admin frontend, and backend. The frontend is built using React and Vite, with UI components from Ant Design and Tailwind CSS. The backend is developed using .NET Core 7.0.0 and follows a microservices architecture, with communication facilitated by RabbitMQ and routing handled by Ocelot API Gateway.

## Prerequisites

Before you can run this project, ensure you have the following prerequisites installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/)
- [.NET Core 7.0.0](https://dotnet.microsoft.com/download/dotnet/7.0)
- [RabbitMQ](https://www.rabbitmq.com/download.html)
- [XAMPP](https://www.apachefriends.org/download.html)

## Getting Started

### Cloning the Repository

To get started, clone this repository to your local machine:

```bash
git clone https://github.com/GET-NET-software/IssueTrackingSystem.git
```

### Frontend Setup

1. Navigate to the `frontend` directory and install the necessary dependencies:

```bash
cd frontend
npm install
```

1. Navigate to the `admin` directory and install the necessary dependencies:

```bash
cd ../admin
npm install
```

## Backend Setup

1. Ensure that you have C# and the .NET Core SDK 7.0.0 installed on your machine.

2. Start the backend project from your preferred IDE, such as Visual Studio or Visual Studio Code.

## RabbitMQ Setup

Follow the instructions in [this video tutorial](https://www.youtube.com/watch?v=iQ4kENLfaNI&list=PLalrWAGybpB-UHbRDhFsBgXJM1g6T4IvO&index=1&pp=iAQB) to set up RabbitMQ for communication between microservices.

## Database Setup

1. Install XAMPP and start the Apache and MySQL services.

2. Access phpMyAdmin to create the necessary databases and tables. SQL scripts can be found in the resource folder of each service to migrate the database schema.

## Running the Application

With all dependencies and setup complete, you can now run the issue tracking system:

1. Start the backend server.

2. Run the frontend and admin frontend by navigating to their respective directories and using:

```bash
npm run dev
```

## Contributers

Frontend :point_right: **Meron Kedir** :woman:

Frontend :point_right: **Metasebia Tariku** :woman:

Frontend :point_right: **Yonas Abebe** :man:

Backend :point_right: **Nardos Hadis** :woman:

Backend :point_right: **Mihret Tibebe** :woman:

Backend :point_right: **Nahom Mulugeta** :man:

Backend :point_right: **Nahom Getachew** :man:
