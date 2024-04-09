const prod = {
    url: {
        API_BASE_URL:'https://dribble-gru9.onrender.com'
    }
  }
  
  const dev = {
    url: {
        API_BASE_URL: 'http://localhost:4000' 
    }
  }
  
  export const config = process.env.NODE_ENV === 'development' ? dev : prod