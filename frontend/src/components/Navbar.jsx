import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import '../App.css'

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav style={{borderBottom:'1px solid #EEEEEE', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex rcol5">
            <div className="flex-shrink-0 flex items-center">
              <div>
                  <img
                      src="logo.png"
                      alt="logo"
                      style={{ maxWidth: '100px', height: '30px' }}
                  />
              </div>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 mt-5 flex items-baseline space-x-4" style={{marginLeft : '2rem'}}>
                <a href="#" className="px-3 py-2 ">Inspiration</a>
                <a href="#" className="px-3 py-2 ">Find Work</a>
                <a href="#" className="px-3 py-2 ">Learn Design</a>
                <a href="#" className="px-3 py-2 ">Go Pro</a>
                <a href="#" className="px-3 py-2 ">Hire Designers</a>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="rcol5 ml-4 flex items-center md:ml-6">
                <div className="ml-3 flex relative">
                  <input
                    type="text"
                    className="w-48 md:w-34 placeholder-black-300 text-gray-300 p-2 bg-gray-200 rounded focus:outline-none mr-2"
                    placeholder="Search"
                  />
                  
                </div>
                 <FontAwesomeIcon icon={ faShoppingBag } style={{ marginRight: '5px' }}/>
                  <button onClick={() => setIsOpen(!isOpen)} className="ml-2 max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" id="user-menu" aria-haspopup="true">
                      <span className="sr-only">Open user menu</span>
                      <img className="h-8 w-8 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" alt="" />
                  </button>
                  <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    {(ref) => (
                      <div ref={ref} className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700">Your Profile</a>
                        <a href="#" className="block px-4 py-2 text-sm text-gray-700">Settings</a>
                        <a href="/login" className="block px-4 py-2 text-sm text-gray-700">Sign out</a>
                      </div>
                    )}
                  </Transition>
                  <button
                      type="button"
                      style={{ backgroundColor: '#D20062', fontSize: '0.7rem'}}
                      className="text-white font-bold py-2 px-4 rounded ml-4"
                      >
                        Upload
                  </button>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button onClick={() => setIsOpen(!isOpen)} type="button" className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none hover:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <XIcon className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="duration-200 ease-out"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="duration-100 ease-in"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div ref={ref} className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="px-3 py-2 block">Inspiration</a>
              <a href="#" className="px-3 py-2 block">Find Work</a>
              <a href="#" className="px-3 py-2 block">Learn Design</a>
              <a href="#" className="px-3 py-2 block">Go Pro</a>
              <a href="#" className="px-3 py-2 block">Hire Designers</a>
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src="https://randomuser.me/api/portraits/men/1.jpg" alt="" />
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <a href="#" className="block px-4 py-2 text-sm text-gray-700">Your Profile</a>
                <a href="#" className="block px-4 py-2 text-sm text-gray-700">Settings</a>
                <a href="/login" className="block px-4 py-2 text-sm text-gray-700">Sign out</a>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
};