/* 20/10 — Nine gifts, nine wishes.
   Put photos in assets/pic1.png ... assets/pic9.png. Photos are shown only after opening a gift.
*/

const GIFT_ITEMS = [
  {
    id: 1,
    flower: "Hoa Hồng",
    image: "assets/pic1.png",
    wish: "Chúc bạn luôn rạng rỡ và ngát hương như những đóa hoa hồng. Mong rằng mỗi ngày trôi qua với bạn đều tràn ngập tình yêu thương, sự ngọt ngào và luôn là đóa hoa xinh đẹp nhất trong lòng những người thân yêu. Chúc mừng ngày 20/10!"
  },
  {
    id: 2,
    flower: "Hoa Oải Hương",
    image: "assets/pic2.png",
    wish: "Nhân ngày 20/10, chúc bạn luôn giữ được vẻ đẹp dịu dàng, sự bình yên và tinh tế như sắc tím oải hương. Mong rằng cuộc sống của bạn luôn ngập tràn sự thư thái, nhẹ nhàng và luôn nhận được sự chăm sóc, yêu thương từ những người xung quanh."
  },
  {
    id: 3,
    flower: "Hoa Loa Kèn",
    image: "assets/pic3.png",
    wish: "Chúc bạn ngày 20/10 tràn đầy niềm vui và luôn giữ vững vẻ đẹp thanh cao, tinh khôi như những cánh hoa loa kèn. Chúc cho những ước mơ và dự định của bạn sẽ luôn vươn cao, tỏa sáng rực rỡ!"
  },
  {
    id: 4,
    flower: "Hoa Tulip",
    image: "assets/pic4.png",
    wish: "Gửi tới bạn lời chúc 20/10 tươi trẻ và đong đầy hạnh phúc. Mong bạn luôn như một bông hoa tulip năng động, thanh lịch và luôn gặp thật nhiều may mắn, trọn vẹn trong mọi điều bạn lựa chọn."
  },
  {
    id: 5,
    flower: "Hoa Hướng Dương",
    image: "assets/pic5.png",
    wish: "Chúc bạn một ngày 20/10 thật rạng rỡ! Mong bạn luôn giữ vững nụ cười ấm áp, lòng nhiệt huyết và năng lượng tích cực như đóa hướng dương luôn hướng về phía mặt trời. Chúc mọi bước đi của bạn luôn ngập tràn ánh sáng."
  },
  {
    id: 6,
    flower: "Hoa Lan",
    image: "assets/pic6.png",
    wish: "Nhân ngày Phụ nữ Việt Nam 20/10, xin gửi lời chúc tốt đẹp nhất đến bạn. Chúc bạn luôn giữ được nét đẹp sang trọng, quý phái cùng sức sống dẻo dai, kiên cường như loài hoa lan quý."
  },
  {
    id: 7,
    flower: "Hoa Sen",
    image: "assets/pic7.png",
    wish: "Chúc bạn ngày 20/10 thật ý nghĩa. Mong rằng dù trong bất kỳ hoàn cảnh nào, bạn vẫn luôn giữ được sự thuần khiết, tâm hồn thanh tao và vẻ đẹp mặn mà, đằm thắm đúng như phẩm chất của loài hoa sen."
  },
  {
    id: 8,
    flower: "Hoa Mẫu Đơn",
    image: "assets/pic8.png",
    wish: "Chúc bạn một ngày 20/10 thật đong đầy tình yêu! Mong bạn luôn lộng lẫy, kiêu sa như đóa mẫu đơn nở rộ và luôn được yêu thương, trân trọng, sống trong sự viên mãn và hạnh phúc."
  },
  {
    id: 9,
    flower: "Hoa Cẩm Tú Cầu",
    image: "assets/pic9.png",
    wish: "Chúc bạn ngày 20/10 ngập tràn niềm vui và ấm áp. Cẩm tú cầu mang ý nghĩa của sự trọn vẹn và chân thành, mong rằng bạn sẽ luôn nhận được những tình cảm chân thành nhất và có một cuộc sống trọn vẹn, sum vầy bên những người yêu thương."
  }
];

const html = document.documentElement;
const giftGrid = document.querySelector("#giftGrid");
const themeToggle = document.querySelector("#themeToggle");
const themeLabel = document.querySelector("#themeLabel");
const modal = document.querySelector("#wishModal");
const modalPanel = document.querySelector(".modal-panel");
const modalClose = document.querySelector("#modalClose");
const modalImage = document.querySelector("#modalImage");
const photoFrame = document.querySelector("#photoFrame");
const photoPlaceholder = document.querySelector("#photoPlaceholder");
const placeholderFilename = document.querySelector("#placeholderFilename");
const wishTitle = document.querySelector("#wishTitle");
const wishText = document.querySelector("#wishText");
const wishCounter = document.querySelector("#wishCounter");
const copyWishButton = document.querySelector("#copyWish");
const previousWishButton = document.querySelector("#previousWish");
const nextWishButton = document.querySelector("#nextWish");
const toast = document.querySelector("#toast");

let activeIndex = 0;
let previouslyFocusedElement = null;
let imageLoadToken = 0;
let toastTimer = null;

