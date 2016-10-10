
# Maumasi's Awesome URL Shortener!
`version: 1.2.0`
</br>

# Table of contents
- [Installation] (Installation)
- [Unit Testing] []

## Installation
##### Note: This project was written in ``` node v6.7.0 ```
</br>
Open your terminal if you're on a Unix or Linus machine if you've not done so already after doing the ``` git pull ``` request. </br>
Install all the **dependancies** and **dev dependancies** for the app with the all important **npm install**:
```bash
$ cd URL_Shortener
$ npm install
```
</br>

To get the node.js server up and running you'll have to navigate to the </br>
server.js file then use the key word **' *node* '** to tell node.js to run the file:
```bash
$  node server.js
```
By default the port is set to 3000, you should also see ``` Server running on port 3000 ``` stated in the terminal </br>
after you have the server running, if you don't see that, then something failed and the server should be re-started or you may have
forgotten to run the ``` $ npm install ``` command. </br>
</br>
To stop the server press: ``` control + ^C ``` </br>
\*\* **Remember, you'll have to stop the server and re-run the** ``` $  node src/server.js ``` **command every time you want to check file changes in the bowser** \*\*
</br>
</br>

If you have **nodemon** installed, ``` npm i -g nodemon```, you can simply use:
```bash
$ nodemon server.js
```
Using ``` nodemon ``` will do a live reload for you every time you save a file in the project... *most of the time*.
If you do have to manually reload the server just use the ``` $ rs ``` command to 'restart server'. It's kinda awesome.
</br>

### Environmental Variables
In the root directory there is an ``` env.dist ``` file, ``` URL_Shortener/env.dist ```. This file contains the environmental variables used in the app. The variables are:
``` bash

PORT=3000
DB_NAME=
DB_USER=
DB_PW=
DB_HOST=
DB_SCHEMA=
DB_PORT=

```
** **IMPORTANT** ** </br>
This file is for distribution only and should be renamed to ``` .env ``` for the app to run. </br>
Hold on! You're not done yet, you have to fill in your database credentials to connect to your database. If you don't have a database already created make sure to do that first before trying to run this app or it will crash if there's no database to connect to.
</br>

### Database Config
This API utilizes a RDBMS. At this time this API has only been tested with MySQL and mariaDB.
*[RDBMS]: Relational Database Management System

