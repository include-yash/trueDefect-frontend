False Image Finder - Dockerized App (Frontend + Backend)
 
This guide helps you run the False Image Finder using Docker.
It includes:
- React frontend
- Flask backend
- Folder-based input/output using volume mounts
 
 
REQUIREMENTS
------------
- Docker Desktop (https://docs.docker.com/get-docker)
- Windows/macOS/Linux
- Internet connection (for first-time image pulls)
 
 
FOLDER STRUCTURE
----------------
Project directory (e.g. my-docker-app/)
├── docker-compose.yml
├── .env
├── (input and output folders mounted from local system)
 
 
WHAT THE APP DOES
-----------------
- Reads subfolders inside your input directory.
- Each subfolder must contain:
    * repairTicket_post.txt
    * Image files (e.g., .jpg, .png)
- Extracts fail IDs from the text file.
- Copies matching images to output subfolders.
 
 
STEP 1: Create Input/Output Folders
-----------------------------------
Example paths:
  C:/Users/yourname/Downloads/input
  C:/Users/yourname/Downloads/out
 
Each subfolder inside input/ should look like:
  input/
  └── folder-name/
      ├── repairTicket_post.txt
      ├── image1.jpg
      └── image2.png
 
 
STEP 2: Create .env File
------------------------
Inside the same folder as docker-compose.yml, create a file named .env.
 
Contents:
LOCAL_INPUT_PATH=C:/Users/yourname/Downloads/input
LOCAL_OUTPUT_PATH=C:/Users/yourname/Downloads/out
 
IMPORTANT:
- No quotes around paths
- Use forward slashes / even on Windows
- Ensure paths are real and accessible
 
 
STEP 3: Create docker-compose.yml
---------------------------------
Example content:
 
version: '3'
 
services:
  backend:
    image: includeyash100/backend:v1.1
    ports:
      - "8000:8000"
    volumes:
      - ${LOCAL_INPUT_PATH}:/mnt/input:ro
      - ${LOCAL_OUTPUT_PATH}:/mnt/output
    networks:
      - app-network
 
  frontend:
    image: includeyash100/frontend:v1.1
    ports:
      - "5173:80"
    networks:
      - app-network
 
networks:
  app-network:
    driver: bridge
 
 
STEP 4: Run the App
-------------------
In terminal or PowerShell:
 
  cd path\to\my-docker-app
  docker-compose up
 
- Images will be pulled from Docker Hub
- Volumes will mount your input/output folders
- Frontend and backend containers will start
 
 
USING THE APP
-------------
Frontend URL:
http://localhost:5173
 
Backend API:
http://localhost:8000/process-folders
 
Frontend Input Fields:
- Input Path: Subfolder inside input/ (e.g., test-folder-1)
- Output Path: Desired subfolder name in output/ (e.g., test-folder-1-results)
 
Example:
If input path is:
  C:/Users/yourname/Downloads/input/test-folder-1
 
Enter in frontend: test-folder-1
 
If output path should be:
  C:/Users/yourname/Downloads/out/test-folder-1-results
 
Enter in frontend: test-folder-1-results
 
 
OUTPUT STRUCTURE
----------------
output/
└── test-folder-1-results/
    ├── u1601-2.jpg
    ├── u1623-7.png
    └── ...
 
 
STOPPING THE APP
----------------
To stop containers:
 
  Ctrl + C   (in the terminal)
  docker-compose down
 
 
TROUBLESHOOTING
---------------
Problem: "LOCAL_INPUT_PATH" variable is not set
Fix: Check your .env file format and placement
 
Problem: invalid spec: :/mnt/input:ro
Fix: .env values are empty or incorrect
 
Problem: App doesn’t load
Fix: Wait for container startup or check Docker logs
 
Problem: No output files
Fix: Ensure repairTicket_post.txt has valid fail IDs and images exist
 
 
DOCKER IMAGE INFO
-----------------
Frontend image: includeyash100/frontend:v1.1
Backend image : includeyash100/backend:v1.1
 
 
EXAMPLE .env FILE
-----------------
LOCAL_INPUT_PATH=C:/Users/oarla/Downloads/input
LOCAL_OUTPUT_PATH=C:/Users/oarla/Downloads/out
