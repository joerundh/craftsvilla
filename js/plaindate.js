class PlainDate {
    static days = [
        { key: 1, name: "mandag" },
        { key: 2, name: "tirsdag" },
        { key: 3, name: "onsdag" },
        { key: 4, name: "torsdag" },
        { key: 5, name: "fredag" },
        { key: 6, name: "lørdag" },
        { key: 7, name: "søndag" }
    ];
    static months = [
        { key: 1,   name: "januar",     days: (yr) => 31 },
        { key: 2,   name: "februar",    days: (yr) => this.isLeapYear(yr) ? 29 : 28 },
        { key: 3,   name: "mars",       days: (yr) => 31 },
        { key: 4,   name: "april",      days: (yr) => 30 },
        { key: 5,   name: "mai",        days: (yr) => 31 },
        { key: 6,   name: "juni",       days: (yr) => 30 },
        { key: 7,   name: "juli",       days: (yr) => 31 },
        { key: 8,   name: "august",     days: (yr) => 31 },
        { key: 9,   name: "september",  days: (yr) => 30 },
        { key: 10,  name: "oktober",    days: (yr) => 31 },
        { key: 11,  name: "november",   days: (yr) => 30 },
        { key: 12,  name: "desember",   days: (yr) => 31 }
    ];

    constructor() {
        if (arguments.length) {
            if (arguments.length === 1 && arguments[0] instanceof PlainDate) {
                this.dayKey = arguments[0].dayKey;
                this.day = arguments[0].day;
                this.monthKey = arguments[0].monthKey;
                this.year = arguments[0].year;
            }
        } else {    
            let today = new Date();

            this.dayKey = today.getDay() === 0 ? 7 : today.getDay();
            this.day = today.getDate();
            this.monthKey = today.getMonth() + 1;
            this.year = today.getFullYear();
        }
    }

    dayName() { return PlainDate.days.find(obj => obj.key === this.dayKey).name; }
    monthName() { return PlainDate.months.find(obj => obj.key === this.monthKey).name; }

    isSame(date) {
        return this.dayKey === date.dayKey && this.day === date.day && this.monthKey === date.monthKey && this.year === date.year;
    }

    comesBefore(date) {
        if (this.year < date.year)
            return true;
        else {
            if (this.month < date.month)
                return true;
            else {
                if (this.day < date.day)
                    return true;
                else return false;
            }
        }
    }

    comesAfter(date) {

    }

    addDays(n) {
        this.dayKey = (this.dayKey + n - 1) % 7 + 1;
        while (this.day + n > PlainDate.months.find(obj => obj.key === this.monthKey).days(this.year)) {
            n -= PlainDate.months.find(obj => obj.key === this.monthKey).days(this.year) - this.day + 1;
            this.day = 1;
            this.monthKey++;
            if (this.monthKey === 13) {
                this.monthKey = 1;
                this.year++;
            }
        }
        this.day += n;
    }

    addWeeks(n) {
        for (let i = 0; i < n; i++)
            this.addDays(7);
    }

    addMonths(n) {
        for (let i = 0; i < n; i++) {
            this.addDays(PlainDate.months.find(obj => obj.key === this.monthKey).days(this.year));
        }
    }

    addYears(n) {
        this.year += n;
    }

    daysLater(n) {
        let today = new PlainDate();
        today.addDays(n);
        return today;
    }

    weeksLater(n) {
        let today = new PlainDate();
        today.addWeeks(n);
        return today;
    }

    monthsLater(n) {
        let today = new PlainDate();
        today.addMonths(n);
        return today;
    }

    yearsLater(n) {
        let today = new PlainDate();
        today.addYears(n);
        return today;
    }

    subtractDays(n) {
        this.dayKey = this.dayKey - n % 7 + (this.dayKey - 1 < n % 7 ? 7 : 0);
        while (n > this.day) {
            n -= this.day;
            this.day = PlainDate.months.find(obj => obj.key === (this.monthKey - 1 === 0 ? 12 : this.monthKey - 1)).days(this.year);
            this.monthKey--;
            if (this.monthKey === 0) {
                this.monthKey = 12;
                this.year--;
                if (this.year === 0)
                    this.year = -1;
            }
        }
        this.day -= n;
    }

    subtractWeeks(n) {
        for (let i = 0; i < n; i++)
            this.subtractDays(7);
    }

    subtractMonths(n) {
        for (let i = 0; i < n; i++)
            this.subtractDays(PlainDate.months.find(obj => obj.key === (this.monthKey - 1 === 0 ? 12 : this.monthKey - 1)).days(this.year));
    }

    subtractYears(n) {
        for (let i = 0; i < n; i++)
            this.subtractDays(isLeapYear(this.year) && 365);
    }

    daysEarlier(n) {
        let today = new PlainDate();
        today.subtractDays(n);
        return today;
    }

    weeksEarlier(n) {
        let today = new PlainDate();
        today.subtractWeeks(n);
        return today;
    }

    monthsEarlier(n) {
        let today = new PlainDate();
        today.subtractMonths(n);
        return today;
    }

    yearsEarlier(n) {
        let today = new PlainDate();
        today.subtractYears(n);
        return today;
    }

    toString() {
        return `${this.dayName()} ${this.day}. ${this.monthName()} ${this.year}`;
    }

    static isLeapYear(year) {
        if (year % 4 === 0) {
            if (year % 100 === 0) {
                if (year % 400 === 0)
                    return true;
                else
                    return false;
            } else
                return true;
        } else
            return false;
    }
}

let today = new PlainDate();
today.subtractYears(1000);
console.log(today.toString())