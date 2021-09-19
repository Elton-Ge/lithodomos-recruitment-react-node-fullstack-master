import React from 'react';
import styled from "styled-components";
// @ts-ignore
import ReactPaginate from 'react-paginate';

type propsType = { pageNumber: number; totalRecordsCount: number; recordsPerPage: number; pageHandler: Function; }

export default function Pagination(props: propsType) {
    return (
        <PageContainer activePage={props.pageNumber + 1}>
            <ReactPaginate
                className={"paginate"}
                pageCount={props.totalRecordsCount}
                pageRangeDisplayed={props.recordsPerPage}
                onPageChange={props.pageHandler}
            />
        </PageContainer>
    );
}

export const PageContainer = styled.div<{ activePage?: number }>`
  //pagination
  ul {
    text-align: center;
    border: 1px solid #f3e0ac;
    width: 50%;
    margin: 20px auto;
    height: 50px;
    line-height: 50px;
  }

  ul li {
    display: inline;
    padding: 10px;
    font-size: 22px;
    height: 48px;
    line-height: 48px;

    &:nth-of-type(${props => props.activePage}) {
      text-decoration: underline;
      border: 1px solid #000;
    }
  }

`
