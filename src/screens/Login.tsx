import {
  Box,
  Container,
  Typography,
  TextField,
  Divider,
  Button,
  Snackbar,
  Alert,
  CircularProgress,
  Link,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import overlayImage from "../assets/overlay.svg";
import logo from "../assets/logo_highbridge.png";
import { theme } from "../theme";
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon,
} from "@mui/icons-material";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  AuthError,
  sendPasswordResetEmail,
  OAuthProvider,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../FirebaseConfig";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isResetPassword, setIsResetPassword] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/dashboard");
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const validateForm = () => {
    if (!email) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!isResetPassword && !password) {
      setError("Password is required");
      return false;
    }
    if (!isResetPassword && password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    setError("");
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      const error = err as AuthError;
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordReset = async () => {
    if (!validateForm()) {
      setOpenSnackbar(true);
      return;
    }

    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      setError("Password reset email sent. Please check your inbox.");
      setOpenSnackbar(true);
      setIsResetPassword(false);
    } catch (err) {
      const error = err as AuthError;
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      const error = err as AuthError;
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookLogin = async () => {
    setLoading(true);
    try {
      const provider = new FacebookAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err) {
      const error = err as AuthError;
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAppleLogin = async () => {
    setLoading(true);
    try {
      const provider = new OAuthProvider('apple.com');
      await signInWithPopup(auth, provider);
      navigate("/workflow");
    } catch (err) {
      const error = err as AuthError;
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (error: AuthError) => {
    console.error("Authentication error:", error);
    switch (error.code) {
      case "auth/user-not-found":
        setError("User not found. Please check your email.");
        break;
      case "auth/wrong-password":
        setError("Incorrect password. Please try again.");
        break;
      case "auth/invalid-email":
        setError("Invalid email format.");
        break;
      case "auth/too-many-requests":
        setError("Too many attempts. Please try again later.");
        break;
      case "auth/account-exists-with-different-credential":
        setError("An account already exists with the same email but different sign-in method.");
        break;
      case "auth/popup-closed-by-user":
        setError("Sign-in popup was closed before completing.");
        break;
      case "auth/operation-not-allowed":
        setError("This authentication method is not enabled.");
        break;
      case "auth/network-request-failed":
        setError("Network error. Please check your connection.");
        break;
      default:
        setError("Authentication failed. Please try again.");
    }
    setOpenSnackbar(true);
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        backgroundImage: `url(${overlayImage})`,
        backgroundSize: "cover",
        width: "100%",
        height: "100%",
        alignItems: "center",
        position: "fixed",
        top: 0,
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center",
          height: "100vh",
          m: theme.spacing(0),
        }}
      >
        <Box
          maxWidth="md"
          sx={{
            display: { lg: "flex", sm: "none" },
            flexDirection: "column",
            justifyContent: "center",
            width: "350px",
            p: 3,
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <img src={logo} alt="logo" style={{ width: 200, height: "auto" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              marginTop: theme.spacing(10),
            }}
          >
            <Typography
              variant="h2"
              sx={{ color: theme.palette.background.paper }}
            >
              Building the Future...
            </Typography>
            <Typography
              variant="body"
              sx={{
                color: theme.palette.background.paper,
                marginTop: theme.spacing(1),
                fontFamily: "Zen Kaku Gothic Antique, sans-serif",
              }}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </Typography>
          </Box>
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          sx={{
            backgroundColor: theme.palette.background.paper,
            p: 2,
            borderRadius: 2,
            width: "420px",
          }}
          component="form"
          onSubmit={isResetPassword ? handlePasswordReset : handleLogin}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase", fontFamily: "Poppins" }}
          >
            {isResetPassword ? "Reset Password" : "Welcome Back!"}
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
            {isResetPassword ? "Enter your email to reset password" : "Log in to your Account"}
          </Typography>

          <Box>
            <Typography
              variant="small"
              sx={{
                fontFamily: "Poppins",
                mt: 4,
                color: theme.palette.text.secondary,
              }}
            >
              Email
            </Typography>
            <TextField
              placeholder="Type here..."
              variant="outlined"
              fullWidth
              margin="normal"
              size="small"
              value={email}
              onChange={handleEmailChange}
              sx={{
                "& .MuiInputLabel-root": {
                  color: theme.palette.text.secondary,
                  transform: "translate(14px, 16px) scale(1)",
                  "&.Mui-focused": {
                    color: theme.palette.primary.main,
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                  "&.MuiFormLabel-filled": {
                    transform: "translate(14px, -9px) scale(0.75)",
                  },
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: theme.palette.grey[300],
                  },
                  "&:hover fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: theme.palette.primary.main,
                  },
                  "& .MuiInputBase-root": {
                    height: theme.typography.small,
                  },
                  "& .MuiInputBase-input": {
                    fontSize: theme.typography.small,
                  },
                },
              }}
            />

            {!isResetPassword && (
              <>
                <Typography
                  variant="small"
                  sx={{
                    fontFamily: "Poppins",
                    mt: 3,
                    color: theme.palette.text.secondary,
                  }}
                >
                  Password
                </Typography>
                <TextField
                  placeholder="Type here..."
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  size="small"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  sx={{
                    "& .MuiInputLabel-root": {
                      color: theme.palette.text.secondary,
                      transform: "translate(14px, 16px) scale(1)",
                      "&.Mui-focused": {
                        color: theme.palette.primary.main,
                        transform: "translate(14px, -9px) scale(0.75)",
                      },
                      "&.MuiFormLabel-filled": {
                        transform: "translate(14px, -9px) scale(0.75)",
                      },
                    },
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        borderColor: theme.palette.grey[300],
                      },
                      "&:hover fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: theme.palette.primary.main,
                      },
                      "& .MuiInputBase-root": {
                        height: theme.typography.small,
                      },
                      "& .MuiInputBase-input": {
                        fontSize: theme.typography.small,
                      },
                    },
                  }}
                />
              </>
            )}

            {!isResetPassword && (
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="space-between"
                m="4"
              >
                <Box>
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={handleRememberMeChange}
                    style={{ accentColor: "red" }}
                  />
                  <label
                    htmlFor="rememberMe"
                    style={{ fontFamily: "Poppins", fontSize: "12px" }}
                  >
                    Remember me
                  </label>
                </Box>

                <Box>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => setIsResetPassword(true)}
                    sx={{
                      fontFamily: "Poppins",
                      fontSize: "12px",
                      color: theme.palette.text.primary,
                      textDecoration: "none",
                      '&:hover': {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Forgot Password?
                  </Link>
                </Box>
              </Box>
            )}

            <Button
              variant="contained"
              color="error"
              sx={{
                mt: 4,
                color: theme.palette.background.paper,
                textTransform: "capitalize",
                backgroundColor: theme.palette.error.main,
                fontFamily: "Poppins",
                p: 1,
              }}
              fullWidth
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : isResetPassword ? (
                "Send Reset Link"
              ) : (
                "Log In"
              )}
            </Button>

            {isResetPassword ? (
              <Box sx={{ textAlign: "center", mt: 2 }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => setIsResetPassword(false)}
                  sx={{
                    fontFamily: "Poppins",
                    fontSize: "12px",
                    color: theme.palette.text.primary,
                  }}
                >
                  Back to Login
                </Link>
              </Box>
            ) : (
              <>
                <Box sx={{ display: "flex", alignItems: "center", my: 2 }}>
                  <Divider sx={{ flexGrow: 1 }} />
                  <Typography
                    variant="body"
                    sx={{
                      px: 2,
                      fontFamily: "Poppins",
                      fontWeight: 700,
                      fontSize: "13px",
                    }}
                  >
                    Or
                  </Typography>
                  <Divider sx={{ flexGrow: 1 }} />
                </Box>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<GoogleIcon sx={{ mr: 6 }} />}
                  sx={{ mb: 1, textTransform: "capitalize" }}
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  Log In with Google
                </Button>

                <Button
                  variant="outlined"
                  fullWidth
                  startIcon={<FacebookIcon sx={{ mr: 6 }} />}
                  sx={{ mb: 1, textTransform: "capitalize" }}
                  onClick={handleFacebookLogin}
                  disabled={loading}
                >
                  Log In with Facebook
                </Button>

                <Button
                  variant="outlined"
                  sx={{ textTransform: "capitalize" }}
                  fullWidth
                  startIcon={<AppleIcon sx={{ mr: 7 }} />}
                  onClick={handleAppleLogin}
                  disabled={loading}
                >
                  Log In with Apple
                </Button>
              </>
            )}
          </Box>

          {!isResetPassword && (
            <Typography
              variant="body"
              sx={{
                fontSize: "12px",
                mt: 1,
                textAlign: "center",
                fontFamily: "Poppins",
              }}
            >
              New User?{" "}
              <Link
                href="/signup"
                sx={{
                  fontWeight: 700,
                  textDecoration: "underline",
                  color: theme.palette.text.primary,
                }}
              >
                SIGN UP HERE
              </Link>
            </Typography>
          )}
        </Box>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={error.includes("sent") ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default Login;