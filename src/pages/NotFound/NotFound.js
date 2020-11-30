import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => {
    return (
        <div className='not'>
            <h1>404</h1>
            <p>Oops! Something is wrong.</p>
            <Link to='/' className='button'><i class="icon-home"></i> Go back in initial page, is better.</Link>
        </div>
    );
}

export default NotFound;