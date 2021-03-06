import React, { useState, useEffect } from "react";
import SucursalList from "../../Sucursal/SucursalList";
import ReactPaginate from "react-paginate";

const Table = (props) => {
  /*console.log("Table", props.items);*/

  const [currentItems, setCurrentItems] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    console.log("Table", props.items);
    const endOffset = itemOffset + props.itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(props.items.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(props.items.length / props.itemsPerPage));
  }, [itemOffset, props.items]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * props.itemsPerPage) % props.items.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>{props.name}</th>
            <th>{props.admin}</th>
            <th>{props.dir}</th>
            <th>{props.tel}</th>
            <th>{props.pedidos}</th>
            <th>{props.actions}</th>
          </tr>
        </thead>
        <tbody>
          <SucursalList
            items={currentItems}
            //onFetch={props.onFetch}
            openModal={props.openModal}
            onUpdateRow={props.onUpdateRow}
            onDeleteRow={props.onDeleteRow}
          />
        </tbody>
      </table>
      <ReactPaginate
        nextLabel="Siguiente >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={pageCount}
        previousLabel="< Anterior"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        previousClassName="page-item"
        previousLinkClassName="page-link"
        nextClassName="page-item"
        nextLinkClassName="page-link"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
        containerClassName="pagination"
        activeClassName="active"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Table;
