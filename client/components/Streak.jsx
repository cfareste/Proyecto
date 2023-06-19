import getWeekDays from "@/utils/date.js";
import styles from './streak.module.css';
import StreakItem from "./StreakItem";
import { Fragment } from "react";

export default function Streak({ totalStreak, streakDays }) {
    const weekDays = getWeekDays();
    const streakMap = {
        activa: '/streak/active.png',
        congelada: '/streak/frozen.png',
        inactiva: '/streak/inactive.png'
    }

    return (
        <section className={styles.wrapper}>
            <section className={styles.totalStreak}>
                <p className={styles.total}>{totalStreak}</p>
            </section>
            <section className={styles.streakDays}>
                {Object.keys(streakDays).map((day) => (
                    <Fragment key={day}>
                        <StreakItem day={weekDays[day]} imagePath={streakMap[streakDays[day]]} isToday={day === 'today'}></StreakItem>
                    </Fragment>
                ))}
            </section>
        </section>
    )
}