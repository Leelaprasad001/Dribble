import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faExclamationTriangle, faCamera , faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import { config } from '../constants'
import axios from 'axios';
import Home from './Home';
export default function Login() {
    const [error, setError] = useState(null);
    const [accept, setAccept] = useState(false);
    const [email, setEmail] = useState('');
    const [openHome, setOpenHome] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreateAccount = async () => {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.username || !formData.password) {
            setError('Please fill all the details.');
            return;
        }
        if (!accept) {
            setError('Please accept all the terms & conditions');
            return;
        }
        setError(null);
      
        const payload = {
            username: formData.username,
            password: formData.password
        };
        try {
            const response = await axios.post(`${config.url.API_BASE_URL}/api/login`, payload);
            if (response.status === 200) {
                setOpenHome(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError('User not found');
            } else {
                setError('Server Error. Try again after sometime.');
            }
        }
    };
    
    if (openHome) {
        return <Home email={email} sendFrom={'login'} />;
    }

  return (
    <section className=" h-screen bg-neutral-200 light:bg-neutral-700">
        <div className="rcol container h-full flex justify-center items-center p-10">
            <div className="flex flex-wrap w-full lg:w-screen">
                <div className="rcol1 w-full lg:w-1/3 relative p-10" style={{ backgroundColor: '#F2D184' }}>
                    <div>
                        <img
                            src="logo.png"
                            alt="logo"
                            style={{ maxWidth: '100px', height: '30px' }}
                        />
                    </div>
                    <div style={{ marginTop: '10px', color: '#856015', fontSize: '1.4rem', fontWeight: 'bold' }}>
                        <h1>Discover the World's top <br/>Designers & Creatives</h1>
                    </div>
                    <div>
                        <img
                            src="register.png"
                            alt="logo"
                            style={{ maxWidth: '100%', height: 'auto' }}
                        />
                    </div>
                    <div style={{ marginTop: '5rem', color: '#856015', fontSize: '0.9rem', fontWeight: 'bold'}}>
                        <h5>Art by <u>Peter Tarka</u></h5>
                    </div>
                </div>


                <div className="w-full lg:w-2/3 relative">
                <div className="block bg-white shadow-lg light:bg-neutral-800 p-10" style={{ height: '100%'}}>
                    <div style={{ fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end'}}>
                        <p>Don't have an account? <a href="/" className="text-blue-500">Sign Up</a></p>
                    </div>
                    <div className="md:px-16 lg:px-24 xl:px-32">
                    <h1 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>Sign in to Dribble</h1>
                    <p style={{ minHeight: '25px'}}>{error && <span style={{color: '#D20062'}}><FontAwesomeIcon icon={faExclamationCircle} style={{ marginRight: '5px' }}/>{error}</span>}</p>
                    
                    <form>
                        <div className="w-full sm:w-2/2">
                        <label htmlFor="username" className="block mb-2" style={{ fontWeight: 'bold' }}>Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleInputChange}
                            placeholder="Enter your username"
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:border-transparent bg-gray-100"
                        />
                        </div>
                        <br />
                        <div className="w-full sm:w-2/2">
                        <label htmlFor="password" className="block mb-2" style={{ fontWeight: 'bold' }}>Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            placeholder="Enter your password"
                            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:border-transparent bg-gray-100"
                        />
                        </div>
                        <br/>
                        <div className="flex items-center mb-4">
                            <input
                            type="checkbox"
                            id="terms"
                            className="mr-2"
                            checked={accept}
                            onChange={(e) => setAccept(e.target.checked)}
                            />
                            <label htmlFor="terms" className="text-sm text-gray-700">
                                <p>Login an account means you're okay with our <span className="text-blue-500">Terms of Service, Privacy Policy</span>, and our default <span className="text-blue-500">Notification Settings</span>.</p>
                            </label>
                        </div>
                        <button
                            type="button"
                            style={{ backgroundColor: '#D20062' }}
                            className="text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={handleCreateAccount}
                            >
                            Login to Dribble
                        </button>
                    </form><br/>
                    <div style={{ fontSize: '0.9rem'}}>
                        <p>This site is protected by reCAPTCHA and the Google <br/> <span className="text-blue-500">Privacy Policy</span> and <span className="text-blue-500">Terms of Service</span> apply.</p>
                    </div> 
                    </div>
                </div>
                </div>
            </div>
        </div>
    </section>
  );
}
