import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  pointer-events: all;
  background-color: white;
  border-radius: 4px;
  border: 1px ${(p) => p.color} solid;
  height: 50px;
  min-width: 250px;
  padding: 6px 12px;
  max-width: 600px;

  ${css`
    -webkit-animation: fadein 0.5s, ease-in-out 0.5s 2.5s;
    animation: fadein 0.5s, ease-in-out 0.5s 2.5s;
  `}

  margin-top: 8px;

  @-webkit-keyframes fadein {
    from {
      top: 0;
      opacity: 0;
    }

    to {
      top: 10%;
      opacity: 1;
    }
  }

  @keyframes fadein {
    from {
      top: 0;
      opacity: 0;
    }

    to {
      top: 10%;
      opacity: 1;
    }
  }

  @-webkit-keyframes fadeout {
    from {
      top: 10%;
      opacity: 1;
    }

    to {
      top: 0;
      opacity: 0;
    }
  }

  @keyframes fadeout {
    from {
      top: 10%;
      opacity: 1;
    }

    to {
      top: 0;
      opacity: 0;
    }
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  text-align: center;
  width: 100%;
`;
