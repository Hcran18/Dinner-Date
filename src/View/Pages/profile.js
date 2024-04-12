import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useState } from 'react';
import Image from 'react-bootstrap/Image';
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
      <div className='profile-info'>
        <input type="text" value={name} onChange={handleNameChange} />
        <input type="email" value={email} onChange={handleEmailChange} />
        <button onClick={handleSubmit}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    );
  };

  // Define UpdatePictureModal
  const UpdatePictureModal = ({onClose}) => {

    const [selectedPicture, setSelectedPicture] = useState(null);

    const handlePictureChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedPicture(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };

    const handleSavePicture = () => {
      // Logic to save the selectedPicture as the user's profile picture
      // You can use APIs or state management libraries to handle this
    };

    return (
      <div className='profile-info'>
        {/* Circle picture as a placeholder */}
        <div
          style={{
            width: '8rem',
            height: '8rem',
            border: '2px dashed #ccc',
            borderRadius: '50%',
            backgroundImage: `url(${selectedPicture})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            cursor: 'pointer',
          }}
          onClick={() => document.getElementById('fileInput').click()}
        >

          {selectedPicture ? (
            <img
              src={selectedPicture}
              alt='Profile'
              style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '50%',
            }}
            />
          ) : (
            <span className='profile-info'
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              paddingTop: '30px',
              paddingRight: '50px',
            }}
            >Change Picture</span>
          )}

          {/* File input hidden */}
          <input
            type='file'
            id='fileInput'
            accept='image/*'
            style={{ display: 'none' }}
            onChange={handlePictureChange}
          />
        </div>
        
        {/* Save button */}
        <button onClick={handleSavePicture}>Save Picture</button>
  
        {/* Close button */}
        <button onClick={onClose}>Cancel</button>
      </div>
    );
    
  };
  
  // Define ProfilePicture Component
  const ProfilePicture = ({image, onClick}) => {
    return (
      <div className='profile-picture'>
        <Image src={image} alt="Profile" roundedCircle style={{ width: '8rem', height: '8rem' }}/>
        <button onClick={onClick}>Change Profile Picture</button>
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
      onClick={handleInfoUpdateClick}
      />
      {showUpdateInfoModal && (
        <UpdateInfoModal
        user={user}
        onClose={() => setShowUpdateInfoModal(false)}
        />
      )}
      {showUpdatePictureModal && (
        <UpdatePictureModal
        currentImage={user.picture}
        onClose={() => setShowUpdatePictureModal(false)}
        />
      )}
    </div>
  );
}

export default Profile;