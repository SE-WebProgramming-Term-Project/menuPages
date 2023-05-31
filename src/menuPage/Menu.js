import React, { useState, useEffect } from "react";
import Pagination from "./MenuPazination";
import '../css/Menu.css'
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";
import {Routes,Route}from "react-router-dom";
function Posts() {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(2);
  const [page, setPage] = useState(1);
  const [kategorie,setKategorie] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [totalPosts, setTotalPosts] = useState(0); // 추가: 필터링된 게시물 개수 상태
  const offset = (page - 1) * limit;
  const data = [
    {
      "userId": 1,
      "id": 1,
      "img" : "img/pizza1.png",
      "title": "a",
      "tag" : "#전주불백피자 #목동피자",
      "large": "100",
      "reguler" : "1",
      "update": "2000-01-01",
      "category" : "장인피자",
      "metarial" : ["새우", "치즈", "닭고기"]
    },  {
      "userId": 1,
      "id": 2,
      "img" : "img/pizza2.png",
      "title": "b",
      "tag" : "#전주불백피자 #목동피자",
      "large": "300",
      "reguler" : "2",
      "update": "2000-01-02",
      "category" : "장인피자",
      "metarial" : ["새우", "치즈", "닭고기"]

    },  {
      "userId": 1,
      "id": 3,
      "img" : "img/pizza3.png",
      "title": "c",
      "tag" : "#전주불백피자 #목동피자",
      "large": "200",
      "reguler" : "3",
      "update": "2000-01-03",
      "category" : "달인피자",
      "metarial" : ["새우", "치즈", "닭고기"]
    },  {
      "userId": 1,
      "id": 4,
      "img" : "img/pizza4.png",
      "title": "d",
      "tag" : "#전주불백피자 #목동피자",
      "large": "500",
      "reguler" : "4",
      "update": "2000-01-04",
      "category" : "달인피자",
      "metarial" : ["새우", "치즈", "닭고기"]
    },  {
      "userId": 1,
      "id": 5,
      "img" : "img/pizza5.png",
      "title": "e",
      "tag" : "#전주불백피자 #목동피자",
      "large": "400",
      "reguler" : "5",
      "update": "2000-01-05",
      "category" : "달인피자",
      "metarial" : ["새우", "치즈", "닭고기"]
    },  {
      "userId": 1,
      "id": 6,
      "img" : "img/pizza6.png",
      "title": "f",
      "tag" : "#전주불백피자 #목동피자",
      "large": "700",
      "reguler" : "6",
      "update": "2000-01-06",
      "category" : "명품피자",
      "metarial" : ["새우", "치즈", "닭고기"]
    },  {
      "userId": 1,
      "id": 7,
      "img" : "img/pizza7.png",
      "title": "g",
      "tag" : "#전주불백피자 #목동피자",
      "large": "600",
      "reguler" : "7",
      "update": "2000-01-07",
      "category" : "명품피자",
      "metarial" : ["새우", "치즈", "닭고기"]

    },  {
      "userId": 1,
      "id": 8,
      "img" : "img/pizza8.png",
      "title": "h",
      "tag" : "#전주불백피자 #목동피자",
      "large": "800",
      "reguler" : "8",
      "update": "2000-01-08",
      "category" : "명품피자",
      "metarial" : ["새우", "치즈", "닭고기"]
    }
  ]
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate("/Detail");
  };
  const handleCartClick = () => {
    navigate("/cart");
  };
  useEffect(() => {
    let sortedPosts = [...data];

    if (kategorie === 1) {
      // Sort the posts based on the update field in descending order
      sortedPosts = sortedPosts.sort((a, b) => {
        const dateA = new Date(a.update);
        const dateB = new Date(b.update);
        return dateB - dateA;
      });
    } else if (kategorie === 2) {
      // Sort the posts based on price in ascending order
      sortedPosts = sortedPosts.sort((a, b) => {
        return parseInt(a.large) - parseInt(b.large);
      });
    } else if (kategorie === 3) {
      // Sort the posts based on price in descending order
      sortedPosts = sortedPosts.sort((a, b) => {
        return parseInt(b.large)- parseInt(a.large);
      });

    }
    setLimit(limit);
    setPosts(sortedPosts);
  }, [kategorie]);
  useEffect(() => {
    // Reset the page to 1 whenever the category changes
    setPage(1);
  }, [kategorie]);



  useEffect(() => {
    // Update the background color when selectedCategory changes
    const tds = document.querySelectorAll(".kategorie_bar td");
    tds.forEach((td) => {
      if (td.textContent === selectedCategory) {
        td.classList.add("selected");
      } else {
        td.classList.remove("selected");
      }
      setPage(1);
    });
  }, [selectedCategory]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };
  //필터링 된 페이지 수 
  useEffect(() => {
    let filteredPosts = [...data];

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
          <div className="pc-pizzamenu-top-text">
            <p className="pizzamenu-top-text-body2">피자</p>
            <p className="pizzamenu-top-text-footer">
              맛있고 건강한 피자! 피자알볼로의
              <font color="#41b6e6">다양한 피자를 주문</font>해 보세요.
            </p>
          </div>
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
                .map(({ id, img, title, tag, large, update, category, reguler,metarial }) => (
                    <div className="pizzaMenu" key={id}>
                      <img src={img}></img>
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
                        <div className="goto">
                          {/* Add onClick handler to trigger navigation */}
                          <div className="info" onClick={handleDetailClick}>
                            {/*TODO 상세정보 선택시 상세정보 페이지로 이동*/}
                            <img src="img/돋보기.png" alt="상세보기"></img>상세보기
                          </div>
                          <div className="cart" onClick={handleCartClick}>
                            {/*TODO 장바구니 선택 시, alt로 장바구니에 담겼습니다. 출력 후 cart에 피자 정보 보내야됨*/}
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