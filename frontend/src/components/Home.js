import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// icons
import { MdDashboard } from 'react-icons/md';
import { IoBagHandle } from 'react-icons/io5';
import { GiHamburgerMenu } from 'react-icons/gi';
import { AiFillDollarCircle } from 'react-icons/ai';
import { BiDotsVerticalRounded } from 'react-icons/bi';
import { FaSmileBeam, FaBell } from 'react-icons/fa';
import { RiTeamFill, RiLogoutCircleFill, RiDownloadCloudFill } from 'react-icons/ri';
import { BsSearch, BsFillCalendar2CheckFill, BsFilter, BsPlusLg } from 'react-icons/bs';


import '../public/css/style.css';
import Script from '../public/js/script.js';

const Home = () => {
  useEffect(() => {
    Script();
    getAllBookObj();
  });

  const [judul, setJudul] = useState('');
  const [stok, setStok] = useState('');
  const [gambar, setGambar] = useState('');
  const [gambarConverted, setGambarConverted] = useState('');
  const [kategori, setKategori] = useState('');
  const [pengarang, setPengarang] = useState('');
  const [penerbit, setPenerbit] = useState('');
  const [tahunTerbit, setTahunTerbit] = useState('');
  const [objBook, setObjBook] = useState([]);

  async function addBook (e) {
    e.preventDefault();

    // convert object gambar to string handling
    const reader = new FileReader();
    reader.readAsDataURL(gambar);
    reader.onloadend = () => {
      setGambarConverted(reader.result);
    };

    try {
      const response = await axios.post('http://localhost:5000/api/bukus', {
        judul,
        stok: Number(stok),
        kategori,
        pengarang,
        penerbit,
        tahun_terbit: Number(tahunTerbit),
        gambar: gambarConverted
      });
      console.log(response);

      setJudul('');
      setStok('');
      setKategori('');
      setPengarang('');
      setPenerbit('');
      setTahunTerbit('');
      document.querySelector('.input-file-box input').value = null;
    } catch (error) {
      console.log(error);
    }
  };

  async function getAllBookObj () {
    try {
      const response = await axios.get(`http://localhost:5000/api/bukus`);
      setObjBook(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <div className='main-container-home'>
      {/* ==== DASHBOARD ==== */}
      {/* Sidebar */}
      <section id='sidebar'>
        <a href='#' className='brand'>
          <FaSmileBeam className='bx'></FaSmileBeam>
          <span className='text'>Perpustakaan</span>
        </a>
        <ul className='side-menu top'>
          <li className='active'>
            <a href='#'>
              <MdDashboard className='bx'></MdDashboard>
              <span className='text'>Dashboard</span>
            </a>
          </li>
          <li>
            <a href='#'>
              <IoBagHandle className='bx'></IoBagHandle>
              <span className='text'>Galeri</span>
            </a>
          </li>
        </ul>
        <ul className='side-menu'>
          <li>
            <a href='#' className='logout'>
              <RiLogoutCircleFill className='bx' ></RiLogoutCircleFill>
              <span className='text'>Logout</span>
            </a>
          </li>
        </ul>
      </section>
      {/* Akhir Sidebar */}

      {/* Content */}
      <section id='content'>
        {/* NavBar */}
        <nav>
          <GiHamburgerMenu className='bx bx-menu' ></GiHamburgerMenu>
          <a href='#' className='nav-link'>Kategori</a>
          <form action='#'>
            <div className='form-input'>
              <input type='search' placeholder='Cari...'/>
              <button type='submit' className='search-btn'><BsSearch className='bx bx-x' ></BsSearch></button>
            </div>
          </form>
          <input type='checkbox' id='switch-mode' hidden/>
          <label htmlFor='switch-mode' className='switch-mode'></label>
          <a href='#' className='notification'>
            <FaBell className='bx' ></FaBell>
            <span className='num'>8</span>
          </a>
          <a href='#' className='profile'>
            <img src={process.env.PUBLIC_URL + '/images/people.png'} alt='dummy'/>
          </a>
        </nav>
        {/* Akhir NavBar */}

        {/* Main */}
        <main>
          <div className='head-title'>
            <div className='left'>
              <h1>Dashboard</h1>
              <ul className='breadcrumb'>
                <li>
                  <a className='active' href='#'>Halaman Utama</a>
                </li>
              </ul>
            </div>
            <a href='#' className='btn-download'>
              <RiDownloadCloudFill className='bx' ></RiDownloadCloudFill>
              <span className='text'>Unduh PDF</span>
            </a>
          </div>

          <ul className='box-info'>
            <li>
              <BsFillCalendar2CheckFill className='bx' ></BsFillCalendar2CheckFill>
              <span className='text'>
                <h3>1020</h3>
                <p>Buku</p>
              </span>
            </li>
            <li>
              <RiTeamFill className='bx' ></RiTeamFill>
              <span className='text'>
                <h3>2834</h3>
                <p>Peminjam</p>
              </span>
            </li>
            <li>
              <AiFillDollarCircle className='bx' ></AiFillDollarCircle>
              <span className='text'>
                <h3>Rp 150,000</h3>
                <p>Pendapatan</p>
              </span>
            </li>
          </ul>

          <div className='table-data'>
            <div className='order'>
              <div className='head'>
                <h3>Daftar Peminjam</h3>
                <BsSearch className='bx' ></BsSearch>
                <BsFilter className='bx' ></BsFilter>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Nama</th>
                    <th>Tanggal Pinjam</th>
                    <th>Nama Buku</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img src={process.env.PUBLIC_URL + 'images/people.png'} alt='dummy'/>
                      <p>Cahyo Susilo</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <div className='last-table-data'>
                        <span className='status completed'>Harry Potter</span>
                        <BiDotsVerticalRounded className='bx' ></BiDotsVerticalRounded>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src={process.env.PUBLIC_URL + 'images/people.png'} alt='dummy'/>
                      <p>Cahyo Susilo</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <div className='last-table-data'>
                        <span className='status pending'>Ensiklopedia Alam Semesta</span>
                        <BiDotsVerticalRounded className='bx' ></BiDotsVerticalRounded>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src={process.env.PUBLIC_URL + 'images/people.png'} alt='dummy'/>
                      <p>Cahyo Susilo</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <div className='last-table-data'>
                        <span className='status process'>Ensiklopedia Dunia</span>
                        <BiDotsVerticalRounded className='bx'></BiDotsVerticalRounded>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src={process.env.PUBLIC_URL + 'images/people.png'} alt='dummy'/>
                      <p>Cahyo Susilo</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <div className='last-table-data'>
                        <span className='status pending'>Psychologische Typen</span>
                        <BiDotsVerticalRounded className='bx' ></BiDotsVerticalRounded>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <img src={process.env.PUBLIC_URL + 'images/people.png'} alt='dummy'/>
                      <p>Cahyo Susilo</p>
                    </td>
                    <td>01-10-2021</td>
                    <td>
                      <div className='last-table-data'>
                        <span className='status completed'>Pinocchio</span>
                        <BiDotsVerticalRounded className='bx' ></BiDotsVerticalRounded>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='todo'>
              <div className='head'>
                <h3>Tambah Buku</h3>
                <BsPlusLg className='bx add-book-icon' ></BsPlusLg>
                <BsFilter className='bx' ></BsFilter>
              </div>
              <ul className='todo-list'>
                {objBook.map(bookData => (
                  <li key={bookData.id} className={bookData.kategori === 'Fiksi' ? 'completed' : 
                  bookData.kategori === 'Nonfiksi' ? 'not-completed' :
                  bookData.kategori === 'Ensiklopedia' ? 'process' :
                  null}>
                    <p>{bookData.judul}</p>
                    <BiDotsVerticalRounded className='bx' ></BiDotsVerticalRounded>
                  </li>
                ))}
                {/* <li className='completed'>
                  <p>Harry Potter</p>
                  <BiDotsVerticalRounded className='bx' ></BiDotsVerticalRounded>
                </li>
                <li className='completed'>
                  <p>Cinderella</p>
                  <BiDotsVerticalRounded className='bx' ></BiDotsVerticalRounded>
                </li>
                <li className='not-completed'>
                  <p>Psychologische Typen</p>
                  <BiDotsVerticalRounded className='bx' ></BiDotsVerticalRounded>
                </li>
                <li className='completed'>
                  <p>Pinocchio</p>
                  <BiDotsVerticalRounded className='bx' ></BiDotsVerticalRounded>
                </li>
                <li className='not-completed'>
                  <p>Myers Briggs Type Indicator</p>
                  <BiDotsVerticalRounded className='bx' ></BiDotsVerticalRounded>
                </li> */}
              </ul>
            </div>
          </div>
        </main>
        {/* Akhir Main */}
      </section>
      {/* Akhir Content */}

      {/* ==== ADD BOOK ==== */}
      <div className='main-container-add-book hidden'>
        <div className='container'>
          <div className='title-container'>
            <div className='title'>Tambah Data Buku</div>
            <button className='close-modal'>&times;</button>
          </div>
            <div className='content'>
              <form onSubmit={addBook}>
                <div className='user-details'>
                  <div className='input-box'>
                    <span className='details'>Judul Buku</span>
                    <input type='text' placeholder='Masukkan judul buku' value={judul} onChange={(e) => setJudul(e.target.value)} required />
                  </div>
                  <div className='input-box'>
                    <span className='details'>Stok Buku</span>
                    <input type='text' placeholder='Masukkan stok buku' value={stok} onChange={(e) => setStok(e.target.value)} required />
                  </div>
                  <div className='input-box'>
                    <span className='details'>Kategori Buku</span>
                    <input type='text' placeholder='Masukkan kategori buku' value={kategori} onChange={(e) => setKategori(e.target.value)} required />
                  </div>
                  <div className='input-box'>
                    <span className='details'>Pengarang</span>
                    <input type='text' placeholder='Masukkan nama pengarang' value={pengarang} onChange={(e) => setPengarang(e.target.value)} required />
                  </div>
                  <div className='input-box'>
                    <span className='details'>Penerbit</span>
                    <input type='text' placeholder='Masukkan nama penerbit' value={penerbit} onChange={(e) => setPenerbit(e.target.value)} required />
                  </div>
                  <div className='input-box'>
                    <span className='details'>Tahun Terbit</span>
                    <input type='text' placeholder='Masukkan tahun terbit' value={tahunTerbit} onChange={(e) => setTahunTerbit(e.target.value)} required />
                  </div>
                  <div className='input-file-box'>
                    <span className='details'>Gambar Buku</span>
                    <input type='file' onChange={(e) => setGambar(e.target.files[0])} required/>
                  </div>
                </div>
                <div className='add-book-button'>
                  <input type='submit' value='Tambah Buku' />
                </div>
              </form>
            </div>
          </div>
      </div>

      <script src='https://unpkg.com/boxicons@2.1.4/dist/boxicons.js'></script>
    </div>
  );
};

export default Home;