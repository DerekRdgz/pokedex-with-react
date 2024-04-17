import Login from "./login";
import Logout from "./logout";
import { useEffect } from "react";
import { gapi } from 'gapi-script';

const clientId = "111805061596-1rpbjbqvkvtpsrkaqr7fqaqrfl1gsfom.apps.googleusercontent.com"

function LogButtons() {

    useEffect(() => {
        function start() {
            gapi.client.init({
                clientId: clientId,
                scope: ""
            })
        };

        gapi.load('client:auth2', start);
    })
    return (
        <div className="LogButtons">
            <Login />
            <Logout />
        </div>
    )
}

export default LogButtons;