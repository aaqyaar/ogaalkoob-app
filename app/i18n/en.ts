const en = {
  common: {
    ok: "OK!",
    cancel: "Cancel",
    back: "Back",
    logOut: "Log Out",
  },
  welcomeScreen: {
    postscript:
      "psst  — This probably isn't what your app looks like. (Unless your designer handed you these screens, and in that case, ship it!)",
    readyForLaunch: "Your app, almost ready for launch!",
    exciting: "(ohh, this is exciting!)",
    letsGo: "Let's go!",
  },
  errorScreen: {
    title: "Something went wrong!",
    friendlySubtitle:
      "This is the screen that your users will see in production when an error is thrown. You'll want to customize this message (located in `app/i18n/en.ts`) and probably the layout as well (`app/screens/ErrorScreen`). If you want to remove this entirely, check `app/app.tsx` for the <ErrorBoundary> component.",
    reset: "RESET APP",
    traceTitle: "Error from %{name} stack",
  },
  emptyStateComponent: {
    generic: {
      heading: "So empty... so sad",
      content: "No data found yet. Try clicking the button to refresh or reload the app.",
      button: "Let's try this again",
    },
  },

  errors: {
    invalidEmail: "Invalid email address.",
  },

  registerScreen: {
    register: "Create An Account 📝",
    enterDetails: "Enter you name, email address and password to continue the app",
    emailFieldLabel: "Email Address",
    nameFieldLabel: "Name",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password here",
    nameFieldPlaceholder: "Enter your name",
    tapToRegister: "Tap to register!",
  },

  loginScreen: {
    signIn: "Sign In 🔐",
    enterDetails: "Please enter your email address / phone number and password to continue.",
    emailFieldLabel: "Email Address",
    passwordFieldLabel: "Password",
    emailFieldPlaceholder: "Enter your email address",
    passwordFieldPlaceholder: "Super secret password here",
    tapToSignIn: "Tap to sign in!",
  },

  forgotPasswordScreen: {
    forgotPassword: "Forgot Password 🔑",
    enterDetails:
      "Enter your email address below and we'll send you an OTP code for verification in the next step.",
    emailFieldLabel: "Email Address",
    emailFieldPlaceholder: "Enter your email address",
    tapToReset: "Tap to reset!",
  },

  verifyCodeScreen: {
    verifyCode: "You've Got Mail 📬",
    enterDetails: "Enter the 6-digit code sent to your email address. {{email}}",
    codeFieldLabel: "Code",
    codeFieldPlaceholder: "Enter your code",
    tapToVerify: "Tap to verify!",
  },

  resetPasswordScreen: {
    resetPassword: "Reset Password 🔑",
    enterDetails: "Enter your new password below.",
    passwordFieldLabel: "Password",
    confirmPasswordFieldLabel: "Confirm Password",
    passwordFieldPlaceholder: "Enter your password",
    tapToReset: "Tap to reset!",
  },
}

export default en
export type Translations = typeof en
