import React from "react";
import "./pagination.css"

function Pagination({ listPerPage, totalList, paginate }) {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalList / listPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(pageNumber => (
                    <li key={pageNumber} className="page-item">
                        <a onClick={() => { paginate(pageNumber) }} href="!#" className="page-link">{pageNumber}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;