function readTheme() {
  try {
    return localStorage.getItem("20-10-gift-theme") === "dark" ? "dark" : "light";
  } catch {
    return "light";
  }
}

function applyTheme(theme) {
  html.dataset.theme = theme;
  const isDark = theme === "dark";
  themeToggle.setAttribute("aria-pressed", String(isDark));
  themeToggle.setAttribute("aria-label", isDark ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối");
  themeLabel.textContent = isDark ? "Giao diện tối" : "Giao diện sáng";
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", isDark ? "#211d1d" : "#faf5ed");
  try {
    localStorage.setItem("20-10-gift-theme", theme);
  } catch {
    // The page still works when storage is disabled (for example, in private file contexts).
  }
}

function makeGift(item) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "gift-button";
  button.dataset.giftId = String(item.id);
  button.setAttribute("aria-label", `Mở hộp quà số ${item.id}`);
  button.setAttribute("aria-haspopup", "dialog");
  button.innerHTML = `
    <span class="gift-art" aria-hidden="true">
      <span class="gift-body"></span>
      <span class="gift-lid"></span>
      <span class="gift-band-v"></span>
      <span class="gift-band-h"></span>
      <span class="gift-bow"><span class="gift-bow-knot"></span></span>
      <span class="gift-sparkle gift-sparkle--left">✦</span>
      <span class="gift-sparkle gift-sparkle--right">✧</span>
    </span>`;
  button.addEventListener("click", () => openGift(item.id - 1));
  return button;
}

function renderGifts() {
  const fragment = document.createDocumentFragment();
  GIFT_ITEMS.forEach((item) => fragment.appendChild(makeGift(item)));
  giftGrid.replaceChildren(fragment);
}

function setPhotoState(state) {
  photoFrame.dataset.state = state;
}

function loadPhoto(item) {
  const currentToken = ++imageLoadToken;
  modalImage.hidden = true;
  modalImage.removeAttribute("src");
  modalImage.alt = `Ảnh minh họa cho lời chúc ${item.flower}`;
  photoPlaceholder.hidden = true;
  placeholderFilename.textContent = item.image;
  setPhotoState("loading");

  const image = new Image();
  image.decoding = "async";
  image.onload = () => {
    if (currentToken !== imageLoadToken) return;
    modalImage.src = item.image;
    modalImage.hidden = false;
    photoPlaceholder.hidden = true;
    setPhotoState("loaded");
  };
  image.onerror = () => {
    if (currentToken !== imageLoadToken) return;
    modalImage.hidden = true;
    photoPlaceholder.hidden = false;
    setPhotoState("fallback");
  };
  image.src = item.image;
}

function updateModal(index) {
  activeIndex = (index + GIFT_ITEMS.length) % GIFT_ITEMS.length;
  const item = GIFT_ITEMS[activeIndex];
  wishTitle.textContent = item.flower;
  wishText.textContent = item.wish;
  wishCounter.textContent = `${String(item.id).padStart(2, "0")} / ${String(GIFT_ITEMS.length).padStart(2, "0")}`;
  loadPhoto(item);
}

function openGift(index) {
  previouslyFocusedElement = document.activeElement;
  updateModal(index);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
  window.requestAnimationFrame(() => modalClose.focus());
}

function closeModal() {
  if (!modal.classList.contains("is-open")) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  imageLoadToken += 1;
  if (previouslyFocusedElement instanceof HTMLElement) previouslyFocusedElement.focus();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2100);
}

async function copyCurrentWish() {
  const item = GIFT_ITEMS[activeIndex];
  const text = `${item.flower}\n\n${item.wish}`;
  try {
    await navigator.clipboard.writeText(text);
    showToast("Đã sao chép lời chúc.");
  } catch {
    const helper = document.createElement("textarea");
    helper.value = text;
    helper.setAttribute("readonly", "");
    helper.style.position = "fixed";
    helper.style.opacity = "0";
    document.body.appendChild(helper);
    helper.select();
    const copied = document.execCommand("copy");
    helper.remove();
    showToast(copied ? "Đã sao chép lời chúc." : "Không thể sao chép tự động; bạn có thể chọn và sao chép văn bản.");
  }
}

function moveWish(direction) {
  updateModal(activeIndex + direction);
}

themeToggle.addEventListener("click", () => {
  applyTheme(html.dataset.theme === "dark" ? "light" : "dark");
});
modalClose.addEventListener("click", closeModal);
modal.querySelectorAll("[data-close-modal]").forEach((element) => element.addEventListener("click", closeModal));
copyWishButton.addEventListener("click", copyCurrentWish);
previousWishButton.addEventListener("click", () => moveWish(-1));
nextWishButton.addEventListener("click", () => moveWish(1));

document.addEventListener("keydown", (event) => {
  if (!modal.classList.contains("is-open")) return;
  if (event.key === "Escape") closeModal();
  if (event.key === "ArrowLeft") moveWish(-1);
  if (event.key === "ArrowRight") moveWish(1);

  // Keep keyboard focus inside the dialog while it is open.
  if (event.key === "Tab") {
    const focusable = Array.from(modalPanel.querySelectorAll('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'));
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }
});

renderGifts();
applyTheme(readTheme());
