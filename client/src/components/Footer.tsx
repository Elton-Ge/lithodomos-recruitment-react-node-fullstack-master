import React from "react";
import styled from "styled-components";
import { env } from "../config/env";
import { colors } from "../styles/colors";

export const Footer: React.FC = () => {
  return (
    <Container>
      <Wrapper>
        <Stack>
          <StyledFooter>©2021 Lithodomos VR Pty Ltd</StyledFooter>

          <VersionText>v{env.APP_VERSION}</VersionText>
        </Stack>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  background: ${colors.secondaryBackground};
  padding: 10px;
`;
const StyledFooter = styled.div`
 text-align: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px;
`;

const Stack = styled.div`
  > * {
    margin: 10px 0;
  }
`;

const VersionText = styled.p`
  text-align: center;
  font-size: 12px;
`;
