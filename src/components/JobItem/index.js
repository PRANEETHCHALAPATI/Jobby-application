// components/JobItem/index.js
import {FaStar} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './index.css'

const JobItem = ({jobDetails}) => {
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <Link to={`/jobs/${id}`} className="job-item-link">
      <li className="job-item">
        <div className="job-header">
          <div className="company-info">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="company-logo"
            />
            <div className="job-details">
              <h1 className="job-title">{title}</h1>
              <div className="rating-container">
                <FaStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="job-meta">
          <div className="location-type">
            <div className="location-container">
              <p className="location">{location}</p>
            </div>
            <div className="employment-type-container">
              <p className="employment-type">{employmentType}</p>
            </div>
          </div>
          <p className="package">{packagePerAnnum}</p>
        </div>
        <hr className="separator" />
        <div className="job-description">
          <h1 className="description-heading">Description</h1>
          <p className="description-text">{jobDescription}</p>
        </div>
      </li>
    </Link>
  )
}

export default JobItem
