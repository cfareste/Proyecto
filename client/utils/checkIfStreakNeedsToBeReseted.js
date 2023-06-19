import updateStreak from "@/services/updateStreak";
import updateUser from "@/services/updateUser";
import formatDate from "./formatDate";

export default function checkIfStreakNeedsToBeReseted (userID, token, actualStreak, userTimestamp) {
    var daysDiff;
    const todayFormData = new FormData();
    const today = new Date();
    const lastConnection = new Date(userTimestamp);
    const newStreakModel = {
        1: {
            today: "activa",
            yesterday: actualStreak.today,
            beforeYesterday: actualStreak.yesterday,
            total: parseInt(actualStreak.total) + 1
        },
        2: {
            today: "activa",
            yesterday: "inactiva",
            beforeYesterday: actualStreak.today,
            total: 1
        },
        3: {
            today: "activa",
            yesterday: "inactiva",
            beforeYesterday: "inactiva",
            total: 1
        }
    }
    
    todayFormData.append('data', `{"lastConnection":"${formatDate(today)}"}`)
    updateUser(userID, token, todayFormData).then(response => response);

    today.setHours(0, 0, 0, 0);
    lastConnection.setHours(0, 0, 0, 0);
    daysDiff = Math.floor((today - lastConnection) / 1000 / 3600 / 24);


    if (daysDiff > 1) {
        let streakIndex = daysDiff < 3 ? daysDiff : 3

        updateStreak(userID, token, newStreakModel[streakIndex]);
        return newStreakModel[streakIndex];
    }

    if (today.getDate() !== lastConnection.getDate()) {
        let newStreakActive = newStreakModel[1];

        updateStreak(userID, token, newStreakActive);
        return newStreakActive;
    }

    return actualStreak;
}