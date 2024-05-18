import { useSendPasswordResetEmail } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase';
import { toast } from 'react-toastify';

export default function ResetPassword(){
    const [email, setEmail] = useState('');
  const [sendPasswordResetEmail, sending, error] = useSendPasswordResetEmail(auth);
  const handleReset = async(e:any) => {
    e.preventDefault();
    const success = await sendPasswordResetEmail(email);
    console.log(success)  
    if (success) {
        toast.success("Password reset email sent", {position: "top-center", autoClose: 3000, theme:'dark'})
      }
  }

  useEffect(() => {
    if (error){
        alert (error.message)
    }
  },[error])

    return (
        <form className="space-y-6 px-6 lg:px-8 pb-4 sm:pb-6 xl:pb-8" onSubmit={handleReset}>
            <h3 className="text-xl font-medium">Reset Password</h3>
            <p className="text-sm text-white">
                Forgotten your password? Enter your e-mail address below and we&apos; ll send you an email allowing it to reset it.
            </p>
            <div>
                <label htmlFor="email" className="text-sm font-medium block mb-2 text-gray-300">
                    Your email
                </label>
                <input type="email" name="email" 
                onChange={(e) => setEmail(e.target.value)}
                id="email" placeholder="name@company.com" className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 block w-full focus:border-blue-500 p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white"/>
            </div>
            <button type="submit" className="w-full text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm bg-brand-orange hover:bg-brand-orange-s px-5 py-2.5 text-center">
                Reset Password
            </button>
        </form>
    )
}