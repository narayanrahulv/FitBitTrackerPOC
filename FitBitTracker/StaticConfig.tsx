export const fitBitConnectionValues = {
    oAuthUrl: "https://www.fitbit.com/oauth2/authorize?",
    responseType: "token",
    redirectUri: "fitbit-poc-tracker://fitbit-poc-tracker",
    expiresIn: "31536000",
    scope: "heartrate activity profile sleep"
}

export const fitBitRequestValues = {
    requestPrefix: "https://api.fitbit.com/1.2/user/"
}

export const fitBitActivitySegments = {
    steps: "/activities/tracker/steps/date/",
    floors: "/activities/tracker/floors/date/"
}

export const fitBitResponseKeys = {
    stepsResponseKey: "activities-tracker-steps",
    floorsResponseKey: "activities-tracker-floors"
}