import React from "react";
import {gql, useQuery} from "@apollo/client";
import TourCard from "../../HomeRoutes/TourCard";
import {LITHODOMOS_TEST_getCurrentUser as User} from "./__generated__/LITHODOMOS_TEST_getCurrentUser";
import {CardContainer, ToursTitle, Wrapper} from "../../HomeRoutes/Tours";
import {useDispatch} from "react-redux";
import {getPurchasedToursSuccess} from "../../../store/app/actions";

export const GET_CURRENT_USER = gql`
  query LITHODOMOS_TEST_getCurrentUser {
    result: getCurrentUser(input: {}) {
        name
        purchasedTours {
          id,
          name,
          priceUSDCents,
          thumbnailURL,
          purchased
      }
    }
  }
`;
export const AccountView: React.FC = () => {
    const {loading, data, error} = useQuery<User, null>(GET_CURRENT_USER, {
        fetchPolicy: "network-only",
    });
    const dispatch = useDispatch();
    //get result to render
    let result;
    if (loading && !data?.result) {
        result = <p>Loading...</p>;
    } else if (error) {
        result = <p>Error: {error?.message || "Unknown"}</p>;
    } else {
        const purchasedTours = data?.result?.purchasedTours || [];
        const ids = data?.result?.purchasedTours.map(x => x.id);
        // @ts-ignore
        dispatch(getPurchasedToursSuccess(ids))
        result = purchasedTours.map((tour) => (
            <TourCard
                key={tour.id}
                id={tour.id}
                thumbnailURL={tour.thumbnailURL}
                name={tour.name}
                priceUSDCents={tour.priceUSDCents}
                purchased={true}
            />
        ))
    }
    return (
        <Wrapper>
            <ToursTitle>
                Your account has owned: {`[${data?.result?.purchasedTours.length} tours] in total.` }
            </ToursTitle>
            <CardContainer background={"#d0f5cb"}>
                {result}
            </CardContainer>
        </Wrapper>
    );
};


