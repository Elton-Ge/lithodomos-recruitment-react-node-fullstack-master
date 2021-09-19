import {gql, useQuery} from "@apollo/client";
import React, {useState} from "react";
import styled from "styled-components";
import Pagination from "./Pagination";
// @ts-ignore
import TourCard from "./TourCard";
import {LITHODOMOS_TEST_GetToursForHomeScreen as Data} from "./__generated__/LITHODOMOS_TEST_GetToursForHomeScreen";

export const GET_TOURS = gql`
  query LITHODOMOS_TEST_GetToursForHomeScreen($pageNumber: Int!,$recordsPerPage: Int!,$ids: [String]) {
    result: getTours(input:{pageNumber:$pageNumber,recordsPerPage: $recordsPerPage,ids:$ids}) {
      tours {
        id
        name
        priceUSDCents
        thumbnailURL
        purchased
      }
      totalPages
      totalRecordsCount
    }
  }
`;

export const Tours: React.FC = () => {
    //get purchased-tours ids
    const ids = JSON.parse(localStorage?.getItem("purchasedTours") as string) || [];
    //pagination
    const [pageNumber, setPageNumber] = useState(1);
    const recordsPerPage = 3;
    const pageHandler = (page: { selected: any; }) => {
        setPageNumber(page.selected + 1)
    }
    //query tours
    const {loading, data, error, refetch} = useQuery<Data>(GET_TOURS, {
        variables: {pageNumber, recordsPerPage, ids},
    });

    //func props to TourCard
    const updateToursHandler = async (ids: string[]) => {
        await refetch({pageNumber, recordsPerPage, ids})
    }
    // get result to render
    let result;
    if (loading && !data?.result) {
        result = <p>Loading...</p>;
    } else if (error) {
        result = <p>Error: {error?.message || "Unknown"}</p>;
    } else {
        const tours = data?.result?.tours || [];
        result = tours.map((tour) => (
            <TourCard
                key={tour.id}
                id={tour.id}
                thumbnailURL={tour.thumbnailURL}
                name={tour.name}
                priceUSDCents={tour.priceUSDCents}
                updateToursHandler={updateToursHandler}
            />
        ))
    }

    return (
        // @ts-ignore
        <Wrapper>
            <ToursTitle>The following tours that you can
                purchase now: {`[${data?.result?.totalRecordsCount} tours] in total`}
            </ToursTitle>
            <Pagination
                recordsPerPage={recordsPerPage}
                pageNumber={pageNumber}
                totalRecordsCount={data?.result?.totalRecordsCount || 10}
                pageHandler={pageHandler}
            />
            <CardContainer background={"#f3e0ac"}>
                {result}
            </CardContainer>
        </Wrapper>
    )
};

export const ToursTitle = styled.h2`
  text-align: center;
  margin: 30px;
`
export const CardContainer = styled.div<{ background: string }>`
  padding: 20px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background: ${props => props.background};
  flex-wrap: wrap;
`;

export const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;

  > * {
    margin-bottom: 20px;
  }
`;

