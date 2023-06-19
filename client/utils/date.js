export default function getWeekDays() {
    const days = ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'];
    const today = new Date();
    const yesterday =  new Date(today);
    const beforeYesterday =  new Date(today);
    const tomorrow =  new Date(today);
    const afterTomorrow =  new Date(today);

    yesterday.setDate(today.getDate() - 1);
    beforeYesterday.setDate(today.getDate() - 2);
    tomorrow.setDate(today.getDate() + 1);
    afterTomorrow.setDate(today.getDate() + 2);

    return {
        beforeYesterday: days[beforeYesterday.getDay()],
        yesterday: days[yesterday.getDay()],
        today: days[today.getDay()],
        tomorrow: days[tomorrow.getDay()],
        afterTomorrow: days[afterTomorrow.getDay()],
    }
}