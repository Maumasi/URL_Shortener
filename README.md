
# Maumasi's Awesome URL Shortener!
`version: 1.6.0`</br>
[ ![Codeship Status for Maumasi/URL_Shortener](https://app.codeship.com/projects/62acf700-7438-0134-4148-76a75a837005/status?branch=master)](https://app.codeship.com/projects/179118)
</br>


## Table of contents
- [Installation] (#user-content-installation)
- [Run it in the browser] (#user-content-run-it-in-the-browser)
- [API Endpoints] (#user-content-api-endpoints)
- [Usage] (#user-content-usage)
- [Unit Testing] (#user-content-unit-testing)
- [Workflow] (#user-content-workflow)
- [Deployment] (#user-content-deployment)
</br>

___

## Installation
##### Note: This project was written in ``` node v6.7.0 ```
</br>
Open your terminal if you're on a Unix or Linus machine if you've not done so already after doing the ``` git pull ``` request. </br>
Install all the **dependancies** and **dev dependancies** for the app with the all important **npm install**:
```bash

$ cd URL_Shortener/
$ npm install

```
</br>

To get the node.js server up and running just navigate into the root directory ` URL_Shortener/ ` and enter:
```bash

$ cd URL_Shortener/
$ npm start

```
</br>
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

$ cd URL_Shortener/
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

To stop the database server:
```bash

$ cd URL_Shortener/
$ mysql.server stop

```
Keep in mind that your database should **NOT** be running on the same port as the API.
</br>
___
## Run it in the browser!
This API ships with an example site on how the API can be implemented. It is set up to preform full CRUD using AJAX calls. Just type ``` localhost:3000 ``` in the browser URL after you get the server.js running and you can start going bananas!
</br>
___
## API Endpoints
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

  - This uses the **POST** method to receive the new URL and set a relationship to the **maumasi.fy** short link to be reassigned that should be submitted with the new URL.

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
## Usage

### Unit Testing
You can also do some unit testing using ``` mocha ```.</br>
If you did the ``` npm install ``` then it's already in the app, but you'll still need to install it globally on your machine to use it. </br>
If unit testing is something you like and you don't have ``` mocha ``` installed then just run the following command in the terminal:
```bash

$ cd URL_Shortener/
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

### Run Unit tests in DEBUG mode
To run unit tests in DEBUG mode all you have to do is to define DEBUG as true before running ``` mocha ```, like so:
```bash

$ cd URL_Shortener/
$ DEBUG=true mocha

```
Now you will get a robust output log of all major functions, models, and API route endpoints involved in any particular unit test being executed.

At this time Unit Tests are run against all 6 API endpoints, all services under the serviceRepo directory, and all database CRUD models.

Feel free to add your own unit tests!!

___
## Workflow
This section is meant for contributors.</br>
This project utilizes Git for version control. All instructions in this sections is in reference to ` git `. If you don't have *git* installed on your machine follow the instructions [here to get ` git ` up and running] (https://www.atlassian.com/git/tutorials/install-git)
</br>

The **master** branch is the main branch to contribute code but not the branch used for releasing production code. The production branch is called **release**. From the release branch we'll push out to a staging server as the last filter to catch any mistakes and then promote to a production server.
</br>

### Guidelines
- The **release branch** should not be edited directly
- New features should be built on a *feature branch* and tested before merged into the master branch
- Tag new releases using semantic versioning. Example: ` 1.1.2 ` correlates to **MAJOR.MINOR.PATCH**
</br>

### Patches
Patch concerns fixes only. Lower level patches such as mis-spelled words can be edited on the master branch. If many patch fixes are being made to the code functionality such as changing variable naming conventions then a feature brach should be created for that patch and that branch should be named after that patch such as *patch_1.1.2*. Follow the instructions below to create a feature branch for such a patch.
</br>

Create a new feature branch called patch_1.1.2:
```bash

$ cd URL_Shortener/
$ git checkout -b patch_1.1.2

```

You should see a returned log containing:
```bash

Switched to a new branch 'patch_1.1.2'

```
</br>

Inside this new branch you can make any changes you need to. Before trying to ` merge ` your patch to the **master** branch run the unit tests to make sure you're not committing broken code to the master branch.
```bash

$ cd URL_Shortener/
$ mocha

```
</br>

Only after all tests come back as 'passing' then you can merge the feature branch to the master branch.
```bash

$ cd URL_Shortener/
$ git add .
$ git commit -m "version stable. A brief description of what this patch fixed."
$ git checkout master
$ git merge patch_1.1.2
$ git push -u origin master

```
</br>

Now that the newly patched version of this project is on GitHub you should tag a new release named after the new version, **v1.1.2**. If you don't know how to create a new release [click here and follow GitHub's instructions] (https://help.github.com/articles/creating-releases/).
</br>

### Minor version updates
Adding a new feature to the API would be considered a minor version update. A new feature branch should be made for new features. To do this would be the same as the instructions as for making a patch feature branch except the name of the branch should be semantic to what the new feature is or does.
</br>

Create a new feature branch for the new feature:
```bash

$ cd URL_Shortener/
$ git checkout -b makeItRain

```

You should see a returned log containing:
```bash

Switched to a new branch 'makeItRain'

```
</br>

Inside this new branch you can start building the new makeItRain functionality, but first you should build a unit test(s) for makeItRain. Before trying to ` merge ` your patch to the **master** branch run the unit tests to make sure you're not committing broken code to the master branch.
```bash

$ cd URL_Shortener/
$ mocha

```
</br>

Only after all tests come back as 'passing' then you can merge the feature branch to the master branch.
```bash

$ cd URL_Shortener/
$ git add .
$ git commit -m "version stable. A brief description of what this patch fixed."
$ git checkout master
$ git merge makeItRain
$ git push -u origin master

```
</br>

### Major version updates
A major version increase happens when the a change in the source code is not backwards compatible to previous versions. The instructions for this workflow is the same as for new feature minor version updates.
</br>

___
## Deployment

### Setup
#### Codeship
- [Create a test for the master branch on Codeship] (https://codeship.com)
- [Set environment variables] (https://documentation.codeship.com/continuous-integration/set-environment-variables/)

#### Heroku
- [Create a pipeline] (https://devcenter.heroku.com/articles/pipelines)
- [Use clearDB as the API database by creating adding it as an add-on] (https://devcenter.heroku.com/articles/cleardb)
- [Set environment variables] (https://devcenter.heroku.com/articles/config-vars)
- [Connect GitHub to Heroku] (https://devcenter.heroku.com/articles/github-integration)
  - Check the box labled 'Wait for CI to pass before deploy'
</br>

### Testing
After creating a test on Codeship for the master branch you can move on to run the test by making a push to the master branch.
```bash

$ cd URL_Shortener/
$ git checkout master
$ git add .
$ git commit -m "version stable. some changes"
$ git push -u origin master

```
</br>

### Staging with Heroku
When adding clearDB as an add-on use the URI information as the environment variables. [Click here] (https://devcenter.heroku.com/articles/connecting-to-relational-databases-on-heroku-with-java) to see how to break apart a URI to find the database credentials.

Anytime the release branch is pushed up to GitHub, the staging server on Heroku will rebuild as long as the master branch passed all the Codeship tests based on the latest master branch code. If all is well then the staging server can 'promote' the release branch code to the production server. To match the release branch to the master branch just merge master into release:
```bash

$ cd URL_Shortener/
$ git checkout release
$ git pull
$ git merge master
$ git push -u origin release

```
Note:
To avoid merge conflicts the release branch should never be edited directly as stated above under Guidelines in this section.


The staging server is used as the last filter before code is pushed over to the production server. Here we can see how the API runs on the planned server environment as well as testing functionality, looking for mis-spelled words, check that the API AJAX calls are working as expected.
</br>

### Production with Heroku
For the production server a different clearDB instance should be used as an add-on than the one used on the staging server. Make sure to use the production server's clearDB credentials in the environmental variables instead of the staging server's credentials.
</br>

**Important:**
An extra environment variable should be added to the list for the prodution server, NODE_ENV=production.

After the staging server 'promotes' code over to the production server it should also be checked to make sure everything is working. Remember, this server is live and can be found by the public so it should be exactly the way you intended it to be.
