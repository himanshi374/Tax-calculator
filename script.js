document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("taxForm");
    const modal = document.getElementById("modal");
    const closeBtn = document.querySelector(".close");
    const errorIcons = document.querySelectorAll(".error-icon");

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        hideErrorIcons();
        if (validateForm()) {
            showModal(calculateTax());
        }
    });

    closeBtn.addEventListener("click", function() {
        modal.style.display = "none";
    });

    function validateForm() {
        let isValid = true;
        const income = parseFloat(document.getElementById("income").value);
        const extraIncome = parseFloat(document.getElementById("extraIncome").value);
        const deductions = parseFloat(document.getElementById("deductions").value);
        const age = document.getElementById("age").value;

        if (isNaN(income)) {
            showErrorIcon("incomeError", "Invalid input");
            isValid = false;
        }
        if (isNaN(extraIncome)) {
            showErrorIcon("extraIncomeError", "Invalid input");
            isValid = false;
        }
        if (isNaN(deductions)) {
            showErrorIcon("deductionsError", "Invalid input");
            isValid = false;
        }
        if (age === "") {
            showErrorIcon("ageError", "Age is required");
            isValid = false;
        }

        return isValid;
    }

    function calculateTax() {
        const income = parseFloat(document.getElementById("income").value);
        const extraIncome = parseFloat(document.getElementById("extraIncome").value);
        const deductions = parseFloat(document.getElementById("deductions").value);
        const age = document.getElementById("age").value;

        const overallIncome = income + extraIncome - deductions;
        let tax = 0;

        if (overallIncome > 8) {
            switch (age) {
                case "<40":
                    tax = 0.3 * (overallIncome - 8);
                    break;
                case "≥40&<60":
                    tax = 0.4 * (overallIncome - 8);
                    break;
                case "≥60":
                    tax = 0.1 * (overallIncome - 8);
                    break;
            }
        }

        return tax.toFixed(2);
    }

    function showModal(tax) {
        const taxResult = document.getElementById("taxResult");
        taxResult.textContent = `Your tax amount is: ${tax} Rupees`;
        modal.style.display = "block";
    }

    function showErrorIcon(id, message) {
        const errorIcon = document.getElementById(id);
        errorIcon.style.display = "inline-block";
        errorIcon.title = message;
    }

    function hideErrorIcons() {
        errorIcons.forEach(icon => {
            icon.style.display = "none";
        });
    }
});
