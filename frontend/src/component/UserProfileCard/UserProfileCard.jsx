import React from 'react'
import '../UserProfileCard/UserProfileCard.css'
import profile_icon from '../Assets/myPic.jpg'

const UserProfileCard = ()=> {
return (
    <>
    
    <div className='upc'>
        <div className="gradiant"></div>
         <div className='profile-down'></div>
         <img src={profile_icon} alt="picture" />
         <div className='profile-title'>Meron Kedir</div>
         <div className='profile-description'>A software Engineering Student at Addis Ababa Science and Technology University</div>
         <div className='profile-button'><a href="mailto:elon@musk.com">Contact Me</a></div>
    </div>
    </>
)
}
export default UserProfileCard;
