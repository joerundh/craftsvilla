class PlainDate {   
    static months = [
        { name: "januar",   days: (yr) => 31 },
        { name: "februar",  days: (yr) => is },
        { name: "mars", days = (yr) => 31 },
        { name: "april", days = (yr) => 31 },
        { name: "mai", days = (yr) => 31 },
        { name: "juni", days = (yr) => 31 },
        { name: "juli", days = (yr) => 31 },
        { name: "august", days = (yr) => 31 },
        { name: "september", days = (yr) => 31 },
        { name: "oktober", days = (yr) => 31 },
        { name: "november", days = (yr) => 31 },
        { name: "desember", days = (yr) => 31 }
    ];
    static days = [
        "mandag",
        "tirsdag",
        "onsdag",
        "torsdag",
        "fredag",
        "lørdag",
        "søndag"
    ];

    constructor() {
        if (arguments.length) {

        } else {
            let today = new Date();

            this.day = today.getDate
        }
    }
}