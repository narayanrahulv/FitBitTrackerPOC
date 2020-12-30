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
    floors: "/activities/tracker/floors/date/",
    calories: "/activities/tracker/calories/date/",
    sleep: "/sleep/date/"
}

export const fitBitResponseKeys = {
    stepsResponseKey: "activities-tracker-steps",
    floorsResponseKey: "activities-tracker-floors",
    caloriesResponseKey: "activities-tracker-calories",
    sleepResponseKey: "sleep"
}

export const icons = {
    'steps': require("./src/assets/icons/steps-icon.png"),
    'stairs': require("./src/assets/icons/stairs-icon.png"),
    'calories': require("./src/assets/icons/calories-icon.png"),
    'sleep': require("./src/assets/icons/sleep-icon.png")
}