document.addEventListener("DOMContentLoaded", () => {
   const courses = {
      "first-aid": 1500,
      sewing: 1500,
      landscapping: 1500,
      "life-skills": 1500,
      "child-minding": 750,
      cooking: 750,
      "garden-maintenance": 750,
   };

   const discountRates = {
      1: 0,
      2: 0.05,
      3: 0.1,
      4: 0.15,
      5: 0.15,
      6: 0.15,
      7: 0.15,
   };

   const checkboxes = document.querySelectorAll(".check-box");
   const subtotalDisplay = document.getElementById("subtotal-price");
   const discountDisplay = document.getElementById("discount-price-text");
   const grandTotalDisplay = document.getElementById("grand-total-price");

   // Define a function to calculate and update totals
   function calculateTotals() {
      let subtotal = 0;
      let selectedCourses = 0;

      checkboxes.forEach((checkbox) => {
         if (checkbox.checked) {
            subtotal += courses[checkbox.id];
            selectedCourses++;
         }
      });

      const discountRate = discountRates[selectedCourses] || 0;
      const discountAmount = subtotal * discountRate;
      const grandTotal = subtotal - discountAmount;

      subtotalDisplay.textContent = `R${subtotal.toFixed(2)}`;
      discountDisplay.textContent = `- R${discountAmount.toFixed(2)}`;
      grandTotalDisplay.textContent = `R${grandTotal.toFixed(2)}`;
   }

   // Add event listener to each checkbox for automatic calculation on change
   checkboxes.forEach((checkbox) => {
      checkbox.addEventListener("change", calculateTotals);
   });
});
