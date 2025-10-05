import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FaHome, FaBriefcase, FaSignOutAlt} from 'react-icons/fa'
import './index.css'

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <nav className="navbar">
        <div className="nav-left">
          <Link to="/" className="logo-link">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="home-logo"
            />
          </Link>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/" className="nav-item">
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="nav-item">
              Jobs
            </Link>
          </li>
        </ul>

        <button
          type="button"
          className="logout-button"
          onClick={this.onClickLogout}
        >
          Logout
        </button>

        <ul className="nav-icons">
          <li>
            <Link to="/" className="icon-link">
              <FaHome className="icon" />
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="icon-link">
              <FaBriefcase className="icon" />
            </Link>
          </li>
          <li>
            <button
              type="button"
              className="icon-button"
              onClick={this.onClickLogout}
            >
              <FaSignOutAlt className="icon" />
            </button>
          </li>
        </ul>
      </nav>
    )
  }
}

export default withRouter(Header)
