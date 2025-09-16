// Акордеон
const buttons = document.querySelectorAll(".accordion-btn");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const content = btn.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
});

document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const phone = this.phone.value;
  const telegram = this.telegram.value;

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbyFUMEOyU_2jwqourqmXyRea0xyAFM4vrfqrruiUJp_OLxyxhivWIosEqEgORI1rb1ZSg/exec", {
      method: "POST",
      body: JSON.stringify({ phone, telegram })
    });

    const result = await res.json();
    document.getElementById("status").innerText = result.ok 
      ? "✅ Заявку надіслано!" 
      : "❌ Сталася помилка. Спробуйте ще раз.";
  } catch (err) {
    document.getElementById("status").innerText = "⚠️ Немає з'єднання з сервером.";
  }
});
