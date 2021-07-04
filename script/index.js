/* ----------------------------------------------- */
/* -                                             - */
/* ------------------ JAVSCRIPT ------------------ */
/* -                                             - */
/* ----------------------------------------------- */
window.onload = () => {
  /* local storage box */
  const location = window.location;
  const storage = window.localStorage;
  let credentials;

  const PUBLIC_APP_DOMAIN = "drenskywalker.github.io";
  const PUBLIC_APP_DEFAULT_PATH = "/local-login-system";

  const pageName = {
    domain:
      location.host === PUBLIC_APP_DOMAIN
        ? location.pathname.replace(PUBLIC_APP_DEFAULT_PATH, "")
        : "/",
    index: "index.html",
    login: "login.html",
    register: "register.html",
    profile: "profile.html",
  };

  console.log(pageName);
  console.log(location);
  console.log(PUBLIC_APP_DOMAIN);
  console.log(location.pathname.replace(PUBLIC_APP_DEFAULT_PATH, ""));

  if (storage.getItem("credentials") != null) {
    credentials = JSON.parse(storage.getItem("credentials"));
  }

  /* ----------------------------------------------- */
  /* -                                             - */
  /* ----------------- INDEX PAGE ------------------ */
  /* -                                             - */
  /* ----------------------------------------------- */
  if (
    location.pathname === pageName.domain ||
    location.href.includes(pageName.index)
  ) {
    storage.getItem("credentials") !== null && credentials.logout !== true
      ? location.replace(pageName.profile)
      : location.replace(pageName.login);

    /* ----------------------------------------------- */
    /* -                                             - */
    /* ---------------- PROFILE PAGE ----------------- */
    /* -                                             - */
    /* ----------------------------------------------- */
  } else if (location.href.includes(pageName.profile)) {
    (storage.getItem("credentials") === null || credentials.logout === true) &&
      location.replace(pageName.login);

    const name = document.querySelector("#title");
    const email = document.querySelector("#email");
    const avatar = document.querySelector("#avatar");
    const btnSignout = document.querySelector("#logout");
    const btnDelete = document.querySelector("#delete");

    /* dialog box */
    const dialogBox = document.querySelector("#dialog-container");
    const dialogDummy = document.querySelector("#dialog-dummy");
    const dialogCloseIcon = document.querySelector("#dialog-icon");
    const btnDeleteConfirm = document.querySelector("#button-delete");
    const btnDeleteCancel = document.querySelector("#button-cancel");

    name.innerHTML = `${credentials.name} ${credentials.lastname}`;
    email.innerHTML = credentials.email;
    avatar.src = credentials.avatar;

    const toggleDialogBox = () => {
      dialogBox.classList.toggle("visible");
    };

    const signout = () => {
      credentials.logout = true;
      storage.setItem("credentials", JSON.stringify(credentials));
      location.replace(pageName.login);
    };

    const deleteCredentials = () => {
      storage.clear();
      location.replace(pageName.login);
    };

    btnSignout.addEventListener("click", signout);
    btnDelete.addEventListener("click", toggleDialogBox);
    dialogDummy.addEventListener("click", toggleDialogBox);
    dialogCloseIcon.addEventListener("click", toggleDialogBox);
    btnDeleteCancel.addEventListener("click", toggleDialogBox);
    btnDeleteConfirm.addEventListener("click", deleteCredentials);

    /* ----------------------------------------------- */
    /* -                                             - */
    /* ----------- LOGIN AND REGISTER PAGE ----------- */
    /* -                                             - */
    /* ----------------------------------------------- */
  } else if (
    location.href.includes(pageName.login) ||
    location.href.includes(pageName.register)
  ) {
    storage.getItem("credentials") !== null &&
      credentials.logout !== true &&
      location.replace(pageName.profile);

    /* swiper settings */
    const swiper = new Swiper(".swiper-container", {
      autoplay: {
        delay: 3000,
      },
      pagination: {
        el: ".swiper-pagination",
      },
      speed: 600,
      parallax: true,
    });

    /* for passing credentials in localstorage */
    let credentialsObj = {};

    /* form */
    const form = document.querySelector("#form").elements;

    /* pasw inputs */
    const paswMinLength = 6;

    /* file inputs */
    const imageContainer = document.querySelector(".image-container");
    const inputImage = document.querySelector(".image");

    /* buttons */
    const inputSubmit = document.querySelector("#submit");
    const buttonLink = document.querySelector("#button");

    /* dialog box */
    const dialogBox = document.querySelector("#dialog-container");
    const dialogDummy = document.querySelector("#dialog-dummy");
    const dialogCloseIcon = document.querySelector("#dialog-icon");
    const dialogTitle = document.querySelector("#dialog-title");
    const dialogErrorMessage = document.querySelector("#dialog-error");

    /* messages */
    const messageFieldRequired = "- This field is required!";
    const messageWrongPasw = " - Password doesn't match!";
    const messageWrongPaswLength =
      "- Must be at least " + paswMinLength + " characters long";
    const titleAccountDoNotExists = "Account not found";
    const titleAccountAlreadyExists = "Account found";
    const titleAccountWrongPasw = "Wrong password";
    const messageAccountDoNotExists = "This account does not exists!";
    const messageAccountAlreadyExists = "This account already exists!";
    const messageAccountWrongPasw = "The password you entered is incorrect!";
    const titleFormNotFilled = "Form not filled";
    const messageFormNotFilled = "All the fields are required!";
    const messageWrongEmail = " - Email is not valid!";

    /* ----------------------------------------------- */
    /* ------ SWITCH BETWEEN LOGIN AND REGISTER ------ */
    const switchPage = () => {
      location.href.includes(pageName.login)
        ? location.replace(pageName.register)
        : location.replace(pageName.login);
    };

    /* ----------------------------------------------- */
    /* ------------ COLORS WRONG FIELDS -------------- */
    const displayInputError = (input, label, message, state) => {
      if (state === "add") {
        input.classList.add("error-border");
        label.classList.add("error-color");
        label.querySelector(".alert").innerHTML = message;
      } else {
        input.classList.remove("error-border");
        label.classList.remove("error-color");
        label.querySelector(".alert").innerHTML = "";
      }
    };

    /* ----------------------------------------------- */
    /* ------------ FORM FILLED CONTROL -------------- */
    const checkFormFilled = () => {
      let isFilled = true;
      Array.from(form).forEach((element) => {
        if (element.value === "") {
          isFilled = false;
          displayInputError(
            element,
            element.labels[0],
            messageFieldRequired,
            "add"
          );
        } else {
          displayInputError(element, element.labels[0], "", "remove");
        }
      });
      return isFilled;
    };

    /* ----------------------------------------------- */
    /* --------------- EMAIL VALIDATION -------------- */
    const validateEmail = (email) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    };

    const isEmailValid = () => {
      let isValid;
      let email = form["email"];

      if (validateEmail(email.value)) {
        displayInputError(email, email.labels[0], "", "remove");
        isValid = true;
      } else {
        displayInputError(email, email.labels[0], messageWrongEmail, "add");
        isValid = false;
      }
      return isValid;
    };

    /* ----------------------------------------------- */
    /* ------ PASSWORD MATCH AND LENGTH CONTROL ------ */
    const isPasswordValid = () => {
      let isValid;
      let password = form["password"];
      let cpassword = form["cpassword"];

      if (password.value !== cpassword.value) {
        displayInputError(password, password.labels[0], "", "add");
        displayInputError(
          cpassword,
          cpassword.labels[0],
          messageWrongPasw,
          "add"
        );
        isValid = false;
      } else {
        displayInputError(password, password.labels[0], "", "remove");
        displayInputError(cpassword, cpassword.labels[0], "", "remove");
        if (password.value.length < paswMinLength) {
          displayInputError(
            password,
            password.labels[0],
            messageWrongPaswLength,
            "add"
          );
          isValid = false;
        } else {
          displayInputError(password, password.labels[0], "", "remove");
          isValid = true;
        }
      }

      return isValid;
    };

    /* ----------------------------------------------- */
    /* -------- GET IMAGE AND SHOW PREVIEW ----------- */
    const getBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    const showImagePreview = async () => {
      imageContainer.style.display = "block";
      inputImage.src = await getBase64(form["file"].files[0]);
    };

    /* ----------------------------------------------- */
    /* ----------- SAVE IN LOCAL STORAGE ------------- */
    const saveCredentials = async () => {
      credentialsObj.name = form["fname"].value;
      credentialsObj.lastname = form["lname"].value;
      credentialsObj.email = form["email"].value;
      credentialsObj.password = form["password"].value;
      credentialsObj.avatar = await getBase64(form["file"].files[0]);
      credentialsObj.logout = true;

      storage.setItem("credentials", JSON.stringify(credentialsObj));
      location.replace(pageName.login);
    };

    /* ----------------------------------------------- */
    /* ------------- TOGGLE DIALOG BOX --------------- */
    const toggleDialogBox = (title, message) => {
      dialogBox.classList.toggle("visible");
      dialogTitle.innerHTML = title;
      dialogErrorMessage.innerHTML = message;
    };

    /* ----------------------------------------------- */
    /* ------------- REGISTER FUNCTION --------------- */
    const register = () => {
      if (checkFormFilled()) {
        if (!isEmailValid()) {
          toggleDialogBox(
            "Email not valid",
            "The email has an invalid format!"
          );
        } else if (!isPasswordValid()) {
          toggleDialogBox(
            "Password not valid",
            "The password is either too short or doesn't match!"
          );
        } else {
          if (storage.getItem("credentials") !== null) {
            if (form["email"].value !== credentials.email) {
              saveCredentials();
            } else {
              toggleDialogBox(
                titleAccountAlreadyExists,
                messageAccountAlreadyExists
              );
            }
          } else {
            saveCredentials();
          }
        }
      } else {
        toggleDialogBox(titleFormNotFilled, messageFormNotFilled);
      }
    };

    /* ----------------------------------------------- */
    /* --------------- LOGIN FUNCTION ---------------- */
    const login = () => {
      if (checkFormFilled()) {
        if (storage.getItem("credentials") !== null) {
          if (form["email"].value === credentials.email) {
            if (form["password"].value === credentials.password) {
              credentials.logout = false;
              storage.setItem("credentials", JSON.stringify(credentials));
              location.replace(pageName.profile);
            } else {
              toggleDialogBox(titleAccountWrongPasw, messageAccountWrongPasw);
            }
          } else {
            toggleDialogBox(titleAccountDoNotExists, messageAccountDoNotExists);
          }
        } else {
          toggleDialogBox(titleAccountDoNotExists, messageAccountDoNotExists);
        }
      } else {
        toggleDialogBox(titleFormNotFilled, messageFormNotFilled);
      }
    };

    /* ----------------------------------------------- */
    /* ------------------ LISTENERS ------------------ */
    if (location.href.includes(pageName.register)) {
      form["password"].addEventListener("change", isPasswordValid);
      form["cpassword"].addEventListener("change", isPasswordValid);
      form["file"].addEventListener("change", showImagePreview);
      inputSubmit.addEventListener("click", register);
    } else if (location.href.includes(pageName.login)) {
      inputSubmit.addEventListener("click", login);
    }

    form["email"].addEventListener("change", isEmailValid);
    buttonLink.addEventListener("click", switchPage);
    dialogDummy.addEventListener("click", toggleDialogBox);
    dialogCloseIcon.addEventListener("click", toggleDialogBox);
  }
};
