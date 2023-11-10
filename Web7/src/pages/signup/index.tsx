import {Box, Button, TextField} from "@mui/material";
import {useState} from "react";

export default function Index() {
    const [username, setUsername] = useState("");
    const [isUsernameError, setIsUsernameError] = useState("");

    const [password, setPassword] = useState("");
    const [isPasswordError, setIsPasswordError] = useState("");

    const [nickname, setNickname] = useState("");
    const [isNicknameError, setIsNicknameError] = useState("");

    const [email, setEmail] = useState("");
    const [isEmailError, setIsEmailError] = useState("");

    const [repeatPassword, setRepeatPassword] = useState("");
    const [isRepeatPasswordError, setIsRepeatPasswordError] = useState("");

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
                value={username}
                onChange={(ev)=>setUsername(ev.target.value)}
                label={"Enter username"}
                error={!!isUsernameError}
                onBlur={() => {
                    if (username.length < 3) {
                        setIsUsernameError("Username should be at least 3 characters")
                    }
                }}
                onFocus={()=>{setIsUsernameError("")}}
                helperText={isUsernameError}
            />
            <TextField
                value={nickname}
                onChange={(ev)=>setNickname(ev.target.value)}
                label={"Enter nickname"}
                error={!!isNicknameError}
                onBlur={() => {
                    if (nickname.length < 3) {
                        setIsNicknameError("Nickname should contain at least 3 characters")
                    }
                }}
                onFocus={()=>{setIsNicknameError("")}}
                helperText={isNicknameError}
            />
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
            <TextField
                value={repeatPassword}
                onChange={(ev)=>setRepeatPassword(ev.target.value)}
                label={"Repeat password"}
                error={!!isRepeatPasswordError}
                onBlur={() => {
                    if (!(password == repeatPassword)) {
                        setIsRepeatPasswordError("Passwords don't match")
                    }
                }}
                onFocus={()=>{setIsRepeatPasswordError("")}}
                helperText={isRepeatPasswordError}
            />
            <Button variant={"outlined"} >Sign Up</Button>
        </Box>
    </Box>

}