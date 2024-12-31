import { Auth } from "../components/Auth"
import { GoogleOAuthProvider } from "@react-oauth/google"
import { GOOGLE_CLIENT_ID } from "../config/constants"

export const SignIn = () => {
  return (
    <div>
      <div className="">
        <div>
          <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <Auth type="signin"/>
          </GoogleOAuthProvider>
        </div>
      </div>
    </div>
  )
}