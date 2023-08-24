const FormatDate = (date, noTime) => {

    // Check if the 'date' object is defined and has the 'seconds' property
        if (date && date.seconds) {

            const newDate = new Date(date.seconds * 1000);

            if(noTime == true) {

                const display = {
                    day: "numeric",
                    month: "short",
                    year: "2-digit",
                }

                return newDate.toLocaleDateString("en-GB", display)


            }
            else {

                const display = {
                    day: "numeric",
                    month: "short",
                    year: "2-digit",
                    hour: 'numeric',
                    minute: 'numeric',
                }

                return newDate.toLocaleDateString("en-GB", display)

            }


        }     

}

export default FormatDate;
