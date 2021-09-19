import React from "react";
import {useParams} from "react-router-dom";
import {gql, useQuery} from "@apollo/client";
import styled from "styled-components";
import {AiOutlineHeart, AiOutlineShareAlt, MdChat} from 'react-icons/all';
import {Wrapper} from "./Tours";
import {LITHODOMOS_TEST_Tour_Card} from "./TourCard";


export const GET_TOUR = gql`
  query LITHODOMOS_TEST_Get_Tour_Detail($id:ID!){
    result: getTour(input:{ tourID: $id}) {
       id
       name
       priceUSDCents
       thumbnailURL
    }
  }
`;

export const TourCardDetail: React.FC<LITHODOMOS_TEST_Tour_Card> = () => {
    // @ts-ignore
    let {id} = useParams();
    const {loading, data} = useQuery(GET_TOUR, {
        fetchPolicy: "network-only",
        variables: {id},
    })
    return (
        <Wrapper>
            {loading && <p>Loading...</p>}
            <CardDetail>
                <CardContent>
                    <CardHeader>
                        <img src={data?.result.thumbnailURL} alt={data?.result.name}/>
                        <h1>{data?.result.name}</h1>
                        <p>Tour Desc</p>
                    </CardHeader>
                    <CardDesc>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad architecto aut deserunt dolor
                        doloribus harum illo, iure minus optio porro soluta ut vero voluptatem! Aperiam blanditiis
                        molestias nostrum nulla sit.
                    </CardDesc>
                    <CardAction>
                        <ul>
                            <li><AiOutlineShareAlt size={20}/>share</li>
                            <li><AiOutlineHeart size={20}/>heart</li>
                            <li><MdChat size={20}/>chat</li>
                        </ul>
                    </CardAction>
                </CardContent>
            </CardDetail>
        </Wrapper>
    )
}

export const CardDetail = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 400px;
  margin: 30px auto;
  overflow: hidden;
  border-radius: 10px;
  transition: all 0.4s;
  box-shadow: 0 0 120px -25px rgba(0, 0, 0, 0.5);

  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 80px -25px rgba(0, 0, 0, 0.5);
    transition: all 0.4s;
  }
`
export const CardContent = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background-blend-mode: multiply;
  z-index: 2;
  border-radius: 10px;
`
export const CardHeader = styled.div`
  position: relative;
  padding: 30px;
  height: 40%;

  h1 {
    color: black;
    font-weight: 400;
  }

  p {
    display: inline-block;
    color: #959595;
  }

  img {
    border-radius: 15px;
    position: relative;
    float: left;
    margin-right: 20px;
    width: 40%;
    box-shadow: 0 0 20px -10px rgba(0, 0, 0, 0.5);
  }
`
export const CardDesc = styled.div`
  padding: 25px;
  height: 50%;
  color: #545454;
`
export const CardAction = styled.div`
  height: 10%;
  padding-left: 15px;
  padding-bottom: 20px;

  ul {
    list-style: none;
    padding: 0;

    li {
      display: inline-block;
      transition: color 0.3s;
      transition-delay: 0.15s;
      margin-right: 20px;
      cursor: pointer;
      font-style: italic;
      color: #adadad;

      &:hover {
        transition: color 0.3s;
        color: #633abc;
      }
    }
  }
`

