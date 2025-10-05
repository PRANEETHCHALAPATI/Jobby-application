// components/Profile/index.js
import './index.css'

const Profile = ({profileData}) => (
  <div className="profile-container">
    <img
      src={profileData.profileImageUrl}
      alt="profile"
      className="profile-image"
    />
    <h1 className="profile-name">{profileData.name}</h1>
    <p className="profile-bio">{profileData.shortBio}</p>
  </div>
)

export default Profile
