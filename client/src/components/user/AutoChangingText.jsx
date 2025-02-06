import React, { useState, useEffect } from 'react';
import { Typewriter, Cursor } from 'react-simple-typewriter';

function AutoChangingText() {
  
    return (
        <h1 class='sm:tw-mt-8 md:tw-mt-4'>
          {' '}
          <span  class='tw-text-white'>
            {/* Style will be inherited from the parent element */}
            <Typewriter
              words={['Learn,', 'Practise,', 'Conquer!']}
              loop={1}
              cursor
              cursorStyle=''
              typeSpeed={150}
              deleteSpeed={120}
              delaySpeed={1000}
              
            />
          </span>
        </h1>
    )};

export default AutoChangingText;
