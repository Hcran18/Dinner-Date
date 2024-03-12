import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import Image from 'react-bootstrap/Image';
import { type } from '@testing-library/user-event/dist/type';
import "./../Styles/profile.css"

function Profile() {

  //Users info in user Object
  const { user } = useAuth0();
  const [showUpdateInfoModal, setShowUpdateInfoModal] = useState(false);
  const [showUpdatePictureModal, setShowUpdatePictureModal] = useState(false);

  const handleInfoUpdateClick = () => {
    setShowUpdateInfoModal(true);
  };

  const handlePictureUpdateClick = () => {
    setShowUpdatePictureModal(true);
  };

  // Define UpdateInfoModal
  const UpdateInfoModal = ({onClose, user}) => {

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);

    const handleNameChange = (e) => {
      setName(e.target.value);
    };
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };

    const handleSubmit = () => {
      // Implement submit logic here
      // You can send updated info to the server or update local state
      onClose();
    };

    return (
      <div>
        <h2>Update Info</h2>
        <input type="text" value={name} onChange={handleNameChange} />
        <input type="email" value={email} onChange={handleEmailChange} />
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    );
    
  };

  // Define UpdatePictureModal
  const UpdatePictureModal = () => {
    // Modal content and logic goes here
    return (
      <div>
        <h2>Update Picture Modal</h2>
        {/* Update picture modal content */}
        <button onClick={() => setShowUpdatePictureModal(false)}>Close Modal</button>
      </div>
    );
  };
  
  // Define ProfilePicture Component
  const ProfilePicture = ({image, onUpdateClick}) => {
    return (
      <div className='profile-picture'>
        <Image src={image} alt="Profile" roundedCircle style={{ width: '8rem', height: '8rem' }}/>
        <button onClick={onUpdateClick}>Change Profile Picture</button>
      </div>
    );
  };
  
  // Define ProfileInfo Component
  const ProfileInfo = ({name, email, onClick}) => {
    return(
      <div className='profile-info'>
        <h2>{name}</h2>
        <p>Email: {email}</p>
        <button onClick={onClick}>Update Info</button>
      </div>
    );
  };

  //************************************** */

  return (
    <div>
      <h1 style={{textAlign: 'center', fontSize: '6rem', color: 'red', paddingBottom: '50px'}}> Profile Settings</h1>
      <ProfilePicture 
      image={user.picture}
      onClick={handlePictureUpdateClick}
      />
      <ProfileInfo
      name={user.name}
      email={user.email}
      onUpdateClick={handleInfoUpdateClick}
      />
      {showUpdateInfoModal && (
        <UpdateInfoModal
        onClose={() => setShowUpdateInfoModal(false)}
        userData={userData}
        />
      )}
      {showUpdatePictureModal && (
        <UpdatePictureModal
        onClose={() => setShowUpdatePictureModal(false)}
        currentImageUrl={userData.profilePictureUrl}
        />
      )}
    </div>
  );
}

export default Profile;