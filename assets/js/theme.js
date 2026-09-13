// Category filter
function filterCategory(category) {
	const cards = document.querySelectorAll('.product-card');
	const buttons = document.querySelectorAll('.tab-btn');
	const clickedButton = window.event ? window.event.target : null;

	buttons.forEach(button => button.classList.remove('active'));
	if (clickedButton && clickedButton.classList.contains('tab-btn')) {
		clickedButton.classList.add('active');
	}

	cards.forEach(card => {
		const matchesCategory = category === 'all' || card.getAttribute('data-category') === category;
		card.style.display = matchesCategory ? 'block' : 'none';
	});
}

// Homepage slider
const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
	if (!slides.length) {
		return;
	}

	slides.forEach(slide => slide.classList.remove('active'));
	currentSlide = (index + slides.length) % slides.length;
	slides[currentSlide].classList.add('active');
}

function moveSlide(direction) {
	showSlide(currentSlide + direction);
}

if (slides.length > 1) {
	setInterval(() => moveSlide(1), 4000);
}

const whatsappOwners = [
	{ name: 'Nizam Aziz', phone: '923278277233' },
	{ name: 'Rizwan Ehsan', phone: '923372162169' },
	{ name: 'Aziz Ullah', phone: '923442499299' }
];

function createOwnerChooser(productName, message) {
	const overlay = document.createElement('div');
	overlay.className = 'owner-chooser-overlay';
	overlay.innerHTML = `
		<div class="owner-chooser" role="dialog" aria-modal="true" aria-labelledby="owner-chooser-title">
			<button class="owner-chooser-close" type="button" aria-label="Close owner selection">&times;</button>
			<p class="owner-chooser-kicker">WhatsApp message</p>
			<h2 id="owner-chooser-title">Choose who to talk to</h2>
			<p class="owner-chooser-product">${productName}</p>
			<div class="owner-list">
				${whatsappOwners.map(owner => `
					<a class="owner-option" href="https://wa.me/${owner.phone}?text=${encodeURIComponent(message)}" target="_blank" rel="noopener">
						<i class="fa-brands fa-whatsapp"></i>
						<span>${owner.name}</span>
						<i class="fa-solid fa-arrow-up-right-from-square"></i>
					</a>
				`).join('')}
			</div>
		</div>
	`;

	const closeChooser = () => overlay.remove();
	overlay.addEventListener('click', event => {
		if (event.target === overlay) {
			closeChooser();
		}
	});
	overlay.querySelector('.owner-chooser-close').addEventListener('click', closeChooser);
	document.body.appendChild(overlay);
}

document.querySelectorAll('a[href*="wa.me"]').forEach(button => {
	button.addEventListener('click', event => {
		event.preventDefault();
		const productName = button.closest('.product-card')?.querySelector('h3')?.textContent.trim() || 'Store Mart';
		const originalUrl = new URL(button.href);
		const message = originalUrl.searchParams.get('text') || 'Hello, I would like to ask about your products.';
		createOwnerChooser(productName, message);
	});
});
