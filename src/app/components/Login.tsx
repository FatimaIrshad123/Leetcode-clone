export default function Login(){
    return (
        <form className="space-y-6 px-6 pb-4">
            <h3 className="text-xl font-medium text-white">Sign in to LeetClone</h3>
            <div>
                <label className="text-sm font-medium block mb-2 text-gray-300" htmlFor="email">
                    Your Email
                </label>
                <input type="email" name="email" id="email" className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="name@company.com"/>
            </div>
            <div>
                <label className="text-sm font-medium block mb-2 text-gray-300" htmlFor="password">
                    Your Password
                </label>
                <input type="password" name="password" id="password" className="border-2 outline-none sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-600 border-gray-500 placeholder-gray-400 text-white" placeholder="********"/>
                <button type="submit" className="text-white w-full focus:rig-blue-300 text-sm px-5 py-2.5 text-center bg-brand-orange hover:bg-brand-orange-s font-medium rounded-lg mt-4">
                    Login
                </button>
                <button className="flex w-full justify-end mt-4">
                    <a href='#' className="text-sm text-brand-orange block hover:underline w-full text-right">
                        Forgot Password
                    </a>
                </button>
                <div className="text-sm font-medium text-gray-500">
                    Not Registered?  
                    <a href="#" className="text-blue-700 hover:underline">
                        Create account
                    </a>
                </div>
            </div>
        </form>
    )
}