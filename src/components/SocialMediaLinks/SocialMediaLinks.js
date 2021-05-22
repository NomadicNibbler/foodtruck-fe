import React from 'react';
import { SiFacebook } from 'react-icons/si';
import { SiTwitter } from 'react-icons/si';
import { SiInstagram } from 'react-icons/si';

const SocialMediaLinks = ({ links }) => {
  console.log(links)
  const socials = Object.keys(links).flat()
  console.log(socials)
    const linkList = socials.map(social => {
      
      switch (true) {
        case social === "facebook" :
          return  <a href= {`https://facebook.com/${links['facebook']}`} data-cy="social-link">
                  <li>
                    <SiFacebook className="social-media-icon"/>
                    </li>
                  </a>
                
        case social === "twitter" :
          return  <a href= {`https://twitter.com/${links['twitter']}`} data-cy="social-link">
                  <li>
                    <SiTwitter className="social-media-icon"/>
                  </li>
                  </a>
                

        case social === "instagram" :
          return  <a href= {`https://instagram.com/${links['instagram']}`} data-cy="social-link">
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