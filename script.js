// --------------------------------------
// Акордеон
// --------------------------------------
const buttons = document.querySelectorAll(".accordion-btn");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const content = btn.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
});

// --------------------------------------
// Отправка формы
// --------------------------------------
const form = document.getElementById("contactForm");
const statusDiv = document.getElementById("status");

// Укажи здесь URL твоего Web App после публикации
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyFUMEOyU_2jwqourqmXyRea0xyAFM4vrfqrruiUJp_OLxyxhivWIosEqEgORI1rb1ZSg/exec";

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const phone = this.phone.value.trim();
  const telegram = this.telegram.value.trim() || "не вказано";

  // Проверка на пустое поле (только телефон обязателен)
  if (!phone) {
    statusDiv.innerText = "⚠️ Введіть номер телефону";
    return;
  }

  // Сообщение пользователю
  statusDiv.innerText = "⏳ Надсилаємо заявку...";

  try {
    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, telegram })
    });

    const result = await response.json();

    if (result.ok) {
      statusDiv.innerText = "✅ Заявку надіслано!";
      form.reset();
    } else {
      statusDiv.innerText = "❌ Сталася помилка. Спробуйте ще раз.";
      console.error(result);
    }
  } catch (error) {
    statusDiv.innerText = "⚠️ Немає з'єднання з сервером.";
    console.error(error);
  }
});
//https://script.google.com/macros/s/AKfycbyFUMEOyU_2jwqourqmXyRea0xyAFM4vrfqrruiUJp_OLxyxhivWIosEqEgORI1rb1ZSg/exec
