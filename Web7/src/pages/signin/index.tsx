import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";

export default function Index() {

    const [email, setEmail] = useState("");
    const [isEmailError, setIsEmailError] = useState("");

    const [password, setPassword] = useState("");
    const [isPasswordError, setIsPasswordError] = useState("");

    return <Box sx={{
        display : "flex",
        flexDirection: "column",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        justifyContent: "space-around"
    }}>
        <Box>
            <TextField
                value={email}
                onChange={(ev)=>setEmail(ev.target.value)}
                label={"Enter email"}
                error={!!isEmailError}
                onBlur={() => {
                    if (!email.match(/^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/g)) {
                        setIsEmailError("Incorrect email")
                    }
                }}
                onFocus={()=>{setIsEmailError("")}}
                helperText={isEmailError}
            />
            <TextField
                value={password}
                onChange={(ev)=>setPassword(ev.target.value)}
                label={"Enter password"}
                error={!!isPasswordError}
                onBlur={() => {
                    if (password.length < 8) {
                        setIsPasswordError("Password should contain at least 8 characters")
                    }
                    if (password.length > 15) {
                        setIsPasswordError("The password must consist of a maximum of 15 characters")
                    }
                    if (password.match(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7-15}$/g)){
                        setIsPasswordError("Password should contain only latin symbols, min one number,\n one lowercase letter, one uppercase letter and one special character")
                    }
                }}
                onFocus={()=>{setIsPasswordError("")}}
                helperText={isPasswordError}
            />
            <Button variant={"outlined"} >Sign In</Button>
        </Box>
    </Box>

}