To install MariaDB on:
- [**OSX** follow these instructions] (https://mariadb.com/kb/en/mariadb/building-mariadb-on-mac-os-x-using-homebrew/)</br>
- [**Windows 10** follow these instructions] (https://mariadb.com/kb/en/mariadb/installing-mariadb-msi-packages-on-windows/)</br>
- [**Linux** follow these instructions] (https://downloads.mariadb.org/mariadb/repositories/#mirror=limestone)</br>
</br>

To install MySQL on:
- [**OSX follow** these instructions] (https://dev.mysql.com/doc/refman/5.6/en/osx-installation-pkg.html)</br>
- [**Windows 10** follow these instructions] (https://dev.mysql.com/doc/refman/5.5/en/windows-installation.html)</br>
- [**Linux** follow these instructions] (http://dev.mysql.com/doc/refman/5.7/en/linux-installation.html)</br>

After filling in your credentials in the newly renamed ``` .env ``` file start up your database.
```bash

$ cd URL_Shortener/
$ mysql.server start

```
Keep in mind that your database should **NOT** be running on the same port as the API.
</br>
___
## Run it in the browser!
This API ships with an example site on how the API can be implemented. It is set up to preform full CRUD using AJAX calls. Just type ``` localhost:3000 ``` in the browser URL after you get the server.js running and you can start going bananas!
</br>
___
## API
After you have the app up and running there are 6 endpoints for the API. The first 3 endpoints require an AJAX call. The 4th is a API status checkup and can be used with an AJAX call if you need to watch for status changes for the API's stability. The 5th is a 301 redirect, no AJAX call needed for this endpoint. The 6th endpoint is used to display all record pairs in the database.

1. **/v1/shorten-url**
  - Creates a short link.

  - This uses the **POST** method to receive the original URL and set a relationship to the new **maumasi.fy** short link.
  - This endpoint expects JSON:
  ```javaScript
  {
    'originalURL': ['submitted URL']
  }
  ```
  - This will generate a new short link or return an existing short link if the exact URL submitted happens to be in the database already.
  - The root URL destination will be pinged. If it fails it will logged it in the console. If it passes it will return the following JSON:
  ```javaScript
  {
    'originalURL' : ['URL submitted'],
    'maumasi_fied_link' : ['generated short link']
  }
  ```
  </br>
  </br>

2. **/v1/update-url**
  - Updates a short link.

  - This uses the **POST** method to receive the new URL and set a relationship to the **maumasi.fy** short link to be reassinged that should be submited with the new URL.

  - This endpoint expects JSON:
  ```javaScript
  {
    'maumasiFyKey': ['your full short link'],
    'updatelURL': ['a new URL for this short link']
  }
  ```

  - This reassigns the short link to a new URL destination.

  - Returns JSON:
  ```javaScript
  {
    'originalURL' : ['new URL submited'],
    'maumasi_fied_link' : ['short link submitted with new URL']
  }
  ```
  - **Important:** Some browsers like *Chrome* will cache URLs and will refer to their own cache history to remember where the short link's last destination was. So, after updating your short link you may have to clear your browser's cache/history for the new short link's destination to take place.
  </br>
  </br>

3. **/v1/remove-url**
  - Deletes a short link and it's assigned URL from the database.

  - This uses the **POST** method to completely remove the short link and it's assigned URL from the database.

  - This endpoint expects JSON:
  ```javaScript
  {
    'maumasiFyKey': ['your full short link']
  }
  ```
  </br>
  </br>

4. **/v1/status**
  - Check the status of the API.

  - This uses the **GET** method.

  - This is used to check the status of the API if you need to do some debugging.

  - Returns JSON:
  ```javaScript
  {
    'stable' : [boolean]
  }
  ```
  </br>
  </br>

5. **/:shortKey**
  - Redirects to stored URL when a short link is used.

  - This uses the **GET** method to redirect the route to the assigned URL in the database using a **301 redirect**.

  - The **' *:shortKey* '** is the **key** assigned to the stored URL in the database.

  - This is handled by the API, no AJAX call is needed for this endpoint.
</br>
</br>

6. **/v1/all-urls**
  - Returns an array of all record pairs as one object per pair.

  - This uses the **GET** method.

  - Return example:
  ```javaScript

  [
    { id: 34,
       maumasiFyKey: '3GFom0',
       createdAt: Mon Oct 03 2016 06:25:32 GMT-0400,
       updatedAt: Mon Oct 03 2016 06:25:32 GMT-0400,
       originalURL_ID: 34,
       originalURL: {
         id: 34,
         originalURL: 'https://www.google.com/search?q=sfb%20fgsb&rct=j',
         createdAt: Sun Oct 02 2016 20:55:42 GMT-0400,
         updatedAt: Sun Oct 02 2016 20:55:42 GMT-0400
       }
     }
   ]

  ```
</br>
</br>

### Sample AJAX call to the API

This AJAX call was made with jQuery
</br>
```javaScript

var $newUrl = $('.newUrl');
var $oldUrl = $('.oldUrl');
var $submit = $('.btn-submit');
var $url = $('input#url');

$submit.on('click', function() {

  var formData = {
    originalURL: $url.val()
  }

// AJAX call to our API
  $.ajax({
    type: 'POST',
    url: 'http://localhost:3000/v1/shorten-url',
    data: formData,
    success: function(newData) {

      // show user their new maumasi.fy link
      $oldUrl.html('This URL: ' + newData.originalUrl);
      $newUrl.html('truned into this URL : ' + newData.maumasi_fied_link);

      $url.val('');

      console.log(newData);
    },
  });
});

```
</br>

___
## Unit Testing
You can also do some unit testing using ``` mocha ```.</br>
If you did the ``` npm install ``` then it's already in the app, but you'll still need to install it globally on your machine to use it. </br>
If unit testing is something you like and you don't have ``` mocha ``` installed then just run the following command in the terminal:
```bash
$ npm i -g mocha
```
That's it, now just call ``` mocha ``` just inside the **URL_Shortener** directory:
```bash
$ cd URL_Shortener/
$ mocha
```
Using this command ``` mocha ``` will look for the **' *test* '** directory and run any scripts in there. </br>
Keep in mind that this uses port 3000 and will show a failed test if you try to use it at the same time the app is running on port 3000
</br>

 - Currently there are 6 unit tests. Each endpoint is tested. Keep in mind that the ``` /v1/update-url ``` and ``` /v1/remove-url ``` endpoints will accutally update and delete recoreds in the database. Becasue ``` update-url ``` and ``` remove-url ``` are dependant on real records in the database they will only pass their tests once if their test values aren't updated in the ``` URL_Shortener/test/__api_unit_test.js ``` file.

 Feel free to add your own unit tests!!
