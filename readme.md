# Local Login System

A local login system using "*local storage*" to save user credentials.\
The project consists of three pages.

<p align="center">
  <img src="https://it.seaicons.com/wp-content/uploads/2015/10/Satellite-icon.png">
</p>


## 🛸 Login Page

The *login page* contains a form with two fields (e-mail and password) and a submit button. All fields are required. The user needs to provide a valid email (validated by a regex) and a valid password (at least 6 characters long).

## 🚀 Register Page

The *register page* contains a form with six fields (name, lastname, email, password, confirm password, profile photo) and a submit button. All fields are required. The user needs to provide a valid email (validated by a regex) and a valid password (at least 6 characters long, matched with the confirm password field).\
In both the *login* and *register* page, after filling all the fields and clicking the submit button, if the credentials provided are incorrect a dialog shows up to notify the user that an error occured; if the credentials are correct in the *login* page, the user will be redirected to the *profile* page, if the credentials are correct in the *register* page the user will be redirected to the *login* page.

## 🌎 Profile Page
The *profile page* contains a profile photo, the name and the last name of the user and the email user in the registration form, along with two buttons (log out and delete account).\
After clicking the log out button the attribute "logout" of the object inside the local storage is modified from false to true: the user is no more logged in and is redirected to the *login* page. After clicking the delete button a modal shows up to ask the user if he really want to delete the account: the user can cancel or confirm the action. If the user confirms the action, the local storage is cleared and the user is redirected to the *login* page.

# License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
