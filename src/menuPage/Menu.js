import React, { useState, useEffect } from "react";
import Pagination from "./MenuPazination";
import Menu_header from "./Menu_header";
import '../css/Menu.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [originalPosts, setOriginalPosts] = useState([]);
  const [limit, setLimit] = useState(2);
  const [page, setPage] = useState(1);
  const [kategorie, setKategorie] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [totalPosts, setTotalPosts] = useState(0);
  const offset = (page - 1) * limit;
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate("/Detail");
  };

  const handleCartClick = () => {
    navigate("/cart");
  };

  useEffect(() => {
    axios.get("/json/data.json").then((response) => {
      setPosts(response.data);
      setOriginalPosts(response.data);
      setTotalPosts(response.data.length);
    });
  }, []);

  useEffect(() => {
    let sortedPosts = [...posts];

    if (kategorie === 1) {
      sortedPosts = sortedPosts.sort((a, b) => {
        const dateA = new Date(a.update);
        const dateB = new Date(b.update);
        return dateB - dateA;
      });
    } else if (kategorie === 2) {
      sortedPosts = sortedPosts.sort((a, b) => {
        return parseInt(a.large) - parseInt(b.large);
      });
    } else if (kategorie === 3) {
      sortedPosts = sortedPosts.sort((a, b) => {
        return parseInt(b.large) - parseInt(a.large);
      });
    }

    setPosts(sortedPosts);
    setPage(1);
  }, [kategorie]);

  useEffect(() => {
    const tds = document.querySelectorAll(".kategorie_bar td");
    tds.forEach((td) => {
      if (td.textContent === selectedCategory) {
        td.classList.add("selected");
      } else {
        td.classList.remove("selected");
      }
    });

    setPage(1);
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setPosts(originalPosts);

    const tds = document.querySelectorAll(".kategorie_bar td");
    tds.forEach((td) => {
      if (td.textContent === category) {
        td.classList.add("selected");
      } else {
        td.classList.remove("selected");
      }
    });

    setPage(1);
  };

  useEffect(() => {
    let filteredPosts = [...posts];

    if (selectedCategory !== "전체") {
      filteredPosts = filteredPosts.filter(
          (post) => post.category === selectedCategory
      );
    }

    setTotalPosts(filteredPosts.length);
    setPosts(filteredPosts);
  }, [selectedCategory]);

  return (
      <div className="Layout">
        <header>
          <Menu_header></Menu_header>
        </header>

        <main>
          <div className="container">
            <table className="kategorie_bar">
              <tbody>
              <tr>
                <td
                    className={selectedCategory === "전체" ? "selected" : ""}
                    onClick={() => handleCategoryClick("전체")}
                >
                  전체
                </td>
                <td
                    className={selectedCategory === "장인피자" ? "selected" : ""}
                    onClick={() => handleCategoryClick("장인피자")}
                >
                  장인피자
                </td>
                <td
                    className={selectedCategory === "달인피자" ? "selected" : ""}
                    onClick={() => handleCategoryClick("달인피자")}
                >
                  달인피자
                </td>
                <td
                    className={selectedCategory === "명품피자" ? "selected" : ""}
                    onClick={() => handleCategoryClick("명품피자")}
                >
                  명품피자
                </td>
              </tr>
              </tbody>
            </table>
            <label>
              <select
                  type="number"
                  value={kategorie}
                  onChange={(event) => {
                    if (selectedCategory === "전체") {
                      setKategorie(Number(event.target.value));
                    }
                  }}
                  disabled={selectedCategory !== "전체"}
              >
                <option value="1">신제품순</option>
                <option value="2">가격낮은순</option>
                <option value="3">가격높은순</option>
              </select>
            </label>
            {posts
                .filter((post) =>
                    selectedCategory === "전체"
                        ? true
                        : post.category === selectedCategory
                )
                .slice(offset, offset + limit)
                .map(({ id, img, title, tag, large, update, category, reguler, metarial }) => (
                    <div className="pizzaMenu" key={id}>
                      <img src={img} alt="피자 이미지"></img>
                      <div className="explane">
                        <h3>{title}</h3>
                        <h6>{tag}</h6>
                        <div className="price">
                          <h5 className="large">L</h5>
                          <h5 className="cost">{large}</h5>
                          <h5 className="large">R</h5>
                          <h5 className="cost">{large}</h5>
                        </div>
                        <div className="metarials">
                          {metarial.map((item, index) => (
                              <h6 className="metarial" key={index}>{item}</h6>
                          ))}
                        </div>
                      </div>
                      <div className="link">
                        <div className="goto" onClick={handleDetailClick}>
                          <div className="info">
                            <img src="img/돋보기.png" alt="상세보기"></img>상세보기
                          </div>
                          <div className="cart" onClick={handleCartClick}>
                            <img src="img/장바구니.png" alt="장바구니"></img>장바구니
                          </div>
                        </div>
                      </div>
                    </div>
                ))}
          </div>
        </main>
        <footer>
          <Pagination
              total={totalPosts}
              limit={limit}
              page={page}
              kategorie={kategorie}
              setPage={setPage}
          />
        </footer>
      </div>
  );
}

export default Posts;
