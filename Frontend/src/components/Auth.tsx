import { ChangeEvent, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { SignupInput } from "../types"
import { Toaster, toast } from "react-hot-toast"
import { LockIcon, MailIcon, UserIcon, Sparkles } from 'lucide-react'
import { GoogleLogin } from '@react-oauth/google'
import { BACKEND_URL } from "../config/constants"

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate()
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  })

  async function sendRequest() {
    try {
      toast.loading("Authentication in progress")
      const response = await axios.post(
        `${BACKEND_URL}/api/user/${type === "signup" ? "signup" : "signin"}`,
        postInputs
      )
      if (!response) {
        toast.error("Error while logging in!")
      }
      toast.dismiss()
      toast.success("Logged In!")
      const jwt = response.data
      localStorage.setItem("token", jwt)
      navigate("/search")
    } catch (e) {
      toast.dismiss()
      toast.error("Error while logging in!")
    }
  }

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      toast.loading("Google Authentication in progress")
      const response = await axios.post(`${BACKEND_URL}/api/user/google-auth`, {
        token: credentialResponse.credential,
      })
      if (!response) {
        toast.error("Error while logging in with Google!")
      }
      toast.dismiss()
      toast.success("Logged In with Google!")
      const jwt = response.data.token
      localStorage.setItem("token", jwt)
      navigate("/search")
    } catch (e) {
      toast.dismiss()
      toast.error("Error while logging in with Google!")
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
        <div className="w-full flex flex-col items-center justify-center px-12">
          <Sparkles className="w-16 h-16 text-white mb-8" />
          <h2 className="text-4xl font-bold text-white mb-4">
            {type === "signin" ? "Welcome Back!" : "Join Our Community"}
          </h2>
          <p className="text-violet-200 text-center text-lg max-w-md">
            {type === "signin" 
              ? "Sign in to continue your journey with us and unlock all features."
              : "Create an account to join our community and start exploring amazing features."}
          </p>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              {type === "signin" ? "Sign in to your account" : "Create your account"}
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {type === "signin" ? "Don't have an account?" : "Already have an account?"}
              <Link
                className="ml-1 font-medium text-violet-600 hover:text-violet-500 transition-colors"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </p>
          </div>

          <div className="mt-8 space-y-6">
            <div className="grid gap-6">
              {type === "signup" && (
                <LabelledInput
                  label="Full Name"
                  placeholder="John Doe"
                  icon={<UserIcon className="h-5 w-5 text-gray-400" />}
                  onChange={(e) => setPostInputs({
                    ...postInputs,
                    name: e.target.value,
                  })}
                />
              )}
              <LabelledInput
                label="Email Address"
                placeholder="john@example.com"
                icon={<MailIcon className="h-5 w-5 text-gray-400" />}
                onChange={(e) => setPostInputs({
                  ...postInputs,
                  username: e.target.value,
                })}
              />
              <LabelledInput
                label="Password"
                type="password"
                placeholder="••••••••"
                icon={<LockIcon className="h-5 w-5 text-gray-400" />}
                onChange={(e) => setPostInputs({
                  ...postInputs,
                  password: e.target.value,
                })}
              />
            </div>

            <div>
              <button
                onClick={sendRequest}
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-all duration-300"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockIcon className="h-5 w-5 text-violet-300 group-hover:text-violet-200" />
                </span>
                {type === "signup" ? "Create Account" : "Sign In"}
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-50 text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="google-login-container">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => toast.error("Google sign-in failed")}
                  useOneTap
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Toaster position="top-center" />
    </div>
  )
}

interface LabelledInputType {
  label: string
  placeholder: string
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  type?: string
  icon?: React.ReactNode
}

function LabelledInput({ label, placeholder, onChange, type, icon }: LabelledInputType) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="relative rounded-lg shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          onChange={onChange}
          type={type || "text"}
          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-violet-500 sm:text-sm transition-all duration-300"
          placeholder={placeholder}
          required
        />
      </div>
    </div>
  )
}