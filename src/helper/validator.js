import validator from "validator";

export const nameValidator = (name) => {
    if (!validator.isAlpha(name.replace(/\s/g, ''))) {
        return 'Name must contain only alphabetic characters.';
    }

    if (validator.isWhitelisted(name, ' \t')) {
        return 'Name must not contain any whitespace characters.';
    }

    return '';
}

export const emailValidator = (email) => {
    if (!validator.isEmail(email)) {
        return 'Enter a valid email';
    }

    return '';
}

export const phoneValidator = (phone) => {
    if (!validator.isMobilePhone(phone, 'any', { strictMode: false })) {
        return 'Please enter a valid phone number.';
    }

    return '';
}

export const postValidator = (title, content) => {
  const errors = {};

  // Validate title
  if (!validator.isLength(title, { min: 5 })) {
    errors.title = 'Title must be between 5 and 100 characters';
  }

  // Validate content
  if (!validator.isLength(content, { min: 10 })) {
    errors.content = 'Content must be at least 10 characters long';
  }





  return errors;
};

export const passwordValidator = (password) => {
    if (!validator.isLength(password, { min: 6 })) {
        return 'Password must be at least 6 characters long.';
    }

    return '';
}
