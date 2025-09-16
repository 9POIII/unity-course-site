// Акордеон
const buttons = document.querySelectorAll(".accordion-btn");
buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const content = btn.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
});

// Форма
document.getElementById("contactForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const phone = this.phone.value;
  const telegram = this.telegram.value;

  try {
    const res = await fetch("https://script.google.com/macros/s/AKfycbyFUMEOyU_2jwqourqmXyRea0xyAFM4vrfqrruiUJp_OLxyxhivWIosEqEgORI1rb1ZSg/exec", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, telegram })
    });

    const result = await res.json();
    document.getElementById("status").innerText = result.ok 
      ? "✅ Заявку надіслано!" 
      : "❌ Сталася помилка. Спробуйте ще раз.";
    if(result.ok) this.reset();
  } catch (err) {
    document.getElementById("status").innerText = "⚠️ Немає з'єднання з сервером.";
    console.error(err);
  }
});
