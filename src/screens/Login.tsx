import {
  Box,
  Container,
  Typography,
  TextField,
  Divider,
  Button,
} from "@mui/material";
import React, { useId } from "react";
import overlayImage from "../assets/overlay.svg";
import logo from "../assets/logo_highbridge.png";
import { theme } from "../theme";
import {
  Google as GoogleIcon,
  Facebook as FacebookIcon,
  Apple as AppleIcon,
} from "@mui/icons-material";
import { auth } from "../firebaseConfig"; // Your Firebase config file
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";


const Login: React.FC = () => {
  const id = useId();

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
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase", fontFamily: "Poppins" }}
          >
            Welcome Back!
          </Typography>
          <Typography variant="body1" sx={{ fontFamily: "Poppins" }}>
            Log in to your Account
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

            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-between"
              m="4"
            >
              <Box>
                <input type="checkbox" id={id} style={{ accentColor: "red" }} />
                <label
                  htmlFor={id}
                  style={{ fontFamily: "Poppins", fontSize: "12px" }}
                >
                  Remember me
                </label>
              </Box>

              <Box>
                <Typography
                  variant="small"
                  sx={{
                    fontFamily: "Poppins",
                    mt: 4,
                    fontSize: "12px",
                    color: theme.palette.text.primary,
                  }}
                >
                  Forgot Password ?
                </Typography>
              </Box>
            </Box>

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
            >
              Log In
            </Button>
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
            {/* Social Login Buttons  */}

            <Button
              variant="outlined"
              fullWidth
              startIcon={<GoogleIcon sx={{ mr: 6 }} />}
              sx={{ mb: 1, textTransform: "capitalize" }}
            >
              Log In with Google
            </Button>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<FacebookIcon sx={{ mr: 6 }} />}
              sx={{ mb: 1, textTransform: "capitalize" }}
            >
              Log In with Facebook
            </Button>

            <Button
              variant="outlined"
              sx={{ textTransform: "capitalize" }}
              fullWidth
              startIcon={<AppleIcon sx={{ mr: 7 }} />}
            >
              Log In with Apple
            </Button>
            {/* Social Login Buttons  */}
          </Box>

          <Typography
            variant="body"
            sx={{
              fontSize: "12px",
              mt: 1,
              textAlign: "center",
              fontFamily: "Poppins",
            }}
          >
            {" "}
            New User ?{" "}
            <span style={{ fontWeight: 700, textDecoration: "underline" }}>
              SIGN UP HERE
            </span>
          </Typography>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
