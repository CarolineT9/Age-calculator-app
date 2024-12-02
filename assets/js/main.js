const form = document.querySelector("#formulario");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const inputDay = document.querySelector("#day");
  const inputMonth = document.querySelector("#month");
  const inputYear = document.querySelector("#year");

  const day = inputDay.value.trim();
  const month = inputMonth.value.trim();
  const year = inputYear.value.trim();

  function showError(input, message) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = message;
    input.classList.add("invalid");
  }

  function clearError(input) {
    const errorSpan = input.nextElementSibling;
    errorSpan.textContent = "";
    input.classList.remove("invalid");
    input.value = "";
  }

 
  let hasError = false;


  if (!day || isNaN(day) || day < 1 || day > 31) {
    showError(inputDay, "Must be a valid day.");
    hasError = true;
  } else {
    clearError(inputDay);
  }


  if (!month || isNaN(month) || month < 1 || month > 12) {
    showError(inputMonth, "Must be a valid month.");
    hasError = true;
  } else {
    clearError(inputMonth);
  }

  if (
    !year ||
    isNaN(year) ||
    year.length !== 4 ||
    year < 0 ||
    year > new Date().getFullYear()
  ) {
    showError(inputYear, "Must be a valid year in yyyy format.");
    hasError = true;
  } else {
    clearError(inputYear);
  }

  if (
    !hasError &&
    !isValidDate(parseInt(day), parseInt(month), parseInt(year))
  ) {
    showError(inputDay, "Invalid date.");
    showError(inputMonth, "Invalid date.");
    showError(inputYear, "Invalid date.");
    hasError = true;
  }

  if (hasError) {
    return;
  }

  const { years, months, days } = calculateAge(
    parseInt(day),
    parseInt(month),
    parseInt(year)
  );

  document.querySelector(".results h1:nth-child(1) span").textContent = years;
  document.querySelector(".results h1:nth-child(2) span").textContent = months;
  document.querySelector(".results h1:nth-child(3) span").textContent = days;

  function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day
    );
  }

  function calculateAge(day, month, year) {
    const today = new Date();
    const birthday = new Date(year, month - 1, day);

    let years = today.getFullYear() - birthday.getFullYear();
    let months = today.getMonth() - birthday.getMonth();
    let days = today.getDate() - birthday.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    return { years, months, days };
  }
});
