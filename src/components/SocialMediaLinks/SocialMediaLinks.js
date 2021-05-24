import React from 'react';
import { SiFacebook } from 'react-icons/si';
import { SiTwitter } from 'react-icons/si';
import { SiInstagram } from 'react-icons/si';

const SocialMediaLinks = ({ links }) => {
  const socials = Object.keys(links).flat()
    const linkList = socials.map((social, i) => {
      
      switch (true) {
        case social === "facebook" :
          return  <li>
                    <a 
                      className="social-link"
                      href= {`https://facebook.com/${links['facebook']}`}
                      key={i} 
                      data-cy="social-link"
                      aria-label="facebook-link"
                      >
                    
                      <SiFacebook 
                        className="social-media-icon"
                        alt="facebook-icon"/>
                    </a>
                  </li>
                
        case social === "twitter" :
          return  <li>
                    <a 
                      className="social-link"
                      href= {`https://twitter.com/${links['twitter']}`} 
                      key={i}
                      data-cy="social-link"
                      aria-label="twitter-link"
                    >
                      <SiTwitter 
                        className="social-media-icon"
                        alt="twitter-icon"
                      />
                    </a>
                  </li>
              
        case social === "instagram" :
          
          return  <li>
                    <a 
                      className="social-link"
                      href= {`https://instagram.com/${links['instagram']}`} 
                      key={i}
                      data-cy="social-link"
                      aria-label="twitter-link"
                    >
                    
                      <SiInstagram 
                        className="social-media-icon"
                        alt="instagram-icon"
                      />
                    </a>
                  </li>
              
        default :
          return <p>Come visit us today!!</p>
      }
    })
  
  return (
    <ul className="social-link-list">
      {linkList}
    </ul>
  )
}

export default SocialMediaLinks;