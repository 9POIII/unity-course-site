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

// URL твоего Web App (после публикации "Deploy → New deployment → Web app")
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbxCGsdj_AMoiOL_HKBrnciGtazed0Qk952MVqZ6zTDZmznFhO-EaLMBRtUUS8mgBWwA7g/exec";

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const phone = this.phone.value.trim();
  const telegram = this.telegram.value.trim() || "не вказано";

  if (!phone) {
    statusDiv.innerText = "⚠️ Введіть номер телефону";
    return;
  }

  statusDiv.innerText = "⏳ Надсилаємо заявку...";

  try {
    // Отправляем FormData (не JSON!)
    const formData = new FormData();
    formData.append("phone", phone);
    formData.append("telegram", telegram);

    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      body: formData
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

