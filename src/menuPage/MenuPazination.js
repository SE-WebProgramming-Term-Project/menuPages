<<<<<<< HEAD
import React from "react";
import '../css/MenuPazination.css'
=======
import styled from "styled-components";
>>>>>>> menuPage/master

function Pagination({ total, limit, page, setPage }) {
  const numPages = Math.ceil(total / limit);

  return (
<<<<<<< HEAD
    <nav className="menu-pagination-nav">
      <button
        className="menu-pagination-button"
        onClick={() => setPage(page - 1)}
        disabled={page === 1}
      >
        &lt;
      </button>
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <button
            key={i + 1}
            className={
              page === i + 1
                ? "menu-pagination-button menu-pagination-button-active"
                : "menu-pagination-button"
            }
            onClick={() => setPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
      <button
        className="menu-pagination-button"
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
      >
        &gt;
      </button>
    </nav>
  );
}

=======
    <>
      <Nav>
        <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
          &lt;
        </Button>
        {Array(numPages)
          .fill()
          .map((_, i) => (
            <Button
              key={i + 1}
              onClick={() => setPage(i + 1)}
              aria-current={page === i + 1 ? "page" : null}
            >
              {i + 1}
            </Button>
          ))}
        <Button onClick={() => setPage(page + 1)} disabled={page === numPages}>
          &gt;
        </Button>
      </Nav>
    </>
  );
}

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  margin: 16px;
`;

const Button = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  background: black;
  color: white;
  font-size: 1rem;

  &:hover {
    background: tomato;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: deeppink;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

>>>>>>> menuPage/master
export default Pagination;
