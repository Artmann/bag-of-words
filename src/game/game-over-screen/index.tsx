import { ReactElement } from 'react';
import styled from 'styled-components';

interface GameOverScreenProps {
  score: number;

  restartGame?: () => void;
}

const Background = styled.div`
  background: #f2f2f2;
  height: 100vh;
  width: 100%;
`;
const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;
const Card = styled.div`
  --tw-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  background: #fff;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
  margin: 5rem 0;
  padding: 4rem;
`;
const Score = styled.span`
  color: rgba(242,119,74,1);
`;
const ScoreText = styled.div`
  font-size: 1.25rem;
`;
const RestartButton = styled.a`
  background: rgb(240,91,84);
  background: linear-gradient(30deg, rgba(240,91,84,1) 0%, rgba(242,119,74,1) 100%);
  border-radius: 6px;
  color: #fff;
  font-weight: 600;
  max-width: 16rem;
  padding: 0.8rem;
  text-align: center;
  width: 100%;
`;

export default function GameOverScreen(props: GameOverScreenProps): ReactElement {
  return (
    <Background>
      <Container>
        <div>Logo goes here</div>

        <Card>
          <ScoreText>
            You Scored <Score>{ props.score }</Score> Points!
          </ScoreText>
        </Card>

        <RestartButton onClick={ () => props.restartGame && props.restartGame() }>
          Play Again
        </RestartButton>
      </Container>
    </Background>
  );
}
