'use strict';

/*------------Validation Function-----------------*/

/* Validation of student profile set-up. */
function stud_validation(event) {
    let isChecked = 0;
    let radio_check = document.getElementsByName('gender'); // Fetching radio button by name.
    let school_check = document.getElementById("school");
    let course_check = document.getElementById("course");
    let box_check = document.getElementsByClassName('checkgrid1'); // Fetching checkbox by class.
    // Validating radio button.
    if (radio_check[0].checked == false && radio_check[1].checked == false) {
        isChecked = 0;
        document.getElementById("gender_label").style.color = "red";
    } else {
        isChecked = 1;
    }
    // Validating school selected.
    let strOption = school_check.options[school_check.selectedIndex].value;
    if (strOption != 1) {
        isChecked += 1;
    } else {
        document.getElementById("school_label").style.color = "red";
    }
    // Validating course selected.
    strOption = course_check.options[course_check.selectedIndex].text;
    if (strOption != "--Select Course--") {
        isChecked += 1;
    } else {
        document.getElementById("course_label").style.color = "red";
    }
    // Validating checkboxes.
    let isTicked = false;
    for (let i = 0; i < box_check.length; i++) {
        if(box_check[i].checked) {
            isChecked += 1;
            isTicked = true;
        }
    }
    if (!isTicked) {
        document.getElementById("interest_label").style.color = "red";
    }

    if (isChecked < 4) {
        alert("*All Fields are mandatory*"); // Notifying validation
        event.preventDefault();
    } else {
        return true;
    }
}

/* Validation of organisation profile set-up. */
function org_validation(event) {
    let isChecked = 0;
    let name_check = document.getElementById("org_name"); // Fetch organisation name.
    let grid_check = document.getElementsByClassName("checkgrid2"); // Fetch competition types grid.
    let text_check = document.getElementsByName("description"); // Fetch description text box.
    
    // Validating organisation name.
    if (name_check.value == '') {
        document.getElementById("name_label").style.color = "red";
    } else {
        isChecked += 1;
    }
    // Validating checkboxes.
    let isTicked = false;
    for (let i = 0; i < grid_check.length; i++) {
        if(grid_check[i].checked) {
            isChecked += 1;
            isTicked = true;
        }
    }
    if (!isTicked) {
        document.getElementById("comp_label").style.color = "red";
    }
    // Validating text area.
    if (text_check.value) {
        isChecked += 1;
    } else {
        document.getElementById("description_label").style.color = "red";
    }

    if (isChecked < 3) {
        alert("*All Fields are mandatory*"); // Notifying validation
        event.preventDefault();
    } else {
        return true;
    }
}

/*---------------------------------------------------------*/
// Function that executes on click of first next button.
function student_profile() {
    document.getElementById("first").style.display = "none";
    document.getElementById("second").style.display = "block";
    // document.getElementById("active2").style.color = "red";
}
// Function that executes on click of first previous button.
function prev_step() {
    document.getElementById("first").style.display = "block";
    document.getElementById("second").style.display = "none";
    document.getElementById("third").style.display = "none";
    // document.getElementById("active1").style.color = "red";
    // document.getElementById("active2").style.color = "gray";
}
// Function that executes on click of second next button.
function org_profile() {
    document.getElementById("first").style.display = "none";
    document.getElementById("third").style.display = "block";
    // document.getElementById("active3").style.color = "red";
}