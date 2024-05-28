import  { useState } from 'react';
import img1 from '../assets/img/headphone.jpeg';
import './Landing.css';
import { useNavigate } from 'react-router-dom';

const Landing = () => {


    

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    function onInputChange(event) {
        setFormData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    function onLoginInputChange(event) {
        setLoginData(prev => ({
            ...prev,
            [event.target.name]: event.target.value
        }));
    }

    async function onSubmit(event) {
        event.preventDefault();
        const response = await fetch('http://localhost:8000/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if(response.status===400)
            alert('Username already taken')
        if (response.status === 200) {
            // alert('Registration successful');
            // navigate('/home');
            openModal()
        }
    }

    async function onLoginSubmit(event) {
        console.log();
        event.preventDefault();
        const response = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        });
        if (response.status === 200) {
            // alert('Login successful');
            setIsModalOpen(false);
            const data = await response.json();
            localStorage.setItem('id', data.id)
            localStorage.setItem('username', data.username)
            localStorage.setItem('token', data.token)
            navigate('/library')
        }
    }

    function togglePasswordVisibility() {
        setShowPassword(prev => !prev);
    }

    function openModal() {
        setIsModalOpen(true);
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    return (
        <>
            <div className='w-screen bg-black flex flex-col justify-center items-center gap-12 '>
                <section className='flex justify-evenly items-center w-screen'>
                    <img src={img1} className='py-8 log-img' alt="headphone image" />
                    <div className='flex flex-col '>
                        <h1 className='text-white text-7xl py-8'>MUSIC LIBRARY</h1>
                        <ul>
                            <li>
                                <h2 className='text-white text-2xl'>Add songs to library</h2>
                            </li>
                            <li>
                                <h2 className='text-white text-2xl'>Organize playlists</h2>
                            </li>
                        </ul>
                        <p className='text-white py-8'>about</p>
                    </div>
                </section>
                <section className='text-white pb-28
                '>
                    <h2 className='text-4xl py-3'>Register</h2>
                    <form onSubmit={onSubmit} className='flex flex-col'>
                        <div className='form'>
                            <label htmlFor="username">Username</label>
                            <input onChange={onInputChange} type="text" id="username" name="username" />
                        </div>
                        <div className='form'>
                            <label htmlFor="email">Email</label>
                            <input onChange={onInputChange} type="email" id="email" name="email" />
                        </div>
                        <div className='form relative'>
                            <label htmlFor="password">Password</label>
                            <input onChange={onInputChange} type={showPassword ? "text" : "password"} id="password" name="password" />
                            <span className='absolute right-2 top-2 cursor-pointer' onClick={togglePasswordVisibility}>
                                {showPassword ? 'Hide' : 'Show'}
                            </span>
                        </div>
                        <button className='my-3 px-4 py-2 w-2/6 rounded bg-custom-orange'>Register</button>
                    </form>
                    <p>Already a user? <a href="#" className='text-custom-orange' onClick={openModal}>Login</a></p>
                </section>
            </div>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2>Login</h2>
                        <form onSubmit={onLoginSubmit}>
                            <div className='form'>
                                <label htmlFor="loginUsername">Username</label>
                                <input onChange={onLoginInputChange} type="text" id="loginUsername" name="username" />
                            </div>
                            <div className='form'>
                                <label htmlFor="loginPassword">Password</label>
                                <input onChange={onLoginInputChange} type="password" id="loginPassword" name="password" />
                            </div>
                            <button className='my-3 px-4 py-2 w-full rounded bg-orange-600'>Login</button>
                        </form>
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                </div>
                
            )}
        </>
    );
};

export default Landing;
