import { ReactElement, useState } from 'react';
import styled from 'styled-components';

import { Option } from '..';
import { Word } from '../words';

const Background = styled.div`
  background: rgb(240,91,84);
  background: linear-gradient(30deg, rgba(240,91,84,1) 0%, rgba(242,119,74,1) 100%);
  min-height: 100vh;
  width: 100%;
`;
const Container = styled.div`
  align-items: center;
  background: rgb(240,91,84);
  background: linear-gradient(30deg, rgba(240,91,84,1) 0%, rgba(242,119,74,1) 100%);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 60rem;
  overflow: hidden;
  width: 100%;
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 4rem 0rem;
  width: 100%;
`;
const Card = styled.div`
  background: #fff;
  border-radius: 0.25rem;
  color: #374151;
  font-size: 2.5rem;
  font-weight: 600;
  max-width: 16rem;
  padding: 4rem 2rem;
  text-align: center;
  width: 100%;
`;

const OptionBackground = styled.div`
  background: rgb(255,255,255);
  background: linear-gradient(180deg, rgba(255,255,255,1) 0%, rgba(254,254,254,1) 100%);
  width: 100%;
`;
const OptionButton = styled.a<{ color: string }>`
  border: solid 1px ${ props => props.color };
  border-radius: 6px;
  color: #374151;
  display: block;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
  max-width: 18rem;
  padding: 1rem 0rem;
  text-decoration: none;
  width: 100%;
`;
const OptionContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  padding: 2rem 0rem;
  text-align: center;
  width: 100%;
`;
const Hint = styled.p`
  font-size: 0.85rem;
  letter-spacing: 0.05em;
  margin-bottom: 2rem;
  text-transfom: uppercase;
`;

interface GameScreenProps {
  word: Word;
  options: Option[];

  didPlay?: (success: boolean) => void;
}

interface OptionRowProps {
  showCorrectOptions: boolean;
  option: Option;

  onClick: (option: Option) => void;
}

function OptionRow({ option, showCorrectOptions, onClick }: OptionRowProps): ReactElement {
  const indicatorColor = option.isCorrect ? '#34D399' : '#F87171';
  const color = showCorrectOptions ? indicatorColor : '#D1D5DB';

  return (
    <OptionButton color={ color } onClick={ () => onClick(option) } >
      { option.text }
    </OptionButton>
  );
}

export default function GameScreen({ word, options, didPlay }: GameScreenProps): ReactElement {
  const [ hasAnswered, setHasAnswered ] = useState(false);

  const pickedOption = (selectedOption: Option) => {
    if (hasAnswered) {
      return;
    }

    setHasAnswered(true);

    setTimeout(() => {
      setHasAnswered(false);
      didPlay && didPlay(selectedOption.isCorrect);
    }, 800);
  };

  return (
    <Background>
      <Container>
        <div>
          {/* Header */}
        </div>

        <CardContainer>
          <Card>
            { word.spanish }
          </Card>
        </CardContainer>

        <OptionBackground>
          <OptionContainer>
            <Hint>
              Pick the correct translation
            </Hint>

              {
                options.map(option =>
                  <OptionRow
                    key={ option.text }
                    option={ option }
                    showCorrectOptions={ hasAnswered }

                    onClick={ pickedOption }
                  />
                )
              }

          </OptionContainer>
        </OptionBackground>

      </Container>
    </Background>
  );
}
