export default function init() {
	const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
	allSideMenu.forEach(item=> {
		const li = item.parentElement;

		item.addEventListener('click', function () {
			allSideMenu.forEach(i=> {
				i.parentElement.classList.remove('active');
			})
			li.classList.add('active');
		})
	});

	// TOGGLE SIDEBAR
	const menuBar = document.querySelector('#content nav .bx.bx-menu');
	const sidebar = document.getElementById('sidebar');
	menuBar.addEventListener('click', function () {
		sidebar.classList.toggle('hide');
	});

	const searchButton = document.querySelector('#content nav form .form-input button');
	const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
	const searchForm = document.querySelector('#content nav form');
	searchButton.addEventListener('click', function (e) {
		if(window.innerWidth < 576) {
			e.preventDefault();
			searchForm.classList.toggle('show');
			if(searchForm.classList.contains('show')) {
				searchButtonIcon.classList.replace('bx-search', 'bx-x');
			} else {
				searchButtonIcon.classList.replace('bx-x', 'bx-search');
			}
		}
	});

	if(window.innerWidth < 768) {
		sidebar.classList.add('hide');
	} else if(window.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}

	window.addEventListener('resize', function () {
		if(this.innerWidth > 576) {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
			searchForm.classList.remove('show');
		}
	});

	const switchMode = document.getElementById('switch-mode');
	const mainContainerHome = document.querySelector('.main-container-home');
	switchMode.addEventListener('change', function () {
		if(this.checked) {
			mainContainerHome.classList.add('dark');
		} else {
			mainContainerHome.classList.remove('dark');
		}
	});

	const addBookIcon = document.querySelector('.add-book-icon');
	const closeModal = document.querySelector('.close-modal');
	const mainContainerAddBook = document.querySelector('.main-container-add-book');
	const containerAddBook = document.querySelector('.main-container-add-book .container');
	addBookIcon.addEventListener('click', function() {
		if(mainContainerHome.classList.contains('dark')) {
			mainContainerAddBook.classList.add('dark');
			containerAddBook.style.border = '2px solid #3C91E6';
		}else {
			mainContainerAddBook.classList.remove('hidden');
			containerAddBook.style.border = '';
		}
	});
	closeModal.addEventListener('click', function() {
		mainContainerAddBook.classList.add('hidden');
	});

	const addBookBtn = document.querySelector('.add-book-button');
	addBookBtn.addEventListener('click', function() {
		mainContainerAddBook.classList.add('hidden');
	});
};