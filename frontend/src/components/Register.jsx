import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle, faExclamationTriangle, faCamera , faCheckCircle, } from '@fortawesome/free-solid-svg-icons';
import { config } from '../constants'
import Home from './Home';
import axios from 'axios';
import '../App.css'

export default function Register() {
    const [error, setError] = useState(null);
    const [accept, setAccept] = useState(false);
    const [openMain, setOpenMain] = useState(true);
    const [openProfile, setOpenProfile] = useState(false);
    const [openFinish, setOpenFinish] = useState(false);
    const [userExit, setUserExit] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedOption, setSelectedOption] = useState('');
    const [openHome, setOpenHome] = useState(false);
    const [email, setEmail] = useState('');
    const [upload, setUpload] = useState(false);
    const [uploaded, setUploaded] = useState('Not Uploaded');
    const [formData, setFormData] = useState({
        name: '',
        username: '',
        email: '',
        password: '',
        photo: '',
        location: '',
        bringsto: ''
      });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreateAccount = async () => {
        // const payload = JSON.stringify(formData);
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.name || !formData.username || !formData.email || !formData.password) {
            setError('Please fill all the details.');
            return;
        }
        if (!emailPattern.test(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!accept) {
            setError('Please accept all the terms & conditions');
            return;
        }
        setError(null);
      
        const payload = {
            username: formData.username
        };
        const response = await axios.post(`${config.url.API_BASE_URL}/api/checkUser`, payload);
        if (response.status === 200) {
            setOpenMain(false);
            setOpenProfile(true);
        } else {
            setError('Username has already been taken.');
            setUserExit(true);
        }
    };

    const handleImageChange = async (event) => {
        const image = event.target.files[0];
        setSelectedImage(URL.createObjectURL(image));
        const formData1 = new FormData();
        formData1.append('file', image);

        try {
            const response = await axios.post(`${config.url.API_BASE_URL}/api/fileupload`, formData1, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setFormData({
                ...formData,
                photo: response.data.fileId
            });   
            setUpload(true);
            setUploaded('Uploaded')
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const handleNext= async () => {
        if (!formData.photo) {
            setError('Please wait until photo uploaded');
            return;
        }
        if (!formData.location) {
            setError('Please enter location');
            return;
        }
        setError(null);
        setOpenProfile(false);
        setOpenFinish(true);
    };

    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleFinish = async () => {
        if (!selectedOption) {
            setError('Please select an option');
            return;
        }
        setError(null);
        let option = '';
        if (selectedOption === 'option1') {
            option = 'I am a designer looking to share my work';
        } else if (selectedOption === 'option2') {
            option = 'I am looking to hire a designer';
        } else {
            option = 'I am looking to design inspiration';
        }

        const payload = {
            ...formData,
            bringsto: option
        };
        try {
            const response = await axios.post(`${config.url.API_BASE_URL}/api/register`, payload);
            if (response.status === 201) {
                setOpenFinish(false);
                setOpenHome(true);
                setEmail(formData.email)
            }
        } catch (error) {
            if (error.response && error.response.status === 500) {
                setError('Email alreday exits');
            } else {
                setError('Server Error. Try again after sometime.');
            }
        }
    }

    if (openHome) {
        return <Home email={email} sendFrom={'register'} />;
    }

  return (
    <section className="h-screen bg-neutral-200 light:bg-neutral-700">
        {openMain === true && (
            <div className="rcol container h-full flex justify-center items-center p-10">
                <div className="flex flex-wrap w-full lg:w-screen">
                    <div className=" rcol1 w-full lg:w-1/3 relative p-10" style={{ backgroundColor: '#F2D184' }}>
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
                    <div className="block bg-white shadow-lg light:bg-neutral-800 p-10">
                        <div style={{ fontSize: '0.9rem', fontWeight: 'bold', display: 'flex', justifyContent: 'flex-end'}}>
                            <p>Already a member? <a href="/login" className="text-blue-500">Sign In</a></p>
                        </div>
                        <div className="md:px-16 lg:px-24 xl:px-32">
                        <h1 style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>Sign up to Dribble</h1>
                        <p style={{ minHeight: '25px'}}>{error && <span style={{color: '#D20062'}}><FontAwesomeIcon icon={faExclamationCircle} style={{ marginRight: '5px' }}/>{error}</span>}</p>
                        
                        <form>
                            <div className="flex flex-wrap">
                            <br />
                            <div className="w-full sm:w-1/2 pr-4">
                                <label htmlFor="name" className="block mb-2" style={{ fontWeight: 'bold' }}>Name</label>
                                <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                                className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:border-transparent bg-gray-100"
                                />
                            </div>
                            <div className="w-full sm:w-1/2">
                                <label htmlFor="username" className="block mb-2" style={{ fontWeight: 'bold' }}>
                                    {userExit && <FontAwesomeIcon icon={faExclamationTriangle} style={{ marginRight: '5px', color: '#D20062' }}/>}
                                    Username
                                </label>
                                <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleInputChange}
                                placeholder="Enter your Username"
                                className={`border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none ${userExit ? 'border-red-500 bg-red-100' : 'focus:border-blue-500 focus:border-transparent bg-gray-100'}`}
                                />
                            </div>
                            </div>
                            <br />
                            <div className="w-full sm:w-2/2">
                            <label htmlFor="email" className="block mb-2" style={{ fontWeight: 'bold' }}>Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
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
                                    <p>Creating an account means you're okay with our <span className="text-blue-500">Terms of Service, Privacy Policy</span>, and our default <span className="text-blue-500">Notification Settings</span>.</p>
                                </label>
                            </div>
                            <button
                                type="button"
                                style={{ backgroundColor: '#D20062' }}
                                className="text-white font-bold py-2 px-4 rounded mt-4"
                                onClick={handleCreateAccount}
                                >
                                Create Account
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
        )}

        {openProfile === true && (
            <div className="rcol container h-full flex justify-center items-center p-10">
                <div className="block bg-white shadow-lg light:bg-neutral-800 p-10 w-full lg:w-screen">   
                    <div>
                        <img
                            src="logo.png"
                            alt="logo"
                            style={{ maxWidth: '100px', height: '30px' }}
                        />
                    </div>

                    <div className="md:px-20 lg:px-28 xl:px-60">
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginTop: '1.5rem' }}>Welcome! Let's create your profile</h1>
                        <p>Let others get to know ypu better! You can do these later</p>
                        <p style={{ minHeight: '25px'}}>{error && <span style={{color: '#D20062'}}><FontAwesomeIcon icon={faExclamationCircle} style={{ marginRight: '5px' }}/>{error}</span>}</p>
                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '2rem' }}>Add an avatar</h3>
                        <br/>
                        <div className="flex ">
                            <div className="imgpreview relative w-32 h-32 border-2 border-dashed rounded-full overflow-hidden mr-4">
                                {selectedImage ? (
                                <img
                                    src={selectedImage}
                                    alt="Preview"
                                    className="object-cover w-full h-full"
                                />
                                ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <FontAwesomeIcon icon={faCamera} style={{ opacity: 0.5 }}/>
                                </div>
                                )}
                            </div>
                            
                            <div className="flex flex-col" style={{marginLeft:'1rem', marginTop:'1rem'}}>
                                <label
                                    htmlFor="upload"
                                    className="bg-white text-gray-800 border border-gray-300 shadow-md  px-2 rounded-lg cursor-pointer hover:bg-gray-100 hover:border-gray-400 transition-colors duration-300 ease-in-out"
                                    style={{ minWidth: '120px' }}
                                >
                                    Choose Image
                                </label>
                                <input
                                    type="file"
                                    id="upload"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                                <br/>
                                <p style={{ fontSize: '1rem'}}> &#62; Or choose one of our defaults</p>
                                <p style={{ fontSize: '1rem'}}>{uploaded}</p>
                            </div>
                        </div>

                        <h3 style={{ fontSize: '1rem', fontWeight: 'bold', marginTop: '2rem' }}>Add your location</h3>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                placeholder="Enter your location"
                                style={{
                                    border: 'none',
                                    borderBottom: '2px solid #FAF9F6',
                                    outline: 'none',
                                    fontSize: '1rem',
                                    marginTop: '0.5rem',
                                    paddingBottom: '0.5rem'
                                }}
                                value={formData.location}
                                onChange={handleInputChange}
                            />
                            <br/>
                        <button
                            type="button"
                            style={{ backgroundColor: '#D20062' , marginTop:'4rem' }}
                            className="text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={handleNext}
                            >
                            Next
                        </button>
                    </div>
                    
                </div>
            </div>
        )}

        {openFinish === true && (
            <div className="rcol container h-full flex justify-center items-center p-10">
                <div className=" block bg-white shadow-lg light:bg-neutral-800 p-10 w-full lg:w-screen">   
                    <div>
                        <img
                            src="logo.png"
                            alt="logo"
                            style={{ maxWidth: '100px', height: '30px' }}
                        />
                    </div>

                    <div className="rcol2 block text-center">
                        
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>What brings you to dribble</h1>
                        <p>select the option that best describes you. Don't worry, you can explore other options later.</p>
                        <p style={{ minHeight: '25px'}}>{error && <span style={{color: '#D20062'}}><FontAwesomeIcon icon={faExclamationCircle} style={{ marginRight: '5px' }}/>{error}</span>}</p>
                        
                        <div className='hidden' style={{display:'none'}}>
                            <input
                                type="radio"
                                id="option1"
                                name="options"
                                value="option1"
                                checked={selectedOption === 'option1'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                            <label htmlFor="option1">I'm a designer looking to share my work</label><br/>
                            <input
                                type="radio"
                                id="option2"
                                name="options"
                                value="option2"
                                checked={selectedOption === 'option2'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                            <label htmlFor="option2">I'm looking to hire a designer</label><br/>
                            <input
                                type="radio"
                                id="option3"
                                name="options"
                                value="option3"
                                checked={selectedOption === 'option3'}
                                onChange={(e) => setSelectedOption(e.target.value)}
                            />
                            <label htmlFor="option3">I'm looking to design inspiration</label>
                        </div>
                        <div className="flex imgbox justify-around mt-6 col-12">
                            <div className={`flex flex-col items-center justify-center text-center p-10 border rounded-lg shadow-md ${selectedOption === "option1" ? "border-pink-600" : "border-grey-600"}`} style={{ flex: '1', margin: '0 20px', height: '300px' }} onMouseOver={() => setSelectedOption("option1")}>
                                <img 
                                src="bring1.png" 
                                alt="Image 1" 
                                className={`mb-4 ${selectedOption === "option1" ? "transform -translate-y-4" : ""}`} 
                                style={{ marginTop: selectedOption === "option1" ? "-10rem" : "0" }}
                                />
                                <label htmlFor="option1" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>I'm a designer looking to share my work</label>
                                <br />
                                <input
                                type="radio"
                                name="option"
                                id="option1"
                                value="option1"
                                onChange={handleOptionChange}
                                style={{ display: 'none' }}
                                />

                                {selectedOption === "option1" && (
                                    <div>
                                        <p style={{ fontSize: '1rem' }}>With over 7 million shots from a vast community of designers, Dribble is the leading source for design inspiration</p>
                                        <span style={{color: '#D20062'}}><FontAwesomeIcon icon={faCheckCircle} /></span>
                                    </div>
                                )}
                            </div>

                            <div className={`flex flex-col items-center justify-center text-center p-10 border rounded-lg shadow-md ${selectedOption === "option2" ? "border-pink-600" : "border-gray-600"}`} style={{ flex: '1', margin: '0 20px', height: '300px' }} onMouseOver={() => setSelectedOption("option2")}>
                                <img 
                                src="bring2.png" 
                                alt="Image 2" 
                                className={`mb-4 ${selectedOption === "option2" ? "transform -translate-y-4" : ""}`} 
                                style={{ marginTop: selectedOption === "option2" ? "-10rem" : "0" }}
                                />
                                <label htmlFor="option2" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>I'm looking to hire a designer</label>
                                <br />
                                <input
                                type="radio"
                                name="option"
                                id="option2"
                                value="option2"
                                onChange={handleOptionChange}
                                style={{ display: 'none' }}
                                />

                                {selectedOption === "option2" && (
                                    <div>
                                        <p style={{ fontSize: '1rem' }}>With over 7 million shots from a vast community of designers, Dribble is the leading source for design inspiration</p>
                                        <span style={{color: '#D20062'}}><FontAwesomeIcon icon={faCheckCircle} /></span>
                                    </div>
                                )}
                            </div>

                            <div className={`flex flex-col items-center justify-center text-center p-10 border rounded-lg shadow-md ${selectedOption === "option3" ? "border-pink-600" : "border-gray-600"} `} style={{ flex: '1', margin: '0 20px', height: '300px' }} onMouseOver={() => setSelectedOption("option3")}>
                                <img 
                                src="bring3.png" 
                                alt="Image 3" 
                                className={`mb-4 ${selectedOption === "option3" ? "transform -translate-y-4" : ""}`} 
                                style={{ marginTop: selectedOption === "option3" ? "-10rem" : "0" }}
                                />
                                <label htmlFor="option3" style={{ fontWeight: 'bold', fontSize: '1.3rem' }}>I'm looking to design inspiration</label>
                                <br />
                                <input
                                type="radio"
                                name="option"
                                id="option3"
                                value="option3"
                                onChange={handleOptionChange}
                                style={{ display: 'none' }}
                                />

                                {selectedOption === "option3" && (
                                    <div>
                                        <p style={{ fontSize: '1rem' }}>With over 7 million shots from a vast community of designers, Dribble is the leading source for design inspiration</p>
                                        <span style={{color: '#D20062'}}><FontAwesomeIcon icon={faCheckCircle} /></span>
                                    </div>
                                )}
                            </div>

                        </div>

                        <div style={{marginTop: '3rem', height:'22px'}}>
                            {selectedOption && (
                            <h5 style={{ fontSize: '1rem', fontWeight: 'bold' }}>Anything else? You can select multiple</h5>
                            )}
                        </div>
                        <button
                            type="button"
                            style={{ backgroundColor: '#D20062', width: '200px', marginTop:'1rem' }}
                            className="text-white font-bold py-2 px-4 rounded mt-4"
                            onClick={handleFinish}
                            >
                            Finish
                        </button>

                        <div style={{marginTop: '1rem', height:'16px'}}>
                            {selectedOption && (
                            <p style={{ fontSize: '1rem' }}>or Press RETURN</p>
                            )}
                        </div>
                    </div>
                    
                </div>
            </div>
        )}
    </section>
  );
}
