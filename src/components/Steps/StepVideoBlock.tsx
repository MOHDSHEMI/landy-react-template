import { FC } from "react";
import { Row, Col } from "antd";
import {
  SectionWrapper,
  SectionTitle,
  SectionDescription,
  StepCard,
  StepTitle,
  StepNumber,
  StyledVideo,
} from "./styles";

interface StepVideoBlockProps {
  title: string;
  content: string;
  steps: {
    step: string;
    title: string;
    src: string;
  }[];
  id?: string;
}

const StepVideoBlock: FC<StepVideoBlockProps> = ({ title, content, steps, id }) => {
  return (
    <SectionWrapper id={id || "steps"}>
      <SectionTitle>{title}</SectionTitle>
      <SectionDescription>{content}</SectionDescription>

      <Row gutter={[24, 24]} justify="center">
        {steps.map((item, index) => (
          <Col xs={24} md={8} key={index}>
            <StepCard>
              <StepNumber>{item.step}</StepNumber>
              <StepTitle>{item.title}</StepTitle>
           <StyledVideo 
  autoPlay 
  muted 
  loop 
  playsInline // helps autoplay work on mobile 
>
  <source src={item.src} type="video/mp4" />
  <source src={item.src} type="video/quicktime" />
  Your browser does not support the video tag.
</StyledVideo>

            </StepCard>
          </Col>
        ))}
      </Row>
    </SectionWrapper>
  );
};

export default StepVideoBlock;
