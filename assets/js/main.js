const form = document.querySelector("#formulario");

form.addEventListener("submit", function (event) {
  event.preventDefault();


  let inputDay = document.querySelector('#day');
  let inputMonth = document.querySelector('#month');
  let inputYear = document.querySelector('#year');

  let day = parseInt(inputDay.value)
  let month = parseInt(inputMonth.value)
  let year = parseInt(inputYear.value)

  function showError(input, message) {
    const errorSpan = input.nextElementSibling; 
    const label = input.previousElementSibling; 
    errorSpan.textContent = message; 
    input.classList.add("invalid");
    label.classList.add("error");
  }
  
  if (!day) {
    showError(inputDay, "Must be a valid day.");
    return;
  }
  if (!month) {
    showError(inputMonth, "Must be a valid month.");
    return;
  }
  if (!year) {
    showError(inputYear, "Must be a valid year.");
    return;
  }
  const { years, months, days } = calculateAge(day, month, year)

  document.querySelector(".results h1:nth-child(1) span").textContent = years
  document.querySelector(".results h1:nth-child(2) span").textContent = months
  document.querySelector(".results h1:nth-child(3) span").textContent = days

  // Função para validar a data
  function isValidDate(day, month, year) {
    const date = new Date(year, month - 1, day);
    return (
      date.getFullYear() === year && 
      date.getMonth() === month - 1 && 
      date.getDate() === day 
    );
  }
  // função para calcular idade

  function calculateAge(day, month, year) {
   
    if (!isValidDate(day, month, year)) {
      showError(inputDay, "invalid date");
      return;
    }
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

    return { years, months, days }
  };


});
