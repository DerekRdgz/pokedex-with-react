import { GoogleLogout } from "react-google-login";

const clientId = "111805061596-1rpbjbqvkvtpsrkaqr7fqaqrfl1gsfom.apps.googleusercontent.com"

function Logout() {

    const onSuccess = () => {
        console.log("Log out successfull!")
    }

    return (
        <div id="signOutButton">
            <GoogleLogout 
                clientId={clientId}
                buttonText={"Logout"}
                onLogoutSuccess={onSuccess}
            />
        </div>
    )
}

export default Logout;