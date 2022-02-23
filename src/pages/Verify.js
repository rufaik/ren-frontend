import React, {useState, useEffect, useContext, Fragment} from 'react'
import {UserContext} from '../context/UserContext'
import { LockClosedIcon } from '@heroicons/react/solid'
import VerifyButton from "@passbase/button/react";
import { Dialog, Transition } from '@headlessui/react'
import { BellIcon } from '@heroicons/react/outline'



export const Verify = () => {

const [error, setError] = useState('')
const [open, setOpen] = useState(true)
const {user, setUser, simpleUser, setSimpleUser} = useContext(UserContext)


const updateCurrent = async (identityAccessKey) => {
 const data1 = {
      verifyKey: identityAccessKey
    }
      try{
        const response = await fetch(`http://localhost:1337/users/${simpleUser.id}`, {
            method: 'PUT',
            headers: {
            'Content-Type':'application/json',
            'Authorization': `Bearer ${user.jwt}`
            },
            body: JSON.stringify(data1)
          })

          const confirm = await response.json()
          setSimpleUser(confirm)
           localStorage.setItem('simpleUser', JSON.stringify(confirm))
    

      } catch(err){
    console.log("Exception ", err)}

    }




  return (
    <div className="Login">



<Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={setOpen}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full sm:p-6" style={{"width": "29em", "height": "44em"}}>
              <div>
                <div className="mx-auto mt-24 flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100">
                  <BellIcon className="h-6 w-6 text-yellow-600" aria-hidden="true" />
                </div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title as="div" className="h3Bold leading-6 text-gray-900 text-center">
                    Almost Done..
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Please verify yourself, it will only take a few minutes.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 flex justify-center bg-white">
                <VerifyButton
                  apiKey={"WTfgDRJr7aEG57Hx42mZIgysinkUuqeLzoOB4LRdZi0owgn0dm3ePyzGWyMAEWkb"}
                  onSubmitted={(identityAccessKey) => {updateCurrent(identityAccessKey)}}
                  onFinish={(identityAccessKey) => {}}
                  onError={(errorCode) => {}}
                  onStart={() => {}}
                />
{/*                <button
                  type="button"
                  className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
                  onClick={() => setOpen(false)}
                >
                  Go back to dashboard
                </button>*/}
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>

    





    </div>
  );
}