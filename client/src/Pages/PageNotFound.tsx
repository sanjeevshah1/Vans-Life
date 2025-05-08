import {Link} from 'react-router-dom'
const PageNotFound = () => {
  return (
    <div className="not-found">
        <p>Sorry, the page you were looking for was not found.</p>
        <Link to= "/" className='back'>Return to home</Link>
    </div>
  )
}

export default PageNotFound