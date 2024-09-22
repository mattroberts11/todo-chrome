import React from "react";

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Link,
  Typography,
} from "@mui/joy";

const LoginScreen: React.FC = () => (
  <div>
    <Typography level="h4" component="h1">
      Welcome!
    </Typography>
    <Typography level="body-sm">Sign in to continue.</Typography>
    <FormControl>
      <FormLabel>Email</FormLabel>
      <Input
        // html input attribute
        name="email"
        type="email"
        placeholder="johndoe@email.com"
      />
    </FormControl>
    <FormControl>
      <FormLabel>Password</FormLabel>
      <Input name="password" type="password" placeholder="password" />
    </FormControl>
    <Button sx={{ mt: 1 /* margin top */ }}>Log in</Button>
    <Typography
      endDecorator={<Link href="/sign-up">Sign up</Link>}
      fontSize="sm"
      sx={{ alignSelf: "center" }}
    >
      Don't have an account?
    </Typography>
  </div>
);

export default LoginScreen;
