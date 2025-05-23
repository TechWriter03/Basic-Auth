import { useState } from "react"
import '../style.css'
import { useNavigate } from "react-router-dom"

const Register = () => {

    const [username,setUsername]=useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')

    const navigate = useNavigate()

    const addUser = async (e) => {
        e.preventDefault()
        const checkEmail = await fetch('http://localhost:8000/check-email', {
            method:'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({email})
        })
        if(checkEmail.status === 200) {
            if(password === confirmPassword) {
                const user = await fetch('http://localhost:8000/add-user', {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify({name:username,email,password})
                })
                console.log('User added: ' + user)
                navigate('/')
            }
            else {
                alert('password and confirm password must be same')
            }
        }
        else {
            alert('Email already exists !')
        }
    }

    return (
        <div>
            <form className="login-form">
                <label><h3>Username</h3></label>
                <input type="text" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                <label><h3>Email</h3></label>
                <input type="email" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label><h3>Password</h3></label>
                <input type="password" placeholder="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label><h3>Confirm Password</h3></label>
                <input type="password" placeholder="confirm password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <button className="btn" onClick={addUser}>Register</button>
            </form>
        </div>
    )
}

export default Register;