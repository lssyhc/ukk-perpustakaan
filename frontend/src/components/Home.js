import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// icons
import { IoBagHandle } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaSmileBeam } from "react-icons/fa";
import { RiLogoutCircleFill } from "react-icons/ri";
import { AiOutlineStock, AiFillDelete } from "react-icons/ai";
import { MdDashboard, MdCategory } from "react-icons/md";
import { BsSearch, BsFillCalendar2CheckFill, BsPlusLg } from "react-icons/bs";

import "../public/css/style.css";
import {
  init,
  showModalDetail,
  showModalAdd,
  showModalUpdate,
} from "../public/js/script.js";

const Home = () => {
  useEffect(() => {
    init();
    getAllBookObj();
  }, []);

  const navigate = useNavigate();

  const [idBuku, setIdBuku] = useState(0);
  const [judul, setJudul] = useState("");
  const [stok, setStok] = useState("");
  const [gambar, setGambar] = useState("");
  const [kategori, setKategori] = useState("");
  const [pengarang, setPengarang] = useState("");
  const [penerbit, setPenerbit] = useState("");
  const [tahunTerbit, setTahunTerbit] = useState("");
  const [allObjBook, setAllObjBook] = useState([]);
  const [objBook, setObjBook] = useState({});

  function addOrUpdateBook(e) {
    e.preventDefault();

    const btnAction = document.querySelector(
      ".add-book-button button"
    ).innerHTML;
    if (btnAction === "Tambah Buku") {
      // encode gambar to base64 string
      const reader = new FileReader();
      reader.readAsDataURL(gambar);
      reader.onloadend = async () => {
        try {
          const response = await axios.post("http://localhost:5000/api/bukus", {
            judul,
            stok: Number(stok),
            kategori,
            pengarang,
            penerbit,
            tahun_terbit: Number(tahunTerbit),
            gambar: reader.result,
          });
          console.log(response);

          setIdBuku(0);
          setJudul("");
          setStok("");
          setKategori("");
          setPengarang("");
          setPenerbit("");
          setTahunTerbit("");
          document.querySelector(".input-file-box input").value = null;
          getAllBookObj();
        } catch (error) {
          console.log(error);
        }
      };
    } else if (btnAction === "Ubah Buku") {
      // encode gambar to base64 string
      const reader = new FileReader();
      reader.readAsDataURL(gambar);
      reader.onloadend = async () => {
        try {
          const response = await axios.put(
            `http://localhost:5000/api/bukus/${idBuku}`,
            {
              judul,
              stok: Number(stok),
              kategori,
              pengarang,
              penerbit,
              tahun_terbit: Number(tahunTerbit),
              gambar: reader.result,
            }
          );
          console.log(response);

          setIdBuku(0);
          setJudul("");
          setStok("");
          setKategori("");
          setPengarang("");
          setPenerbit("");
          setTahunTerbit("");
          document.querySelector(".input-file-box input").value = null;
          getAllBookObj();
        } catch (error) {
          console.log(error);
        }
      };
    }
  }

  async function getAllBookObj() {
    try {
      const response = await axios.get("http://localhost:5000/api/bukus");
      setAllObjBook(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  }

  async function getOneBookObj(id) {
    try {
      const response = await axios.get(`http://localhost:5000/api/bukus/${id}`);
      setObjBook(response.data.data);
      console.log(response.data.data);

      setJudul(response.data.data.judul);
      setStok(response.data.data.stok);
      setKategori(response.data.data.kategori);
      setPengarang(response.data.data.pengarang);
      setPenerbit(response.data.data.penerbit);
      setTahunTerbit(response.data.data.tahun_terbit);
      setGambar(response.data.data.gambar);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteBook(id) {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/bukus/${id}`
      );
      console.log(response.data.message);
      getAllBookObj();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="main-container-home">
      {/* ==== DASHBOARD ==== */}
      {/* Sidebar */}
      <section id="sidebar">
        <a href="#" className="brand">
          <FaSmileBeam className="bx"></FaSmileBeam>
          <span className="text">Perpustakaan</span>
        </a>
        <ul className="side-menu top">
          <li className="active">
            <a href="#" className="dashboard-icon-click">
              <MdDashboard className="bx"></MdDashboard>
              <span className="text">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="#" className="gallery-icon-click">
              <IoBagHandle className="bx"></IoBagHandle>
              <span className="text">Galeri</span>
            </a>
          </li>
        </ul>
        <ul className="side-menu">
          <li>
            <a href="#" className="logout" onClick={() => navigate("/login")}>
              <RiLogoutCircleFill className="bx"></RiLogoutCircleFill>
              <span className="text">Logout</span>
            </a>
          </li>
        </ul>
      </section>
      {/* Akhir Sidebar */}

      {/* Content */}
      <section id="content">
        {/* NavBar */}
        <nav>
          <GiHamburgerMenu className="bx bx-menu"></GiHamburgerMenu>
          <form action="#">
            <div className="form-input">
              <input type="search" placeholder="Cari..." />
              <button type="submit" className="search-btn">
                <BsSearch className="bx bx-x"></BsSearch>
              </button>
            </div>
          </form>
          <input type="checkbox" id="switch-mode" hidden />
          <label htmlFor="switch-mode" className="switch-mode"></label>
          <a href="#" className="profile">
            <img
              src={process.env.PUBLIC_URL + "/images/people.png"}
              alt="dummy"
            />
          </a>
        </nav>
        {/* Akhir NavBar */}

        {/* Main */}
        <main className="main-content">
          <div className="head-title">
            <div className="left">
              <h1>Dashboard</h1>
              <ul className="breadcrumb">
                <li>
                  <a className="active" href="#">
                    Halaman Utama
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <ul className="box-info">
            <li>
              <BsFillCalendar2CheckFill className="bx"></BsFillCalendar2CheckFill>
              <span className="text">
                <h3>{allObjBook.length}</h3>
                <p>Total Buku</p>
              </span>
            </li>
            <li>
              <AiOutlineStock className="bx"></AiOutlineStock>
              <span className="text">
                <h3>{allObjBook.reduce((acc, obj) => acc + obj.stok, 0)}</h3>
                <p>Total Stok</p>
              </span>
            </li>
            <li>
              <MdCategory className="bx"></MdCategory>
              <span className="text">
                <h3>6</h3>
                <p>Total Kategori</p>
              </span>
            </li>
          </ul>

          <div className="table-data">
            <div className="book-data">
              <div className="head">
                <h3>Data Buku</h3>
                <BsPlusLg
                  className="bx add-book-icon"
                  onClick={() =>
                    showModalAdd(
                      setIdBuku,
                      setJudul,
                      setStok,
                      setKategori,
                      setPengarang,
                      setPenerbit,
                      setTahunTerbit
                    )
                  }
                ></BsPlusLg>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Nama Buku</th>
                    <th>Tanggal Ditambahkan</th>
                    <th>Pengarang</th>
                    <th>Kategori Buku</th>
                  </tr>
                </thead>
                <tbody>
                  {allObjBook.map((bookData) => (
                    <tr
                      key={bookData.id}
                      className="book-row"
                      onClick={() => getOneBookObj(bookData.id)}
                    >
                      <td
                        onClick={() =>
                          showModalDetail(
                            setIdBuku,
                            setJudul,
                            setStok,
                            setKategori,
                            setPengarang,
                            setPenerbit,
                            setTahunTerbit
                          )
                        }
                      >
                        <p>{bookData.judul}</p>
                      </td>
                      <td
                        onClick={() =>
                          showModalDetail(
                            setIdBuku,
                            setJudul,
                            setStok,
                            setKategori,
                            setPengarang,
                            setPenerbit,
                            setTahunTerbit
                          )
                        }
                      >{`${(new Date(bookData.createdAt).getDate() + 1)
                        .toString()
                        .padStart(2, "0")}-${(
                        new Date(bookData.createdAt).getMonth() + 1
                      )
                        .toString()
                        .padStart(2, "0")}-${new Date(
                        bookData.createdAt
                      ).getFullYear()}`}</td>
                      <td>{bookData.pengarang}</td>
                      <td
                        onClick={() =>
                          showModalDetail(
                            setIdBuku,
                            setJudul,
                            setStok,
                            setKategori,
                            setPengarang,
                            setPenerbit,
                            setTahunTerbit
                          )
                        }
                      >
                        <div className="last-table-data">
                          <span
                            className={`status ${
                              bookData.kategori === "Fiksi"
                                ? "fiksi"
                                : bookData.kategori === "Nonfiksi"
                                ? "nonfiksi"
                                : bookData.kategori === "Ensiklopedia"
                                ? "ensiklopedia"
                                : bookData.kategori === "Kuliner"
                                ? "kuliner"
                                : bookData.kategori === "Seni"
                                ? "seni"
                                : bookData.kategori === "Agama"
                                ? "agama"
                                : ""
                            }`}
                          >
                            {bookData.kategori}
                          </span>
                        </div>
                      </td>
                      <td>
                        <div className="manipulation-btn">
                          <FiEdit2
                            className="bx icon-edit"
                            onClick={() => {
                              setIdBuku(bookData.id);
                              showModalUpdate(
                                setIdBuku,
                                setJudul,
                                setStok,
                                setKategori,
                                setPengarang,
                                setPenerbit,
                                setTahunTerbit
                              );
                            }}
                          ></FiEdit2>
                          <AiFillDelete
                            className="bx icon-delete"
                            onClick={() => deleteBook(bookData.id)}
                          ></AiFillDelete>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>

        {/* ==== GALLERY ==== */}
        <main className="main-gallery">
          <div className="gallery-container">
            <div className="gallery-images">
              {allObjBook.map((obj) => (
                <div
                  key={obj.id}
                  className="gallery-image-box"
                  data-name={obj.judul.toString().toLowerCase()}
                  onClick={() => {
                    getOneBookObj(obj.id);
                    showModalDetail(
                      setIdBuku,
                      setJudul,
                      setStok,
                      setKategori,
                      setPengarang,
                      setPenerbit,
                      setTahunTerbit
                    );
                  }}
                >
                  <img src={obj.gambar} alt="Gambar Buku" />
                  <h6>{obj.judul}</h6>
                </div>
              ))}
            </div>
          </div>
        </main>
        {/* Akhir Main */}
      </section>
      {/* Akhir Content */}

      {/* ==== ADD BOOK ==== */}
      <div className="main-container-add-book hidden">
        <div className="container">
          <div className="title-container">
            <div className="title">Tambah Data Buku</div>
            <button className="close-modal">&times;</button>
          </div>
          <div className="content">
            <form onSubmit={addOrUpdateBook}>
              <div className="user-details">
                <div className="input-box">
                  <span className="details">Judul Buku</span>
                  <input
                    type="text"
                    placeholder="Masukkan judul buku"
                    value={judul}
                    onChange={(e) => setJudul(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Stok Buku</span>
                  <input
                    type="text"
                    placeholder="Masukkan stok buku"
                    value={stok}
                    onChange={(e) => setStok(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Kategori Buku</span>
                  <input
                    type="text"
                    placeholder="Masukkan kategori buku"
                    value={kategori}
                    onChange={(e) => setKategori(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Pengarang</span>
                  <input
                    type="text"
                    placeholder="Masukkan nama pengarang"
                    value={pengarang}
                    onChange={(e) => setPengarang(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Penerbit</span>
                  <input
                    type="text"
                    placeholder="Masukkan nama penerbit"
                    value={penerbit}
                    onChange={(e) => setPenerbit(e.target.value)}
                    required
                  />
                </div>
                <div className="input-box">
                  <span className="details">Tahun Terbit</span>
                  <input
                    type="text"
                    placeholder="Masukkan tahun terbit"
                    value={tahunTerbit}
                    onChange={(e) => setTahunTerbit(e.target.value)}
                    required
                  />
                </div>
                <div className="input-file-box">
                  <span className="details">Gambar Buku</span>
                  <img
                    src={gambar}
                    alt="Gambar Buku"
                    className="img-book-detail"
                  />
                  <input
                    type="file"
                    onChange={(e) => setGambar(e.target.files[0])}
                    required
                  />
                </div>
              </div>
              <div className="add-book-button">
                <button type="submit">Tambah Buku</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <script src="https://unpkg.com/boxicons@2.1.4/dist/boxicons.js"></script>
    </div>
  );
};

export default Home;
