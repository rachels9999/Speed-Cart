import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div style={{ height: '250px', marginTop: '100px' }} className='bg-orange-900 mt-5 w-full text-white p-4'>
      <div className='flex justify-between p-4 '>
        <div style={{ width: '400px' }} className='intro'>
          <h5 className='text-xl font-bold'><i className="fa-solid fa-dolly me-2"></i>Speed Cart</h5>
          <p>Desiged and built with all the love in the world by <br /> the team of Speed Cart with the help of our contributors.</p>
          <p>Code licensed Speed Cart, docs CC BY 3.0</p>
          <p>Currently v5.3.2.</p>
        </div>

        <div className='flex flex-col'>
          <h5 className='text-xl font-bold'>Links</h5>
          <Link to={'/'} style={{ textDecoration: 'none', color: 'white' }}>Landing Page</Link>
          <Link to={'/home'} style={{ textDecoration: 'none', color: 'white' }}>Home Page</Link>
          <Link to={'/history'} style={{ textDecoration: 'none', color: 'white' }}>History Page</Link>
        </div>

        <div className='flex flex-col'>
          <h5 className='text-xl font-bold'>Guides</h5>
          <a href="http://react-bootstrap.netlify.app/" style={{ textDecoration: 'none', color: 'white' }} target='_blank'>React</a>
          <a href="http://react.dev" style={{ textDecoration: 'none', color: 'white' }} target='_blank'>Tailwind CSS</a>
          <a href="http://www.npmjs.com/package/react-router-dom" style={{ textDecoration: 'none', color: 'white' }} target='_blank'>React Router</a>
        </div>


        <div className='flex flex-col'> 
          <h5 className='text-xl font-bold'>Contact Us</h5>
          <div className='flex'>
            <input type="text" placeholder='Enter your E-mail here...' className='rounded p-1' />
          <button className='btn btn-info ms-2'><i className='fa-solid fa-arrow-right'></i></button>
          </div>
          

        </div>

        <div className='icons flex justify-between mt-3'>
          <a href="http://en.wikipedia.org/wiki/Twitter" style={{ textDecoration: 'none', color: 'white' }} target='_blank'><i class="fa-brands fa-twitter"></i></a>
          <a href="http://www.instagram.com/" style={{ textDecoration: 'none', color: 'white' }} target='_blank'><i class="fa-brands fa-instagram"></i></a>
          <a href="http://www.facebook.com/" style={{ textDecoration: 'none', color: 'white' }} target='_blank'><i class="fa-brands fa-facebook"></i></a>
          <a href="http://www.linkedin.com/feed/" style={{ textDecoration: 'none', color: 'white' }} target='_blank'><i class="fa-brands fa-linkedin-in"></i></a>
          <a href="http://github.com/" style={{ textDecoration: 'none', color: 'white' }} target='_blank'><i class="fa-brands fa-github"></i></a>
        </div>

        <div className='text-center mt-3'>Copyright &copy; January 2026, Speed Cart. Built with love.</div>

      </div>

    </div>
  )
}

export default Footer