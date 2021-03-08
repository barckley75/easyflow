# easyflow
A modern website with node.js backend

launching the website
npm start


Install Apache2 and copy the site from github
> sudo apt install apache2 -y
> git clone https://github.com/.......

Install all the dependencies
> npm i

Copy all files in the html directory
> sudo cp -r ~/website_folder /var/www/html

Build index.js file with parcel
> npm run watch:js
to watch index.js
or
> npm run build:js
to build the final bundle.js for production

Start the server
> npm start

Running the server always up
> forever start server.js

To stop it
> forever stopall