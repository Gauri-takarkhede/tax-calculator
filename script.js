const tooltipTriggerList = document.querySelectorAll(
  '[data-bs-toggle="tooltip"]'
);
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
);

$(document).ready(function () {
  // Form submission
  $(".errorIcon").hide();

  $("#taxForm").submit(function (event) {
    event.preventDefault();
    $(".errorIcon").hide();

    // Get input values
    var grossIncome = $("#grossIncome").val();
    var extraIncome = $("#extraIncome").val();
    var age = $("#age").val();
    var deductions = $("#deductions").val();

    console.log(grossIncome);
    console.log(extraIncome);
    console.log(age);
    console.log(deductions);

    // Validate input fields and show error icons
    var hasErrors = validateInputs(grossIncome, extraIncome, age, deductions);
    if (!hasErrors) {
      // Perform form submission
      // Calculate total income after deductions
      var totalIncome =
        parseFloat(grossIncome) +
        parseFloat(extraIncome) -
        parseFloat(deductions);
      console.log(grossIncome + " " + extraIncome + " " + deductions);

      // Calculate tax based on age and income
      var tax;
      if (totalIncome <= 8) {
        tax = 0;
      } else {
        if (age === "<40") {
          tax = 0.3 * (totalIncome - 8);
        } else if (age === "≥ 40 &lt; 60") {
          tax = 0.4 * (totalIncome - 8);
        } else {
          tax = 0.1 * (totalIncome - 8);
        }
      }
      console.log(totalIncome);
      console.log(tax.toFixed(2));

      // Update the modal body with the calculated tax amount
      $("#taxResult").html(
        "<b>" + Math.floor((totalIncome - tax) * 100000) + " </b>"
      );

      // Activate the modal
      $("#exampleModal").modal("show");
      $("#exampleModal").on("hidden.bs.modal", function () {
        // Clear all input fields
        $("#taxForm")[0].reset();
      });
    }
  });

  // Function to validate input fields and show error icons
  function validateInputs(grossIncome, extraIncome, age, deductions) {
    var errorGross = "";
    var errorExtra = "";
    var errorAge = "";
    var errorDeductions = "";
    var hasErrors = false;

    //Add error messages to show in tooltip
    if (isNaN(grossIncome) || grossIncome === "") {
      errorGross = "Please enter numbers only.";
      hasErrors = true;
    } else if (grossIncome < 0) {
      errorGross = "Gross annual income cannot be negative.";
      hasErrors = true;
    }
    if (isNaN(extraIncome) || extraIncome === "") {
      errorExtra = "Please enter numbers only.";
      hasErrors = true;
    } else if (extraIncome < 0) {
      errorExtra = "Extra income cannot be negative.";
      hasErrors = true;
    }
    if (age === null) {
      errorAge = "Please select the age group.";
      hasErrors = true;
    }
    if (isNaN(deductions) || deductions === "") {
      errorDeductions = "Please enter numbers only.";
      hasErrors = true;
    } else if (deductions < 0) {
      errorDeductions = "Deductions cannot be negative.";
      hasErrors = true;
    }
    console.log(errorGross);
    console.log(errorExtra);
    console.log(errorAge);
    console.log(errorDeductions);

    //If there is any error, error icon will activate(toggle)
    if (hasErrors) {
      if (errorGross != "") {
        $("#grossIncomeError")
          .attr("data-bs-title", errorGross)
          .tooltip("dispose")
          .tooltip()
          .toggle(!!errorGross);
      }
      if (errorExtra != "") {
        $("#extraIncomeError")
          .attr("data-bs-title", errorExtra)
          .tooltip("dispose")
          .tooltip()
          .toggle(!!errorExtra);
      }
      if (errorAge != "") {
        $("#ageError")
          .attr("data-bs-title", errorAge)
          .tooltip("dispose")
          .tooltip()
          .toggle(!!errorAge);
      }
      if (errorDeductions != "") {
        $("#deductionsError")
          .attr("data-bs-title", errorDeductions)
          .tooltip("dispose")
          .tooltip()
          .toggle(!!errorDeductions);
      }
    }

    //Return true or False whether there is any error or not.
    return hasErrors;
  }
});
