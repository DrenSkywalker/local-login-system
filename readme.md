# Local Login System

A local login system using "local storage" to save user credentials. The project consists of three pages:

* **login**: it contains a form with two fields (email and password) and a submit button; all fields are required and the user needs to provide a valid email (validated by a regex) and a valid password (at least 6 characters);
* **register**: it contains a form with six fields (name, last name, email, password, confirm password, profile photo), and a submit button; all fields are required and the user needs to provide a valid email (validated by a regex) and a valid password (at least 6 characters and both password and confirm password need to match).
In both login and register page, after filling all the fields and clicking on the submit button, if the credentials provided are incorrect a dialog shows up to notify the user that an error occured if not respectively the user is redirected to the profile page or login page;
* **profile**: it contains a profile photo, name and last name, email and two buttons (log out and delete account). After clicking the log out button the attribute "logout" of the object inside local storage is modified from false to true, the user is no more logged in and is redirected to the login page. After clicking the delete button a modal shows up to ask the user if he really want to delete the account: the user can cancel or confirm the action. If the user confirms the action, the local storage is cleared and the user is redirected to the login page.
