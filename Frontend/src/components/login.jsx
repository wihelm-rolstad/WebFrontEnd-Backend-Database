import './login.css'

const login = () => {
    return(
        <>
            <h1>Log In</h1>
            <div id="user-inputs">
                <input type="text" placeholder="your email adress"></input>
                <input type="password" placeholder="password"></input>
                <button id="login-button"> Log in</button>
            </div>
        </>
    )
}

export default login