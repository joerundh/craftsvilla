class HourBlock {
    constructor(start, end) {
        [ this.start, this.end ] = [ start, end ];
        this.selected = false;

        this.mainComponent = document.createElement("div");
        this.className = "hour-block";

        this.timeLabel = document.createElement("p");
        this.timeLabel.textText = `${start} - ${end}`;
    }

    asComponent() {
        return this.mainComponent;
    }
}

class Calendar {
    constructor(startHour, endHour) {
        [ this.startHour, this.endHour ] = [ startHour, endHour ];
        let selected = [];

        this.mainComponent = document.createElement("div");
        this.className = "calendar";
        
        this.header = document.createElement("div");
        this.header.className = "calendar-header";
        
        this.weekView = document.createElement("div");
        this.weekView.className = "week-struct";
        
        for (let i = 0; i < 5; i++) {

        }
    }

    createDayStack() {

    }

    asComponent() {
        return this.mainComponent();
    }
}