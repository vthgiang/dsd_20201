import React from 'react';
import PropTypes from 'prop-types';
import { Pagination } from 'react-bootstrap';

PaginationComponent.propTypes = {
    page: PropTypes.number,
    totalPage: PropTypes.number,
    pageChange: PropTypes.func
};

PaginationComponent.defaultProps = {
    pagination: {page: 1, totalPage: 1},
    pageChange: null
}

function PaginationComponent(props) {
    const {pagination, pageChange} = props;

    const {page, totalPage} = pagination;
    const handlePageChange = (newPage) => {
        if(!pageChange) return;
        pageChange(newPage)
    }

    return (
        <Pagination>
            <Pagination.First onClick={()=> handlePageChange(1)}/>
            { page == totalPage && totalPage > 2 && <Pagination.Item onClick={()=> handlePageChange(page-2)}>{page-2}</Pagination.Item>}
            { page-1 > 0 && <Pagination.Item onClick={()=> handlePageChange(page-1)}>{page-1}</Pagination.Item> }
            <Pagination.Item active>{page}</Pagination.Item>
            { page+1 <= totalPage && <Pagination.Item onClick={()=> handlePageChange(page+1)}>{page+1}</Pagination.Item>}
            { totalPage > 2 && page == 1 && <Pagination.Item onClick={()=> handlePageChange(page+2)}>{page+2}</Pagination.Item>}
            <Pagination.Last onClick={()=> handlePageChange(totalPage)}/>
        </Pagination>
    );
}

export default PaginationComponent;