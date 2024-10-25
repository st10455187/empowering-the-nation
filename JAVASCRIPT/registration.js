document.addEventListener("DOMContentLoaded", function () {
   const submitButton = document.querySelector(".bottom-buttons2");
   const messageDisplay = document.createElement("p");
   messageDisplay.id = "confirmationMessage";
   submitButton.insertAdjacentElement("afterend", messageDisplay);

   submitButton.addEventListener("click", async function (event) {
      event.preventDefault();

      const checkboxes = document.querySelectorAll(".check-box");
      const courseLabels = document.querySelectorAll(".course-lable-name");

      const name = document
         .querySelector('input[placeholder="Enter your name"]')
         .value.trim();
      const surname = document
         .querySelector('input[placeholder="Enter your surname"]')
         .value.trim();
      const email = document
         .querySelector('input[placeholder="Enter your email address"]')
         .value.trim();
      const phone = document
         .querySelector('input[placeholder="Enter your phone number"]')
         .value.trim();
      const street = document
         .querySelector('input[placeholder="Enter your street"]')
         .value.trim();
      const city = document
         .querySelector('input[placeholder="Enter your city"]')
         .value.trim();
      const suburb = document
         .querySelector('input[placeholder="Enter your suburb"]')
         .value.trim();
      const postalCode = document
         .querySelector('input[placeholder="Enter your postal code"]')
         .value.trim();
      const province = document
         .querySelector('input[placeholder="Enter your province"]')
         .value.trim();

      const isCourseSelected = Array.from(checkboxes).some(
         (checkbox) => checkbox.checked
      );
      if (!isCourseSelected) {
         messageDisplay.textContent = "Please select at least one course.";
         messageDisplay.style.color = "red";
         return;
      }
      if (!name || !surname || !email || !phone) {
         messageDisplay.textContent =
            "Please fill in all required information.";
         messageDisplay.style.color = "red";
         return;
      }

      let selectedCourses = [];
      checkboxes.forEach((checkbox, index) => {
         if (checkbox.checked) {
            selectedCourses.push({
               name: courseLabels[index].textContent.trim(),
               price: checkbox.nextSibling.nodeValue.trim(),
            });
         }
      });

      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();

      const logoUrl = "/Images/logo-no-text-no-bg.png"; // Ensure the path is correct
      const imgWidth = 40;
      const imgHeight = 40;
      await pdf.addImage(logoUrl, "PNG", 10, 10, imgWidth, imgHeight);

      pdf.setFontSize(12);
      pdf.text("Personal Details:", 20, 60);
      pdf.text(`Name: ${name} ${surname}`, 20, 70);
      pdf.text(`Email: ${email}`, 20, 80);
      pdf.text(`Phone: ${phone}`, 20, 90);
      pdf.text(
         `Address: ${street}, ${suburb}, ${city}, ${province}, ${postalCode}`,
         20,
         100
      );

      pdf.text("Selected Courses", 20, 120);
      pdf.setFont("Verdana", "bold");
      pdf.text("Course Name", 20, 130);
      pdf.setFont("Verdana", "normal");

      let yPos = 140;
      selectedCourses.forEach((course) => {
         pdf.text(course.name, 20, yPos);
         pdf.text(course.price, 180, yPos, { align: "right" });
         yPos += 10;
      });

      pdf.setFont("Verdana", "bold");

      pdf.save(`${name} ${surname} Registration Details.pdf`);

      messageDisplay.textContent = `Hi, ${name}! We have received your registration request, and we will call you in a moment.`;
      messageDisplay.style.color = "green";
   });
});
