# Start with the .NET Core SDK image
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build-env

# Set the working directory
WORKDIR /app

# Copy and restore project dependencies
COPY *.csproj .
RUN dotnet restore

# Copy the rest of the project code
COPY . .

# Build the project
RUN dotnet publish -c Release -o out

# Build the runtime image
FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=build-env /app/out .

# Expose your desired port
EXPOSE 5000

# Define the command to run your application
ENTRYPOINT ["dotnet", "issuemodule.dll"]