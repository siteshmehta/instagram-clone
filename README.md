
# Instagram clone

I have created a clone of Instagram website.


## Tech Stack

**Client:** React, React Router, React Query, TailwindCSS

**Server:** Node, Express

**Database:** Mongo Database

**Storage:** Amazon S3 , cloudfront



## Screenshots

Home page
![Home page](https://i.imgur.com/vSBRREv.png)

Post section
![Home page](https://i.imgur.com/PzdPvbM.png)

## Run Locally

Clone the project

```bash
  git clone https://github.com/siteshmehta/instagram-clone.git
```

Go to the project directory

>Open two terminal
>
> Enter these command in first terminal to start the frontend of the website
>  ```bash
>  cd client
>  npm install
>  npm start
> ```
>
>create a .env file in client directory
>```
>//Fill the value in the variable
>REACT_APP_API_BASE_URL=http://localhost:8080
>```



>Enter these command in another terminal to start the server
>
>```bash
>  cd server
>  npm install
>  npm run dev
>```
>
>create a .env file in server directory and fill the value for the configuration
>
>```bash
>  DB_URI=
>  JWT_TOKEN=
>  PUBLIC_PATH=['/user/login','/user/register','/home']
>  MAX_FILE_UPLOAD_LIMIT = 20
>  AWS_BUCKET_NAME=
>  AWS_BUCKET_REGION=
>  AWS_ACCESS_KEY_ID=
>  AWS_SECRET_ACCESS_KEY=
>  IMAGE_URL=
>  ENVIROMENT="STAGING"
>```
