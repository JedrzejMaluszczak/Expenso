export interface LoginForm {
  username: string;
  password: string;
}

export interface RegisterForm {
  username: string;
  email: string;
  password1: string;
  password2: string;
}

export interface PasswordChangeForm {
  oldPassword: string;
  newPassword1: string;
  newPassword2: string;
}
