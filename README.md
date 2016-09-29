
#Maumasi's Awesome URL Shortener!


Open your terminal if you're on a Unix or Linus machine if you're not already after doing the pull request. </br>
Install all the **dependancies** and **dev dependancies** for the app with the all important **npm install**:
```bash
$ cd URL_Shortener
$ npm install
```
</br>

To run the node.js server up and running you'll have to navigate to the </br>
server.js file then use the key word node to tell node.js to run the file:
```bash
$  node src/server.js
```
By default the port is set to 3000, you should also see ``` Server running on port 3000 ``` stated in the terminal </br>
after you have the server running, if you don't see it something failed and the server should be re-started or you may have </br>
forgotten to run the ``` $ npm install ``` command. </br>
\*\* **Remember, you'll have to re-run this command every time you want to check file changes in the bowser** \*\*
</br>
</br>

If you have **nodemon** installed, ``` npm i -g nodemon```, you can simply use:
```bash
$ nodemon src/server.js
```
Using ``` nodemon ``` will do a live reload for you every time you save a file in the project... *most of the time*.
If you do have to manually reload the server just use the ``` $ rs ``` command to 'restart server'. It's kinda awesome.
</br>

After you have the app up and running there are 3 endpoints currently for the API:

1. **/api/v1/status**
  - This is used to check the status of the API if you need to do some debugging.

2. **/api/v1/url**
  - This uses the **POST** method to receive the original URL and set a relationship to the new **maumasi.fy** URL.

3. **/maumasi.fy/:wild_card**
  - The */:wild_card* will be for the ID of the original URL in the database in **v2** of this API.
