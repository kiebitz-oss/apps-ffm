// Kiebitz - Privacy-Friendly Appointments
// Copyright (C) 2021-2021 The Kiebitz Authors
// README.md contains license information.
import { t } from '@lingui/macro';

export function getMonday(d: string | Date | number) {
    d = new Date(d);

    const day = d.getDay();
    const diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday

    return new Date(d.setDate(diff));
}

// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
export function formatDate(date: string | Date | number) {
    const d = new Date(date);

    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();

    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}

// https://stackoverflow.com/questions/23593052/format-javascript-date-as-yyyy-mm-dd
export function formatTime(date: string | Date | number) {
    const d = new Date(date);

    let hours = '' + d.getHours();
    let minutes = '' + d.getMinutes();

    if (hours.length < 2) {
        hours = '0' + hours;
    }

    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }

    return [hours, minutes].join(':');
}

export function formatDuration(minutes: number) {
    if (minutes < 60) {
        return t({ id: 'minute-string', message: `${minutes} Minuten` });
    }

    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (remainingMinutes === 0) {
        return t({ id: 'hour-string', message: `${hours} Stunden` });
    }

    return t({
        id: 'hour-minute-string',
        message: `${hours} Stunden ${remainingMinutes} Minuten`,
    });
}
