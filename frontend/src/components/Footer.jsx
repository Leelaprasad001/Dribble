import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faPinterest, faDribbble  } from '@fortawesome/free-brands-svg-icons';


export default function Footer() {
  return (
    <footer className="rcol6 py-12" style = {{ borderTop:'1px solid #EEEEEE', backgroundColor: '#F6F5F5', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
      <div className="max-w-7xl mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
          <div className="col-span-2 items-center justify-center md:justify-start">
            <img src="logo.png" alt="Logo" className="h-10 w-auto mb-5" />
            <p>Dribble is the world's leading Community for creatives to share , grow, and get hired.</p>
            <div className="flex items-center space-x-4 mt-5">
              <a href="#"><FontAwesomeIcon icon={faDribbble} /></a>
              <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="#"><FontAwesomeIcon icon={faPinterest} /></a>
            </div>
          </div>
          <div className="col-span-4 grid grid-cols-1 md:grid-cols-5 gap-8">
            <div className="col-span-1">
              <h3 className="mb-4 font-semibold">For designers</h3>
              <ul className="space-y-2">
                <li><a href="#">Go Pro!</a></li>
                <li><a href="#">Explore design work</a></li>
                <li><a href="#">Design blog</a></li>
                <li><a href="#">Overtime prodcast</a></li>
                <li><a href="#">Playoffs</a></li>
                <li><a href="#">Weekly Warm-up</a></li>
                <li><a href="#">Refer a Friend</a></li>
                <li><a href="#">Code of conduct</a></li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="mb-4 font-semibold">Hire designers</h3>
              <ul className="space-y-2">
                <li><a href="#">Post a job opening</a></li>
                <li><a href="#">Post a freelance project</a></li>
                <li><a href="#">Search for designers</a></li>
                <h3 className="mb-4 font-semibold">Brands</h3>
                <li><a href="#">Advertise with us</a></li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-2">
                <li><a href="#">About</a></li>
                <li><a href="#">Careers</a></li>
                <li><a href="#">Support</a></li>
                <li><a href="#">Media kit</a></li>
                <li><a href="#">Testimonials</a></li>
                <li><a href="#">API</a></li>
                <li><a href="#">Terms of service</a></li>
                <li><a href="#">Privacy policy</a></li>
                <li><a href="#">Cookie policy</a></li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="mb-4 font-semibold">Directories</h3>
              <ul className="space-y-2">
                <li><a href="#">Design Hiring</a></li>
                <li><a href="#">Designers for hire</a></li>
                <li><a href="#">Freelance designers for hire</a></li>
                <li><a href="#">Tags</a></li>
                <li><a href="#">Places</a></li>
                <h3 className="mb-4 font-semibold">Directories</h3>
                <li><a href="#">Dribble Marketplace</a></li>
                <li><a href="#">Creative Market</a></li>
                <li><a href="#">Fontspring</a></li>
                <li><a href="#">Font Squirrel</a></li>
              </ul>
            </div>
            <div className="col-span-1">
              <h3 className="mb-4 font-semibold">Design Resources</h3>
              <ul className="space-y-2">
                <li><a href="#">Freelancing</a></li>
                <li><a href="#">Design Hiring</a></li>
                <li><a href="#">Design Portfolio</a></li>
                <li><a href="#">Design Education</a></li>
                <li><a href="#">Creative Process</a></li>
                <li><a href="#">Design Industry Trends</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-between" style={{borderTop:'1px solid #DDD',}}>
            <p>&copy; 2023 Dribble. All Rights Reserved.</p>
            <p><span style={{ fontWeight: 'bold' }}>20,501,853</span> shots dribbbled 
            <FontAwesomeIcon icon={faDribbble} style={{marginLeft: '0.5rem', color:'#D20062'}}/>
            </p>
        </div>

      </div>
    </footer>
  );
}
