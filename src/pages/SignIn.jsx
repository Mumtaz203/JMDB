import React from 'react';


const SignIn = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A2A38] font-sans">

      <div className="relative w-[300px] bg-[#3C535C99] rounded-xl shadow-xl p-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[120px] bg-gradient-to-r from-[#84EEFE] to-[#4F8E98] rounded-t-xl flex justify-center items-center z-20">
       
          <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 -rotate-4 text-[115px] font-extrabold text-black opacity-100 mix-blend-overlay pointer-events-none z-10 w-full text-center">
            JMDB
          </div>
          <h2 className="text-black text-2xl font-bold relative z-30">Sign in</h2>
        </div>
        <div className="mt-[120px] p-8 relative z-30">
          <form className="flex flex-col gap-[15px]">
            {/* Email Input Field */}
            <input
              type="email"
              placeholder="E-mail"
              required
              className="px-4 py-3 rounded-lg border-none bg-gradient-to-r from-[#A1EEF7] via-[#64C9D4] to-[#A1EEF7] text-black text-sm placeholder-black outline-none"
            />
            {/* Password Input Field */}
            <input
              type="password"
              placeholder="Password"
              required
              className="px-4 py-3 rounded-lg border-none bg-gradient-to-r from-[#A1EEF7] via-[#64C9D4] to-[#A1EEF7] text-black text-sm placeholder-black outline-none"
            />
            {/* Sign In Button */}
            <button
              type="submit"
              className="py-3 rounded-lg border-none bg-gradient-to-r from-[#242097] to-[#0C0A31] text-white font-bold cursor-pointer hover:opacity-90 transition"
            >
              Sign in
            </button>
            
        
            <div className="text-center text-gray-400 text-xs my-2">
              or
            </div>

            {/* Create a New Account Button */}
            <button
              type="button"
              className="py-3 rounded-lg border-none bg-[#367F7F] text-[#E5F9FE] font-bold cursor-pointer hover:opacity-90 transition"
            >
              Create a New Account
            </button>
            {/* Forgot Password Link Container */}
            <div className="text-center text-[13px] text-gray-300 mt-[10px]">
              {/* Forgot Password Link */}
              <a href="#" className="text-[#E5F9FE] no-underline hover:underline">
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
