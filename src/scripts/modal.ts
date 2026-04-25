function openModal(id: string): void {
  const modal = document.getElementById(id);
  if (!modal) return;

  modal.classList.remove("hidden");
  requestAnimationFrame(() => {
    modal.classList.remove("opacity-0", "scale-95");
    modal.classList.add("opacity-100", "scale-100", "z-50");
  });
}

function closeModal(id: string): void {
  if (typeof id !== "string") return;

  const modal = document.getElementById(id);
  if (!modal) return;

  const form = modal.querySelector("form");

  modal.classList.add("opacity-0", "scale-95");
  const DURATION = 150;

  setTimeout(() => {
    modal.classList.add("hidden");
    if (form) form.reset();

    if (window.location.hash === `#${id}`) {
      history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
    }
  }, DURATION);
}

function showToast(
  message: string,
  type: "success" | "error" = "success",
): void {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.innerHTML = `${message}`;

  toast.classList.remove("border-green-500", "border-red-500");
  toast.classList.add(
    type === "success" ? "border-green-500" : "border-red-500",
  );

  toast.classList.remove("opacity-0", "translate-y-4", "pointer-events-none");
  toast.classList.add("opacity-100", "translate-y-0");

  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-4", "pointer-events-none");
    toast.classList.remove("opacity-100", "translate-y-0");
  }, 3000);
}

(window as any).openModal = openModal;
(window as any).closeModal = closeModal;

const form = document.getElementById("talkForm") as HTMLFormElement | null;

form?.addEventListener("submit", async (e: Event) => {
  e.preventDefault();

  const submitBtn = form.querySelector(
    ".talk-submit-btn",
  ) as HTMLButtonElement | null;
  if (!submitBtn) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Sending...";

  const data = Object.fromEntries(new FormData(form));

  try {
    const res = await fetch("/src/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    const result = await res.json();

    showToast(
      result.message || "Something happened",
      result.success ? "success" : "error",
    );

    if (result.success) {
      submitBtn.textContent = "Sent";
      setTimeout(() => {
        form.reset();
        submitBtn.textContent = "Submit";
        submitBtn.disabled = false;
        closeModal("talkModal");
      }, 800);
    } else {
      submitBtn.textContent = "Submit";
      submitBtn.disabled = false;
    }
  } catch (err) {
    showToast(
      "Disconnected to the API intentionally. Please contact the developer for more info.",
      "error",
    );
    submitBtn.textContent = "Submit";
    submitBtn.disabled = false;
  }
});
