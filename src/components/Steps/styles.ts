import styled from "styled-components";

export const SectionWrapper = styled.section`
  padding: 90px 20px;
  background-color: #eafaf1;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 2.3rem;
  font-weight: 700;
  color: #2e7d32;
  margin-bottom: 16px;
`;

export const SectionDescription = styled.p`
  max-width: 600px;
  margin: 0 auto 40px;
  font-size: 1.1rem;
  color: #4b4b4b;
`;

export const StepCard = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 14px;
  box-shadow: 0 6px 20px rgba(0, 128, 0, 0.05);
  transition: all 0.3s ease;
  text-align: center;

  &:hover {
    box-shadow: 0 10px 30px rgba(0, 128, 0, 0.12);
  }
`;

export const StepNumber = styled.div`
  font-size: 1rem;
  font-weight: 600;
  color: #43a047;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  margin-bottom: 8px;
`;

export const StepTitle = styled.h3`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 12px;
`;

export const StyledVideo = styled.video`
  width: 100%;
  max-height: 300px;
  border-radius: 10px;
  border: 3px solid #e0f2f1;
  object-fit: cover;
`;
