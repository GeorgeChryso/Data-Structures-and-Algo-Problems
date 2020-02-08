// Given two numbers, hour and minutes. Return the smaller angle (in sexagesimal units) formed between the hour and the minute hand



var angleClock = function(hour, minutes) {
    if(hour==12)hour==0 // 0 and 12 shouldnt coexist cos we re talking about the same time

    let minuteDegrees=minutes*6 //1minute is 6 degrees from 12:00/0:00
    let hourDegrees=hour*30+minutes/2 //1hour is 30 degrees + the offset of degrees that  depends on minutes (that would be minutes/2 degrees)  (from 12:00/0:00)
    //e.g. 4:30 would mean that 4 is essentially 4.5, so the offset was 30/2=15 extra degrees
    // because 4=>120 degrees,whereas 4.5=>135 degrees, the offset of the 15 degrees of difference was a result of 30 

    let difference=Math.abs(minuteDegrees-hourDegrees) // the difference in between them

    return Math.min(difference,360-difference) //I want the minimum difference between them which is either the difference itself or the sum of all the degrees left
}


