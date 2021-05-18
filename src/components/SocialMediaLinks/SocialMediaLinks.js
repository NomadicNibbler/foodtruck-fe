import React from 'react';
import { SiFacebook } from 'react-icons/si';
import { SiTwitter } from 'react-icons/si';
import { SiInstagram } from 'react-icons/si';

const SocialMediaLinks = ({ links }) => {
  
    const linkList = links.map(link => {
      const socialMediaOutlet = Object.keys(link);
      switch (true) {
        case socialMediaOutlet[0] === "facebook" :
          return  <a href= {`https://facebook.com/${Object.values(link)}`}>
                  <li>
                    <SiFacebook className="social-media-icon"/>
                    </li>
                  </a>
                
        case socialMediaOutlet[0] === "twitter" :
          return  <a href= {`https://twitter.com/${Object.values(link)}`}>
                  <li>
                    <SiTwitter className="social-media-icon"/>
                  </li>
                  </a>
                

        case socialMediaOutlet[0] === "instagram" :
          return  <a href= {`https://instagram.com/${Object.values(link)}`}>
                  <li>
                    <SiInstagram className="social-media-icon"/>
                    </li>
                  </a>
              
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