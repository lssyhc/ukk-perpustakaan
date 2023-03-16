const perpustakaan = {
	init: () => {
			const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
			allSideMenu.forEach(item => {
					const li = item.parentElement;

					item.addEventListener('click', function() {
							allSideMenu.forEach(i => {
									i.parentElement.classList.remove('active');
							})
							li.classList.add('active');
					})
			});

			// TOGGLE SIDEBAR
			const menuBar = document.querySelector('#content nav .bx.bx-menu');
			const sidebar = document.getElementById('sidebar');
			menuBar.addEventListener('click', function() {
					sidebar.classList.toggle('hide');
			});

			const searchButton = document.querySelector('#content nav form .form-input button');
			const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
			const searchForm = document.querySelector('#content nav form');
			searchButton.addEventListener('click', function(e) {
					if (window.innerWidth < 576) {
							e.preventDefault();
							searchForm.classList.toggle('show');
							if (searchForm.classList.contains('show')) {
									searchButtonIcon.classList.replace('bx-search', 'bx-x');
							} else {
									searchButtonIcon.classList.replace('bx-x', 'bx-search');
							}
					}
			});

			if (window.innerWidth < 768) {
					sidebar.classList.add('hide');
			} else if (window.innerWidth > 576) {
					searchButtonIcon.classList.replace('bx-x', 'bx-search');
					searchForm.classList.remove('show');
			}

			window.addEventListener('resize', function() {
					if (this.innerWidth > 576) {
							searchButtonIcon.classList.replace('bx-x', 'bx-search');
							searchForm.classList.remove('show');
					}
			});

			const switchMode = document.getElementById('switch-mode');
			const mainContainerHome = document.querySelector('.main-container-home');
			switchMode.addEventListener('change', function() {
					if (this.checked) {
							mainContainerHome.classList.add('dark');
					} else {
							mainContainerHome.classList.remove('dark');
					}
			});

			const searchInput = document.querySelector('#content nav .form-input input');
			const images = document.querySelectorAll('.gallery-image-box');
			const searchBtn = document.querySelector('#content nav .form-input .search-btn');
			searchInput.addEventListener('keyup', e => {
					if (e.key === 'Enter') {
							images.forEach(image => {
									if (searchInput.value === image.dataset.name) {
											return image.style.display = 'block';
									}
									image.style.display = 'none';
							});
					}
			});
			searchInput.addEventListener('keyup', () => {
					if (searchInput.value !== '') return;

					images.forEach(image => {
							image.style.display = 'block';
					})
			});
			searchBtn.addEventListener('click', () => {
					images.forEach(image => {
							if (searchInput.value === image.dataset.name) {
									return image.style.display = 'block';
							}
							image.style.display = 'none';
					});
			});

			const mainContent = document.querySelector('.main-content');
			const mainGallery = document.querySelector('.main-gallery');
			const formInputSearch = document.querySelector('#content nav .form-input');
			document.querySelector('#sidebar .side-menu .dashboard-icon-click').addEventListener('click', () => {
					mainContent.classList.remove('hidden');
					mainGallery.classList.add('hidden');
					formInputSearch.classList.add('hidden');
			});
			document.querySelector('#sidebar .side-menu .gallery-icon-click').addEventListener('click', () => {
					mainGallery.classList.remove('hidden');
					mainContent.classList.add('hidden');
					formInputSearch.classList.remove('hidden');
			});
	},

	showModalAdd: (setIdBuku, setJudul, setStok, setKategori, setPengarang, setPenerbit, setTahunTerbit) => {
			const inputValue = document.querySelectorAll('.main-container-add-book .container .content input');
			inputValue.forEach(input => {
					input.value = '';
					input.removeAttribute('disabled');;
			});

			const closeModal = document.querySelector('.close-modal');
			const mainContainerHome = document.querySelector('.main-container-home');
			const mainContainerAddBook = document.querySelector('.main-container-add-book');
			const containerAddBook = document.querySelector('.main-container-add-book .container');
			if (mainContainerHome.classList.contains('dark')) {
					mainContainerAddBook.classList.add('dark');
					mainContainerAddBook.classList.remove('hidden');
					containerAddBook.style.border = '2px solid #3C91E6';
			} else {
					mainContainerAddBook.classList.remove('hidden');
					containerAddBook.style.border = '';
			}
			closeModal.addEventListener('click', function() {
					mainContainerAddBook.classList.add('hidden');
					setIdBuku(0);
					setJudul('');
					setStok('');
					setKategori('');
					setPengarang('');
					setPenerbit('');
					setTahunTerbit('');
					document.querySelector('.input-file-box input').value = null;
			});

			document.querySelector('.input-file-box input').classList.remove('hidden');
			document.querySelector('.input-file-box .img-book-detail').classList.add('hidden');
			document.querySelector('.main-container-add-book .container .title').textContent = 'Tambah Data Buku';
			const addBookBtn = document.querySelector('.add-book-button button');
			addBookBtn.classList.remove('hidden');
			addBookBtn.innerHTML = 'Tambah Buku';
			addBookBtn.addEventListener('click', function() {
					mainContainerAddBook.classList.add('hidden');
			});
	},

	showModalDetail: (setIdBuku, setJudul, setStok, setKategori, setPengarang, setPenerbit, setTahunTerbit) => {
			const mainContainerHome = document.querySelector('.main-container-home');
			const closeModal = document.querySelector('.close-modal');
			const mainContainerAddBook = document.querySelector('.main-container-add-book');
			const containerAddBook = document.querySelector('.main-container-add-book .container');

			if (mainContainerHome.classList.contains('dark')) {
					mainContainerAddBook.classList.add('dark');
					mainContainerAddBook.classList.remove('hidden');
					containerAddBook.style.border = '2px solid #3C91E6';
			} else {
					mainContainerAddBook.classList.remove('hidden');
					containerAddBook.style.border = '';
			}

			closeModal.addEventListener('click', function() {
					mainContainerAddBook.classList.add('hidden');
					setIdBuku(0);
					setJudul('');
					setStok('');
					setKategori('');
					setPengarang('');
					setPenerbit('');
					setTahunTerbit('');
					document.querySelector('.input-file-box input').value = null;
			});

			document.querySelector('.main-container-add-book .container .title').textContent = 'Detail Data Buku';
			document.querySelector('.input-file-box input').classList.add('hidden');
			document.querySelector('.input-file-box .img-book-detail').classList.remove('hidden');
			document.querySelector('.add-book-button button').classList.add('hidden');
			const inputValue = document.querySelectorAll('.main-container-add-book .container .content input');
			inputValue.forEach(input => input.setAttribute('disabled', true));
	},

	showModalUpdate: (setIdBuku, setJudul, setStok, setKategori, setPengarang, setPenerbit, setTahunTerbit) => {
			const inputValue = document.querySelectorAll('.main-container-add-book .container .content input');
			inputValue.forEach(input => {
					input.value = '';
					input.removeAttribute('disabled');
			});

			const mainContainerHome = document.querySelector('.main-container-home');
			const closeModal = document.querySelector('.close-modal');
			const mainContainerAddBook = document.querySelector('.main-container-add-book');
			const containerAddBook = document.querySelector('.main-container-add-book .container');

			if (mainContainerHome.classList.contains('dark')) {
					mainContainerAddBook.classList.add('dark');
					mainContainerAddBook.classList.remove('hidden');
					containerAddBook.style.border = '2px solid #3C91E6';
			} else {
					mainContainerAddBook.classList.remove('hidden');
					containerAddBook.style.border = '';
			}

			closeModal.addEventListener('click', function() {
					mainContainerAddBook.classList.add('hidden');
					setIdBuku(0);
					setJudul('');
					setStok('');
					setKategori('');
					setPengarang('');
					setPenerbit('');
					setTahunTerbit('');
					document.querySelector('.input-file-box input').value = null;
			});

			document.querySelector('.input-file-box input').classList.remove('hidden');
			document.querySelector('.input-file-box .img-book-detail').classList.add('hidden');
			document.querySelector('.main-container-add-book .container .title').textContent = 'Ubah Data Buku';
			const editBookBtn = document.querySelector('.add-book-button button');
			editBookBtn.classList.remove('hidden');
			editBookBtn.innerHTML = 'Ubah Buku';
			editBookBtn.addEventListener('click', function() {
					mainContainerAddBook.classList.add('hidden');
			});
	}
}

module.exports = perpustakaan;