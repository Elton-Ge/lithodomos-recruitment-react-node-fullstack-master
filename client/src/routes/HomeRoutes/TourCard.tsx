import React from "react";
import styled from "styled-components";
import {gql, useMutation} from "@apollo/client";
import {toast} from "react-toastify";
import {useSelector} from "react-redux";
import {useHistory} from "react-router";

export const ADD_TOUR_TO_CART = gql`
  mutation  TourCard ($id: ID!){
  purchaseTours(input:{tourIDs:[$id]}) {
    purchasedTours {
      name,
      priceUSDCents,
      thumbnailURL,
      purchased
    },
    error{
      message
    }
  }
}
`;

export interface LITHODOMOS_TEST_Tour_Card {
    id: string;
    name: string;
    priceUSDCents: number;
    thumbnailURL: string | null;
    updateToursHandler?: Function;
    [propsName: string]: any;
}

const TourCard: React.FC<LITHODOMOS_TEST_Tour_Card> =
    ({id, name, priceUSDCents, thumbnailURL, updateToursHandler, purchased}) => {
        let array: string[] = JSON.parse(localStorage?.getItem("purchasedTours") as string) || [];
        const history = useHistory()
        // @ts-ignore
        const {jwt} = useSelector(state => state.app)

        const [purchasedTours] = useMutation(ADD_TOUR_TO_CART, {
            onError: (error) => toast.error(error.message),
            onCompleted: () => {
                array.push(id)
                localStorage.setItem("purchasedTours", JSON.stringify(array));
                (updateToursHandler as Function)(array);
                toast.success(`Successfully Purchased ${name}.Please Enjoy`, {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        });

        return (
            <CardWrapper>
                <CardImage background={thumbnailURL as string}/>
                <CardTextWrapper>
                    <CardTextTitle>{name}</CardTextTitle>
                    <CardTextBody>
                        Lorem ipsum dolor sit amet consectetur, Ducimus, repudiandae
                        temporibus omnis illum maxime quod deserunt eligendi dolor
                    </CardTextBody>
                </CardTextWrapper>
                <CardStatWrapper>
                    <CardStats>
                        <CardPrice>${priceUSDCents}</CardPrice>
                    </CardStats>
                    <CardStats>
                        <Button onClick={purchased ? () => {
                            history.push(`/account/tour/${id}`)
                        } : (() => {
                                if (!jwt) {
                                    toast.info(`Please Login firstly`, {
                                        position: toast.POSITION.TOP_RIGHT
                                    })
                                    return history.push("/auth/login")
                                }
                                purchasedTours({variables: {id}})
                            }
                        )}
                        >{purchased ? "View" : "Add to Cart"}</Button>
                    </CardStats>
                </CardStatWrapper>
            </CardWrapper>
        );
    };

export default TourCard;


const CardWrapper = styled.div`
  display: grid;
  grid-template-columns: 300px;
  grid-template-rows: 210px 210px 80px;
  grid-template-areas: "image" "text" "stats";
  border-radius: 18px;
  background: #000;
  box-shadow: 5px 5px 15px rgba(0, 0, 0, 0.9);
  text-align: center;
  margin: 15px;
`;

const CardImage = styled.div<{ background: string }>`
  grid-area: image;
  background-image: url(${({background}) => background});
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  background-size: cover;
`;

const CardTextWrapper = styled.div`
  grid-area: text;
  margin: 25px;
`;


const CardTextTitle = styled.h2`
  font-size: 2rem;
  box-sizing: border-box;
  line-height: 1.2;
  background: linear-gradient(110.78deg,
    rgb(118, 230, 80) -1.13%,
  rgb(249, 214, 73) 15.22%,
  rgb(240, 142, 53) 32.09%,
  rgb(236, 81, 87) 48.96%,
  rgb(255, 24, 189) 67.94%,
  rgb(26, 75, 255) 85.34%,
  rgb(98, 216, 249) 99.57%);
  background-clip: initial;
  -webkit-background-clip: text;
  color: transparent;
`;

const CardTextBody = styled.p`
  color: grey;
  font-size: 15px;
  font-weight: 300;
`;

const CardStatWrapper = styled.div`
  grid-area: stats;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  background: #5930e5;
`;

const CardStats = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: white;
  padding: 10px;
`;

const CardPrice = styled.span`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
  letter-spacing: 2px;
`;
const Button = styled.button`
  border: none;
  border-radius: 4px;
  font-size: 20px;
  color: white;
  height: 70%;
  width: 100%;
  outline: none;
  cursor: pointer;
  transition: background-position .7s, box-shadow .4s;
  background-image: linear-gradient(to bottom, #E48A3C, rgba(234, 108, 8, 0.24));

  &:hover {
    color: #000;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.16) inset, 0 0 30px 0 #E48A3C;
  }
`
