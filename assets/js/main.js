const form = document.querySelector("#formulario");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputDay = document.querySelector("#day");
  const inputMonth = document.querySelector("#month");
  const inputYear = document.querySelector("#year");

  const dayError = document.querySelector("#day + .error-message");
  const monthError = document.querySelector("#month + .error-message");
  const yearError = document.querySelector("#year + .error-message");

  const resultYears = document.querySelector("section:nth-of-type(2) h1:nth-of-type(1) span");
  const resultMonths = document.querySelector("section:nth-of-type(2) h1:nth-of-type(2) span");
  const resultDays = document.querySelector("section:nth-of-type(2) h1:nth-of-type(3) span");

  // Clear previous results and errors
  resultYears.textContent = "--";
  resultMonths.textContent = "--";
  resultDays.textContent = "--";
  dayError.textContent = "";
  monthError.textContent = "";
  yearError.textContent = "";

  const day = parseInt(inputDay.value);
  const month = parseInt(inputMonth.value);
  const year = parseInt(inputYear.value);

  // Function to validate the date
  function validateDate(day, month, year) {
    const currentYear = new Date().getFullYear();
    let isValid = true;

    // Reset errors
    dayError.textContent = monthError.textContent = yearError.textContent = "";

    // Validate day, month, and year
    if (isNaN(day) || day < 1 || day > 31) {
      dayError.textContent = "Day must be between 1 and 31.";
      isValid = false;
    }

    if (isNaN(month) || month < 1 || month > 12) {
      monthError.textContent = "Month must be between 1 and 12.";
      isValid = false;
    }

    if (isNaN(year) || year < 1900 || year > currentYear) {
      yearError.textContent = `Year must be between 1900 and ${currentYear}.`;
      isValid = false;
    }

    // Check if the date is valid
    const testDate = new Date(year, month - 1, day);
    if (testDate.getDate() !== day || testDate.getMonth() !== month - 1 || testDate.getFullYear() !== year) {
      yearError.textContent = "Invalid date.";
      isValid = false;
    }

    // Check if the date is in the future
    if (new Date(year, month - 1, day) > new Date()) {
      yearError.textContent = "Date cannot be in the future.";
      isValid = false;
    }

    return isValid;
  }

  // Function to calculate age
  function calculateAge(day, month, year) {
    const birthDate = new Date(year, month - 1, day);
    const currentDate = new Date();

    let ageYears = currentDate.getFullYear() - birthDate.getFullYear();
    let ageMonths = currentDate.getMonth() - birthDate.getMonth();
    let ageDays = currentDate.getDate() - birthDate.getDate();

    // Adjust for incomplete months
    if (ageDays < 0) {
      ageMonths--;
      ageDays += new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDate();
    }

    // Adjust for incomplete years
    if (ageMonths < 0) {
      ageYears--;
      ageMonths += 12;
    }

    return { ageYears, ageMonths, ageDays };
  }

  // Validate and calculate age
  if (validateDate(day, month, year)) {
    const { ageYears, ageMonths, ageDays } = calculateAge(day, month, year);

    resultYears.textContent = ageYears;
    resultMonths.textContent = ageMonths;
    resultDays.textContent = ageDays;

    // Reset the form fields after calculation
    form.reset();
  }
});

