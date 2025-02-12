// Listen for submit
document.getElementById('loan-form').addEventListener("submit", function (e) {
    // Hide results
    document.getElementById('results').style.display = 'none';

    // Show loader
    document.getElementById('loader').style.display = 'block';

    setTimeout(calculateResults, 2000);

    e.preventDefault();
});


function calculateResults() {
    // UI Variables
    const amount = document.getElementById("amount");
    const interest = document.getElementById("interest");
    const years = document.getElementById("years");
    const monthlyPayment = document.getElementById("monthly-payment");
    const totalPayment = document.getElementById("total-payment");
    const totalInterest = document.getElementById("total-interest");

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayment = parseFloat(years.value) * 12;

    // Compute monthly payment
    const x = Math.pow(1 + calculatedInterest, calculatedPayment);
    const monthly = (principal * x * calculatedInterest) / (x - 1);

    if (isFinite(monthly)) {
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayment).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayment) - principal).toFixed(2);

        document.getElementById('results').style.display = 'block';
        document.getElementById('loader').style.display = 'none';

    } else {
        showError("Please check your numbers")
    }


}

// Show error
function showError(error) {
    document.getElementById('results').style.display = 'none';
    document.getElementById('loader').style.display = 'none';
    // Create div
    const errorDiv = document.createElement('div');

    // Get Elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');


    // Add class
    errorDiv.className = "alert alert-danger";

    // create text node and append to div
    errorDiv.appendChild(document.createTextNode(error));

    // Insert error above heading
    card.insertBefore(errorDiv, heading)

    // Clear error after 3 seconds
    setTimeout(clearError, 3000)
}

function clearError() {
    document.querySelector('.alert').remove();
}